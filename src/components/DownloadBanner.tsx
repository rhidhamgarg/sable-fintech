import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export const DownloadBanner: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.fromTo(
        bgImageRef.current,
        { yPercent: -10, scale: 1.1 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      gsap.from(contentRef.current?.children || [], {
        y: 35,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top 75%',
        },
      });
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="download-app" className="bg-[#050507] py-16 sm:py-28 px-4 sm:px-12 overflow-hidden relative">
      <div className="max-w-[1240px] mx-auto">
        <div
          ref={bannerRef}
          className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden min-h-[360px] sm:min-h-[460px] flex items-center p-6 sm:p-20 liquid-glass-elevated shadow-2xl"
        >
          {/* Background Poster Image with Parallax */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              ref={bgImageRef}
              src="/assets/video-poster.png"
              alt=""
              className="w-full h-full object-cover object-center filter brightness-90 will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/45" />
          </div>

          {/* Banner Content */}
          <div ref={contentRef} className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill text-xs uppercase tracking-widest text-[#6FDBD4] font-semibold mb-4">
              <span>Mobile Banking Everywhere</span>
            </div>

            <h2 className="text-white text-2xl xs:text-3xl sm:text-5xl lg:text-[54px] font-semibold leading-[1.16] sm:leading-[1.12] mb-4 sm:mb-5 tracking-tight">
              Join over <span className="text-[#6FDBD4] font-bold">400,000</span> accounts
            </h2>

            <p className="text-white/85 text-sm sm:text-lg leading-relaxed mb-6 sm:mb-9 max-w-lg">
              Download Sable: effortless, borderless banking for a more connected world.
            </p>

            {/* Store Badges with Magnetic Effect and clean Liquid Glass styling */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-5">
              <MagneticButton strength={0.25}>
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noreferrer"
                  className="liquid-glass-btn inline-block p-1 rounded-2xl transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Download on App Store"
                >
                  <img
                    src="/assets/app-store.svg"
                    alt="Download on the App Store"
                    className="h-10 sm:h-13 w-auto object-contain"
                  />
                </a>
              </MagneticButton>

              <MagneticButton strength={0.25}>
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="liquid-glass-btn inline-block p-1 rounded-2xl transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Get it on Google Play"
                >
                  <img
                    src="/assets/google-play.svg"
                    alt="Get it on Google Play"
                    className="h-10 sm:h-13 w-auto object-contain"
                  />
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
