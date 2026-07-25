from pathlib import Path

file = Path("src/data/blogData.js")
content = file.read_text(encoding="utf-8")

import_line = 'import whyEveryBusinessNeedsABlog from "./blogs/whyEveryBusinessNeedsABlog";\n'

if import_line.strip() not in content:
    marker = 'import getMoreCustomersWithoutAds from "./blogs/getMoreCustomersWithoutAds";\n'
    if marker in content:
        content = content.replace(marker, marker + import_line)

blog_object = '''
,
  {
    id: 18,
    title: "Why Every Small Business Needs a Blog (Even If You Don't Like Writing)",
    slug: "why-every-small-business-needs-a-blog",
    category: "Content Marketing",
    excerpt: "Discover why blogging remains one of the most powerful ways for small businesses to improve SEO, attract customers and build long-term trust.",
    content: whyEveryBusinessNeedsABlog,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200",
    author: "Retivio Team",
    metaTitle: "Why Every Small Business Needs a Blog | Retivio",
    metaDescription: "Learn how blogging helps small businesses improve SEO, attract customers and build authority without relying only on paid advertising.",
    keywords: [
      "small business blog",
      "business blogging",
      "SEO blogging",
      "content marketing",
      "Retivio"
    ],
    featured: false,
    publishedAt: "2026-07-25",
    updatedAt: "2026-07-25",
    readTime: "17 min read"
  }
'''

marker = '\n];\n\nexport default blogData;'

if blog_object.strip() not in content:
    content = content.replace(marker, blog_object + marker)

file.write_text(content, encoding="utf-8")
print("✅ Blog #18 added successfully.")
