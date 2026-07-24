from pathlib import Path

file = Path("src/data/blogData.js")
content = file.read_text(encoding="utf-8")

import_line = 'import getMoreCustomersWithoutAds from "./blogs/getMoreCustomersWithoutAds";\n'

if import_line.strip() not in content:
    marker = 'import commonWebsiteMistakes from "./blogs/commonWebsiteMistakes";\n'
    if marker in content:
        content = content.replace(marker, marker + import_line)

blog_object = '''
,
  {
    id: 17,
    title: "How to Get More Customers from Your Website Without Spending on Ads",
    slug: "get-more-customers-from-your-website-without-ads",
    category: "Website Growth",
    excerpt: "Discover practical strategies to generate more website enquiries without relying entirely on paid advertising. Learn how content, SEO, trust and customer experience work together to drive sustainable business growth.",
    content: getMoreCustomersWithoutAds,
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1200",
    author: "Retivio Team",
    metaTitle: "How to Get More Customers from Your Website Without Spending on Ads | Retivio",
    metaDescription: "Learn how to generate more customers from your website using SEO, helpful content, customer trust and Local SEO instead of depending only on paid ads.",
    keywords: [
      "website lead generation",
      "get more website customers",
      "SEO",
      "small business website",
      "website conversion",
      "Retivio"
    ],
    featured: false,
    publishedAt: "2026-07-23",
    updatedAt: "2026-07-23",
    readTime: "18 min read"
  }
'''

marker = '\n];\n\nexport default blogData;'

if blog_object.strip() not in content:
    content = content.replace(marker, blog_object + marker)

file.write_text(content, encoding="utf-8")

print("✅ Blog #17 added successfully.")
