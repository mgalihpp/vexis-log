"use client";

import { MotionConfig } from "framer-motion";
import { LandingLayout } from "@/components/landing/LandingLayout";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { FeatureShowcase } from "@/components/landing/FeatureShowcase";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CTASection } from "@/components/landing/CTASection";
import { TestimonialMarquee } from "@/components/landing/TestimonialMarquee";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <LandingLayout>
        <LandingHeader />
        <HeroSection />
        <ProblemSection />
        <HowItWorks />
        <FeatureShowcase />
        <TestimonialMarquee />
        <CTASection />
        <Footer />
      </LandingLayout>
    </MotionConfig>
  );
}
