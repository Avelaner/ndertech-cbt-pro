import React from 'react';
import { GraduationCap, ShieldCheck, UserCheck, LogOut, Home, Laptop } from 'lucide-react';
import type { Candidate, User } from '../types';

interface NavbarProps {
  currentTab: 'landing' | 'candidate' | 'admin' | 'exam';
  setCurrentTab: (tab: 'landing' | 'candidate' | 'admin') => void;
  candidate: Candidate | null;
  adminUser: User | null;
  onLogout: () => void;
  onOpenLogin: () => void;
  inExamMode?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  candidate,
  adminUser,
  onLogout,
  onOpenLogin,
  inExamMode = false,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => setCurrentTab('landing')}
          className="flex items-center space-x-3 text-left focus:outline-hidden"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm font-bold text-lg">
            <Laptop className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-slate-900 text-lg tracking-tight block">
              Ndertech CBT Pro
            </span>
            <span className="text-xs text-slate-500 hidden sm:block">
              Universal Assessment & Examination Platform
            </span>
          </div>
        </button>

        {!inExamMode && (
          <div className="flex items-center space-x-2 sm:space-x-4">
            <nav className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setCurrentTab('landing')}
                className={`px-3 sm:px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                  currentTab === 'landing'
                    ? 'bg-white text-blue-600 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </button>

              <button
                onClick={() => setCurrentTab('candidate')}
                className={`px-3 sm:px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                  currentTab === 'candidate'
                    ? 'bg-white text-blue-600 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Candidate Portal</span>
              </button>

              <button
                onClick={() => setCurrentTab('admin')}
                className={`px-3 sm:px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                  currentTab === 'admin'
                    ? 'bg-white text-blue-600 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin & Staff</span>
              </button>
            </nav>

            <div className="h-6 w-px bg-slate-200" />

            {candidate || adminUser ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium hidden sm:inline">
                    {candidate ? candidate.full_name : adminUser?.full_name}
                  </span>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-semibold uppercase">
                    {candidate ? 'Candidate' : adminUser?.role}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  title="Logout"
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-xl transition-all shadow-sm"
              >
                Sign In
              </button>
            )}
          </div>
        )}

        {inExamMode && (
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 animate-pulse">
              ● Live Exam Session
            </span>
          </div>
        )}
      </div>
    </header>
  );
};
