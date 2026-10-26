/**
 * ============================================================
 * Sable Account Onboarding & Product Card Studio
 * UI Architecture, 3D Tilt Physics & Design by Rhidham Garg
 * ============================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import {
  ShieldCheck,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Lock,
  Globe,
  Copy,
  CheckCircle2,
  Building2,
  Smartphone,
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';
import { MagneticButton } from '../components/MagneticButton';

// Detailed plan specification
export interface PlanOption {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  badgeTone: 'teal' | 'gold' | 'silver';
  image: string;
  isVertical: boolean;
  annualFee: string;
  creditLimit: string;
  cashback: string;
  reporting: string;
  material: string;
  highlights: string[];
  features: string[];
  color: string;
}

const PLANS: PlanOption[] = [
  {
    id: 'credit-debit',
    name: 'Sable ONE Secured Credit & Debit',
    tagline: 'The #1 dual-account system to build US credit from Day 1',
    badge: 'Most Popular',
    badgeTone: 'teal',
    image: '/assets/compare-credit-debit.png',
    isVertical: false,
    annualFee: '$0',
    creditLimit: 'Up to $10,000',
    cashback: '2% Cash Back',
    reporting: 'All 3 Bureaus',
    material: 'Dual-Chip Polymer Core',
    highlights: ['No SSN Required', 'All 3 US Bureaus', '2% Cashback Match'],
    features: [
      'Builds US credit with Experian, Equifax & TransUnion monthly',
      'No US credit check & no SSN required for international citizens',
      '2% cash back on Amazon, Uber, Netflix, Spotify & Whole Foods',
      '2X cash back dollar-for-dollar match at end of year one'
    ],
    color: '#10ACA2'
  },
  {
    id: 'metal',
    name: 'Sable World Elite Black Metal',
    tagline: 'Precision-weighted metal with executive concierge & global perks',
    badge: 'Mastercard World Elite',
    badgeTone: 'gold',
    image: '/assets/card-black-gold.png',
    isVertical: true,
    annualFee: '$0',
    creditLimit: 'Up to $10,000',
    cashback: '2% Unlimited',
    reporting: 'All 3 Bureaus',
    material: '17g Laser-Etched Black Steel',
    highlights: ['17g Black Steel', 'Airport Lounge Access', '24/7 Concierge'],
    features: [
      'Substantial 17g matte black & gold physical metal finish',
      '24/7 dedicated Mastercard World Elite luxury concierge',
      'Access to 1,300+ global airport lounges via Mastercard Travel Pass',
      'Cell phone protection & global purchase guarantee included'
    ],
    color: '#D4AF37'
  },
  {
    id: 'debit',
    name: 'Sable Borderless Debit Only',
    tagline: 'Everyday zero-fee US checking account with borderless transfers',
    badge: 'Zero Monthly Fees',
    badgeTone: 'silver',
    image: '/assets/card-debit.png',
    isVertical: true,
    annualFee: '$0',
    creditLimit: 'Checking Only',
    cashback: 'Fee-Free ATMs',
    reporting: 'Checking Account',
    material: 'Recycled Ocean Composite',
    highlights: ['Instant Virtual Card', 'Zero Minimum Deposit', 'Free Global Wires'],
    features: [
      'Instant virtual debit card ready in 5 minutes for Apple Pay',
      'Zero monthly maintenance fees & zero minimum balance requirements',
      'Free nationwide ATM access across 55,000+ Allpoint locations',
      'Direct US routing & account numbers for international wires'
    ],
    color: '#6FDBD4'
  }
];

const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'IN', name: 'India' },
  { code: 'CN', name: 'China' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'CO', name: 'Colombia' },
  { code: 'PH', name: 'Philippines' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'OTHER', name: 'Other International Country' }
];

const VISA_TYPES = [
  'F-1 / OPT (Student / Practical Training)',
  'H-1B (Specialty Occupation)',
  'L-1 (Intracompany Transferee)',
  'J-1 (Exchange Scholar / Visitor)',
  'O-1 (Individuals with Extraordinary Ability)',
  'TN (NAFTA Professional)',
  'E-2 / E-3 (Treaty Investor / Specialty)',
  'Permanent Resident (Green Card Holder)',
  'B-1 / B-2 (Visitor / Business)',
  'Other / Lawful Presence in US'
];

export const OpenAccountPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialPlanParam = searchParams.get('plan');

  const getInitialPlan = () => {
    if (initialPlanParam === 'debit') return PLANS[2];
    if (initialPlanParam === 'metal') return PLANS[1];
    return PLANS[0];
  };

  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<PlanOption>(getInitialPlan());
  const [citizenship, setCitizenship] = useState<'international' | 'us'>('international');

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'IN',
    visaType: 'F-1 / OPT (Student / Practical Training)',
    passportNumber: '',
    ssn: '',
    dob: '',
    street: '',
    apt: '',
    city: '',
    state: 'NY',
    zip: '',
    agreedToTerms: true
  });

  // Approved State
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // 3D Card Glare & Tilt
  const cardStageRef = useRef<HTMLDivElement>(null);
  const tiltCardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const formStageRef = useRef<HTMLDivElement>(null);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  // Handle step transitions smoothly
  useEffect(() => {
    if (formStageRef.current) {
      gsap.fromTo(
        formStageRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Keyboard Enter key shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA') return;
        if (step === 1) {
          e.preventDefault();
          setStep(2);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step]);

  // Interactive 3D Card Tilt + Specular Glare Tracking
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardStageRef.current || !tiltCardRef.current) return;
    const rect = cardStageRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPercent = (mouseX / rect.width) * 100;
    const yPercent = (mouseY / rect.height) * 100;

    const rotateY = (mouseX / rect.width - 0.5) * 20;
    const rotateX = -(mouseY / rect.height - 0.5) * 20;

    setGlarePos({ x: xPercent, y: yPercent, opacity: 0.35 });

    gsap.to(tiltCardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.25,
      ease: 'power2.out'
    });
  };

  const handleCardMouseLeave = () => {
    if (!tiltCardRef.current) return;
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    gsap.to(tiltCardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power3.out'
    });
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fullName = `${formData.firstName || 'RHIDHAM'} ${formData.lastName || 'GARG'}`.toUpperCase();

  const STEPS_NAV = [
    { num: 1, label: 'Choose Plan' },
    { num: 2, label: 'Eligibility' },
    { num: 3, label: 'Identity' },
    { num: 4, label: 'Card Issued' }
  ];

  return (
    <div className="min-h-screen bg-[#070709] text-white font-['Inter',sans-serif] selection:bg-[#6FDBD4] selection:text-black relative">
      {/* Subtle Architectural Grid Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] z-0" />

      {/* Top Application Header */}
      <header className="sticky top-0 z-40 bg-[#070709]/95 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          {/* Logo with clean back navigation */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group" aria-label="Sable Home">
              <img
                src="/assets/sable-logo.svg"
                alt="Sable"
                className="h-6 sm:h-7 w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
              />
            </Link>
            <div className="hidden sm:block h-4 w-[1px] bg-white/15" />
            <span className="hidden sm:inline-flex text-[11px] font-mono tracking-widest text-white/40 uppercase">
              Application Portal
            </span>
          </div>

          {/* Stepper Progress Navigation */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {STEPS_NAV.map((s, idx) => {
              const isPassed = step > s.num;
              const isCurrent = step === s.num;
              return (
                <React.Fragment key={s.num}>
                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 ${
                      isCurrent
                        ? 'bg-white/10 text-white font-medium border border-white/15'
                        : isPassed
                        ? 'text-white/80'
                        : 'text-white/35'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono font-semibold transition-colors ${
                        isPassed
                          ? 'bg-[#10ACA2] text-black'
                          : isCurrent
                          ? 'bg-white text-black'
                          : 'bg-white/10 text-white/50'
                      }`}
                    >
                      {isPassed ? <Check size={12} strokeWidth={3} /> : s.num}
                    </div>
                    <span className="text-xs tracking-tight">{s.label}</span>
                  </div>
                  {idx < STEPS_NAV.length - 1 && (
                    <div className="w-3 h-[1px] bg-white/15" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Security Assurance Badge & Exit */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 text-[11px] text-white/60 bg-white/[0.04] px-3 py-1.5 rounded-full border border-white/[0.08]">
              <Lock size={12} className="text-[#6FDBD4]" />
              <span>256-Bit TLS</span>
              <span className="text-white/20">•</span>
              <span>Member FDIC</span>
            </div>

            <Link
              to="/"
              className="text-xs text-white/60 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/5 flex items-center gap-1"
            >
              <span>Save & Exit</span>
            </Link>
          </div>
        </div>

        {/* Mobile Linear Step Indicator */}
        <div className="md:hidden w-full bg-white/[0.06] h-[2px]">
          <div
            className="bg-[#6FDBD4] h-full transition-all duration-400 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </header>

      {/* Main Studio Frame */}
      <main className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-8 py-6 sm:py-10">
        {step < 4 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* =========================================================
                LEFT COLUMN: Living Card Visualizer & Financial Spec Sheet
               ========================================================= */}
            <div className="lg:col-span-5 flex flex-col space-y-5 lg:sticky lg:top-20">
              
              {/* Product Showcase Stage */}
              <div
                ref={cardStageRef}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="relative rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.09] p-5 sm:p-7 flex flex-col items-center overflow-hidden shadow-2xl transition-all duration-300"
              >
                {/* Ambient top light */}
                <div
                  className="absolute -top-24 -left-24 w-64 h-64 rounded-full pointer-events-none blur-[80px] opacity-20 transition-colors duration-500"
                  style={{ background: selectedPlan.color }}
                />

                {/* Top Stage Metadata */}
                <div className="w-full flex items-center justify-between mb-4 z-10">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full border ${
                        selectedPlan.badgeTone === 'gold'
                          ? 'bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/30'
                          : selectedPlan.badgeTone === 'teal'
                          ? 'bg-[#10ACA2]/15 text-[#6FDBD4] border-[#10ACA2]/30'
                          : 'bg-white/10 text-white/80 border-white/20'
                      }`}
                    >
                      {selectedPlan.badge}
                    </span>
                    <span className="text-[11px] text-white/50 font-mono tracking-tight">
                      {selectedPlan.material} • Rhidham Garg Edition
                    </span>
                  </div>

                  <span className="text-xs font-mono font-medium text-white/90">
                    {selectedPlan.annualFee} / yr
                  </span>
                </div>

                {/* The Hero Card Object (Adaptive height with natural drop shadow & tilt) */}
                <div className="relative w-full h-[170px] sm:h-[220px] lg:h-[240px] flex items-center justify-center my-1 sm:my-2 select-none">
                  <div
                    ref={tiltCardRef}
                    style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                    className="relative max-h-full max-w-full flex items-center justify-center will-change-transform transform-gpu"
                  >
                    <img
                      src={selectedPlan.image}
                      alt={selectedPlan.name}
                      className={`${
                        selectedPlan.isVertical
                          ? 'max-h-[160px] sm:max-h-[220px] w-auto'
                          : 'max-h-[140px] sm:max-h-[190px] w-auto'
                      } object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] rounded-2xl`}
                    />

                    {/* Specular Glare / Metallic Sheen Layer */}
                    <div
                      ref={glareRef}
                      style={{
                        background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.4) 0%, rgba(111,219,212,0.12) 35%, transparent 70%)`,
                        opacity: glarePos.opacity,
                      }}
                      className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-200 mix-blend-overlay"
                    />
                  </div>
                </div>

                {/* Apple-style 4-Metric Financial Spec Sheet */}
                <div className="w-full grid grid-cols-2 gap-2 sm:gap-2.5 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/[0.08]">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-white/40 block">
                      Annual Fee
                    </span>
                    <span className="text-sm font-semibold text-white tracking-tight mt-0.5 block">
                      {selectedPlan.annualFee}
                    </span>
                    <span className="text-[10px] text-white/50 block">No hidden fees</span>
                  </div>

                  <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-white/40 block">
                      Credit Limit
                    </span>
                    <span className="text-sm font-semibold text-white tracking-tight mt-0.5 block">
                      {selectedPlan.creditLimit}
                    </span>
                    <span className="text-[10px] text-white/50 block">Secured or checking</span>
                  </div>

                  <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-white/40 block">
                      Cashback Rewards
                    </span>
                    <span className="text-sm font-semibold text-[#6FDBD4] tracking-tight mt-0.5 block">
                      {selectedPlan.cashback}
                    </span>
                    <span className="text-[10px] text-white/50 block">2X year-end match</span>
                  </div>

                  <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-white/40 block">
                      Bureau Reporting
                    </span>
                    <span className="text-sm font-semibold text-white tracking-tight mt-0.5 block">
                      {selectedPlan.reporting}
                    </span>
                    <span className="text-[10px] text-white/50 block">Monthly score building</span>
                  </div>
                </div>

                {/* Integrated Inclusions inside the same stage */}
                <div className="hidden sm:block w-full mt-4 pt-4 border-t border-white/[0.08] space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                    Key Inclusions
                  </span>
                  <div className="space-y-1.5">
                    {selectedPlan.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-white/70">
                        <Check size={12} className="text-[#6FDBD4] shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Official Bank Guarantee Footer */}
                <div className="w-full flex items-center justify-between mt-4 pt-3 border-t border-white/[0.08] text-[11px] text-white/50">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-[#10ACA2]" />
                    <span>Coastal Community Bank • Member FDIC</span>
                  </div>
                  <span className="font-mono text-[10px] uppercase text-white/40">
                    Mastercard®
                  </span>
                </div>
              </div>
            </div>

            {/* =========================================================
                RIGHT COLUMN: Application Workspace & Multi-Step Forms
               ========================================================= */}
            <div ref={formStageRef} className="lg:col-span-7">
              <div className="rounded-3xl bg-[#0B0C10] border border-white/[0.09] p-6 sm:p-9 shadow-2xl relative">
                
                {/* =====================================================
                    STEP 1: Tier & Plan Selection
                   ===================================================== */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono tracking-widest uppercase text-[#6FDBD4]">
                          Step 01 / 04
                        </span>
                        <span className="text-xs text-white/40">
                          Takes ~3 minutes
                        </span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-1">
                        Select Your Card & Account Tier
                      </h1>
                      <p className="text-xs sm:text-sm text-white/60 mt-1 leading-relaxed">
                        Every Sable account includes high-yield checking, zero minimum deposit, and instant virtual card issuance.
                      </p>
                    </div>

                    {/* 3 Tier Cards (High-Craft Precision Design) */}
                    <div className="space-y-3">
                      {PLANS.map((plan) => {
                        const isSelected = selectedPlan.id === plan.id;
                        return (
                          <div
                            key={plan.id}
                            onClick={() => setSelectedPlan(plan)}
                            className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-200 border relative ${
                              isSelected
                                ? 'bg-white/[0.08] border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                                : 'bg-white/[0.02] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04]'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-3.5">
                                {/* Precision Radio Ring */}
                                <div
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-all duration-200 ${
                                    isSelected
                                      ? 'border-white bg-white text-black'
                                      : 'border-white/30 bg-transparent'
                                  }`}
                                >
                                  {isSelected && <Check size={10} strokeWidth={3} />}
                                </div>

                                <div className="space-y-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <h2 className="text-base font-semibold text-white tracking-tight">
                                      {plan.name}
                                    </h2>
                                    <span
                                      className={`text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border ${
                                        plan.badgeTone === 'gold'
                                          ? 'bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/30'
                                          : plan.badgeTone === 'teal'
                                          ? 'bg-[#10ACA2]/15 text-[#6FDBD4] border-[#10ACA2]/30'
                                          : 'bg-white/10 text-white/70 border-white/20'
                                      }`}
                                    >
                                      {plan.badge}
                                    </span>
                                  </div>
                                  <p className="text-xs text-white/60 leading-relaxed">
                                    {plan.tagline}
                                  </p>

                                  {/* Direct Comparison Chips */}
                                  <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                                    {plan.highlights.map((h, idx) => (
                                      <span
                                        key={idx}
                                        className="text-[10px] text-white/70 bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/[0.06]"
                                      >
                                        ✓ {h}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Price Presentation */}
                              <div className="text-right shrink-0">
                                <span className="text-base font-semibold text-white tracking-tight block">
                                  {plan.annualFee}
                                </span>
                                <span className="text-[10px] text-white/40 block font-mono">
                                  / year
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Step 1 Action Bar */}
                    <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/[0.08]">
                      <div className="flex items-center gap-2 text-xs text-white/50">
                        <Lock size={13} className="text-[#6FDBD4]" />
                        <span>No credit score impact • Zero deposit required</span>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                        <Link
                          to="/"
                          className="text-xs text-white/60 hover:text-white transition-colors px-3 py-2"
                        >
                          Return Home
                        </Link>

                        <button
                          onClick={() => setStep(2)}
                          className="w-full sm:w-auto bg-[#6FDBD4] hover:bg-[#86E4DE] text-black font-semibold text-xs tracking-wider uppercase px-7 py-3 rounded-full cursor-pointer inline-flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
                        >
                          <span>Continue to Eligibility</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* =====================================================
                    STEP 2: Citizenship & Identification
                   ===================================================== */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono tracking-widest uppercase text-[#6FDBD4]">
                          Step 02 / 04
                        </span>
                        <span className="text-xs text-white/40">
                          Identity Verification
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-1">
                        Citizenship & Regulatory Compliance
                      </h2>
                      <p className="text-xs sm:text-sm text-white/60 mt-1 leading-relaxed">
                        Sable is custom-engineered for international citizens and US residents alike. Apply with or without a US SSN.
                      </p>
                    </div>

                    {/* Segmented Control Toggle */}
                    <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                      <button
                        type="button"
                        onClick={() => setCitizenship('international')}
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          citizenship === 'international'
                            ? 'bg-white text-black font-semibold shadow-md'
                            : 'text-white/60 hover:text-white'
                        }`}
                      >
                        <Globe size={15} />
                        <span>International (No SSN)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setCitizenship('us')}
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          citizenship === 'us'
                            ? 'bg-white text-black font-semibold shadow-md'
                            : 'text-white/60 hover:text-white'
                        }`}
                      >
                        <Building2 size={15} />
                        <span>U.S. Citizen / Resident</span>
                      </button>
                    </div>

                    {/* International Flow Fields */}
                    {citizenship === 'international' ? (
                      <div className="space-y-4">
                        {/* Regulatory Exemption Card */}
                        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                          <CheckCircle2 size={16} className="text-[#6FDBD4] shrink-0 mt-0.5" />
                          <div className="text-xs text-white/80 leading-relaxed space-y-0.5">
                            <p className="font-semibold text-white">
                              No Social Security Number (SSN) Required
                            </p>
                            <p className="text-white/60 text-[11px]">
                              Under USA PATRIOT Act Section 326 federal guidelines, international citizens in the US may open an account with a valid international passport and US visa.
                            </p>
                          </div>
                        </div>

                        {/* Country of Origin */}
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                            Country of Origin / Passport Issuer
                          </label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full bg-[#121319] border border-white/[0.12] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors cursor-pointer"
                          >
                            {COUNTRIES.map((c) => (
                              <option key={c.code} value={c.code} className="bg-[#121319] text-white">
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Visa Type */}
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                            Current U.S. Visa / Status
                          </label>
                          <select
                            name="visaType"
                            value={formData.visaType}
                            onChange={handleInputChange}
                            className="w-full bg-[#121319] border border-white/[0.12] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/50 transition-colors cursor-pointer"
                          >
                            {VISA_TYPES.map((v, i) => (
                              <option key={i} value={v} className="bg-[#121319] text-white">
                                {v}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Passport Number */}
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                            International Passport Number
                          </label>
                          <input
                            type="text"
                            name="passportNumber"
                            placeholder="e.g. Z98765432"
                            value={formData.passportNumber}
                            onChange={handleInputChange}
                            className="w-full bg-[#121319] border border-white/[0.12] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors font-mono uppercase"
                          />
                        </div>
                      </div>
                    ) : (
                      /* US Citizen Flow */
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                            Social Security Number (SSN) or ITIN
                          </label>
                          <input
                            type="text"
                            name="ssn"
                            maxLength={11}
                            placeholder="XXX-XX-XXXX"
                            value={formData.ssn}
                            onChange={handleInputChange}
                            className="w-full bg-[#121319] border border-white/[0.12] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors font-mono"
                          />
                          <span className="text-[11px] text-white/40 block mt-1.5">
                            🔒 Soft inquiry only via Experian. Will never impact your credit score.
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Step 2 Action Bar */}
                    <div className="pt-3 flex items-center justify-between border-t border-white/[0.08]">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs text-white/60 hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer py-2 px-2"
                      >
                        <ArrowLeft size={14} />
                        <span>Back</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="bg-[#6FDBD4] hover:bg-[#86E4DE] text-black font-semibold text-xs tracking-wider uppercase px-7 py-3 rounded-full cursor-pointer inline-flex items-center gap-2 transition-all active:scale-95 shadow-md"
                      >
                        <span>Personal Details</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {/* =====================================================
                    STEP 3: Personal & Residential Address
                   ===================================================== */}
                {step === 3 && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setStep(4);
                    }}
                    className="space-y-5"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono tracking-widest uppercase text-[#6FDBD4]">
                          Step 03 / 04
                        </span>
                        <span className="text-xs text-white/40">
                          Bank Verification
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-1">
                        Personal & Residential Details
                      </h2>
                      <p className="text-xs sm:text-sm text-white/60 mt-1 leading-relaxed">
                        Required by Coastal Community Bank (Member FDIC) to issue your routing number and physical card.
                      </p>
                    </div>

                    {/* First & Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                          Legal First Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            name="firstName"
                            placeholder="Rhidham"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full bg-[#121319] border border-white/[0.12] rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors"
                          />
                          <User size={15} className="absolute left-3.5 top-3.5 text-white/40" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                          Legal Last Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            name="lastName"
                            placeholder="Garg"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full bg-[#121319] border border-white/[0.12] rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors"
                          />
                          <User size={15} className="absolute left-3.5 top-3.5 text-white/40" />
                        </div>
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            name="email"
                            placeholder="rhidham.garg@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-[#121319] border border-white/[0.12] rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors"
                          />
                          <Mail size={15} className="absolute left-3.5 top-3.5 text-white/40" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                          U.S. Phone Number
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            required
                            name="phone"
                            placeholder="+1 (555) 019-2834"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full bg-[#121319] border border-white/[0.12] rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors"
                          />
                          <Phone size={15} className="absolute left-3.5 top-3.5 text-white/40" />
                        </div>
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          required
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          className="w-full bg-[#121319] border border-white/[0.12] rounded-xl px-4 py-3 pl-10 text-sm text-white focus:outline-none focus:border-white/50 transition-colors"
                        />
                        <Calendar size={15} className="absolute left-3.5 top-3.5 text-white/40" />
                      </div>
                    </div>

                    {/* Physical Delivery Address */}
                    <div className="space-y-2.5 pt-1">
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/60">
                        U.S. Residential & Card Delivery Address
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          name="street"
                          placeholder="Street Address or Campus Hall"
                          value={formData.street}
                          onChange={handleInputChange}
                          className="w-full bg-[#121319] border border-white/[0.12] rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors"
                        />
                        <MapPin size={15} className="absolute left-3.5 top-3.5 text-white/40" />
                      </div>

                      <div className="grid grid-cols-3 gap-2.5">
                        <input
                          type="text"
                          name="apt"
                          placeholder="Apt / Suite"
                          value={formData.apt}
                          onChange={handleInputChange}
                          className="bg-[#121319] border border-white/[0.12] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors"
                        />
                        <input
                          type="text"
                          required
                          name="city"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="bg-[#121319] border border-white/[0.12] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors"
                        />
                        <input
                          type="text"
                          required
                          name="zip"
                          placeholder="ZIP Code"
                          value={formData.zip}
                          onChange={handleInputChange}
                          className="bg-[#121319] border border-white/[0.12] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors font-mono"
                        />
                      </div>
                    </div>

                    {/* Bank Security Certification */}
                    <div className="flex items-start gap-2 text-xs text-white/50 pt-1">
                      <Lock size={13} className="shrink-0 mt-0.5 text-[#6FDBD4]" />
                      <span>
                        Your information is encrypted with bank-level 256-bit TLS security and securely transmitted to Coastal Community Bank (Member FDIC).
                      </span>
                    </div>

                    {/* Step 3 Action Bar */}
                    <div className="pt-3 flex items-center justify-between border-t border-white/[0.08]">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-xs text-white/60 hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer py-2 px-2"
                      >
                        <ArrowLeft size={14} />
                        <span>Back</span>
                      </button>

                      <button
                        type="submit"
                        className="bg-[#6FDBD4] hover:bg-[#86E4DE] text-black font-semibold text-xs tracking-wider uppercase px-8 py-3.5 rounded-full cursor-pointer inline-flex items-center gap-2 transition-all active:scale-95 shadow-md"
                      >
                        <Sparkles size={15} />
                        <span>Verify & Issue Card</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* =========================================================
              STEP 4: Approved & Instant Virtual Card Terminal
             ========================================================= */
          <div className="max-w-3xl mx-auto space-y-7 animate-in fade-in duration-300">
            {/* Header Congratulatory Banner */}
            <div className="text-center space-y-2.5">
              <div className="w-13 h-13 rounded-full bg-[#10ACA2]/15 text-[#6FDBD4] flex items-center justify-center mx-auto border border-[#10ACA2]/30 p-3">
                <CheckCircle2 size={26} />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#6FDBD4] block">
                Instant Decision Confirmed • Account Active
              </span>
              <h1 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight">
                Welcome to Sable, {formData.firstName || 'Rhidham'}!
              </h1>
              <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto leading-relaxed">
                Your <span className="text-white font-medium">{selectedPlan.name}</span> account has been issued. Your virtual card is live and ready for immediate transactions.
              </p>
            </div>

            {/* Issued Interactive Virtual Card Container */}
            <div className="rounded-3xl bg-[#0B0C10] border border-white/[0.1] p-6 sm:p-9 shadow-2xl relative overflow-hidden">
              <div className="max-w-md mx-auto">
                {/* Virtual Card Graphic */}
                <div
                  className="relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden p-6 shadow-2xl border border-white/20 flex flex-col justify-between"
                  style={{
                    background:
                      selectedPlan.id === 'metal'
                        ? 'linear-gradient(135deg, #1C1C20 0%, #09090B 100%)'
                        : selectedPlan.id === 'debit'
                        ? 'linear-gradient(135deg, #0D2825 0%, #061413 100%)'
                        : 'linear-gradient(135deg, #0F2A30 0%, #061114 100%)'
                  }}
                >
                  {/* Subtle Holographic Glare */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between relative z-10">
                    <img src="/assets/sable-logo.svg" alt="Sable" className="h-5 w-auto object-contain" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#6FDBD4] bg-[#6FDBD4]/15 px-2.5 py-0.5 rounded-full border border-[#6FDBD4]/25 font-mono">
                      Virtual Ready
                    </span>
                  </div>

                  {/* Card Number */}
                  <div className="my-auto relative z-10 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-base sm:text-xl tracking-[0.22em] text-white">
                        {showCardNumber ? '5424  8910  4432  9821' : '••••  ••••  ••••  9821'}
                      </span>
                      <button
                        onClick={() => setShowCardNumber(!showCardNumber)}
                        className="text-white/60 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                        title={showCardNumber ? 'Hide numbers' : 'Show numbers'}
                      >
                        {showCardNumber ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Card Bottom: Holder Name, Expiry & Mastercard Logo */}
                  <div className="flex items-end justify-between relative z-10">
                    <div>
                      <span className="text-[9px] text-white/50 uppercase block font-mono">
                        Cardholder
                      </span>
                      <span className="font-mono text-xs uppercase tracking-wider text-white font-medium">
                        {fullName}
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] text-white/50 uppercase block font-mono">
                        Valid Thru
                      </span>
                      <span className="font-mono text-xs text-white">
                        08/29
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] text-white/50 uppercase block font-mono">
                        CVV
                      </span>
                      <span className="font-mono text-xs text-white">
                        {showCardNumber ? '834' : '•••'}
                      </span>
                    </div>

                    <div className="flex -space-x-2">
                      <div className="w-5 h-5 rounded-full bg-[#EB001B] opacity-90" />
                      <div className="w-5 h-5 rounded-full bg-[#F79E1B] opacity-90" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Numbers & Routing Box */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block">
                      Routing Number (Coastal Community Bank)
                    </span>
                    <span className="font-mono text-sm sm:text-base text-white font-semibold mt-0.5 block">
                      125108390
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('125108390', 'routing')}
                    className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white transition-all cursor-pointer"
                    title="Copy routing number"
                  >
                    {copiedField === 'routing' ? <Check size={16} className="text-[#6FDBD4]" /> : <Copy size={16} />}
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block">
                      Checking Account Number
                    </span>
                    <span className="font-mono text-sm sm:text-base text-white font-semibold mt-0.5 block">
                      8921094821
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('8921094821', 'account')}
                    className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white transition-all cursor-pointer"
                    title="Copy account number"
                  >
                    {copiedField === 'account' ? <Check size={16} className="text-[#6FDBD4]" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              {/* Physical Card Delivery & Mobile App Next Steps */}
              <div className="mt-7 pt-7 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Smartphone size={20} className="text-[#6FDBD4] shrink-0" />
                  <p className="text-xs text-white/70 leading-relaxed">
                    Physical card manufactured in Wilmington, DE ships to <span className="text-white font-semibold">{formData.city || 'your address'}</span> via FedEx 2-Day Air.
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    to="/"
                    className="w-full sm:w-auto text-center px-5 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs uppercase tracking-wider font-semibold transition-colors"
                  >
                    Return Home
                  </Link>
                  <MagneticButton strength={0.3}>
                    <button
                      onClick={() => alert('Sable Mobile App download link sent to ' + (formData.phone || 'your phone number') + '!')}
                      className="w-full sm:w-auto bg-[#6FDBD4] hover:bg-[#86E4DE] text-black font-semibold text-xs tracking-wider uppercase px-7 py-3 rounded-full cursor-pointer transition-all active:scale-95 shadow-md"
                    >
                      Get Mobile App
                    </button>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
