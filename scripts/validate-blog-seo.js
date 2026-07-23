const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "src", "data", "blogData.js");

const source = fs.readFileSync(file, "utf8");

const blogs = source.split(/\n\s*{\s*\n/).slice(1);

let failed = false;

function check(regex, text) {
  return regex.test(text);
}

console.log("");
console.log("🔍 Retivio Blog SEO Validator");
console.log("--------------------------------");

blogs.forEach((blog, index) => {
  const errors = [];

  if (!check(/title:\s*"/, blog))
    errors.push("Missing Title");

  if (!check(/slug:\s*"/, blog))
    errors.push("Missing Slug");

  if (!check(/metaTitle:\s*"/, blog))
    errors.push("Missing Meta Title");

  if (!check(/metaDescription:\s*"/, blog))
    errors.push("Missing Meta Description");

  if (!check(/keywords:\s*\[/, blog))
    errors.push("Missing Keywords");

  if (!check(/image:\s*"/, blog))
    errors.push("Missing Image");

  if (!check(/author:\s*"/, blog))
    errors.push("Missing Author");

  if (!check(/publishedAt:\s*"/, blog))
    errors.push("Missing Published Date");

  if (!check(/updatedAt:\s*"/, blog))
    errors.push("Missing Updated Date");

  if (!check(/readTime:\s*"/, blog))
    errors.push("Missing Read Time");

  const title =
    blog.match(/title:\s*"([^"]+)"/)?.[1] ||
    `Blog ${index + 1}`;

  if (errors.length) {
    failed = true;

    console.log("");
    console.log("❌", title);

    errors.forEach((e) =>
      console.log("   •", e)
    );
  } else {
    console.log("✅", title);
  }
});

console.log("--------------------------------");

if (failed) {
  console.log("");
  console.log("❌ SEO validation failed.");
  process.exit(1);
}



// -------------------------------
// Advanced SEO Checks
// -------------------------------

const slugs = [];
const ids = [];
const titles = [];

console.log("");
console.log("📊 Advanced SEO Checks");
console.log("--------------------------------");

blogs.forEach((blog) => {

  const slug =
    blog.match(/slug:\s*"([^"]+)"/)?.[1];

  const id =
    blog.match(/id:\s*(\d+)/)?.[1];

  const title =
    blog.match(/title:\s*"([^"]+)"/)?.[1] ||
    "Untitled";

  const metaTitle =
    blog.match(/metaTitle:\s*"([^"]+)"/)?.[1] ||
    "";

  const metaDescription =
    blog.match(/metaDescription:\s*"([^"]+)"/)?.[1] ||
    "";

  const keywordMatch =
    blog.match(/keywords:\s*\[(.*?)\]/s);

  const keywordCount =
    keywordMatch
      ? keywordMatch[1]
          .split(",")
          .filter(Boolean).length
      : 0;

  if (slug) {
    if (slugs.includes(slug)) {
      console.log("❌ Duplicate Slug:", slug);
      failed = true;
    } else {
      slugs.push(slug);
    }
  }

  if (id) {
    if (ids.includes(id)) {
      console.log("❌ Duplicate ID:", id);
      failed = true;
    } else {
      ids.push(id);
    }
  }

  if (title) {
    if (titles.includes(title)) {
      console.log("⚠ Duplicate Title:", title);
    } else {
      titles.push(title);
    }
  }

  if (metaTitle.length > 60) {
    console.log(
      `⚠ ${title}: Meta title ${metaTitle.length} characters`
    );
  }

  if (metaDescription.length > 160) {
    console.log(
      `⚠ ${title}: Meta description ${metaDescription.length} characters`
    );
  }

  if (keywordCount < 3) {
    console.log(
      `⚠ ${title}: Less than 3 keywords`
    );
  }

  if (!blog.includes("## Frequently asked questions")) {
    console.log(
      `⚠ ${title}: FAQ section missing`
    );
  }

  if (
    !blog.includes("Retivio") &&
    !blog.includes("Explore") &&
    !blog.includes("Try")
  ) {
    console.log(
      `⚠ ${title}: CTA missing`
    );
  }

});

console.log("--------------------------------");


console.log("");
console.log("✅ All blogs passed SEO validation.");
