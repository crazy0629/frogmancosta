import { useState, useEffect } from "react";
import { Hero } from "./components/Hero";
import { TrustedBy } from "./components/TrustedBy";
import { Services } from "./components/Services";
import { RecentOutcomes } from "./components/RecentOutcomes";
import { Testimonials } from "./components/Testimonials";
import { PerformanceCheckpoint } from "./components/PerformanceCheckpoint";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";
import { AdminPanel } from "./components/AdminPanel";
import { ScrollToTop } from "./components/ScrollToTop";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Set page title
    document.title = "Brand Lift Co - Performance Brand Scaling";

    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // Admin panel route
  if (currentPath === "/admin") {
    return (
      <>
        <AdminPanel />
        <Toaster />
      </>
    );
  }

  // Main landing page
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />
      <Hero />
      <TrustedBy />
      <Services />
      <RecentOutcomes />
      <Testimonials />
      <PerformanceCheckpoint />
      <FAQ />
      <Footer />
      <ScrollToTop />
      <Toaster />
    </div>
  );
}
