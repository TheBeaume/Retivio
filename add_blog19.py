from pathlib import Path

file = Path("src/data/blogData.js")
content = file.read_text(encoding="utf-8")

import_line = 'import whyWebsiteSpeedMatters from "./blogs/whyWebsiteSpeedMatters";\n'

if import_line.strip() not in content:
    marker = 'import whyEveryBusinessNeedsABlog from "./blogs/whyEveryBusinessNeedsABlog";\n'
    if marker in content:
        content = content.replace(marker, marker + import_line)

blog_object = '''
,
  {
    id: 19,
    title: "Why Website Speed Matters: Every Second Can Cost You Customers",
    slug: "why-website-speed-matters",
    category: "Website Performance",
    excerpt: "Learn why website speed directly impacts SEO, customer experience and conversions, and discover practical ways to improve your site's performance.",
    content: whyWebsiteSpeedMatters,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
    author: "Retivio Team",
    metaTitle: "Why Website Speed Matters | Retivio",
    metaDescription: "Discover how website speed affects SEO, customer experience and business growth, along with practical tips to improve performance.",
    keywords: [
      "website speed",
      "website performance",
      "Core Web Vitals",
      "SEO",
      "Retivio"
    ],
    featured: false,
    publishedAt: "2026-07-25",
    updatedAt: "2026-07-25",
    readTime: "16 min read"
  }
'''

marker = '\n];\n\nexport default blogData;'

if blog_object.strip() not in content:
    content = content.replace(marker, blog_object + marker)

file.write_text(content, encoding="utf-8")
print("✅ Blog #19 added successfully.")
