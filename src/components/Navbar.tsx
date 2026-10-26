import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

interface NavbarProps {
  onOpenAccount: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAccount }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.1,
      });

      ScrollTrigger.create({
        trigger: '#debit-card',
        start: 'top 80px',
        end: 'bottom 80px',
        onEnter: () => setIsLightSection(true),
        onEnterBack: () => setIsLightSection(true),
        onLeave: () => setIsLightSection(false),
        onLeaveBack: () => setIsLightSection(false),
      });
    }, navRef);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const debitEl = document.getElementById('debit-card');
      if (debitEl) {
        const rect = debitEl.getBoundingClientRect();
        setIsLightSection(rect.top <= 80 && rect.bottom >= 80);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 px-4 sm:px-8 ${
        scrolled ? 'pt-3' : 'pt-5'
      }`}
    >
      {/* Floating Liquid Glass Nav Container */}
      <div
        className={`max-w-[1240px] mx-auto px-6 sm:px-8 py-3.5 rounded-full flex items-center justify-between transition-all duration-400 ${
          isLightSection
            ? 'bg-[#0B0F17]/90 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.35)]'
            : scrolled
            ? 'liquid-glass-elevated shadow-[0_15px_40px_rgba(0,0,0,0.6)]'
            : 'liquid-glass'
        }`}
      >
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group" aria-label="Sable Home">
          <img
            src="/assets/sable-logo.svg"
            alt="Sable"
            className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {/* Credit Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('credit')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className={`relative flex items-center text-[13px] font-medium tracking-[0.02em] uppercase transition-colors duration-200 py-1 group cursor-pointer ${
                activeDropdown === 'credit' ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setActiveDropdown(activeDropdown === 'credit' ? null : 'credit')}
            >
              <span>Credit</span>
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] bg-[#6FDBD4] transition-all duration-300 ${
                  activeDropdown === 'credit' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>

            {activeDropdown === 'credit' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-7 w-64 z-50">
                <div className="rounded-2xl bg-[#0b0f17]/95 border border-white/15 backdrop-blur-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] animate-in fade-in slide-in-from-top-2 duration-200">
                  <a
                    href="#compare-sable"
                    onClick={() => setActiveDropdown(null)}
                    className="group/item flex items-center justify-between px-3.5 py-2.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-150"
                  >
                    <span>Sable ONE Credit</span>
                    <span className="text-[#6FDBD4] opacity-0 group-hover/item:opacity-100 transition-opacity text-xs">→</span>
                  </a>
                  <div className="px-3.5 py-2.5 text-sm flex items-center justify-between gap-3">
                    <span className="font-medium text-white/50 whitespace-nowrap">Credit Score</span>
                    <span className="text-[10px] uppercase tracking-wider text-[#1FC6BB] bg-[#1FC6BB]/15 px-2.5 py-0.5 rounded-full font-semibold border border-[#1FC6BB]/25 whitespace-nowrap">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Debit Link */}
          <a
            href="#debit-card"
            className="relative text-[13px] font-medium tracking-[0.02em] uppercase text-white/70 hover:text-white transition-colors duration-200 group py-1"
          >
            Debit
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#6FDBD4] transition-all duration-300 group-hover:w-full" />
          </a>

          {/* App Link */}
          <a
            href="#download-app"
            className="relative text-[13px] font-medium tracking-[0.02em] uppercase text-white/70 hover:text-white transition-colors duration-200 group py-1"
          >
            App
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#6FDBD4] transition-all duration-300 group-hover:w-full" />
          </a>

          {/* Learn Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown('learn')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className={`relative flex items-center text-[13px] font-medium tracking-[0.02em] uppercase transition-colors duration-200 py-1 group cursor-pointer ${
                activeDropdown === 'learn' ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setActiveDropdown(activeDropdown === 'learn' ? null : 'learn')}
            >
              <span>Learn</span>
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] bg-[#6FDBD4] transition-all duration-300 ${
                  activeDropdown === 'learn' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>

            {activeDropdown === 'learn' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-7 w-56 z-50">
                <div className="rounded-2xl bg-[#0b0f17]/95 border border-white/15 backdrop-blur-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] animate-in fade-in slide-in-from-top-2 duration-200">
                  <a
                    href="#faq"
                    onClick={() => setActiveDropdown(null)}
                    className="group/item flex items-center justify-between px-3.5 py-2.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-150"
                  >
                    <span>FAQs</span>
                    <span className="text-[#6FDBD4] opacity-0 group-hover/item:opacity-100 transition-opacity text-xs">→</span>
                  </a>
                  <a
                    href="#about"
                    onClick={() => setActiveDropdown(null)}
                    className="group/item flex items-center justify-between px-3.5 py-2.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-150"
                  >
                    <span>About Sable</span>
                    <span className="text-[#6FDBD4] opacity-0 group-hover/item:opacity-100 transition-opacity text-xs">→</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right CTA Button (Liquid Glass Button, NO glow) */}
        <div className="hidden md:flex items-center">
          <MagneticButton strength={0.25}>
            <button
              onClick={onOpenAccount}
              className="liquid-glass-btn text-white text-[12px] font-semibold tracking-[0.08em] uppercase px-5 py-2.5 rounded-full cursor-pointer active:scale-95"
            >
              <span className="relative z-10">Open an account</span>
              <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            </button>
          </MagneticButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-[1240px] rounded-3xl bg-[#0B0F17]/95 border border-white/15 backdrop-blur-2xl p-6 animate-in fade-in duration-200 shadow-2xl">
          <div className="flex flex-col space-y-4">
            <a
              href="#compare-sable"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-wider text-white/80 hover:text-white py-1"
            >
              Credit
            </a>
            <a
              href="#debit-card"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-wider text-white/80 hover:text-white py-1"
            >
              Debit
            </a>
            <a
              href="#download-app"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-wider text-white/80 hover:text-white py-1"
            >
              App
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-wider text-white/80 hover:text-white py-1"
            >
              Learn
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAccount();
              }}
              className="w-full liquid-glass-btn-primary text-black text-xs font-semibold tracking-wider uppercase py-3 rounded-full mt-2"
            >
              Open an account
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
