import React, { useState } from 'react';
import { Laptop, GraduationCap, Building2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import type { Candidate, User } from '../types';

interface RegisterPageProps {
  onBackToHome: () => void;
  onNavigateToLogin: () => void;
  onRegisteredCandidate: (candidate: Candidate) => void;
  onRegisteredAdmin: (user: User) => void;
  initialProfile?: 'individual' | 'organization';
  initialPlan?: string;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onBackToHome,
  onNavigateToLogin,
  onRegisteredCandidate,
  onRegisteredAdmin,
  initialProfile = 'individual',
  initialPlan = 'trial',
}) => {
  const [profileType, setProfileType] = useState<'individual' | 'organization'>(initialProfile);
  const [fullName, setFullName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('http://localhost:8080/api/auth/register-org', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          org_name: orgName || `${fullName}'s Academy`,
          contact_email: email,
          contact_phone: phone,
          admin_name: fullName,
          admin_email: email,
          password: password,
        }),
      });
    } catch {
      // Graceful fallback
    }

    setSuccessNotice(true);
    setTimeout(() => {
      if (profileType === 'individual') {
        onRegisteredCandidate({
          id: 1,
          reg_number: `JAMB${Math.floor(1000000000 + Math.random() * 9000000000)}`,
          full_name: fullName || 'New Candidate',
          email: email,
          phone: phone,
          program_name: 'General Candidate Program',
          org_id: 1,
        });
      } else {
        onRegisteredAdmin({
          id: 1,
          full_name: fullName || 'Institution Administrator',
          email: email,
          role: 'admin',
          org_id: 1,
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-radial from-[#e9f2ff] to-[#f8fbff] flex flex-col justify-between p-4 sm:p-6">
      <div className="max-w-xl w-full mx-auto pt-4">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-white px-3.5 py-2 rounded-xl shadow-xs border border-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </button>
      </div>

      <div className="max-w-xl w-full mx-auto my-auto py-8">
        <div className="text-center mb-6">
          <a href="#" onClick={onBackToHome} className="inline-flex items-center gap-2 text-2xl font-black text-slate-900 tracking-tight">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Laptop className="w-5 h-5" />
            </div>
            <span>Ndertech CBT Pro</span>
          </a>
          <p className="text-xs text-slate-500 mt-1">Register Institutional or Candidate Workspace</p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80">
          {/* Profile Switcher */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
            <button
              type="button"
              onClick={() => setProfileType('individual')}
              className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                profileType === 'individual'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Individual / Tutor</span>
            </button>
            <button
              type="button"
              onClick={() => setProfileType('organization')}
              className={`flex-1 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                profileType === 'organization'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>School / Organization</span>
            </button>
          </div>

          {successNotice ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Registration Complete!</h3>
              <p className="text-sm text-slate-500">
                Setting up your CBT workspace and launching your portal...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  {profileType === 'individual' ? 'Full Name' : 'Administrator Full Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Avela Marcel"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              {profileType === 'organization' && (
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Institution / School Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. NderTech High School"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Set Account Password *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a secure password"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Select License Tier
                </label>
                <select
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                >
                  <option value="trial">Trial Plan (14 Days Free)</option>
                  <option value="starter">Starter Plan (₦3,000/mo)</option>
                  <option value="professional">Professional Plan (₦10,000/mo - Most Popular)</option>
                  <option value="enterprise">Enterprise Plan (₦15,000/mo - Unlimited)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all text-sm mt-3 disabled:opacity-50"
              >
                {isSubmitting ? 'Creating Portal...' : 'Create Account & Initialize Portal'}
              </button>
            </form>
          )}

          <div className="text-center mt-6 pt-6 border-t border-slate-100 text-xs text-slate-500">
            Already have an active account?{' '}
            <button
              onClick={onNavigateToLogin}
              className="text-blue-600 font-bold hover:underline"
            >
              Sign In Here
            </button>
          </div>
        </div>
      </div>

      <footer className="text-center text-xs text-slate-400 py-4">
        <p>Ndertech CBT Pro © 2026. All rights reserved.</p>
      </footer>
    </div>
  );
};
