/**
 * Sable Platform Home Page
 * UI Architecture & Interactions by Rhidham Garg
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { PressMarquee } from '../components/PressMarquee';
import { FeaturesGrid } from '../components/FeaturesGrid';
import { CardShowcase } from '../components/CardShowcase';
import { DebitSection } from '../components/DebitSection';
import { BenefitsShowcase } from '../components/BenefitsShowcase';
import { ComparisonTable } from '../components/ComparisonTable';
import { ReviewsCarousel } from '../components/ReviewsCarousel';
import { DownloadBanner } from '../components/DownloadBanner';
import { FaqSection } from '../components/FaqSection';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
  // Initialize Lenis smooth scroll synchronized with GSAP ScrollTrigger
  useSmoothScroll();
  const navigate = useNavigate();

  const handleOpenAccount = (plan?: string) => {
    let planSlug = 'credit-debit';
    if (plan?.toLowerCase().includes('debit only')) {
      planSlug = 'debit';
    } else if (plan?.toLowerCase().includes('metal')) {
      planSlug = 'metal';
    }
    navigate(`/open-account?plan=${planSlug}`);
  };

  const handleExplore = () => {
    const el = document.getElementById('compare-sable');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Navigation */}
      <Navbar onOpenAccount={() => handleOpenAccount()} />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <Hero onExplore={handleExplore} />

        {/* Press Marquee with Media Logos */}
        <PressMarquee />

        {/* 400,000 Accounts & 4-Quadrant Features with App Sub Mockup */}
        <FeaturesGrid />

        {/* Sable Metal Card Showcase */}
        <CardShowcase />

        {/* Debit Card in 5 Minutes Section (Light Canvas) */}
        <DebitSection onOpenAccount={() => handleOpenAccount('debit')} />

        {/* Benefits Showcase with Brand Icons (Amazon, Spotify, etc.) */}
        <BenefitsShowcase />

        {/* Comparison Table Section */}
        <ComparisonTable onSelectPlan={(plan) => handleOpenAccount(plan)} />

        {/* 4.8 Rating & Testimonials Slider */}
        <ReviewsCarousel />

        {/* Join 400,000 Accounts App Download Banner */}
        <DownloadBanner />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Global Footer & Disclosures */}
      <Footer />
    </>
  );
};
