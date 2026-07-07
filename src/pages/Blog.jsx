import Hero from "../components/blog/Hero";
import SearchBar from "../components/blog/SearchBar";
import CategoryTabs from "../components/blog/CategoryTabs";
import FeaturedPost from "../components/blog/FeaturedPost";
import BlogGrid from "../components/blog/BlogGrid";
import Newsletter from "../components/blog/Newsletter";
import CTASection from "../components/blog/CTASection";
import SEO from "../components/SEO";
export default function Blog() {

return (
  <>
    <SEO
      title="Salon CRM Blog | Retivio"
      description="Read expert articles on salon management, customer retention, WhatsApp marketing, AI automation, appointment management and business growth."
      canonical="/blog"
    />

    <div className="...">
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
</>
  );
}
