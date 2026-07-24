from pathlib import Path

file = Path("src/data/blogData.js")
content = file.read_text(encoding="utf-8")

import_line = 'import commonWebsiteMistakes from "./blogs/commonWebsiteMistakes";\n'

if import_line.strip() not in content:
    marker = 'import customerReviewsBuyingDecisions from "./blogs/customerReviewsBuyingDecisions";\n'
    if marker in content:
        content = content.replace(marker, marker + import_line)

blog_object = '''
,
  {
    id: 16,
    title: "Common Website Mistakes That Cost Small Businesses Customers",
    slug: "common-website-mistakes-small-business",
    category: "Website Growth",
    excerpt: "Discover the most common website mistakes that reduce trust, hurt SEO and cost small businesses valuable customers, along with practical ways to fix them.",
    content: commonWebsiteMistakes,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200",
    author: "Retivio Team",
    metaTitle: "Common Website Mistakes That Cost Small Businesses Customers | Retivio",
    metaDescription: "Learn the most common website mistakes that hurt customer trust, SEO and conversions, and discover practical ways to improve your business website.",
    keywords: [
      "website mistakes",
      "small business website",
      "website SEO",
      "website conversion",
      "business website",
      "Retivio"
    ],
    featured: false,
    publishedAt: "2026-07-23",
    updatedAt: "2026-07-23",
    readTime: "17 min read"
  }
'''

marker = '\n];\n\nexport default blogData;'

if blog_object.strip() not in content:
    content = content.replace(marker, blog_object + marker)

file.write_text(content, encoding="utf-8")

print("✅ Blog #16 added successfully.")
