from pathlib import Path

content = r'''import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Products from "../components/landing/Products";
import WhyRetivio from "../components/landing/WhyRetivio";
import HowItWorks from "../components/landing/HowItWorks";
import WebsiteBuilderCTA from "../components/landing/WebsiteBuilderCTA";
import DashboardPreview from "../components/landing/DashboardPreview";
import GrowthTools from "../components/landing/GrowthTools";
import Pricing from "../components/landing/Pricing";
import FAQ from "../components/landing/FAQ";
import BetaCTA from "../components/landing/BetaCTA";
import Footer from "../components/landing/Footer";
import SEO from "../components/SEO";

export default function LandingPage() {
  const landingSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Retivio",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Professional website solutions, salon CRM and marketing tools for growing businesses.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR"
    }
  };

  return (
    <>
      <SEO
        title="Retivio | Business Growth Platform"
        description="Build professional websites, manage your salon and grow your business with Retivio."
        canonical="/"
        jsonLd={landingSchema}
      />

      <Navbar />

      <main>

        <Hero />

        <Products />

        <WhyRetivio />

        <HowItWorks />

        <WebsiteBuilderCTA />

        <DashboardPreview />

        <GrowthTools />

        <Pricing />

        <FAQ />

        <BetaCTA />

      </main>

      <Footer />

    </>
  );
}
'''

Path("src/pages/LandingPage.jsx").write_text(content)

print("LandingPage.jsx updated successfully.")
