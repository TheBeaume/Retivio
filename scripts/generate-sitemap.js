const fs = require("fs");
const path = require("path");

const blogDataPath = path.join(__dirname, "..", "src", "data", "blogData.js");
const sitemapPath = path.join(__dirname, "..", "public", "sitemap.xml");

const source = fs.readFileSync(blogDataPath, "utf8");

const slugRegex = /slug:\s*"([^"]+)"/g;
const dateRegex = /publishedAt:\s*"([^"]+)"/g;

const slugs = [];
const dates = [];

let match;

while ((match = slugRegex.exec(source)) !== null) {
  slugs.push(match[1]);
}

while ((match = dateRegex.exec(source)) !== null) {
  dates.push(match[1]);
}

const staticPages = [
  { url: "", priority: "1.0", changefreq: "weekly" },
  { url: "features", priority: "0.9", changefreq: "monthly" },
  { url: "templates", priority: "0.9", changefreq: "weekly" },
  { url: "website-builder", priority: "0.9", changefreq: "weekly" },
  { url: "templates/aurelia", priority: "0.9", changefreq: "weekly" },
  { url: "blog", priority: "0.8", changefreq: "weekly" },
  { url: "about", priority: "0.7", changefreq: "yearly" },
  { url: "contact", priority: "0.7", changefreq: "monthly" },
  { url: "privacy-policy", priority: "0.4", changefreq: "yearly" },
  { url: "terms", priority: "0.4", changefreq: "yearly" },
  { url: "refund-policy", priority: "0.4", changefreq: "yearly" },
  { url: "login", priority: "0.3", changefreq: "monthly" },
  { url: "signup", priority: "0.5", changefreq: "monthly" }
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n`;

for (const page of staticPages) {
  xml += `  <url>\n`;
  xml += `    <loc>https://retivio.in/${page.url}</loc>\n`;
  xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  xml += `    <priority>${page.priority}</priority>\n`;
  xml += `  </url>\n\n`;
}

slugs.forEach((slug, index) => {
  xml += `  <url>\n`;
  xml += `    <loc>https://retivio.in/blog/${slug}</loc>\n`;
  xml += `    <lastmod>${dates[index] || "2026-07-23"}</lastmod>\n`;
  xml += `  </url>\n`;
});

xml += `</urlset>\n`;

fs.writeFileSync(sitemapPath, xml);

console.log(`✅ Sitemap updated with ${slugs.length} blogs.`);
