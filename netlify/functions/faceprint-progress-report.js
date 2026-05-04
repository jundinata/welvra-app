const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const requestTimestamps = [];
const RATE_LIMIT_WINDOW_MS = 60000;
const RATE_LIMIT_MAX_REQUESTS = 5;

function checkRateLimit() {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  while (requestTimestamps.length > 0 && requestTimestamps[0] < cutoff)
    requestTimestamps.shift();
  if (requestTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) return false;
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

function extractJSON(text) {
  if (!text) return null;
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace)
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  return cleaned;
}

const SYSTEM_PROMPT = `VOICE — WAJIB DIPATUHI:
Kamu berbicara seperti dermatologist Indonesia berpengalaman yang lagi review progress kulit pasien selama beberapa minggu/bulan terakhir. Tone hangat, evidence-based, kamu-form (BUKAN Anda).

PRINSIP:
1. Bandingkan entry pertama dan terakhir dalam range
2. Highlight 2 perbaikan terbesar (delta positif)
3. Catat 1-2 area yang masih plateau atau mundur
4. Saran adjustment rutinitas berdasarkan trend (bukan generic)
5. Encouragement realistis, no over-promise
6. NEVER mention 'AI' atau 'analisis machine' — kamu adalah dermatologist
7. NO emoji
8. Bahasa Indonesia natural, kamu-form

OUTPUT FORMAT — KRITIS:
- Return HANYA JSON object murni
- TIDAK BOLEH ada markdown code fence
- Output HARUS dimulai dengan { dan diakhiri dengan }
- Jika ada field kosong, isi string kosong atau array kosong, JANGAN skip field`;

function buildUserMessage(entries, userContext) {
  const uc = userContext || {};
  let msg = `Berikut riwayat pemeriksaan kulit pengguna, dari paling lama ke paling baru:\n\n`;
  for (let i = 0; i < entries.length; i++) {
    const e = entries[i];
    const m = e.metrics || {};
    const ms = (k) => {
      const v = m[k];
      return typeof v === "object" ? v.score || 0 : v || 0;
    };
    msg += `[Entry ${i + 1} — ${e.created_at || "?"}]\n`;
    msg += `Skor keseluruhan: ${e.overall_score || 0}\n`;
    msg += `Tipe kulit: ${e.skin_type || "?"}\n`;
    msg += `Metrik: hidrasi ${ms("hydration")}/10, jerawat ${ms("acne")}/10, pori ${ms("pores")}/10, kerutan ${ms("wrinkles")}/10, pigmentasi ${ms("pigmentation")}/10, kemerahan ${ms("redness")}/10\n`;
    msg += `Concern utama: ${e.primary_concern || "-"}\n`;
    msg += `Ringkasan: ${e.summary || "-"}\n\n`;
  }
  msg += `Konteks pengguna:\nGender: ${uc.gender || "tidak disebutkan"}\nUsia: ${uc.age || "tidak disebutkan"}\nStatus kehamilan: ${uc.pregnancy_status || "tidak disebutkan"}\n\n`;
  msg += `Berikan laporan progress dalam format JSON:\n`;
  msg += `{"period":"<X minggu | X bulan>","headline":"<1 kalimat pembuka>","improvements":[{"metric":"<nama>","delta_text":"<X poin>","why_it_matters":"<1 kalimat>"}],"watch_areas":[{"metric":"<nama>","observation":"<1 kalimat>","suggestion":"<1 kalimat>"}],"adjusted_recommendation":"<2-3 kalimat>","encouragement":"<1 kalimat>","overall_summary":"<2-3 kalimat>"}`;
  return msg;
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS")
    return { statusCode: 204, headers: CORS_HEADERS, body: "" };
  if (event.httpMethod !== "POST") return errResponse(405, "Method not allowed");
  if (!process.env.GEMINI_API_KEY)
    return errResponse(500, "Konfigurasi sistem belum lengkap. Hubungi admin.");
  if (!checkRateLimit())
    return errResponse(429, "Tunggu sebentar, banyak yang sedang minta laporan.");

  try {
    const { entries, user_context } = JSON.parse(event.body);
    if (!entries || !Array.isArray(entries) || entries.length < 3)
      return errResponse(400, "Butuh minimal 3 hasil pemeriksaan.");

    const userMessage = buildUserMessage(entries.slice(0, 10), user_context);

    const PRIMARY_MODEL = "gemini-2.5-flash";
    const FALLBACK_MODEL = "gemini-1.5-flash";
    const buildEndpoint = (model) =>
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    const requestBody = {
      contents: [{ parts: [{ text: userMessage }] }],
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      generationConfig: {
        temperature: 0.5,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 3000,
        responseMimeType: "application/json",
      },
    };

    const apiKey = process.env.GEMINI_API_KEY;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    async function callGemini(model) {
      console.log("Progress report: trying model:", model);
      return fetch(`${buildEndpoint(model)}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify(requestBody),
      });
    }

    let response = await callGemini(PRIMARY_MODEL);
    if (response.status === 429) {
      console.log("Progress report: fallback to:", FALLBACK_MODEL);
      response = await callGemini(FALLBACK_MODEL);
    }
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      console.error("Gemini API error:", response.status, errorBody);
      if (response.status === 429)
        return errResponse(429, "Sistem sedang sibuk. Coba lagi dalam 1 menit.");
      if (response.status >= 500)
        return errResponse(502, "Sistem sedang sibuk. Coba lagi sebentar.");
      return errResponse(400, "Laporan gagal dibuat. Coba lagi.");
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    if (!candidate || candidate.finishReason === "SAFETY" || !candidate.content?.parts?.length)
      return errResponse(400, "Laporan tidak dapat dibuat. Coba lagi.");

    const rawText = candidate.content.parts[0]?.text || "";
    if (!rawText) return errResponse(500, "Hasil laporan kosong. Coba lagi.");

    let report;
    try {
      report = JSON.parse(extractJSON(rawText));
    } catch (parseErr) {
      console.error("JSON parse error:", rawText.substring(0, 1000));
      return errResponse(500, "Hasil laporan tidak valid. Coba lagi.");
    }

    return {
      statusCode: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      body: JSON.stringify(report),
    };
  } catch (err) {
    if (err.name === "AbortError")
      return errResponse(504, "Laporan terlalu lama. Coba lagi sebentar.");
    console.error("progress-report error:", err);
    return errResponse(500, "Maaf, laporan gagal dibuat. Coba lagi sebentar.");
  }
};
