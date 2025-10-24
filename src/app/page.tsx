import { Hero } from "@/components/Hero";
import { TrustedBy } from "@/components/TrustedBy";
import { Services } from "@/components/Services";
import { RecentOutcomes } from "@/components/RecentOutcomes";
import { Testimonials } from "@/components/Testimonials";
import { PerformanceCheckpoint } from "@/components/PerformanceCheckpoint";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";

export default function HomePage() {
  return (
    <>
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
    </>
  );
}