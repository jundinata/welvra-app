const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

/* In-memory rate limiting (15 RPM per Lambda instance) */
const requestTimestamps = [];
const RATE_LIMIT_WINDOW_MS = 60000;
const RATE_LIMIT_MAX_REQUESTS = 15;

function checkRateLimit() {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  while (requestTimestamps.length > 0 && requestTimestamps[0] < cutoff) {
    requestTimestamps.shift();
  }
  if (requestTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  requestTimestamps.push(now);
  return true;
}

function errResponse(statusCode, error) {
  return {
    statusCode,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    body: JSON.stringify({ error }),
  };
}

const SYSTEM_PROMPT = `VOICE — WAJIB DIPATUHI:
Kamu berbicara seperti dermatologist Indonesia berpengalaman (dr. Arini Astasari, dr. Lia Apriyanti, dr. Eddy Karta) yang menjelaskan kondisi kulit ke pasien dengan hangat tapi profesional.

PRINSIP SUARA:
1. SCIENTIFIC tapi ACCESSIBLE — Pakai istilah medical (PIH, sebum, ceramide, pH balance) tapi langsung jelaskan artinya
2. WARM tapi REALISTIC — Tidak over-promise. "Bekas jerawat butuh 8-12 minggu fade" lebih jujur dari "akan hilang dalam 1 minggu"
3. EVIDENCE-BASED — Selalu kasih reason WHY di balik setiap rekomendasi
4. NON-CONDESCENDING — Asumsi user pintar, mau belajar
5. CULTURALLY AWARE — Paham brand & climate Indonesia (panas, lembab, polusi, AC ruangan)

BAHASA:
- WAJIB pakai kamu-form, BUKAN Anda. Selalu.
- Tone hangat seperti chat WhatsApp dengan dermatologist favorit, BUKAN laporan formal
- Contoh BENAR: "Kulitmu kelihatan...", "Yuk coba...", "Bagus banget", "Sebaiknya kamu..."
- Contoh SALAH: "Kulit Anda memiliki...", "Disarankan untuk...", "Implementasikan", "Optimalkan"
- Mix istilah medical + terjemahan natural ("hyperpigmentasi pasca-jerawat / PIH / bekas jerawat")
- Hindari English: pakai "rutinitas" bukan "routine", "perawatan kulit" bukan "skincare"
- Reference brand Indonesia: Skintific, Some By Mi, Wardah, Avoskin, Sensatia, Erha, Senka, Hada Labo, Cetaphil, etc.

DERMATOLOGY KNOWLEDGE BASE:

Skin Types (Fitzpatrick III-V dominant Indonesia):
- Oily: T-zone berkilau, pori besar, sebum tinggi → oil-control + non-comedogenic
- Dry: tarik setelah cleansing, fine lines, kasar → occlusive + humectant
- Combination: T-zone oily, pipi normal/dry → balance approach
- Normal: jarang masalah → maintenance
- Sensitive: mudah merah, reaktif → hindari fragrance, alcohol, harsh actives

Acne: sebum + P. acnes + inflammation + follicular hyperkeratinization. Indonesia: humidity worsens, maskne. Hormonal: jaw/chin. Treat: BHA, niacinamide, azelaic acid, benzoyl peroxide (cautious), retinoid (NOT pregnancy).

Hyperpigmentation Indonesia: higher melanin = higher PIH risk. Melasma common in pregnancy. Treat: vitamin C, niacinamide, alpha arbutin, kojic acid, azelaic acid, tranexamic acid. AVOID hydroquinone (regulated), retinoids (pregnancy). ALWAYS pair SPF 30+.

Pores: Asian skin tends larger. BHA for clogged, niacinamide for appearance, retinoid for turnover (NOT pregnancy).

Wrinkles: dynamic vs static. UV photo-aging heavy in Indonesia. Sunscreen mandatory. Anti-aging: retinoid, vitamin C, peptides. AVOID retinoid in pregnancy.

Hydration: TEWL increased by AC, hot water, harsh cleansers. HA (humectant), glycerin, ceramides (barrier repair), squalane (occlusive).

PREGNANCY-SAFE RULES (apply when pregnancy_status indicates pregnant/breastfeeding):
AVOID: retinoid (all forms), salicylic acid >2%, hydroquinone, benzoyl peroxide, chemical sunscreens (oxybenzone), essential oils high concentration
SAFE: hyaluronic acid, glycerin, ceramides, niacinamide (low %), vitamin C, azelaic acid, lactic acid (low %), mandelic acid, kojic acid, alpha arbutin, mineral sunscreen (zinc oxide, titanium dioxide)
Mark each recommendation with pregnancy_safe boolean.

OUTPUT FORMAT — KRITIS:
- Return HANYA JSON object murni
- TIDAK BOLEH ada markdown code fence (no \`\`\`json ... \`\`\`)
- TIDAK BOLEH ada teks penjelasan sebelum atau sesudah JSON
- Output HARUS dimulai dengan { dan diakhiri dengan }
- Jika ada field yang tidak bisa diisi, isi dengan array kosong [] atau string kosong, JANGAN skip field`;

function extractJSON(text) {
  if (!text) return null;
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }
  return cleaned;
}

exports.handler = async (event) => {
  // Handle OPTIONS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: CORS_HEADERS, body: "" };
  }

  // Validate POST method
  if (event.httpMethod !== "POST") {
    return errResponse(405, "Method not allowed");
  }

  // Check GEMINI_API_KEY is configured
  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY not set");
    return errResponse(500, "Konfigurasi sistem belum lengkap. Hubungi admin.");
  }

  // Rate limit check
  if (!checkRateLimit()) {
    return errResponse(429, "Tunggu sebentar, banyak yang sedang cek kulit.");
  }

  try {
    // Parse JSON body
    const { image_base64, user_context } = JSON.parse(event.body);

    // Validate image_base64
    if (!image_base64) {
      return errResponse(400, "Foto tidak valid.");
    }

    // Strip data URI prefix if present
    const cleanBase64 = image_base64.replace(
      /^data:image\/[a-zA-Z]+;base64,/,
      ""
    );

    // Extract user context fields with defaults
    const uc = user_context || {};
    const gender = uc.gender || "tidak disebutkan";
    const age = uc.age || "tidak disebutkan";
    const skinType = uc.declared_skin_type || "tidak ada";
    const mainConcern = uc.main_concern || "tidak ada";
    const conditions = Array.isArray(uc.chronic_conditions)
      ? uc.chronic_conditions.join(", ")
      : uc.chronic_conditions || "tidak ada";
    const pregnancyStatus = uc.pregnancy_status || "tidak disebutkan";

    const isPregnant = /hamil|pregnant|trimester|breastfeed|menyusui/i.test(pregnancyStatus);

    const userMessage = `Analisa foto wajah berikut. Berikan pemeriksaan kondisi kulit komprehensif.

Konteks pengguna:
Gender: ${gender}
Usia: ${age}
Self-declared skin type: ${skinType}
Keluhan utama: ${mainConcern}
Kondisi kesehatan: ${conditions}
Status kehamilan: ${pregnancyStatus}
${isPregnant ? "PENTING: User sedang hamil/menyusui. SEMUA rekomendasi WAJIB pregnancy-safe. Tandai pregnancy_safe: true/false per rekomendasi." : ""}

Berikan response dalam format JSON valid berikut:
{
  "overall_score": <integer 0-100>,
  "skin_type": "oily|dry|combination|normal|sensitive",
  "skin_type_explanation": "<1-2 kalimat kenapa tipe kulit ini terdeteksi, dalam bahasa Indonesia hangat>",
  "metrics": {
    "hydration": {"score":<0-10>,"label":"<Sangat lembab|Cukup lembab|Sedikit kering|Kering|Sangat kering>","observation":"<1 kalimat observasi spesifik dari foto, dermatologist voice>"},
    "acne": {"score":<0-10>,"label":"<Bersih|Beberapa noda|Jerawat ringan|Jerawat sedang|Jerawat aktif>","observation":"<1 kalimat>"},
    "pores": {"score":<0-10>,"label":"<Halus|Sedang|Terlihat|Membesar|Tersumbat>","observation":"<1 kalimat>"},
    "wrinkles": {"score":<0-10>,"label":"<Mulus|Garis halus minimal|Beberapa garis ekspresi|Kerutan terlihat|Aging signs>","observation":"<1 kalimat>"},
    "pigmentation": {"score":<0-10>,"label":"<Sangat merata|Cukup merata|Sedikit tidak merata|Bercak terlihat|Hiperpigmentasi>","observation":"<1 kalimat>"},
    "redness": {"score":<0-10>,"label":"<Tenang|Sedikit kemerahan|Kemerahan terlihat|Iritasi|Sangat sensitif>","observation":"<1 kalimat>"}
  },
  "primary_concerns": [
    {"concern":"<id>","severity":"ringan|sedang|perlu_perhatian","title":"<judul Indonesia>","explanation":"<2-3 kalimat, pakai istilah medical + terjemahan>","approach":"<1-2 kalimat pendekatan>","patience_note":"<timeline realistis>"}
  ],
  "recommendations": [
    {"priority":"high|medium|low","category":"moisturize|treat|protect|exfoliate|soothe|brighten|anti-aging","title":"<judul aksi pendek>","why":"<kenapa penting, dermatologist voice>","ingredients_to_look_for":["<ingredient (alasan singkat)>"],"ingredients_to_avoid":["<ingredient jika ada>"],"how_to_use":"<cara pakai singkat>","example_brands":["<1-2 brand tersedia di Indonesia>"],"pregnancy_safe":true,"patience_timeline":"<ekspektasi realistis>"}
  ],
  "daily_routine": {
    "morning": {"title":"Rutinitas Pagi","steps":[{"step_number":1,"step_name":"<nama step>","purpose":"<tujuan>","tips":"<tips singkat>","ingredients":["<key ingredient>"],"examples":["<brand example>"]}]},
    "evening": {"title":"Rutinitas Malam","steps":[{"step_number":1,"step_name":"<nama step>","purpose":"<tujuan>","tips":"<tips singkat>","ingredients":["<key ingredient>"],"examples":["<brand example>"]}]}
  },
  "summary": "<1-2 kalimat ringkasan hangat kamu-form>",
  "encouragement": "<1 kalimat penyemangat realistis, dermatologist tone>"
}`;

    // Gemini model fallback: try 2.5-flash first, fall back to 1.5-flash on 429
    const PRIMARY_MODEL = "gemini-2.5-flash";
    const FALLBACK_MODEL = "gemini-1.5-flash";
    const buildEndpoint = (model) =>
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: cleanBase64,
              },
            },
            {
              text: userMessage,
            },
          ],
        },
      ],
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      generationConfig: {
        temperature: 0.4,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8000,
        responseMimeType: "application/json",
      },
    };

    const apiKey = process.env.GEMINI_API_KEY;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    async function callGemini(model) {
      const url = `${buildEndpoint(model)}?key=${apiKey}`;
      console.log("Faceprint: trying model:", model);
      return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify(requestBody),
      });
    }

    let response = await callGemini(PRIMARY_MODEL);
    console.log("Faceprint: response status:", response.status, "model:", PRIMARY_MODEL);

    // Fallback on 429 quota error
    if (response.status === 429) {
      console.log("Faceprint: fallback to:", FALLBACK_MODEL);
      response = await callGemini(FALLBACK_MODEL);
      console.log("Faceprint: response status:", response.status, "model:", FALLBACK_MODEL);
    }

    clearTimeout(timeoutId);

    // Handle Gemini API errors
    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      console.error("Gemini API error:", response.status, errorBody);

      if (response.status === 429) {
        return errResponse(429, "Sistem pemeriksaan sedang sibuk. Coba lagi dalam 1 menit.");
      }
      if (response.status >= 500) {
        return errResponse(502, "Sistem pemeriksaan sedang sibuk. Coba lagi dalam beberapa saat.");
      }
      return errResponse(400, "Pemeriksaan gagal. Coba lagi dengan foto yang lebih jelas.");
    }

    // Parse Gemini response
    const data = await response.json();

    // Check for blocked content or empty candidates
    const candidate = data.candidates?.[0];
    if (!candidate || candidate.finishReason === "SAFETY" || !candidate.content?.parts?.length) {
      console.error("Gemini blocked or empty:", JSON.stringify(data.candidates?.[0]?.finishReason));
      return errResponse(400, "Foto tidak dapat dianalisa. Pastikan foto wajah jelas.");
    }

    const rawText = candidate.content.parts[0]?.text || "";
    if (!rawText) {
      console.error("Gemini returned empty text");
      return errResponse(500, "Hasil pemeriksaan tidak valid. Coba lagi.");
    }

    // Parse JSON from Gemini output (defensively strip markdown fences)
    let analysis;
    try {
      const cleaned = extractJSON(rawText);
      analysis = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("JSON parse error. Raw text (first 1000 chars):", rawText.substring(0, 1000));
      console.error("Parse error:", parseErr.message);
      return errResponse(500, "Hasil pemeriksaan tidak valid. Coba lagi.");
    }

    // Return structured JSON (flat — frontend expects analysis data directly)
    return {
      statusCode: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      body: JSON.stringify(analysis),
    };
  } catch (err) {
    if (err.name === "AbortError") {
      return errResponse(504, "Pemeriksaan terlalu lama. Coba foto lebih kecil.");
    }
    console.error("faceprint-analyze error:", err);
    return errResponse(500, "Maaf, pemeriksaan gagal. Coba lagi sebentar.");
  }
};
