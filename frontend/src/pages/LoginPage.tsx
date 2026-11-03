import React, { useState } from 'react';
import { Laptop, LockOpen, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import type { Candidate, User } from '../types';
import { verifyCpanelCredentials } from '../data/cpanelData';

interface LoginPageProps {
  onBackToHome: () => void;
  onCandidateLogin: (candidate: Candidate) => void;
  onAdminLogin: (user: User) => void;
  onNavigateToRegister: () => void;
  onNavigateToForgotPassword: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onBackToHome,
  onCandidateLogin,
  onAdminLogin,
  onNavigateToRegister,
  onNavigateToForgotPassword,
}) => {
  const [username, setUsername] = useState('JAMB2026172925');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const cleanUser = username.trim();
    const cleanPass = password.trim();

    if (!cleanUser || !cleanPass) {
      setErrorMessage('Please enter both your login ID and password.');
      setIsLoading(false);
      return;
    }

    try {
      // 1. Unified authentication via Backend API (port 8080)
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUser, password: cleanPass }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data && data.status === 'success') {
        if (data.token) {
          localStorage.setItem('cbt_token', data.token);
        }
        if (data.role === 'admin' && data.user) {
          onAdminLogin(data.user);
          return;
        } else if (data.candidate) {
          onCandidateLogin(data.candidate);
          return;
        }
      }

      // If server responded with error (e.g. 401 Unauthorized):
      if (data && data.message) {
        setErrorMessage(data.message);
        setIsLoading(false);
        return;
      }

      setErrorMessage('Invalid credentials. Please verify your registration number or email and password.');
      setIsLoading(false);
      return;
    } catch {
      // 2. Client-side authentication against real cPanel data if backend is offline
      const result = verifyCpanelCredentials(cleanUser, cleanPass);
      if (result.success) {
        if (result.role === 'admin' && result.user) {
          onAdminLogin(result.user);
          return;
        } else if (result.candidate) {
          onCandidateLogin(result.candidate);
          return;
        }
      } else {
        // STRICT REJECTION — NO DEMO FALLBACK!
        setErrorMessage(result.message);
        setIsLoading(false);
        return;
      }
    }
  };

  return (
    <div className="min-h-screen bg-radial from-[#e9f2ff] to-[#f8fbff] flex flex-col justify-between p-4 sm:p-6">
      {/* Top back navigation */}
      <div className="max-w-md w-full mx-auto pt-4">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-white px-3.5 py-2 rounded-xl shadow-xs border border-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </button>
      </div>

      <div className="max-w-md w-full mx-auto my-auto py-8">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <a href="#" onClick={onBackToHome} className="inline-flex items-center gap-2 text-2xl font-black text-slate-900 tracking-tight">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Laptop className="w-5 h-5" />
            </div>
            <span>Ndertech CBT Pro</span>
          </a>
          <p className="text-xs text-slate-500 mt-1">Next-Generation Examination System</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 text-xl shadow-xs">
            <LockOpen className="w-6 h-6" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-center text-slate-900 mb-1">
            Welcome Back
          </h2>
          <p className="text-xs text-slate-500 text-center mb-6">
            Enter your credentials to access your portal.
          </p>

          {errorMessage && (
            <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Registration No. or Email
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Registration No. or Email"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={onNavigateToForgotPassword}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all text-sm mt-2 disabled:opacity-50"
            >
              {isLoading ? 'Authenticating...' : 'Sign In to Portal'}
            </button>
          </form>

          <div className="text-center mt-6 pt-6 border-t border-slate-100 text-xs text-slate-500">
            Don't have an account?{' '}
            <button
              onClick={onNavigateToRegister}
              className="text-blue-600 font-bold hover:underline"
            >
              Register Now
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
