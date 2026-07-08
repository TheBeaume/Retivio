const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

export async function searchBusinesses({
  keyword,
  location,
  category,
  radius
}) {
  if (!location.trim()) {
    throw new Error("Please enter a city.");
  }

  const geoUrl =
    `${NOMINATIM_URL}?` +
    new URLSearchParams({
      q: location,
      format: "jsonv2",
      limit: "1",
    });

  const geoResponse = await fetch(geoUrl);

  if (!geoResponse.ok) {
    throw new Error("Unable to find location.");
  }

  const geoData = await geoResponse.json();

  if (!geoData.length) {
    throw new Error("Location not found.");
  }

  const lat = geoData[0].lat;
  const lon = geoData[0].lon;

const categoryQueries = {
  "Salon": `
    node["shop"="hairdresser"](around:${radius},${lat},${lon});
    node["shop"="beauty"](around:${radius},${lat},${lon});
  `,

  "Spa": `
    node["leisure"="spa"](around:${radius},${lat},${lon});
  `,

  "Barber": `
    node["shop"="hairdresser"](around:${radius},${lat},${lon});
  `,

  "Beauty Parlour": `
    node["shop"="beauty"](around:${radius},${lat},${lon});
  `,

  "Gym": `
    node["leisure"="fitness_centre"](around:${radius},${lat},${lon});
    node["sport"="fitness"](around:${radius},${lat},${lon});
  `,

  "Yoga Studio": `
    node["sport"="yoga"](around:${radius},${lat},${lon});
  `,

  "Hotel": `
    node["tourism"="hotel"](around:${radius},${lat},${lon});
  `,

  "Cafe": `
    node["amenity"="cafe"](around:${radius},${lat},${lon});
  `,

  "Restaurant": `
    node["amenity"="restaurant"](around:${radius},${lat},${lon});
  `,

  "Corporate Office": `
    node["office"](around:${radius},${lat},${lon});
  `,

  "College": `
    node["amenity"="college"](around:${radius},${lat},${lon});
  `,

  "School": `
    node["amenity"="school"](around:${radius},${lat},${lon});
  `,

  "Boutique": `
    node["shop"="clothes"](around:${radius},${lat},${lon});
  `
};

const query = `
[out:json][timeout:25];
(
${categoryQueries[category] || categoryQueries["Salon"]}
);
out body;
`;
  const response = await fetch(
    "https://overpass-api.de/api/interpreter",
    {
      method: "POST",
      body: query,
    }
  );

  if (!response.ok) {
    throw new Error("Unable to fetch businesses.");
  }

  const data = await response.json();

  const businesses = data.elements
    .filter((item) => item.tags?.name)
    .map((item) => ({
      id: item.id,
      name: item.tags.name,
      category:
        item.tags.shop ||
        item.tags.amenity ||
        item.tags.office ||
        "Business",
      phone: item.tags.phone || "",
      website: item.tags.website || "",
      address:
        item.tags["addr:street"] ||
        item.tags["addr:full"] ||
        "",
      lat: item.lat,
      lon: item.lon,
    }));

  return {
    businesses,
  };
}
