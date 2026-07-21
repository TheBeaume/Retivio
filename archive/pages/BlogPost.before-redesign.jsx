import { Link, useParams } from "react-router-dom";
import blogData from "../data/blogData";
import SEO from "../components/SEO";

export default function BlogPost() {
  const { slug } = useParams();

  const post = blogData.find((blog) => blog.slug === slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold">Blog not found</h1>
      </div>
    );
  }

  const relatedPosts = blogData
    .filter((blog) => blog.id !== post.id)
    .slice(0, 3);

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  description: post.excerpt,
  image: post.image,
  author: {
    "@type": "Person",
    name: post.author,
  },
  publisher: {
    "@type": "Organization",
    name: "Retivio",
    logo: {
      "@type": "ImageObject",
      url: "https://retivio.in/logo512.png",
    },
  },
  datePublished: post.publishedAt,
  mainEntityOfPage: `https://retivio.in/blog/${post.slug}`,
};
return (
  <>
<SEO
  title={`${post.title} | Retivio Blog`}
  description={post.excerpt}
  canonical={`/blog/${post.slug}`}
  jsonLd={articleSchema}
  breadcrumbs={[
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]}
/>
    <div className="max-w-4xl mx-auto px-6 py-12">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-80 object-cover rounded-2xl shadow-lg"
      />

      <div className="mt-8">
        <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
          {post.category}
        </span>

        <h1 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-4 text-gray-500 mt-4 text-sm">
          <span>👤 {post.author}</span>
          <span>📅 {post.publishedAt}</span>
          <span>⏱️ {post.readTime}</span>
        </div>

        <p className="text-xl text-gray-600 mt-6 leading-relaxed">
          {post.excerpt}
        </p>

        <hr className="my-8" />
<div className="prose prose-lg max-w-none">
  {post.content.split("\n\n").map((paragraph, index) => (
    <p key={index} className="mb-6 leading-8 text-gray-700">
      {paragraph}
    </p>
  ))}
</div>


        <div className="mt-12 bg-purple-50 rounded-2xl p-8 border border-purple-100">
          <h2 className="text-2xl font-bold text-purple-700">
            Ready to Grow Your Salon?
          </h2>

          <p className="text-gray-700 mt-3">
            Manage appointments, customers, WhatsApp reminders,
            reports and grow your salon with Retivio.
          </p>

          <Link
            to="/signup"
            className="inline-block mt-6 bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Start Free
          </Link>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">
            Related Articles
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.slug}`}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover"
                />

                <div className="p-5">
                  <p className="text-sm text-purple-600 font-semibold">
                    {blog.category}
                  </p>

                  <h3 className="font-bold mt-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2">
                    {blog.readTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
</>
  );
}           
