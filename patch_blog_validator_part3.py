from pathlib import Path

path = Path("scripts/validate-blog-seo.js")

if not path.exists():
    print("❌ scripts/validate-blog-seo.js not found.")
    raise SystemExit(1)

text = path.read_text(encoding="utf-8")

if "Advanced SEO Checks" in text:
    print("✅ Part 3 already installed.")
    raise SystemExit(0)

marker = 'console.log("");\nconsole.log("✅ All blogs passed SEO validation.");'

if marker not in text:
    print("❌ Unable to locate insertion point.")
    raise SystemExit(1)

advanced = r'''

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

'''

text = text.replace(marker, advanced + "\n" + marker)

path.write_text(text, encoding="utf-8")

print("✅ Blog Validator Part 3 installed successfully.")
