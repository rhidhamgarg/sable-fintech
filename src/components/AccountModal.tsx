import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: string;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  defaultPlan = 'Secured Credit & Debit',
}) => {
  const [step, setStep] = useState(1);
  const [citizenship, setCitizenship] = useState<'us' | 'international'>('international');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    plan: defaultPlan,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-none rounded-3xl liquid-glass-elevated p-5 sm:p-8 shadow-2xl text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </button>

        {step === 1 ? (
          <div>
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-[#6FDBD4] font-semibold">
                Get Started in 5 Minutes
              </span>
              <h3 className="text-2xl font-bold mt-1">Open your Sable Account</h3>
              <p className="text-sm text-[#A0A1A8] mt-1">
                No credit history, credit check, or minimum deposit required.
              </p>
            </div>

            {/* Citizenship Selector */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setCitizenship('international')}
                className={`py-3 px-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all text-left ${
                  citizenship === 'international'
                    ? 'border-[#6FDBD4] bg-[#6FDBD4]/15 text-white shadow-md'
                    : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                <span className="block font-semibold">Non-U.S. Citizen</span>
                <span className="text-[11px] text-white/60">Passport & Visa accepted</span>
              </button>

              <button
                type="button"
                onClick={() => setCitizenship('us')}
                className={`py-3 px-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all text-left ${
                  citizenship === 'us'
                    ? 'border-[#6FDBD4] bg-[#6FDBD4]/15 text-white shadow-md'
                    : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                <span className="block font-semibold">U.S. Citizen / Resident</span>
                <span className="text-[11px] text-white/60">SSN required</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#A0A1A8] mb-1">First Name</label>
                  <input
                    required
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Jane"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#6FDBD4]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A0A1A8] mb-1">Last Name</label>
                  <input
                    required
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#6FDBD4]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#A0A1A8] mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane.doe@example.com"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#6FDBD4]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#A0A1A8] mb-1">Selected Plan</label>
                <select
                  value={formData.plan}
                  onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                  className="w-full bg-[#18181B] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#6FDBD4]"
                >
                  <option value="Secured Credit & Debit">Sable Secured Credit & Debit Card</option>
                  <option value="Debit Only">Sable Debit Card Only</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2 text-[11px] text-[#A0A1A8]">
                <ShieldCheck size={16} className="text-[#6FDBD4] shrink-0" />
                <span>FDIC insured up to $250,000 via Coastal Community Bank. 256-bit encryption.</span>
              </div>

              <button
                type="submit"
                className="w-full liquid-glass-btn-primary text-black font-semibold text-sm tracking-wider uppercase py-3.5 rounded-full mt-4 cursor-pointer active:scale-98"
              >
                Continue Application
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#6FDBD4]/20 text-[#6FDBD4] flex items-center justify-center mx-auto mb-4 border border-[#6FDBD4]/30">
              <CheckCircle size={36} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Welcome to Sable, {formData.firstName}!</h3>
            <p className="text-sm text-[#A0A1A8] max-w-sm mx-auto mb-6">
              We've dispatched your account setup link to <span className="text-white font-medium">{formData.email}</span>. Complete your ID verification on your phone in under 3 minutes.
            </p>
            <button
              onClick={onClose}
              className="liquid-glass-btn text-white text-xs font-semibold tracking-wider uppercase px-8 py-3 rounded-full cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
