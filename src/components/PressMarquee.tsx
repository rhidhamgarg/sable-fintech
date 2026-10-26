import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PRESS_LOGOS = [
  { name: 'Yahoo Finance', src: '/assets/yahoo-finance.svg', height: 'h-8 sm:h-9' },
  { name: 'Bloomberg', src: '/assets/logo-bloomberg.svg', height: 'h-7 sm:h-8' },
  { name: 'Business Insider', src: '/assets/logo-business-insider.svg', height: 'h-7 sm:h-8' },
  { name: 'Forbes', src: '/assets/logo-forbes.svg', height: 'h-6 sm:h-7' },
];

export const PressMarquee: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Section fade & scale reveal on scroll
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });

      // Velocity skew effect on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const skew = velocity / 300;
          const clampedSkew = Math.max(Math.min(skew, 5), -5);
          gsap.to(trackRef.current, {
            skewX: clampedSkew,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#1C1C1E] py-14 sm:py-20 border-t border-b border-white/5 overflow-hidden select-none"
    >
      <div className="relative w-full overflow-hidden flex">
        {/* Infinite Looping Ribbon */}
        <div
          ref={trackRef}
          className="flex shrink-0 items-center gap-16 sm:gap-28 animate-marquee will-change-transform"
        >
          {PRESS_LOGOS.concat(PRESS_LOGOS).concat(PRESS_LOGOS).map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300 px-4 group"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className={`${logo.height} w-auto object-contain filter brightness-200 grayscale contrast-125 transition-transform duration-300 group-hover:scale-110`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
