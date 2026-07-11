import React, {
  Suspense,
  lazy,
  useEffect,
  useState,
} from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminGuard from "./components/AdminGuard";
import ScrollToTop from "./components/ScrollToTop";
import { supabase } from "./lib/supabase";

const Login = lazy(() => import("./pages/Login"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Features = lazy(() => import("./pages/Features"));
const About = lazy(() => import("./pages/About"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const Contact = lazy(() => import("./pages/Contact"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Templates = lazy(() => import("./pages/Templates"));
const Aurelia = lazy(() => import("./pages/Aurelia"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ProjectBrief = lazy(() => import("./pages/ProjectBrief"));
const ProjectSubmitted = lazy(() => import("./pages/ProjectSubmitted"));
const CommandCenter = lazy(() => import("./pages/CommandCenter"));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(() => {
        setLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
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
    <>
      <ScrollToTop />

      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />

          <Route
            path="/privacy-policy"
            element={<PrivacyPolicy />}
          />

          <Route path="/terms" element={<Terms />} />

          <Route
            path="/refund-policy"
            element={<RefundPolicy />}
          />

          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/templates" element={<Templates />} />

          <Route
            path="/templates/aurelia"
            element={<Aurelia />}
          />

          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />

          <Route
            path="/project-brief"
            element={<ProjectBrief />}
          />

          <Route
            path="/project-submitted"
            element={<ProjectSubmitted />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/control-room"
            element={
              <ProtectedRoute>
                <AdminGuard>
                  <CommandCenter />
                </AdminGuard>
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
