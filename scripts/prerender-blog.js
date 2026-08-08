const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BLOG_DATA_FILE = path.join(
  ROOT,
  "src",
  "data",
  "blogData.js"
);
const BUILD_INDEX = path.join(
  ROOT,
  "build",
  "index.html"
);
const SITE_URL = "https://www.retivio.in";

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(value = "") {
  return escapeHtml(value);
}

/*
 * blogData.js imports individual blog modules.
 * Instead of trying to execute browser/ES-module code in Node,
 * extract the blog objects from the source files and evaluate
 * only their exported object literals.
 */

function loadBlogData() {
  const source = fs.readFileSync(
    BLOG_DATA_FILE,
    "utf8"
  );

  const importedBlogs = {};

  /*
   * Read every:
   * import name from "./blogs/file";
   */
  const importRegex =
    /import\s+(\w+)\s+from\s+["'](\.\/blogs\/[^"']+)["']\s*;?/g;

  let match;

  while ((match = importRegex.exec(source)) !== null) {
    const variableName = match[1];
    const importPath = match[2];

    let filePath = path.resolve(
      path.dirname(BLOG_DATA_FILE),
      importPath
    );

    if (!path.extname(filePath)) {
      filePath += ".js";
    }

    if (!fs.existsSync(filePath)) {
      throw new Error(
        `Blog module not found: ${filePath}`
      );
    }

    let blogSource = fs.readFileSync(
      filePath,
      "utf8"
    );

    /*
     * Current blog files are:
     *
     * const blogName = "...";
     * export default blogName;
     *
     * Remove export and return the declared variable.
     */
    const exportRegex = new RegExp(
      `export\\s+default\\s+${variableName}\\s*;?\\s*$`
    );

    if (!exportRegex.test(blogSource)) {
      throw new Error(
        `Unsupported blog module format: ${filePath}`
      );
    }

    blogSource = blogSource.replace(
      exportRegex,
      `return ${variableName};`
    );

    try {
      importedBlogs[variableName] =
        Function(
          `"use strict";\n${blogSource}`
        )();
    } catch (error) {
      throw new Error(
        `Unable to read blog module ${filePath}: ${error.message}`
      );
    }
  }

  /*
   * Remove ALL ES-module import statements from
   * blogData.js before evaluating it.
   *
   * This is intentionally line-based because the imports
   * are one-per-line in the current file.
   */
  let executableSource = source
    .split("\n")
    .filter(
      (line) =>
        !line.trim().startsWith("import ")
    )
    .join("\n");

  /*
   * Replace imported content variables with their
   * actual article strings.
   */
  for (const [name, value] of Object.entries(
    importedBlogs
  )) {
    executableSource = executableSource.replace(
      new RegExp(`\\b${name}\\b`, "g"),
      JSON.stringify(value)
    );
  }

  /*
   * Convert:
   *
   * export default blogData;
   *
   * into:
   *
   * return blogData;
   */
  executableSource = executableSource.replace(
    /export\s+default\s+blogData\s*;?\s*$/m,
    "return blogData;"
  );

  /*
   * Safety check: no ES imports should remain.
   */
  if (/^\s*import\s+/m.test(executableSource)) {
    throw new Error(
      "ES-module import remained in blogData.js after preprocessing."
    );
  }

  try {
    const blogs = Function(
      `"use strict";\n${executableSource}`
    )();

    if (!Array.isArray(blogs)) {
      throw new Error(
        "blogData.js did not resolve to an array."
      );
    }

    return blogs;
  } catch (error) {
    throw new Error(
      `Unable to resolve blogData.js: ${error.message}`
    );
  }
}

function renderMarkdown(content = "") {
  return String(content)
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("### ")) {
        return `<h3>${escapeHtml(
          block.slice(4).trim()
        )}</h3>`;
      }

      if (block.startsWith("## ")) {
        return `<h2>${escapeHtml(
          block.slice(3).trim()
        )}</h2>`;
      }

      if (block.startsWith("# ")) {
        return "";
      }

      return `<p>${escapeHtml(block).replace(
        /\n/g,
        "<br />"
      )}</p>`;
    })
    .filter(Boolean)
    .join("\n");
}

function buildArticleHtml(post) {
  const image =
    post.image ||
    `${SITE_URL}/og-image.jpg`;

  const author =
    post.author ||
    "Retivio Team";

  return `
    <article>
      <nav aria-label="Breadcrumb">
        <a href="/">Home</a> /
        <a href="/blog">Blog</a> /
        <span>${escapeHtml(post.title)}</span>
      </nav>

      <header>
        <p>${escapeHtml(
          post.category || "Insights"
        )}</p>

        <h1>${escapeHtml(post.title)}</h1>

        <p>${escapeHtml(
          post.excerpt || ""
        )}</p>

        <div>
          <span>By ${escapeHtml(author)}</span>
          ${
            post.publishedAt
              ? `<time datetime="${escapeAttr(
                  post.publishedAt
                )}">${escapeHtml(
                  post.publishedAt
                )}</time>`
              : ""
          }
          ${
            post.readTime
              ? `<span>${escapeHtml(
                  post.readTime
                )}</span>`
              : ""
          }
        </div>
      </header>

      <figure>
        <img
          src="${escapeAttr(image)}"
          alt="${escapeAttr(post.title)}"
        />
      </figure>

      <section>
        ${renderMarkdown(post.content)}
      </section>

      <footer>
        <a href="/blog">
          Back to Retivio Insights
        </a>
      </footer>
    </article>
  `;
}

function createStaticPage(template, post) {
  const title =
    post.metaTitle ||
    `${post.title} | Retivio Insights`;

  const description =
    post.metaDescription ||
    post.excerpt ||
    "";

  const canonical =
    `${SITE_URL}/blog/${post.slug}`;

  const image =
    post.image ||
    `${SITE_URL}/og-image.jpg`;

  const keywords = Array.isArray(post.keywords)
    ? post.keywords.join(", ")
    : "";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description,
    image,
    author: {
      "@type": "Person",
      name: post.author || "Retivio Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Retivio",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo512.png`,
      },
    },
    mainEntityOfPage: canonical,
  };

  if (post.publishedAt) {
    articleSchema.datePublished =
      post.publishedAt;
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonical,
      },
    ],
  };

  let html = template;

  html = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(
      title
    )}</title>`
  );

  html = html.replace(
    /<meta\s+name=["']description["'][^>]*>/i,
    `<meta name="description" content="${escapeAttr(
      description
    )}" />`
  );

  html = html.replace(
    /<meta\s+name=["']keywords["'][^>]*>/i,
    `<meta name="keywords" content="${escapeAttr(
      keywords
    )}" />`
  );

  /*
   * Remove the generic homepage canonical if one exists.
   * Then add exactly ONE blog canonical.
   */
  html = html.replace(
    /<link\s+rel=["']canonical["'][^>]*>\s*/gi,
    ""
  );

  const seoHead = `
    <meta name="robots" content="index,follow,max-image-preview:large" />

    <meta property="og:site_name" content="Retivio" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${escapeAttr(
      title
    )}" />
    <meta property="og:description" content="${escapeAttr(
      description
    )}" />
    <meta property="og:url" content="${escapeAttr(
      canonical
    )}" />
    <meta property="og:image" content="${escapeAttr(
      image
    )}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(
      title
    )}" />
    <meta name="twitter:description" content="${escapeAttr(
      description
    )}" />
    <meta name="twitter:image" content="${escapeAttr(
      image
    )}" />

    <link rel="canonical" href="${escapeAttr(
      canonical
    )}" />

    <script type="application/ld+json">${JSON.stringify(
      articleSchema
    )}</script>

    <script type="application/ld+json">${JSON.stringify(
      breadcrumbSchema
    )}</script>
  `;

  html = html.replace(
    /<\/head>/i,
    `${seoHead}\n</head>`
  );

  /*
   * Keep React root intact. The actual React application
   * will hydrate/render over this content in the browser.
   */
  html = html.replace(
    /<div id=["']root["']>\s*<\/div>/i,
    `<div id="root">${buildArticleHtml(
      post
    )}</div>`
  );

  return html;
}

function main() {
  if (!fs.existsSync(BUILD_INDEX)) {
    throw new Error(
      "build/index.html not found. Run npm run build first."
    );
  }

  const posts = loadBlogData();

  const template = fs.readFileSync(
    BUILD_INDEX,
    "utf8"
  );

  let count = 0;

  for (const post of posts) {
    if (!post?.slug || !post?.title) {
      continue;
    }

    const outputDir = path.join(
      ROOT,
      "build",
      "blog",
      post.slug
    );

    fs.mkdirSync(outputDir, {
      recursive: true,
    });

    const outputFile = path.join(
      outputDir,
      "index.html"
    );

    fs.writeFileSync(
      outputFile,
      createStaticPage(template, post),
      "utf8"
    );

    count += 1;
    console.log(
      `  ✓ /blog/${post.slug}`
    );
  }

  console.log(
    `\n✅ Blog prerender complete: ${count} pages generated.`
  );
}

main();
