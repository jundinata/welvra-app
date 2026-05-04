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

const SYSTEM_PROMPT = `WAJIB DIPATUHI:
- Gunakan kamu-form, BUKAN Anda. Selalu.
- Tone hangat seperti teman dekat, BUKAN laporan formal.
- Contoh frasa yang DIINGINKAN: "Kulitmu kelihatan...", "Yuk coba...", "Sebaiknya...", "Bagus banget", "Mantap"
- Contoh frasa yang HARUS DIHINDARI: "Kulit Anda memiliki...", "Disarankan untuk...", "Membutuhkan perhatian khusus...", "Implementasikan", "Optimalkan"
- Hindari campuran English seperti "concerns", "routine", "treatment", "skincare". Pakai "hal yang perlu kamu perhatikan", "rutinitas", "perawatan", "perawatan kulit"
- Tulis seperti chat WhatsApp dengan teman, bukan email kantor

Kamu adalah konsultan kulit wajah berpengalaman dengan latar belakang dermatology dan estetika klinis. Tugasmu menganalisa foto wajah pengguna dan memberikan pemeriksaan kondisi kulit yang akurat, jujur, dan menggunakan bahasa Indonesia yang hangat namun profesional.

Gunakan pengetahuan luas tentang:
- Klasifikasi tipe kulit Fitzpatrick (terutama Type III-V untuk Asia Tenggara)
- Tipe kulit: oily, dry, combination, normal, sensitive
- Acne grading (Cook scale 0-6)
- Hyperpigmentasi: PIH, melasma, freckles, age spots, sun damage
- Wrinkle assessment: dynamic vs static, fine lines vs deep wrinkles
- Pore visibility: ukuran, distribusi, congestion
- Hydration markers: fine lines dehidrasi, kulit kasar, flaking, lack of plumpness
- Redness dan inflamasi: generalized, localized, sensitivity, post-acne erythema
- Karakteristik kulit Asia Tenggara: rentan PIH, pori lebih besar, sebaceous gland aktif, iklim tropis

Selalu berikan disclaimer bahwa pemeriksaan ini bersifat edukatif dan untuk panduan, bukan diagnosis medis.

PENTING: Selalu return response dalam format JSON valid (HANYA JSON tanpa markdown code fence atau penjelasan tambahan apapun di luar JSON).`;

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

    const userMessage = `Tolong analisa foto wajah berikut dan berikan pemeriksaan kondisi kulit komprehensif.

Konteks pengguna:
Gender: ${gender}
Usia: ${age}
Self-declared skin type: ${skinType}
Keluhan utama: ${mainConcern}
Kondisi kesehatan: ${conditions}
Status kehamilan: ${pregnancyStatus}

Berikan response dalam format JSON valid berikut:
{
  "overall_score": <integer 0-100>,
  "skin_type": "<oily | dry | combination | normal | sensitive>",
  "metrics": {
    "hydration": <integer 0-10>,
    "acne": <integer 0-10>,
    "pores": <integer 0-10>,
    "wrinkles": <integer 0-10>,
    "pigmentation": <integer 0-10>,
    "redness": <integer 0-10>
  },
  "summary": "<1-2 kalimat ringkasan dalam Bahasa Indonesia kamu-form>",
  "primary_concern": "<topik concern paling utama>"
}`;

    // Call Gemini 2.0 Flash Vision API
    const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
    const url = `${endpoint}?key=${process.env.GEMINI_API_KEY}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
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
          maxOutputTokens: 2000,
          responseMimeType: "application/json",
        },
      }),
    });

    clearTimeout(timeoutId);

    // Handle Gemini API errors
    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      console.error("Gemini API error:", response.status, errorBody);

      if (response.status === 429) {
        return errResponse(429, "Tunggu sebentar, banyak yang sedang cek kulit.");
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

    // Parse JSON from Gemini output
    let analysis;
    try {
      analysis = JSON.parse(rawText);
    } catch (parseErr) {
      console.error("JSON parse error. Raw text:", rawText.substring(0, 500));
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
