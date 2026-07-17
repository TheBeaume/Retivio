import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import TrustStrip from "../components/landing/TrustStrip";
import Problems from "../components/landing/Problems";
import Features from "../components/landing/Features";
import DashboardPreview from "../components/landing/DashboardPreview";
import Products from "../components/landing/Products";
import WebsiteBuilder from "../components/landing/WebsiteBuilder";
import HowItWorks from "../components/landing/HowItWorks";
import GrowthTools from "../components/landing/GrowthTools";
import Benefits from "../components/landing/Benefits";
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
      "Salon CRM and business growth software for managing customers, appointments, follow-ups, billing, reports and salon growth.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      description: "Free access available",
    },
  };

  return (
    <>
      <SEO
        title="Retivio | Salon CRM & Business Growth Software"
        description="Manage salon customers, appointments, follow-ups, billing and business growth with Retivio — a modern salon CRM and management platform built for beauty businesses."
        canonical="/"
        jsonLd={landingSchema}
      />

      <Navbar />

      <main>
        <Hero />
        <TrustStrip />
        <Problems />
        <Features />
        <DashboardPreview />
        <Products />
        <WebsiteBuilder />
        <HowItWorks />
        <GrowthTools />
        <Benefits />
        <FAQ />
        <BetaCTA />
      </main>

      <Footer />
    </>
  );
}
