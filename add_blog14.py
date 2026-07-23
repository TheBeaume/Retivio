from pathlib import Path

file = Path("src/data/blogData.js")
content = file.read_text(encoding="utf-8")

# Add import
import_line = 'import googleBusinessProfileGuide from "./blogs/googleBusinessProfileGuide";\n'

if import_line.strip() not in content:
    marker = 'import websiteVsSocialMedia from "./blogs/websiteVsSocialMedia";\n'
    if marker in content:
        content = content.replace(marker, marker + import_line)

# Add blog object
blog_object = '''
,
  {
    id: 14,
    title: "Why Google Business Profile Matters More Than Ever",
    slug: "why-google-business-profile-matters",
    category: "Website Growth",
    excerpt: "Discover why Google Business Profile has become one of the most important marketing tools for local businesses and learn practical ways to improve your visibility in Google Search and Google Maps.",
    content: googleBusinessProfileGuide,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
    author: "Retivio Team",
    metaTitle: "Why Google Business Profile Matters More Than Ever | Retivio",
    metaDescription: "Learn how Google Business Profile helps local businesses improve visibility, build trust and attract more customers through Google Search and Google Maps.",
    keywords: [
      "Google Business Profile",
      "Google Maps",
      "local SEO",
      "small business marketing",
      "Google Business",
      "Retivio"
    ],
    featured: false,
    publishedAt: "2026-07-23",
    updatedAt: "2026-07-23",
    readTime: "16 min read"
  }
'''

marker = '\n];\n\nexport default blogData;'

if blog_object.strip() not in content:
    content = content.replace(marker, blog_object + marker)

file.write_text(content, encoding="utf-8")

print("✅ Blog #14 added successfully.")
