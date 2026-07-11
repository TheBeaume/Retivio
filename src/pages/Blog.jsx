import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Search,
  Clock3,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import SEO from "../components/SEO";
import blogData from "../data/blogData";

export default function Blog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(blogData.map((post) => post.category)),
  ];

  const featuredPost =
    blogData.find((post) => post.featured) || blogData[0];

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return blogData.filter((post) => {
      const matchesCategory =
        category === "All" || post.category === category;

      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <>
      <SEO
        title="Salon Growth Insights & Resources | Retivio"
        description="Practical salon growth insights on customer retention, salon management, AI, marketing and modern beauty business operations."
        canonical="/blog"
      />

      <Navbar />

      <main className="bg-white">
        <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 text-white">
          <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-purple-600/30 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-3.5 py-2 text-sm font-semibold text-purple-300">
                <BookOpen size={16} />
                Retivio Insights
              </div>

              <h1 className="mt-7 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Ideas for salons that want to
                <span className="text-purple-400"> operate better and grow.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
                Practical thinking on customer retention, salon operations,
                marketing, technology and the business behind the beauty.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="relative mx-auto max-w-2xl">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search salon growth articles..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-5 text-slate-900 shadow-sm outline-none transition focus:border-purple-400 focus:ring-4 focus:ring-purple-100"
              />
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    category === item
                      ? "bg-purple-700 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-purple-200 hover:text-purple-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {!search && category === "All" && featuredPost && (
              <div className="mt-14 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
                <div className="grid lg:grid-cols-2">
                  <div className="relative min-h-[320px] overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-950/25" />
                    <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-purple-700 shadow">
                      <Sparkles size={14} />
                      Featured insight
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-7 sm:p-10">
                    <p className="text-sm font-bold text-purple-700">
                      {featuredPost.category} · {featuredPost.readTime}
                    </p>

                    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                      {featuredPost.title}
                    </h2>

                    <p className="mt-5 leading-7 text-slate-600">
                      {featuredPost.excerpt}
                    </p>

                    <Link
                      to={`/blog/${featuredPost.slug}`}
                      className="mt-8 inline-flex w-fit items-center gap-2 font-bold text-purple-700 transition hover:gap-3"
                    >
                      Read article
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-16 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
                  Retivio Insights
                </p>
                <h2 className="mt-3 text-3xl font-extrabold text-slate-950">
                  {search || category !== "All"
                    ? "Search results"
                    : "Latest articles"}
                </h2>
              </div>

              <p className="text-sm text-slate-500">
                {filteredPosts.length} article
                {filteredPosts.length === 1 ? "" : "s"}
              </p>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl"
                  >
                    <div className="h-52 overflow-hidden bg-slate-100">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between gap-3 text-xs">
                        <span className="font-bold text-purple-700">
                          {post.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-slate-500">
                          <Clock3 size={14} />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-bold leading-7 text-slate-950">
                        {post.title}
                      </h3>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                        {post.excerpt}
                      </p>

                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-purple-700 transition group-hover:gap-3">
                        Read insight
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center">
                <Search size={30} className="mx-auto text-slate-400" />
                <h3 className="mt-5 text-xl font-bold text-slate-950">
                  No articles found
                </h3>
                <p className="mt-2 text-slate-600">
                  Try a different search or article category.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="bg-white px-5 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-slate-950 px-6 py-14 text-white sm:px-10 lg:px-14">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-400">
                  Put insight into action
                </p>
                <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
                  Build a more organised salon with Retivio.
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-slate-400">
                  Manage customers, appointments, follow-ups, billing and
                  growth from one connected salon platform.
                </p>
              </div>

              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3.5 font-bold text-white transition hover:bg-purple-500"
              >
                Start free
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
