import React, { useState } from 'react';
import { X, GraduationCap, ShieldCheck, Lock, User, Mail } from 'lucide-react';
import type { Candidate, User as UserType } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCandidateLogin: (candidate: Candidate) => void;
  onAdminLogin: (user: UserType) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onCandidateLogin,
  onAdminLogin,
}) => {
  const [authRole, setAuthRole] = useState<'candidate' | 'admin'>('candidate');
  const [candidateReg, setCandidateReg] = useState('JAMB2026172925');
  const [candidatePass, setCandidatePass] = useState('123456');
  const [adminEmail, setAdminEmail] = useState('admin@ndertech.com');
  const [adminPass, setAdminPass] = useState('password');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authRole === 'candidate') {
      onCandidateLogin({
        id: 1,
        reg_number: candidateReg || 'JAMB2026172925',
        full_name: 'Avela Marcel',
        email: 'ndertech@gmail.com',
        program_name: 'JAMB UTME CBT 2027',
        org_id: 1,
      });
    } else {
      onAdminLogin({
        id: 1,
        full_name: 'Institution Administrator',
        email: adminEmail || 'admin@ndertech.com',
        role: 'admin',
        org_id: 1,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-3 font-bold text-xl shadow-md">
            N
          </div>
          <h3 className="text-xl font-bold text-slate-900">Sign in to Ndertech CBT Pro</h3>
          <p className="text-xs text-slate-500 mt-1">Select your account type to proceed</p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setAuthRole('candidate')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              authRole === 'candidate'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Candidate</span>
          </button>
          <button
            type="button"
            onClick={() => setAuthRole('admin')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              authRole === 'admin'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Administrator</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {authRole === 'candidate' ? (
            <>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Registration Number
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={candidateReg}
                    onChange={(e) => setCandidateReg(e.target.value)}
                    placeholder="e.g. JAMB2026172925"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Access PIN / Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={candidatePass}
                    onChange={(e) => setCandidatePass(e.target.value)}
                    placeholder="Enter examination pin"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Staff Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="admin@ndertech.com"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md mt-2"
          >
            Authenticate & Proceed
          </button>
        </form>
      </div>
    </div>
  );
};
