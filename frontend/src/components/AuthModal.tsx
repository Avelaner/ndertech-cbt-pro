import React, { useState, useEffect } from 'react';
import { X, GraduationCap, ShieldCheck, Lock, User, Mail, AlertCircle } from 'lucide-react';
import type { Candidate, User as UserType } from '../types';
import { verifyCpanelCredentials } from '../data/cpanelData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCandidateLogin: (candidate: Candidate) => void;
  onAdminLogin: (user: UserType) => void;
  defaultRole?: 'candidate' | 'admin';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onCandidateLogin,
  onAdminLogin,
  defaultRole = 'candidate',
}) => {
  const [authRole, setAuthRole] = useState<'candidate' | 'admin'>(defaultRole);
  const [candidateReg, setCandidateReg] = useState('JAMB2026172925');
  const [candidatePass, setCandidatePass] = useState('123456');
  const [adminEmail, setAdminEmail] = useState('nderavela@gmail.com');
  const [adminPass, setAdminPass] = useState('123456');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (defaultRole) {
      setAuthRole(defaultRole);
      setErrorMessage(null);
    }
  }, [defaultRole, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const identifier = authRole === 'candidate' ? candidateReg.trim() : adminEmail.trim();
    const password = authRole === 'candidate' ? candidatePass.trim() : adminPass.trim();

    if (!identifier || !password) {
      setErrorMessage('Please enter both your identifier and password.');
      return;
    }

    try {
      // 1. Try unified authentication via backend API
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: identifier, password }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data && data.status === 'success') {
        if (data.token) {
          localStorage.setItem('cbt_token', data.token);
        }
        if (data.role === 'admin' && data.user) {
          onAdminLogin(data.user);
          onClose();
          return;
        } else if (data.candidate) {
          onCandidateLogin(data.candidate);
          onClose();
          return;
        }
      }

      if (data && data.message) {
        setErrorMessage(data.message);
        return;
      }
      setErrorMessage('Invalid credentials. Please verify your credentials.');
      return;
    } catch {
      // 2. Strict cPanel database verification if server offline
      const result = verifyCpanelCredentials(identifier, password);
      if (result.success) {
        if (result.role === 'admin' && result.user) {
          onAdminLogin(result.user);
          onClose();
          return;
        } else if (result.candidate) {
          onCandidateLogin(result.candidate);
          onClose();
          return;
        }
      } else {
        // STRICT REJECTION — NO DEMO FALLBACK!
        setErrorMessage(result.message);
        return;
      }
    }
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

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
            <span>{errorMessage}</span>
          </div>
        )}

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
