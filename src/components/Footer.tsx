/**
 * Sable Footer & Legal Disclosures
 * Crafted by Rhidham Garg
 */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_ICONS = [
  { src: '/assets/social-1.svg', name: 'Twitter' },
  { src: '/assets/social-2.svg', name: 'Instagram' },
  { src: '/assets/social-3.svg', name: 'LinkedIn' },
  { src: '/assets/social-4.svg', name: 'Facebook' },
  { src: '/assets/social-5.svg', name: 'YouTube' },
];

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.from(gridRef.current?.children || [], {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-black text-white pt-24 pb-16 px-6 sm:px-12 border-t border-[#2F2F2F] select-none"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Navigation & Contact Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          {/* Left Column: Product Links */}
          <div className="md:col-span-6 lg:col-span-5 grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <a
                  href="#compare-sable"
                  className="text-lg sm:text-[22px] font-medium text-white hover:text-[#6FDBD4] transition-colors"
                >
                  Sable Credit
                </a>
                <div className="mt-2 space-y-1.5 pl-0.5">
                  <a
                    href="#compare-sable"
                    className="block text-sm text-[#A0A1A8] hover:text-white transition-colors"
                  >
                    Sable ONE Credit
                  </a>
                  <div className="text-sm text-[#73757B] flex items-center gap-1.5">
                    <span>Credit Score</span>
                    <span className="text-[10px] text-[#1FC6BB] uppercase tracking-wider bg-[#1FC6BB]/10 px-1.5 py-0.5 rounded font-medium">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#debit-card"
                  className="text-lg sm:text-[22px] font-medium text-white hover:text-[#6FDBD4] transition-colors"
                >
                  Sable Debit
                </a>
              </div>

              <div className="pt-2">
                <a
                  href="#download-app"
                  className="text-lg sm:text-[22px] font-medium text-white hover:text-[#6FDBD4] transition-colors"
                >
                  App
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-lg sm:text-[22px] font-medium text-white">
                  Learn
                </span>
                <div className="mt-2 space-y-1.5 pl-0.5">
                  <a
                    href="#faq"
                    className="block text-sm text-[#A0A1A8] hover:text-white transition-colors"
                  >
                    FAQs
                  </a>
                  <a
                    href="#about"
                    className="block text-sm text-[#A0A1A8] hover:text-white transition-colors"
                  >
                    About Sable
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Brand Graphic */}
          <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-between items-start md:items-end space-y-8">
            {/* Top Contact & Logo */}
            <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-lg font-medium text-white">Contact</span>
                <p className="text-sm text-[#A0A1A8]">Email: help@sablecard.com</p>
                <p className="text-sm text-[#A0A1A8]">Location: New York, NY</p>
              </div>

              <div className="max-w-[200px] w-full">
                <img
                  src="/assets/sable-footer-logo.svg"
                  alt="Sable"
                  className="h-12 w-auto object-contain opacity-90 transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>

            {/* Social Icons & Copyright */}
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6">
              <div className="flex items-center gap-4">
                {SOCIAL_ICONS.map((social, i) => (
                  <MagneticButton key={i} strength={0.4}>
                    <a
                      href="#"
                      aria-label={social.name}
                      className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#6FDBD4]/50 flex items-center justify-center opacity-80 hover:opacity-100 hover:bg-white/10 transition-all duration-200"
                    >
                      <img src={social.src} alt="" className="w-4 h-4 object-contain" />
                    </a>
                  </MagneticButton>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs text-white/60">
                <p>© Sable Money Inc, all rights reserved.</p>
                <span className="hidden sm:inline text-white/30">•</span>
                <p className="text-white/80">Designed & Engineered by <span className="text-[#6FDBD4] font-medium">Rhidham Garg</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimers & Regulatory Notices */}
        <div className="pt-8 border-t border-[#2F2F2F] text-[11px] leading-relaxed text-[#73757B] space-y-4">
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Terms and conditions</a>
          </div>

          <p>
            *Banking services provided by Coastal Community Bank, Member FDIC, pursuant to license by Mastercard International Inc. Sable account is FDIC-insured up to $250,000 per depositor through Coastal Community Bank, Member FDIC.
          </p>

          <p>
            **If you are not a U.S. citizen, you can apply with your passport and U.S. Visa. Please note: you must submit an SSN once you receive one. If you are a U.S. citizen, SSN is required to open a bank account.
          </p>

          <p>
            *** Double cashback bonus (through 12/2022)
          </p>

          <ol className="list-decimal pl-4 space-y-1 text-[10.5px]">
            <li>Please see www.sablecard.com/terms-and-conditions#creditrnb for terms and conditions. Some exclusions apply.</li>
            <li>Please see www.sablecard.com/terms-and-conditions for terms and conditions.</li>
            <li>This benefit is provided by MasterCard. Benefits are subject to terms, conditions and limitations, including limitations on the amount of coverage. Please see the terms and conditions.</li>
            <li>Sable estimated annual value.</li>
            <li>Sable product comparisons.</li>
          </ol>

          <p className="text-[10px] pt-1">
            † Sable Remittance Best Rate Guarantee Terms
          </p>
        </div>
      </div>
    </footer>
  );
};
