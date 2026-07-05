import Hero from "../components/blog/Hero";
import SearchBar from "../components/blog/SearchBar";
import CategoryTabs from "../components/blog/CategoryTabs";
import FeaturedPost from "../components/blog/FeaturedPost";
import BlogGrid from "../components/blog/BlogGrid";
import Newsletter from "../components/blog/Newsletter";
import CTASection from "../components/blog/CTASection";

export default function Blog() {
  return (
    <div className="min-h-screen bg-gray-50">

      <Hero />

      <div className="max-w-7xl mx-auto px-6 py-12">

        <SearchBar />

        <CategoryTabs />

        <FeaturedPost />

        <BlogGrid />

      </div>

      <Newsletter />

      <CTASection />

    </div>
  );
}
