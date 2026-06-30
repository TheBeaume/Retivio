import React, { useState } from "react";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import DashboardPreview from "../components/landing/DashboardPreview";
import BetaCTA from "../components/landing/BetaCTA";
import Footer from "../components/landing/Footer";
import BetaModal from "../components/landing/BetaModal";

export default function LandingPage() {
  const [showBetaModal, setShowBetaModal] = useState(false);

  return (
    <>
      <Navbar onJoinBeta={() => setShowBetaModal(true)} />

      <Hero onJoinBeta={() => setShowBetaModal(true)} />

      <Features />

      <DashboardPreview />

      <BetaCTA onJoinBeta={() => setShowBetaModal(true)} />

      <Footer />

      {showBetaModal && (
        <BetaModal
          onClose={() => setShowBetaModal(false)}
        />
      )}
    </>
  );
}
