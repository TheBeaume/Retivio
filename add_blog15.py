from pathlib import Path

file = Path("src/data/blogData.js")
content = file.read_text(encoding="utf-8")

import_line = 'import customerReviewsBuyingDecisions from "./blogs/customerReviewsBuyingDecisions";\n'

if import_line.strip() not in content:
    marker = 'import googleBusinessProfileGuide from "./blogs/googleBusinessProfileGuide";\n'
    if marker in content:
        content = content.replace(marker, marker + import_line)

blog_object = '''
,
  {
    id: 15,
    title: "How Customer Reviews Influence Buying Decisions and Local SEO",
    slug: "customer-reviews-buying-decisions-local-seo",
    category: "Marketing",
    excerpt: "Learn how customer reviews influence trust, purchasing decisions and local SEO, and discover practical strategies to build a stronger online reputation.",
    content: customerReviewsBuyingDecisions,
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200",
    author: "Retivio Team",
    metaTitle: "How Customer Reviews Influence Buying Decisions and Local SEO | Retivio",
    metaDescription: "Discover how customer reviews build trust, improve local SEO and influence buying decisions. Learn practical review management strategies for small businesses.",
    keywords: [
      "customer reviews",
      "Google reviews",
      "local SEO",
      "online reputation",
      "small business marketing",
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

print("✅ Blog #15 added successfully.")
