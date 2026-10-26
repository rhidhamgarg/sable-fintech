import React from 'react';
import { MagneticButton } from './MagneticButton';
import { ArrowRight } from 'lucide-react';

interface ComparisonTableProps {
  onSelectPlan: (plan: string) => void;
}

interface TableRowData {
  title: string;
  creditDebit: 'check' | 'lock';
  debitOnly: 'check' | 'lock';
}

const ROWS: TableRowData[] = [
  {
    title: 'No monthly fees or minimum balance',
    creditDebit: 'check',
    debitOnly: 'check',
  },
  {
    title: 'Deposits FDIC insured up to $250,000',
    creditDebit: 'check',
    debitOnly: 'check',
  },
  {
    title: 'Rewards, cash back & card perks',
    creditDebit: 'check',
    debitOnly: 'check',
  },
  {
    title: 'Send checks & transfer money for free',
    creditDebit: 'check',
    debitOnly: 'check',
  },
  {
    title: 'Build credit history from Day 1',
    creditDebit: 'check',
    debitOnly: 'lock',
  },
  {
    title: 'No credit check required for sign up',
    creditDebit: 'check',
    debitOnly: 'lock',
  },
];

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ onSelectPlan }) => {
  return (
    <section
      id="compare-sable"
      className="bg-black text-white pt-20 pb-32 px-6 sm:px-12 select-none overflow-hidden"
    >
      {/* Compare Sable Repeating Ribbon */}
      <div className="relative w-full overflow-hidden mb-16 select-none opacity-85">
        <div className="flex shrink-0 items-center gap-12 animate-marquee whitespace-nowrap">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center gap-10">
                <span className="text-4xl sm:text-7xl lg:text-[85px] font-medium tracking-tight text-white/90">
                  Compare Sable
                </span>
                <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white/70" />
              </div>
            ))}
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto overflow-visible">
        {/* Mobile Swipe Hint */}
        <div className="lg:hidden flex items-center justify-center gap-2 text-xs text-white/60 mb-4 bg-white/5 py-1.5 px-4 rounded-full w-max mx-auto border border-white/10">
          <span>← Swipe table to compare →</span>
        </div>

        {/* Scroll wrapper: explicitly prevents vertical scrollbars and allows desktop overflow */}
        <div className="overflow-x-auto lg:overflow-x-visible overflow-y-hidden scrollbar-none pb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="min-w-[600px] sm:min-w-[760px] w-full overflow-visible">
            {/* Table Header: Card Previews & Titles */}
            <div className="grid grid-cols-12 gap-4 sm:gap-6 items-end pb-8 border-b border-white/15">
              <div className="col-span-5 sticky left-0 bg-black/95 sm:bg-transparent z-10" />

              {/* Column 2: Credit & Debit Card */}
              <div className="col-span-4 flex flex-col items-start group">
                <div className="h-20 sm:h-24 mb-3 flex items-center transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="/assets/compare-credit-debit.png"
                    alt="Sable Secured Credit & Debit"
                    className="max-h-16 sm:max-h-20 w-auto object-contain drop-shadow-md"
                  />
                </div>
                <h3 className="text-base sm:text-[21px] font-normal leading-tight text-[#10ACA2]">
                  Sable Secured Credit & Debit Card
                </h3>
              </div>

              {/* Column 3: Debit Only Card */}
              <div className="col-span-3 flex flex-col items-start group">
                <div className="h-20 sm:h-24 mb-3 flex items-center transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="/assets/compare-debit.png"
                    alt="Sable Debit"
                    className="max-h-16 sm:max-h-20 w-auto object-contain drop-shadow-md"
                  />
                </div>
                <h3 className="text-base sm:text-[21px] font-normal leading-tight text-[#10ACA2]">
                  Sable Debit Card
                </h3>
              </div>
            </div>

            {/* Feature Comparison Rows */}
            <div className="divide-y divide-[#222226]">
              {ROWS.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 gap-4 sm:gap-6 items-center py-4 sm:py-5 transition-colors duration-150 hover:bg-white/[0.02]"
                >
                  {/* Feature Label */}
                  <div className="col-span-5 text-[13px] sm:text-[15px] font-normal text-white sticky left-0 bg-black/95 sm:bg-transparent z-10 pr-2">
                    {row.title}
                  </div>

                  {/* Credit & Debit Column */}
                  <div className="col-span-4 flex items-center">
                    {row.creditDebit === 'check' ? (
                      <svg
                        className="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 text-white/40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    )}
                  </div>

                  {/* Debit Only Column */}
                  <div className="col-span-3 flex items-center">
                    {row.debitOnly === 'check' ? (
                      <svg
                        className="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 text-white/40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}

              {/* Cost Row */}
              <div className="grid grid-cols-12 gap-4 sm:gap-6 items-center py-6 sm:py-7">
                <div className="col-span-5 text-[13px] sm:text-[15px] font-normal text-white sticky left-0 bg-black/95 sm:bg-transparent z-10 pr-2">
                  Cost per year
                </div>

                <div className="col-span-4 flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-[42px] font-normal text-white leading-none">
                    $0
                  </span>
                  <span className="text-[10px] text-white/50 tracking-wider">
                    /year
                  </span>
                </div>

                <div className="col-span-3 flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-[42px] font-normal text-white leading-none">
                    $0
                  </span>
                  <span className="text-[10px] text-white/50 tracking-wider">
                    /year
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Buttons Row (with ample padding & overflow-visible) */}
            <div className="grid grid-cols-12 gap-4 sm:gap-6 items-center pt-8 pb-4 border-t border-[#222226] overflow-visible">
              <div className="col-span-5 sticky left-0 bg-black/95 sm:bg-transparent z-10" />

              <div className="col-span-4 overflow-visible">
                <MagneticButton strength={0.2}>
                  <button
                    onClick={() => onSelectPlan('Credit & Debit')}
                    className="liquid-glass-btn-primary group inline-flex items-center justify-center gap-1.5 sm:gap-2 text-black text-[11px] sm:text-[12px] font-semibold tracking-wider uppercase px-4 sm:px-7 py-3 sm:py-3.5 rounded-full cursor-pointer active:scale-95"
                  >
                    <span>Get Credit & Debit</span>
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </MagneticButton>
              </div>

              <div className="col-span-3 overflow-visible">
                <MagneticButton strength={0.2}>
                  <button
                    onClick={() => onSelectPlan('Debit Only')}
                    className="liquid-glass-btn-primary group inline-flex items-center justify-center gap-1.5 sm:gap-2 text-black text-[11px] sm:text-[12px] font-semibold tracking-wider uppercase px-4 sm:px-7 py-3 sm:py-3.5 rounded-full cursor-pointer active:scale-95"
                  >
                    <span>Get Debit</span>
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
