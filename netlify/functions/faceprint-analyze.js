const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

exports.handler = async (event) => {
  // 1. Handle OPTIONS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: CORS_HEADERS, body: "" };
  }

  // 2. Validate POST method
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // 3. Parse JSON body
    const { image_base64, user_context } = JSON.parse(event.body);

    // 4. Validate image_base64
    if (!image_base64) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: "image_base64 is required" }),
      };
    }

    // 5. Strip data URI prefix if present
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
    const conditions = Array.isArray(uc.chronic_conditions) ? uc.chronic_conditions.join(", ") : (uc.chronic_conditions || "tidak ada");
    const pregnancyStatus = uc.pregnancy_status || "tidak disebutkan";

    // 6. Call Anthropic API with Claude Vision
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 2000,
        system: `Kamu adalah konsultan kulit wajah berpengalaman dengan latar belakang dermatology dan estetika klinis. Tugasmu menganalisa foto wajah pengguna dan memberikan pemeriksaan kondisi kulit yang akurat, jujur, dan menggunakan bahasa Indonesia yang hangat namun profesional.

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

PENTING: Selalu return response dalam format JSON valid (HANYA JSON tanpa markdown code fence atau penjelasan tambahan apapun di luar JSON).`,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: "image/jpeg",
                  data: cleanBase64,
                },
              },
              {
                type: "text",
                text: `Tolong analisa foto wajah berikut dan berikan pemeriksaan kondisi kulit komprehensif.

Konteks pengguna:
Gender: ${gender}
Usia: ${age}
Self-declared skin type: ${skinType}
Keluhan utama: ${mainConcern}
Kondisi kesehatan: ${conditions}
Status kehamilan: ${pregnancyStatus}

Berikan response dalam format JSON valid berikut (HANYA JSON tanpa markdown):
{
  "overall_score": integer 0-100,
  "skin_type": "oily|dry|combination|normal|sensitive",
  "metrics": {
    "hydration": integer 0-10,
    "acne": integer 0-10,
    "pores": integer 0-10,
    "wrinkles": integer 0-10,
    "pigmentation": integer 0-10,
    "redness": integer 0-10
  },
  "summary": "1-2 kalimat ringkasan dalam Bahasa Indonesia kamu-form",
  "primary_concern": "topik concern paling utama"
}`,
              },
            ],
          },
        ],
      }),
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Anthropic API error:", response.status, errorBody);
      throw new Error(`Anthropic API returned ${response.status}`);
    }

    // 7. Parse response
    const data = await response.json();
    const textContent = data.content.find((c) => c.type === "text");
    const analysisText = textContent?.text || "";
    const analysis = JSON.parse(analysisText);

    // 8. Return structured JSON (flat — frontend expects analysis data directly)
    return {
      statusCode: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      body: JSON.stringify(analysis),
    };
  } catch (err) {
    // 9. Error handling
    console.error("faceprint-analyze error:", err);
    return {
      statusCode: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      body: JSON.stringify({
        success: false,
        error: "Maaf, pemeriksaan gagal",
      }),
    };
  }
};
