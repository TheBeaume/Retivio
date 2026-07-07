import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import DashboardPreview from "../components/landing/DashboardPreview";
import BetaCTA from "../components/landing/BetaCTA";
import Footer from "../components/landing/Footer";
import SEO from "../components/SEO";

export default function LandingPage() {
  return (
    <>
<SEO
  title="Retivio | AI-Powered Salon CRM for Salons & Spas"
  description="Retivio is an AI-powered Salon CRM designed for salons and spas. Manage appointments, customers, WhatsApp follow-ups, loyalty, billing and grow your beauty business."
  canonical="/"
/>
      <Navbar />
      <Hero />
      <Features />
      <DashboardPreview />
      <BetaCTA />
      <Footer />
    </>
  );
}
