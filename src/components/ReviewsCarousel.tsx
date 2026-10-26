import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    id: 1,
    quote:
      'Fantastic customer service. I shifted from a traditional bank to Sable [and] Sable’s customer service helped me answer all the questions that I needed to switch.',
    author: 'K Oiwake',
  },
  {
    id: 2,
    quote:
      'The best bank for immigrants in the US. Thank you Sable! I have nothing but good things to say about you!',
    author: 'E Berhe',
  },
  {
    id: 3,
    quote:
      'Sable made opening a bank account in the US seamless and instant without waiting for SSN. Truly a lifesaver for international workers.',
    author: 'M Zhang',
  },
  {
    id: 4,
    quote:
      'The cashback rewards and first year match are unbeatable. No other bank offers this level of global citizen support.',
    author: 'D Alvarez',
  },
];

export const ReviewsCarousel: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [ratingDisplay, setRatingDisplay] = useState('0.0');
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setRatingDisplay('4.8');
        return;
      }

      const scoreObj = { val: 0.0 };
      gsap.to(scoreObj, {
        val: 4.8,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
        onUpdate: () => {
          setRatingDisplay(scoreObj.val.toFixed(1));
        },
      });

      gsap.from('.rating-star', {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [touchStart, setTouchStart] = useState<number | null>(null);

  const prev = () => {
    setStartIndex((prevIdx) => (prevIdx === 0 ? REVIEWS.length - 2 : prevIdx - 1));
  };

  const next = () => {
    setStartIndex((prevIdx) => (prevIdx >= REVIEWS.length - 2 ? 0 : prevIdx + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) next();
    if (diff < -50) prev();
    setTouchStart(null);
  };

  const visibleReviews = [
    REVIEWS[startIndex % REVIEWS.length],
    REVIEWS[(startIndex + 1) % REVIEWS.length],
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white py-16 sm:py-36 px-4 sm:px-12 border-t border-[#222226] overflow-hidden select-none"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Rating Score Top Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 sm:mb-16 gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-5xl sm:text-7xl lg:text-[76px] font-medium tracking-tight text-white tabular-nums">
              {ratingDisplay}
            </span>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[#6FDBD4] mb-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="rating-star">
                    <Star size={18} className="sm:w-[22px] sm:h-[22px]" fill="#6FDBD4" stroke="#6FDBD4" />
                  </div>
                ))}
              </div>
              <span className="text-xs sm:text-sm text-[#A0A1A8] uppercase tracking-wider font-medium">
                Average Customer Rating
              </span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 hover:border-white/60 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={20} className="sm:w-[22px] sm:h-[22px]" />
            </button>
            <button
              onClick={next}
              aria-label="Next review"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 hover:border-white/60 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <ChevronRight size={20} className="sm:w-[22px] sm:h-[22px]" />
            </button>
          </div>
        </div>

        {/* Testimonials Side-by-Side 2-Card Layout (Matching User Reference Exactly) */}
        <div
          ref={cardsContainerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
        >
          {visibleReviews.map((review) => (
            <div
              key={review.id}
              className="rounded-[24px] bg-[#1C1C1E] p-6 sm:p-12 border border-white/[0.06] shadow-2xl flex flex-col justify-between transition-all duration-300 hover:border-white/20"
            >
              {/* Top Row: Teal Quote Icon on Left + Quote Text on Right */}
              <div className="flex items-start gap-4 sm:gap-8 mb-8 sm:mb-10">
                {/* Authentic Teal Double Quote Icon */}
                <img
                  src="/assets/quote-icon.svg"
                  alt=""
                  className="w-7 h-5 sm:w-10 sm:h-8 shrink-0 mt-1 object-contain"
                />

                {/* Quote Text */}
                <p className="text-white text-base sm:text-xl lg:text-[24px] font-normal leading-[1.38] sm:leading-[1.32] tracking-normal">
                  {review.quote}
                </p>
              </div>

              {/* Bottom: White Dash Line + Author Name (Indented with the text column) */}
              <div className="flex items-center gap-3 sm:gap-4 pl-11 sm:pl-16">
                <div className="w-10 sm:w-16 h-[2.5px] sm:h-[3px] bg-white rounded-full shrink-0" />
                <span className="text-white font-bold text-sm sm:text-[17px] tracking-wide">
                  {review.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
