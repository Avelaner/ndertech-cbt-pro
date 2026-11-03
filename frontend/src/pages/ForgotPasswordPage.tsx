import React, { useState } from 'react';
import { Laptop, KeyRound, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface ForgotPasswordPageProps {
  onBackToHome: () => void;
  onNavigateToLogin: () => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({
  onBackToHome,
  onNavigateToLogin,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetch('http://localhost:8080/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Graceful fallback
    }
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-radial from-[#e9f2ff] to-[#f8fbff] flex flex-col justify-between p-4 sm:p-6">
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
        <div className="text-center mb-6">
          <a href="#" onClick={onBackToHome} className="inline-flex items-center gap-2 text-2xl font-black text-slate-900 tracking-tight">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Laptop className="w-5 h-5" />
            </div>
            <span>Ndertech CBT Pro</span>
          </a>
          <p className="text-xs text-slate-500 mt-1">Self-Service Account Recovery</p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 text-xl shadow-xs">
            <KeyRound className="w-6 h-6" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-center text-slate-900 mb-1">
            Reset Password
          </h2>
          <p className="text-xs text-slate-500 text-center mb-6">
            Enter your account email address and we'll send you instructions to reset your password.
          </p>

          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base mb-1">Reset Instructions Dispatched!</h4>
                <p className="text-xs text-slate-500">
                  We've transmitted password reset instructions to <strong className="text-slate-800">{email}</strong>. Please check your inbox and spam folders.
                </p>
              </div>
              <button
                onClick={onNavigateToLogin}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-sm transition-all"
              >
                Return to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Account Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all text-sm disabled:opacity-50"
              >
                {isLoading ? 'Processing Request...' : 'Send Reset Instructions'}
              </button>
            </form>
          )}

          <div className="text-center mt-6 pt-6 border-t border-slate-100 text-xs text-slate-500">
            Remembered your password?{' '}
            <button
              onClick={onNavigateToLogin}
              className="text-blue-600 font-bold hover:underline"
            >
              Sign In
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
