const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

export async function searchBusinesses({
  keyword,
  location,
  country,
  category,
}) {
  if (!location?.trim()) {
    throw new Error("Please select a city.");
  }

  const geoUrl =
    `${NOMINATIM_URL}?` +
    new URLSearchParams({
      q: `${location}, ${country}`,
      countrycodes: country.toLowerCase(),
      format: "jsonv2",
      limit: "1",
    });

  const geoResponse = await fetch(geoUrl);

  if (!geoResponse.ok) {
    throw new Error("Unable to find selected city.");
  }

  const geoData = await geoResponse.json();

  if (!geoData.length) {
    throw new Error("Selected city could not be located.");
  }

  const lat = Number(geoData[0].lat);
  const lon = Number(geoData[0].lon);

  const marketRadius = 30000;

  const categoryQueries = {
    Salon: `
      nwr["shop"="hairdresser"](around:${marketRadius},${lat},${lon});
      nwr["shop"="beauty"](around:${marketRadius},${lat},${lon});
    `,
    Spa: `
      nwr["leisure"="spa"](around:${marketRadius},${lat},${lon});
    `,
    Barber: `
      nwr["shop"="hairdresser"](around:${marketRadius},${lat},${lon});
    `,
    "Beauty Parlour": `
      nwr["shop"="beauty"](around:${marketRadius},${lat},${lon});
    `,
    "Hair Studio": `
      nwr["shop"="hairdresser"](around:${marketRadius},${lat},${lon});
    `,
    "Nail Studio": `
      nwr["shop"="beauty"]["beauty"="nails"](around:${marketRadius},${lat},${lon});
    `,
    Gym: `
      nwr["leisure"="fitness_centre"](around:${marketRadius},${lat},${lon});
    `,
    "Yoga Studio": `
      nwr["sport"="yoga"](around:${marketRadius},${lat},${lon});
    `,
    Hotel: `
      nwr["tourism"="hotel"](around:${marketRadius},${lat},${lon});
    `,
    Cafe: `
      nwr["amenity"="cafe"](around:${marketRadius},${lat},${lon});
    `,
    Restaurant: `
      nwr["amenity"="restaurant"](around:${marketRadius},${lat},${lon});
    `,
    Boutique: `
      nwr["shop"="clothes"](around:${marketRadius},${lat},${lon});
    `,
  };

  const query = `
[out:json][timeout:40];
(
${categoryQueries[category] || categoryQueries.Salon}
);
out center tags;
`;

  const response = await fetch(OVERPASS_URL, {
    method: "POST",
    body: new URLSearchParams({ data: query }),
  });

  if (!response.ok) {
    throw new Error("Lead source is temporarily busy. Please try again.");
  }

  const data = await response.json();

  const businesses = data.elements
    .filter((item) => item.tags?.name)
    .map((item) => {
      const tags = item.tags || {};

      const address = [
        tags["addr:housenumber"],
        tags["addr:street"],
        tags["addr:city"],
        tags["addr:postcode"],
      ]
        .filter(Boolean)
        .join(", ");

      return {
        id: `${item.type}-${item.id}`,
        name: tags.name,
        category:
          tags.shop ||
          tags.amenity ||
          tags.leisure ||
          tags.tourism ||
          "Business",
        phone:
          tags.phone ||
          tags["contact:phone"] ||
          "",

        email:
          tags.email ||
          tags["contact:email"] ||
          "",
        website:
          tags.website ||
          tags["contact:website"] ||
          "",
        address,
        latitude: item.lat || item.center?.lat,
        longitude: item.lon || item.center?.lon,
      };
    });

  const searchKeyword = keyword?.trim().toLowerCase();

  const filteredBusinesses = searchKeyword
    ? businesses.filter((business) =>
        business.name.toLowerCase().includes(searchKeyword)
      )
    : businesses;

  return {
    businesses: filteredBusinesses,
    market: geoData[0].display_name,
  };
}
