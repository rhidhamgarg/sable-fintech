/**
 * 3D Product Card Showcase & Physics
 * Engineered & Designed by Rhidham Garg
 */

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CardShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Scroll-based parallax entrance
      gsap.from(cardContainerRef.current, {
        scale: 0.85,
        opacity: 0,
        y: 80,
        rotateX: 20,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      // Ambient card float
      gsap.to(cardRef.current, {
        y: '+=14',
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    // Interactive 3D Card Tilt + Specular Glare
    const handleMouseMove = (e: MouseEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!cardContainerRef.current || !cardRef.current) return;

      const rect = cardContainerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (
        mouseX < -100 ||
        mouseX > rect.width + 100 ||
        mouseY < -100 ||
        mouseY > rect.height + 100
      ) {
        return;
      }

      const xPercent = (mouseX / rect.width) * 100;
      const yPercent = (mouseY / rect.height) * 100;

      const rotateY = (mouseX / rect.width - 0.5) * 28;
      const rotateX = -(mouseY / rect.height - 0.5) * 28;

      setGlarePos({ x: xPercent, y: yPercent, opacity: 0.45 });

      gsap.to(cardRef.current, {
        rotateX,
        rotateY,
        transformPerspective: 1200,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      setGlarePos((prev) => ({ ...prev, opacity: 0 }));
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    const container = cardContainerRef.current;
    if (container) {
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
      if (container) container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050507] py-16 sm:py-36 px-4 sm:px-12 overflow-hidden flex items-center justify-center select-none"
    >
      {/* Background radial ambient gradient */}
      <div className="absolute w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#6FDBD4]/15 via-[#1FC6BB]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] w-full mx-auto flex flex-col items-center justify-center relative z-10">
        {/* Subtle Liquid Glass Pill Label */}
        <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full liquid-glass-pill text-[10px] sm:text-xs font-semibold text-white/80 tracking-widest uppercase">
          <span>Weighted Metal Finish</span>
          <span className="text-[#6FDBD4]">•</span>
          <span className="text-[#6FDBD4]">Mastercard World Elite</span>
          <span className="text-white/30">•</span>
          <span className="text-[#6FDBD4]">Rhidham Garg Edition</span>
        </div>

        {/* 3D Card Showcase Wrapper */}
        <div
          ref={cardContainerRef}
          style={{ perspective: 1200 }}
          className="relative group max-w-[480px] sm:max-w-[580px] w-full flex items-center justify-center cursor-pointer p-3 sm:p-4 rounded-3xl liquid-glass"
        >
          <div
            ref={cardRef}
            className="relative w-full h-auto will-change-transform transform-gpu"
          >
            <img
              src="/assets/card-black-gold.png"
              alt="Sable Premium Black Metal Card"
              className="w-full h-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.95)] rounded-2xl"
            />

            {/* Specular Glare / Metallic Sheen Layer */}
            <div
              ref={glareRef}
              style={{
                background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.4) 0%, rgba(111,219,212,0.15) 30%, transparent 65%)`,
                opacity: glarePos.opacity,
              }}
              className="absolute inset-0 rounded-[28px] pointer-events-none transition-opacity duration-300 mix-blend-overlay"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
