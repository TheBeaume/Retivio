from pathlib import Path

file_path = Path("src/data/blogData.js")

content = file_path.read_text(encoding="utf-8")

old_image = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200"

new_images = [
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200",
    "https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?w=1200"
]

for img in new_images:
    content = content.replace(old_image, img, 1)

file_path.write_text(content, encoding="utf-8")

print("✅ Blog images updated successfully.")
