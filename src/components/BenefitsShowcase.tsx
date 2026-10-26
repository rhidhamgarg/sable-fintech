import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BENEFITS = [
  {
    id: 'cashback',
    tag: 'Rewards & Perks',
    title: 'Earn 2% cash back on favorite brands',
    description:
      'Earn 2%¹ cash back on favorite brands, 1%¹ cashback on all purchases, and a 2x cashback match in your first year! Get premium benefits and much more.',
  },
  {
    id: 'ssn',
    tag: 'Global Access',
    title: 'Moving to the U.S.? No SSN required',
    description:
      'Start building credit before you even enter the country. Sign up with your international address, passport & visa instead**.',
  },
  {
    id: 'support',
    tag: '24/7 Concierge',
    title: 'Get help from a real person',
    description:
      'When you’ve got questions about your finances, get multilingual customer support anytime you need from direct in-app chat, email, phone, and our site FAQs.',
  },
];

const BRAND_ICONS = [
  { src: '/assets/brand-1.svg', name: 'Brand 1', floatY: 10, duration: 3.2 },
  { src: '/assets/brand-2.svg', name: 'Brand 2', floatY: -12, duration: 2.8 },
  { src: '/assets/brand-3.svg', name: 'Brand 3', floatY: 8, duration: 3.6 },
  { src: '/assets/brand-4.svg', name: 'Brand 4', floatY: -10, duration: 3.0 },
  { src: '/assets/brand-5.svg', name: 'Brand 5', floatY: 12, duration: 3.4 },
  { src: '/assets/brand-6.svg', name: 'Brand 6', floatY: -8, duration: 2.9 },
];

export const BenefitsShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const brandsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      const brandCards = gsap.utils.toArray<HTMLElement>('.brand-card');
      brandCards.forEach((card, i) => {
        const item = BRAND_ICONS[i % BRAND_ICONS.length];
        gsap.to(card, {
          y: item.floatY,
          duration: item.duration,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#07070A] text-white py-16 sm:py-36 px-4 sm:px-12 border-b border-white/10 overflow-hidden relative"
    >
      {/* Background Ambient Fluid Blob */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#6FDBD4]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10">
        {/* Left Side: Liquid Glass Benefit Cards */}
        <div className="lg:col-span-6 flex flex-col space-y-3.5 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill text-xs font-semibold text-[#6FDBD4] tracking-wider uppercase mb-2 w-max">
            <span>Built For The Global Citizen</span>
          </div>

          {BENEFITS.map((item, index) => {
            const isActive = activeTab === index;
            return (
              <div
                key={item.id}
                onClick={() => setActiveTab(index)}
                className={`relative cursor-pointer transition-all duration-300 p-5 sm:p-7 rounded-2xl sm:rounded-3xl ${
                  isActive
                    ? 'liquid-glass-elevated border-[#6FDBD4]/40'
                    : 'liquid-glass opacity-60 hover:opacity-90'
                }`}
              >
                {/* Active Accent Bar */}
                {isActive && (
                  <div className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full bg-[#6FDBD4]" />
                )}

                <span className="text-[11px] uppercase tracking-wider text-[#6FDBD4] font-semibold block mb-1">
                  {item.tag}
                </span>

                <h3
                  className={`text-lg sm:text-[25px] font-medium leading-[1.25] tracking-tight mb-2 transition-colors ${
                    isActive ? 'text-white' : 'text-white/70'
                  }`}
                >
                  {item.title}
                </h3>

                <p className="text-[#A0A1A8] text-xs sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Side: Liquid Glass Elevated Frame with Brand Icons */}
        <div className="lg:col-span-6 flex items-center justify-center">
          <div
            ref={brandsContainerRef}
            className="relative w-full max-w-[540px] min-h-[380px] sm:min-h-[580px] rounded-3xl liquid-glass-elevated p-4 sm:p-10 flex flex-col justify-center overflow-hidden"
          >
            {/* Ambient Lighting inside glass container */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#6FDBD4]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Grid of Brand Badges */}
            <div className="grid grid-cols-2 gap-3.5 sm:gap-6 relative z-10">
              {/* Column 1 */}
              <div className="flex flex-col gap-3.5 sm:gap-6 -translate-y-3 sm:-translate-y-4">
                {BRAND_ICONS.slice(0, 3).map((brand, i) => (
                  <div
                    key={i}
                    className="brand-card w-full aspect-square rounded-[22px] sm:rounded-[36px] bg-white/95 p-3.5 sm:p-6 shadow-[0_12px_30px_rgba(0,0,0,0.1)] flex items-center justify-center transition-all duration-300 hover:scale-108 cursor-pointer"
                  >
                    <img
                      src={brand.src}
                      alt={brand.name}
                      className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-300 hover:rotate-3"
                    />
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-3.5 sm:gap-6 translate-y-3 sm:translate-y-4">
                {BRAND_ICONS.slice(3, 6).map((brand, i) => (
                  <div
                    key={i}
                    className="brand-card w-full aspect-square rounded-[22px] sm:rounded-[36px] bg-white/95 p-3.5 sm:p-6 shadow-[0_12px_30px_rgba(0,0,0,0.1)] flex items-center justify-center transition-all duration-300 hover:scale-108 cursor-pointer"
                  >
                    <img
                      src={brand.src}
                      alt={brand.name}
                      className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-300 hover:rotate-3"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
