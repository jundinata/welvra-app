exports.handler = async (event) => {
  const { latitude, longitude } = event.queryStringParameters || {};

  if (!latitude || !longitude) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "latitude and longitude are required" }),
    };
  }

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(latitude)}` +
    `&longitude=${encodeURIComponent(longitude)}` +
    `&current=temperature_2m,weathercode,windspeed_10m,relative_humidity_2m&timezone=auto`;

  try {
    const res = await fetch(url);
    const body = await res.text();

    return {
      statusCode: res.status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
      },
      body,
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to fetch weather data" }),
    };
  }
};
