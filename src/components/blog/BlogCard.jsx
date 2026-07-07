import { Link } from "react-router-dom";

export default function BlogCard({ post }) {
  return (
<Link
  to={`/blog/${post.slug}`}
  className="block bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
>

      <img
        src={post.image}
        alt={post.title}
        className="w-full h-52 object-cover"
loading="lazy"
decoding="async"
      />

      <div className="p-6">

        <p className="text-purple-600 text-sm font-semibold">
          {post.category} • {post.readTime}
        </p>

        <h3 className="text-xl font-bold mt-3">
          {post.title}
        </h3>

        <p className="text-gray-600 mt-3">
          {post.excerpt}
        </p>

        <button className="mt-6 text-purple-600 font-semibold">
          Read More →
        </button>

      </div>

</Link>
  );
}
