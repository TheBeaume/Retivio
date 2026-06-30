import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import DashboardPreview from "../components/landing/DashboardPreview";
import BetaCTA from "../components/landing/BetaCTA";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <DashboardPreview />
      <BetaCTA />
      <Footer />
    </>
  );
}
