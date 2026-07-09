import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Features from "./pages/Features";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { supabase } from "./lib/supabase";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Templates from "./pages/Templates";
import Aurelia from "./pages/Aurelia";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
     
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
<Route path="/" element={<LandingPage />} />
<Route path="/features" element={<Features />} />
<Route path="/about" element={<About />} />
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/terms" element={<Terms />} />
<Route path="/refund-policy" element={<RefundPolicy />} />
<Route path="/contact" element={<Contact />} />
<Route path="/blog" element={<Blog />} />
<Route path="/blog/:slug" element={<BlogPost />} />
<Route path="/templates" element={<Templates />} />
<Route path="/templates/aurelia" element={<Aurelia />} />

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
