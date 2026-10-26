import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from './MagneticButton';
import { ShieldCheck, Zap, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DebitSectionProps {
  onOpenAccount: () => void;
}

export const DebitSection: React.FC<DebitSectionProps> = ({ onOpenAccount }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Card entrance from left
      gsap.from(cardRef.current, {
        x: -80,
        opacity: 0,
        rotate: -5,
        duration: 1.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      // Card gentle floating
      gsap.to(cardRef.current, {
        y: '+=10',
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Content staggered entrance
      gsap.from(contentRef.current?.children || [], {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 92%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="debit-card"
      ref={sectionRef}
      className="bg-white text-black py-20 sm:py-36 px-6 sm:px-12 overflow-hidden transition-colors relative"
    >
      <div className="max-w-[1240px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        {/* Left Side: Debit Card Render with Liquid Glass Badges */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative">
          <div
            ref={cardRef}
            className="relative max-w-[360px] sm:max-w-[480px] w-full will-change-transform"
          >
            <img
              src="/assets/card-debit.png"
              alt="Sable Debit Card"
              className="w-full h-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:scale-[1.02]"
            />

            {/* Liquid Glass Badge 1 */}
            <div className="absolute -top-4 left-1 sm:-left-8 bg-white/90 border border-black/10 rounded-2xl px-3.5 sm:px-4 py-2 sm:py-2.5 shadow-xl flex items-center gap-2 sm:gap-2.5 backdrop-blur-xl">
              <div className="w-6 h-6 rounded-full bg-[#10ACA2]/15 text-[#10ACA2] flex items-center justify-center">
                <Zap size={14} />
              </div>
              <span className="text-xs font-semibold text-black tracking-tight">Instant Virtual Card</span>
            </div>

            {/* Liquid Glass Badge 2 */}
            <div className="absolute -bottom-4 right-1 sm:-right-8 bg-white/90 border border-black/10 rounded-2xl px-3.5 sm:px-4 py-2 sm:py-2.5 shadow-xl flex items-center gap-2 sm:gap-2.5 backdrop-blur-xl">
              <div className="w-6 h-6 rounded-full bg-[#10ACA2]/15 text-[#10ACA2] flex items-center justify-center">
                <ShieldCheck size={14} />
              </div>
              <span className="text-xs font-semibold text-black tracking-tight">Zero Monthly Fees</span>
            </div>
          </div>
        </div>

        {/* Right Side: Headline & Details */}
        <div ref={contentRef} className="w-full lg:w-1/2 flex flex-col items-start max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold text-[#10ACA2] tracking-wider uppercase mb-4">
            <span>Seamless Onboarding</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-[46px] font-semibold text-black leading-[1.2] tracking-tight mb-4 sm:mb-6">
            Get a bank account & debit card{' '}
            <span className="text-[#10ACA2] font-semibold">
              in five minutes.
            </span>
          </h2>

          <p className="text-neutral-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8">
            No SSN required for non-U.S. citizens. Open your account instantly with your international passport and visa. Enjoy modern mobile banking, zero account fees, and immediate virtual card access.
          </p>

          <MagneticButton strength={0.3}>
            <button
              onClick={onOpenAccount}
              className="group relative inline-flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white text-[12px] sm:text-[13px] font-semibold tracking-wider uppercase px-7 sm:px-9 py-3.5 sm:py-4.5 rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)] active:scale-95 cursor-pointer"
            >
              <span>Get Started Now</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};
