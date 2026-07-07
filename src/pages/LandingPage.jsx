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
    title="Retivio | AI-Powered Salon CRM"
    description="AI-powered Salon CRM for customer management, appointments, WhatsApp follow-ups, billing and salon growth."
    canonical="/"
  />

  <Navbar />

  <main>
    <Hero />
    <Features />
    <DashboardPreview />
    <BetaCTA />
  </main>

  <Footer />
</>

  );
}
