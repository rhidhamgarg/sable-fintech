import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: 'Can I apply for Sable without an SSN or U.S. credit history?',
    answer:
      'Yes! Non-U.S. citizens can open a bank account and get a secured credit card with just a passport and visa. You do not need an SSN or U.S. credit history to start building your credit.',
  },
  {
    question: 'How fast can I open an account and access my funds?',
    answer:
      'Applying takes under 5 minutes from your smartphone or desktop. Once approved, you receive instant access to your virtual debit and credit card, with your physical metal card shipped to your address.',
  },
  {
    question: 'Are my deposits insured by the FDIC?',
    answer:
      'Yes, Sable deposits are FDIC insured up to $250,000 per depositor through Coastal Community Bank, Member FDIC.',
  },
  {
    question: 'How does the 2% cashback and 2X first year match work?',
    answer:
      'You earn 2% cash back on purchases made at favorite brands like Amazon, Uber, Spotify, Netflix, and Whole Foods, plus 1% cash back on all other purchases. At the end of your first year, Sable matches 100% of the cash back you earned!',
  },
];

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="bg-[#07070A] text-white py-24 sm:py-36 px-6 sm:px-12 border-t border-white/10 relative">
      <div className="max-w-[850px] mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill text-xs uppercase tracking-widest text-[#6FDBD4] font-semibold mb-3">
            <span>Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mt-1">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                openIdx === i
                  ? 'liquid-glass-elevated border-[#6FDBD4]/35'
                  : 'liquid-glass opacity-80 hover:opacity-100'
              }`}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
              >
                <span className="text-base sm:text-lg font-medium pr-4">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-[#6FDBD4] shrink-0 transition-transform duration-300 ${
                    openIdx === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIdx === i && (
                <div className="px-6 pb-6 text-sm text-[#A0A1A8] leading-relaxed border-t border-white/10 pt-4 animate-in fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
