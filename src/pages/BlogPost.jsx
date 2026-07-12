import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  UserRound,
} from "lucide-react";
import blogData from "../data/blogData";
import SEO from "../components/SEO";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogData.find((blog) => blog.slug === slug);

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-5">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-slate-950">
              Article not found
            </h1>
            <Link
              to="/blog"
              className="mt-6 inline-flex items-center gap-2 font-bold text-purple-700"
            >
              <ArrowLeft size={18} />
              Back to insights
            </Link>
          </div>
        </main>
        <Footer />
      </>
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
      name: post.author || "Retivio Team",
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
        title={post.metaTitle || `${post.title} | Retivio Insights`}
        description={post.metaDescription || post.excerpt}
        canonical={`/blog/${post.slug}`}
        keywords={post.keywords?.join(", ")}
        jsonLd={articleSchema}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />

      <Navbar />

      <main className="bg-white">
        <article>
          <header className="border-b border-slate-200 bg-slate-50">
            <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-20">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold text-purple-700"
              >
                <ArrowLeft size={16} />
                Retivio Insights
              </Link>

              <div className="mt-8">
                <span className="rounded-full bg-purple-100 px-3 py-1.5 text-sm font-bold text-purple-700">
                  {post.category}
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>

              <p className="mt-6 text-xl leading-8 text-slate-600">
                {post.excerpt}
              </p>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <UserRound size={16} />
                  {post.author || "Retivio Team"}
                </span>

                {post.publishedAt && (
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays size={16} />
                    {post.publishedAt}
                  </span>
                )}

                <span className="inline-flex items-center gap-2">
                  <Clock3 size={16} />
                  {post.readTime}
                </span>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-5 pt-10 sm:px-6">
            <img
              src={post.image}
              alt={post.title}
              className="h-[280px] w-full rounded-3xl object-cover shadow-xl sm:h-[440px]"
            />
          </div>

          <div className="mx-auto max-w-3xl px-5 py-12 sm:px-6 sm:py-16">
            <div className="text-[17px] leading-8 text-slate-700">
              {post.content ? (
                post.content
                  .split("\n\n")
                  .filter(Boolean)
                  .map((block, index) => {
                    const text = block.trim();

                    if (text.startsWith("# ")) {
                      return null;
                    }

                    if (text.startsWith("## ")) {
                      return (
                        <h2
                          key={index}
                          className="mb-5 mt-14 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 first:mt-0"
                        >
                          {text.slice(3)}
                        </h2>
                      );
                    }

                    if (text.startsWith("### ")) {
                      return (
                        <h3
                          key={index}
                          className="mb-4 mt-9 text-xl font-bold leading-8 text-slate-950"
                        >
                          {text.slice(4)}
                        </h3>
                      );
                    }

                    return (
                      <p
                        key={index}
                        className="mb-7 leading-8 text-slate-700"
                      >
                        {text}
                      </p>
                    );
                  })
              ) : (
                <p>
                  More practical guidance on this topic is being prepared by
                  the Retivio team.
                </p>
              )}
            </div>

            <div className="mt-14 rounded-3xl bg-purple-50 p-7 ring-1 ring-purple-100 sm:p-9">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-purple-700">
                Built for salons
              </p>
              <h2 className="mt-3 text-2xl font-extrabold text-slate-950">
                Turn better salon thinking into better daily operations.
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Retivio connects customers, appointments, follow-ups,
                billing and growth tools in one salon workspace.
              </p>

              <Link
                to="/signup"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-700 px-5 py-3 font-bold text-white transition hover:bg-purple-800"
              >
                Start free
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-extrabold text-slate-950">
                Continue reading
              </h2>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {relatedPosts.map((blog) => (
                  <Link
                    key={blog.id}
                    to={`/blog/${blog.slug}`}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <img
                      src={blog.image}
                      alt={blog.title}
                      loading="lazy"
                      className="h-44 w-full object-cover"
                    />

                    <div className="p-5">
                      <p className="text-xs font-bold text-purple-700">
                        {blog.category}
                      </p>
                      <h3 className="mt-3 font-bold leading-6 text-slate-950">
                        {blog.title}
                      </h3>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-purple-700">
                        Read article
                        <ArrowRight size={15} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
