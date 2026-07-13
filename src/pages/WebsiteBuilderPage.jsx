import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import WebsiteBuilder from "../components/landing/WebsiteBuilder";
import SEO from "../components/SEO";

const websiteBuilderSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Retivio Website Builder",
  url: "https://retivio.in/website-builder",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Create and preview a professional business website online with Retivio Website Builder without coding.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  provider: {
    "@type": "Organization",
    name: "Retivio",
    url: "https://retivio.in",
  },
};

export default function WebsiteBuilderPage() {
  return (
    <>
      <SEO
        title="Free Website Builder for Small Businesses | Retivio"
        description="Build a professional business website without coding. Choose a business type, customize your brand, upload images and preview your website with Retivio Website Builder."
        canonical="/website-builder"
        keywords="Free Website Builder, Small Business Website Builder, Salon Website Builder, Business Website Builder India, No Code Website Builder, Retivio Website Builder"
        jsonLd={websiteBuilderSchema}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Website Builder", url: "/website-builder" },
        ]}
      />

      <Navbar />

      <main>
        <WebsiteBuilder />
      </main>

      <Footer />
    </>
  );
}
