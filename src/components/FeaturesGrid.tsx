import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FeaturesGrid: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [countDisplay, setCountDisplay] = useState('0');

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setCountDisplay('400,000');
        return;
      }

      // 1. Animated number counter for 400,000
      const counterObj = { val: 0 };
      gsap.to(counterObj, {
        val: 400000,
        duration: 2.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: counterRef.current,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          setCountDisplay(Math.floor(counterObj.val).toLocaleString());
        },
      });

      // 2. Headline reveal
      gsap.from('.features-heading', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.features-heading',
          start: 'top 85%',
        },
      });

      // 3. Center mockup entrance
      gsap.from(mockupRef.current, {
        scale: 0.88,
        opacity: 0,
        y: 60,
        duration: 1.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mockupRef.current,
          start: 'top 80%',
        },
      });

      // 4. Staggered feature cards entrance
      const cards = gsap.utils.toArray<HTMLElement>('.feature-card');
      gsap.from(cards, {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    // 3D Tilt on mockup
    const handleMouseMove = (e: MouseEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!mockupRef.current) return;

      const rect = mockupRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(mockupRef.current, {
        rotateY: (x / rect.width) * 12,
        rotateX: (-y / rect.height) * 12,
        transformPerspective: 1000,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      if (!mockupRef.current) return;
      gsap.to(mockupRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    const mockupEl = mockupRef.current;
    if (mockupEl) {
      window.addEventListener('mousemove', handleMouseMove);
      mockupEl.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
      if (mockupEl) mockupEl.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0A0A0E] pt-24 pb-32 px-6 sm:px-12 border-b border-white/10 overflow-hidden relative"
    >
      {/* Background Subtle Ambient Fluid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#1FC6BB]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* Header Tagline & Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill mb-4 text-[#6FDBD4] text-[13px] sm:text-[14px] font-semibold tracking-[0.04em] uppercase">
            <span ref={counterRef} className="tabular-nums font-bold text-base sm:text-lg">
              {countDisplay}
            </span>
            <span>Accounts & Counting</span>
          </div>

          <h2 className="features-heading text-white text-2xl sm:text-4xl lg:text-[38px] leading-[1.25] font-bold">
            No hidden fees. No credit checks.{' '}
            <span className="font-normal text-white/80">
              No more barriers to building credit.
            </span>
          </h2>
        </div>

        {/* Layout with Mockup in Center & 4 Liquid Glass Feature Cards */}
        <div className="relative">
          {/* Main App & Card Mockup */}
          <div
            ref={mockupRef}
            style={{ perspective: 1000 }}
            className="relative mx-auto max-w-[850px] lg:max-w-[950px] z-10 flex items-center justify-center my-6 lg:my-0 will-change-transform"
          >
            <img
              src="/assets/home-sub-mockup.png"
              alt="Sable App & Card interface"
              className="w-full h-auto object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.8)]"
            />
          </div>

          {/* 4 Feature Items Grid (Liquid Glass Cards) */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-x-48 lg:gap-y-36 lg:absolute lg:inset-0 z-20 pointer-events-none mt-6 lg:mt-0"
          >
            {/* Feature 1: Top Left */}
            <div className="feature-card pointer-events-auto flex flex-col items-start w-full max-w-full lg:max-w-[310px] lg:justify-self-start liquid-glass-interactive p-5 sm:p-6 rounded-3xl">
              <div className="w-11 h-11 mb-3.5 flex items-center justify-center rounded-2xl bg-white/10 border border-white/20 p-2.5">
                <img src="/assets/feature-icon-1.svg" alt="" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-white text-base sm:text-[18px] font-semibold leading-snug mb-2">
                Get a secured credit card and bank account in 5 minutes.
              </h3>
              <p className="text-[#A0A1A8] text-[13.5px] leading-relaxed">
                No credit history, credit check, or minimum deposit required.
              </p>
            </div>

            {/* Feature 2: Top Right */}
            <div className="feature-card pointer-events-auto flex flex-col items-start lg:items-end text-left lg:text-right w-full max-w-full lg:max-w-[310px] lg:justify-self-end liquid-glass-interactive p-5 sm:p-6 rounded-3xl">
              <div className="w-11 h-11 mb-3.5 flex items-center justify-center rounded-2xl bg-white/10 border border-white/20 p-2.5 lg:self-end">
                <img src="/assets/feature-icon-2.svg" alt="" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-white text-base sm:text-[18px] font-semibold leading-snug mb-2">
                Build your U.S. credit
              </h3>
              <p className="text-[#A0A1A8] text-[13.5px] leading-relaxed">
                We believe in forming positive habits. Build your U.S. credit with Sable.
              </p>
            </div>

            {/* Feature 3: Bottom Left */}
            <div className="feature-card pointer-events-auto flex flex-col items-start w-full max-w-full lg:max-w-[310px] lg:justify-self-start lg:self-end liquid-glass-interactive p-5 sm:p-6 rounded-3xl">
              <div className="w-11 h-11 mb-3.5 flex items-center justify-center rounded-2xl bg-white/10 border border-white/20 p-2.5">
                <img src="/assets/feature-icon-1.svg" alt="" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-white text-base sm:text-[18px] font-semibold leading-snug mb-2">
                The only premium card for building credit.
              </h3>
              <p className="text-[#A0A1A8] text-[13.5px] leading-relaxed">
                2% unlimited cash back on your favorite brands, 2X first year cash back match, premium benefits and more!
              </p>
            </div>

            {/* Feature 4: Bottom Right */}
            <div className="feature-card pointer-events-auto flex flex-col items-start lg:items-end text-left lg:text-right w-full max-w-full lg:max-w-[310px] lg:justify-self-end lg:self-end liquid-glass-interactive p-5 sm:p-6 rounded-3xl">
              <div className="w-11 h-11 mb-3.5 flex items-center justify-center rounded-2xl bg-white/10 border border-white/20 p-2.5 lg:self-end">
                <img src="/assets/feature-icon-2.svg" alt="" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-white text-base sm:text-[18px] font-semibold leading-snug mb-2">
                Bank like a global citizen with Sable.
              </h3>
              <p className="text-[#A0A1A8] text-[13.5px] leading-relaxed">
                Start building credit before you even enter the country. Non-U.S. citizens can apply with their passport and visa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
