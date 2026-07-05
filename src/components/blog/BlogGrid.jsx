import blogData from "../../data/blogData";
import BlogCard from "./BlogCard";

export default function BlogGrid() {
  return (
    <section className="mb-20">

      <h2 className="text-3xl font-bold mb-8">
        Latest Articles
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {blogData.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
          />
        ))}

      </div>

    </section>
  );
}
