from pathlib import Path

file = Path("src/pages/BlogPost.jsx")
content = file.read_text(encoding="utf-8")

main_old = '''<img
              src={post.image}
              alt={post.title}
              className="h-[280px] w-full rounded-3xl object-cover shadow-xl sm:h-[440px]"
            />'''

main_new = '''<img
              src={post.image}
              alt={post.title}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200";
              }}
              className="h-[280px] w-full rounded-3xl object-cover shadow-xl sm:h-[440px]"
            />'''

related_old = '''<img
                      src={blog.image}
                      alt={blog.title}
                      loading="lazy"
                      className="h-44 w-full object-cover"
                    />'''

related_new = '''<img
                      src={blog.image}
                      alt={blog.title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200";
                      }}
                      className="h-44 w-full object-cover"
                    />'''

content = content.replace(main_old, main_new)
content = content.replace(related_old, related_new)

file.write_text(content, encoding="utf-8")

print("✅ BlogPost.jsx updated successfully.")
