import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import WebsiteBuilder from "../components/landing/WebsiteBuilder";
import SEO from "../components/SEO";

export default function WebsiteBuilderPage() {
  return (
    <>
      <SEO
        title="Salon Website Builder | Retivio"
        description="Build and preview your salon website online with Retivio Website Builder. Choose a style, add your business details and customize your website without coding."
        canonical="/website-builder"
      />

      <Navbar />

      <main>
        <WebsiteBuilder />
      </main>

      <Footer />
    </>
  );
}
