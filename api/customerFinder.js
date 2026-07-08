export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const {
      keyword = "",
      location = "",
      radius = 2000,
    } = req.body || {};

    if (!location.trim()) {
      return res.status(400).json({
        success: false,
        message: "Location is required.",
      });
    }

    // STEP 1 : Convert City → Coordinates

    const geoUrl =
      `https://nominatim.openstreetmap.org/search?` +
      new URLSearchParams({
        q: location,
        format: "jsonv2",
        limit: "1",
      });

    const geoResponse = await fetch(geoUrl, {
      headers: {
        "User-Agent": "Retivio Customer Finder",
      },
    });

    if (!geoResponse.ok) {
      throw new Error("Unable to find location.");
    }

    const geoData = await geoResponse.json();

    if (!geoData.length) {
      return res.status(404).json({
        success: false,
        message: "Location not found.",
      });
    }

    const latitude = Number(geoData[0].lat);
    const longitude = Number(geoData[0].lon);

    // STEP 2 : Return coordinates
    // Overpass search Part 2 me add karenge

    return res.status(200).json({
      success: true,
      location: {
        name: geoData[0].display_name,
        latitude,
        longitude,
      },
      businesses: [],
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
}
