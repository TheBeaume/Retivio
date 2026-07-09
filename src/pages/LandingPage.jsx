import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import DashboardPreview from "../components/landing/DashboardPreview";
import TemplatesPreview from "../components/landing/TemplatesPreview";
import WhyRetivio from "../components/landing/WhyRetivio";
import BetaCTA from "../components/landing/BetaCTA";
import Footer from "../components/landing/Footer";
import SEO from "../components/SEO";

export default function LandingPage() {
  return (
    <>
      <SEO
        title="Retivio | AI-Powered Salon CRM & Website Templates"
        description="Manage your salon with AI-powered CRM, launch premium salon websites with AURELIA, automate WhatsApp, appointments and grow your business."
        canonical="/"
      />

      <Navbar />

      <main>
        <Hero />
        <Features />
        <DashboardPreview />
        <TemplatesPreview />
        <WhyRetivio />
        <BetaCTA />
      </main>

      <Footer />
    </>
  );
}
