import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MagneticButton } from './MagneticButton';
import { Zap, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const centerMockupRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Floating animations for cards
      gsap.to(leftCardRef.current, {
        y: '+=14',
        rotateZ: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(rightCardRef.current, {
        y: '-=16',
        rotateZ: 12,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      });

      gsap.to(centerMockupRef.current, {
        y: '+=10',
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });

      // Staggered Entrance
      tl.from(centerMockupRef.current, {
        scale: 0.85,
        opacity: 0,
        y: 40,
        duration: 1.4,
      }, 0)
      .from(leftCardRef.current, {
        x: -70,
        y: 50,
        opacity: 0,
        rotateZ: -25,
        duration: 1.3,
      }, 0.2)
      .from(rightCardRef.current, {
        x: 70,
        y: 50,
        opacity: 0,
        rotateZ: 25,
        duration: 1.3,
      }, 0.3)
      .from('.hero-text-line', {
        y: 45,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
      }, 0.4)
      .from(ctaRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.4)',
      }, 0.7)
      .from('.liquid-floating-chip', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
      }, 0.8);

    }, containerRef);

    // Dynamic 3D Cursor Parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;

      gsap.to(leftCardRef.current, {
        x: x * -25,
        y: y * -20,
        rotateY: x * 8,
        duration: 1.2,
        ease: 'power2.out',
      });

      gsap.to(rightCardRef.current, {
        x: x * 30,
        y: y * 25,
        rotateY: x * -10,
        duration: 1.2,
        ease: 'power2.out',
      });

      gsap.to(centerMockupRef.current, {
        x: x * 15,
        y: y * 12,
        duration: 1.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[96vh] flex flex-col justify-between pt-32 pb-10 px-6 sm:px-12 overflow-hidden bg-[#050507] select-none"
    >
      {/* Dynamic Fluid Liquid Light Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#1FC6BB]/25 via-[#6FDBD4]/15 to-transparent blur-[120px] animate-fluid-1" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#6FDBD4]/20 via-[#10ACA2]/15 to-transparent blur-[130px] animate-fluid-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] rounded-full bg-[#050507]/60 blur-2xl pointer-events-none" />
      </div>

      {/* Visual Composition: Phone Mockup + Dual Floating 3D Cards */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="relative w-full max-w-[1360px] h-[750px] flex items-center justify-center">
          {/* Left Floating Black & Gold Metal Card (Positioned comfortably outward) */}
          <div
            ref={leftCardRef}
            className="absolute left-0 sm:left-6 lg:left-12 top-1/4 w-[110px] sm:w-[230px] lg:w-[270px] -rotate-12 transition-transform drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] z-0"
          >
            <div className="relative rounded-2xl overflow-hidden p-1 liquid-glass opacity-35 sm:opacity-85">
              <img
                src="/assets/card-black-gold.png"
                alt="Sable Premium Metal Card"
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          </div>

          {/* Center Main App Mockup Frame */}
          <div
            ref={centerMockupRef}
            className="relative w-[300px] sm:w-[520px] lg:w-[680px] opacity-75 filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)] transform -translate-y-4 sm:-translate-y-8 z-0"
          >
            <img
              src="/assets/sable-frame.png"
              alt="Sable Banking Interface"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Right Floating Sable Debit Card (Positioned comfortably outward) */}
          <div
            ref={rightCardRef}
            className="absolute right-0 sm:right-6 lg:right-12 bottom-1/4 w-[110px] sm:w-[230px] lg:w-[270px] rotate-12 transition-transform drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] z-0"
          >
            <div className="relative rounded-2xl overflow-hidden p-1 liquid-glass opacity-35 sm:opacity-85">
              <img
                src="/assets/card-debit.png"
                alt="Sable Debit Card"
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Liquid Glass Badges/Chips */}
      <div ref={badgesRef} className="relative z-10 max-w-[1280px] w-full mx-auto pointer-events-none">
        {/* Chip 1: Top Left */}
        <div className="liquid-floating-chip hidden lg:inline-flex items-center gap-2.5 px-4 py-2 rounded-full liquid-glass-pill text-xs text-white/90 shadow-lg absolute -top-4 left-6 pointer-events-auto">
          <div className="w-5 h-5 rounded-full bg-[#1FC6BB]/20 text-[#6FDBD4] flex items-center justify-center">
            <Zap size={12} />
          </div>
          <span className="font-medium">5-Minute Instant Setup</span>
          <span className="text-white/40">•</span>
          <span className="text-[#6FDBD4]">No SSN Required</span>
        </div>

        {/* Chip 2: Top Right */}
        <div className="liquid-floating-chip hidden lg:inline-flex items-center gap-2.5 px-4 py-2 rounded-full liquid-glass-pill text-xs text-white/90 shadow-lg absolute -top-4 right-6 pointer-events-auto">
          <div className="w-5 h-5 rounded-full bg-[#1FC6BB]/20 text-[#6FDBD4] flex items-center justify-center">
            <Sparkles size={12} />
          </div>
          <span className="font-medium">2% Unlimited Cash Back</span>
          <span className="text-white/40">•</span>
          <span className="text-[#6FDBD4]">2X Match</span>
        </div>
      </div>

      {/* Main Center Content: Headline & Liquid Glass CTA */}
      <div className="relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center justify-center my-auto pt-4">
        {/* Liquid Glass Pill Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill text-xs font-medium text-[#6FDBD4] tracking-wide">
          <span className="w-2 h-2 rounded-full bg-[#6FDBD4] animate-pulse" />
          <span>Next-Gen Global Banking</span>
        </div>

        {/* Headline with High-Contrast Legibility & Dark Backing */}
        <h1
          ref={headlineRef}
          className="text-white text-[28px] xs:text-[34px] sm:text-5xl lg:text-[62px] font-normal leading-[1.2] sm:leading-[1.22] tracking-[0.02em] max-w-[880px] drop-shadow-[0_4px_30px_rgba(0,0,0,1)] px-2"
        >
          <span className="hero-text-line block">
            The fastest, most{' '}
            <span className="font-normal text-white">premium</span> path to
          </span>
          <span className="hero-text-line block mt-1">
            <span className="font-bold bg-gradient-to-r from-white via-white to-white/95 bg-clip-text text-transparent">
              financial freedom
            </span>
          </span>
        </h1>

        {/* Liquid Glass Explore CTA Button */}
        <div ref={ctaRef} className="mt-8 sm:mt-11">
          <MagneticButton strength={0.3}>
            <button
              onClick={onExplore}
              className="liquid-glass-btn-primary group inline-flex items-center justify-center gap-2.5 text-black text-[13px] sm:text-[14px] font-semibold tracking-[0.05em] uppercase px-11 py-4 sm:px-14 sm:py-4.5 rounded-full cursor-pointer active:scale-95"
            >
              <span>Explore</span>
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />

              {/* Specular Liquid Light Sheen Sweep on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
            </button>
          </MagneticButton>
        </div>
      </div>

      {/* Bottom Banking Disclaimer */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-10 text-[#A0A1A8]">
        <div className="flex items-center gap-3">
          <img
            src="/assets/mastercard-fdic.svg"
            alt="Mastercard & Coastal Community Bank"
            className="h-5 sm:h-5.5 w-auto object-contain shrink-0 opacity-80"
          />
          <p className="text-[9.5px] sm:text-[10px] leading-[1.35] max-w-xl text-[#A0A1A8]/80">
            Banking services provided by Coastal Community Bank, Member FDIC, pursuant to license by Mastercard International Inc.
          </p>
        </div>

        {/* Liquid Glass Badge */}
        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full liquid-glass-pill text-[11px] text-white/80">
          <ShieldCheck size={14} className="text-[#6FDBD4]" />
          <span>FDIC Insured up to $250,000</span>
        </div>
      </div>
    </section>
  );
};
