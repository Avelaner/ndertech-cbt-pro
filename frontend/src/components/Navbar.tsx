import React, { useState } from 'react';
import { 
  Laptop, 
  Menu, 
  X, 
  GraduationCap, 
  ShieldCheck, 
  UserCheck, 
  LogOut, 
  Image, 
  Sparkles,
  PhoneCall
} from 'lucide-react';
import type { Candidate, User } from '../types';

interface NavbarProps {
  currentTab: 'landing' | 'gallery' | 'login' | 'register' | 'forgot-password' | 'candidate' | 'admin' | 'exam';
  setCurrentTab: (tab: 'landing' | 'gallery' | 'login' | 'register' | 'forgot-password' | 'candidate' | 'admin') => void;
  candidate: Candidate | null;
  adminUser: User | null;
  onLogout: () => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  inExamMode?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  candidate,
  adminUser,
  onLogout,
  onOpenLogin,
  onOpenRegister,
  inExamMode = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentTab !== 'landing') {
      setCurrentTab('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTabChange = (tab: 'landing' | 'gallery' | 'candidate' | 'admin') => {
    setMobileMenuOpen(false);
    setCurrentTab(tab);
    if (tab === 'landing') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleTabChange('landing')}
          className="flex items-center space-x-3 text-left focus:outline-hidden group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 group-hover:bg-blue-700 flex items-center justify-center text-white shadow-md font-bold text-lg transition-colors">
            <Laptop className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight block">
              Ndertech CBT Pro
            </span>
            <span className="text-[11px] font-medium text-slate-500 hidden sm:block">
              Universal Assessment & Examination Platform
            </span>
          </div>
        </button>

        {!inExamMode && (
          <>
            {/* Desktop Navigation Links (Features, Demos, Pricing, Gallery, Candidate, Admin, Contact) */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-sm font-semibold text-slate-600">
              <button
                onClick={() => handleTabChange('landing')}
                className={`px-3 py-2 rounded-xl transition-all ${
                  currentTab === 'landing' ? 'text-blue-600 font-bold bg-blue-50/70' : 'hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => navigateToSection('features')}
                className="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-slate-50 transition-all"
              >
                Features
              </button>
              <button
                onClick={() => navigateToSection('demos')}
                className="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-slate-50 transition-all"
              >
                Video Demos
              </button>
              <button
                onClick={() => navigateToSection('pricing')}
                className="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-slate-50 transition-all"
              >
                Pricing
              </button>
              <button
                onClick={() => handleTabChange('gallery')}
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  currentTab === 'gallery' ? 'text-blue-600 font-bold bg-blue-50/70' : 'hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <Image className="w-4 h-4" />
                <span>Gallery</span>
              </button>
              <button
                onClick={() => handleTabChange('candidate')}
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  currentTab === 'candidate' ? 'text-blue-600 font-bold bg-blue-50/70' : 'hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Candidate</span>
              </button>
              <button
                onClick={() => handleTabChange('admin')}
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  currentTab === 'admin' ? 'text-blue-600 font-bold bg-blue-50/70' : 'hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin</span>
              </button>
              <button
                onClick={() => navigateToSection('contact')}
                className="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-slate-50 transition-all"
              >
                Contact
              </button>
            </nav>

            {/* Desktop Auth / Action Area */}
            <div className="hidden lg:flex items-center space-x-3">
              {candidate || adminUser ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700 bg-slate-100/90 px-3.5 py-2 rounded-xl border border-slate-200">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    <span>{candidate ? candidate.full_name : adminUser?.full_name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 uppercase font-extrabold">
                      {candidate ? 'Candidate' : adminUser?.role}
                    </span>
                  </div>
                  <button
                    onClick={onLogout}
                    title="Sign Out"
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-transparent hover:border-rose-200"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={onOpenLogin}
                    className="text-slate-700 hover:bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-2xs"
                  >
                    Log In
                  </button>
                  <button
                    onClick={onOpenRegister}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                    <span>Get Started</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </>
        )}

        {inExamMode && (
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 animate-pulse">
              ● Live Exam Session
            </span>
          </div>
        )}
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && !inExamMode && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => handleTabChange('landing')}
              className={`p-2.5 rounded-xl text-left ${currentTab === 'landing' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              Home
            </button>
            <button
              onClick={() => navigateToSection('features')}
              className="p-2.5 rounded-xl text-left text-slate-700 hover:bg-slate-50"
            >
              Features
            </button>
            <button
              onClick={() => navigateToSection('demos')}
              className="p-2.5 rounded-xl text-left text-slate-700 hover:bg-slate-50"
            >
              Video Demos
            </button>
            <button
              onClick={() => navigateToSection('pricing')}
              className="p-2.5 rounded-xl text-left text-slate-700 hover:bg-slate-50"
            >
              Pricing
            </button>
            <button
              onClick={() => handleTabChange('gallery')}
              className={`p-2.5 rounded-xl text-left flex items-center gap-1.5 ${currentTab === 'gallery' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              <Image className="w-3.5 h-3.5" />
              <span>Gallery</span>
            </button>
            <button
              onClick={() => navigateToSection('contact')}
              className="p-2.5 rounded-xl text-left text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
            <button
              onClick={() => handleTabChange('candidate')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl border flex items-center justify-center gap-1.5 ${currentTab === 'candidate' ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-slate-200 text-slate-700'}`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Candidate</span>
            </button>
            <button
              onClick={() => handleTabChange('admin')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl border flex items-center justify-center gap-1.5 ${currentTab === 'admin' ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-slate-200 text-slate-700'}`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>

          <div className="pt-2">
            {candidate || adminUser ? (
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">{candidate ? candidate.full_name : adminUser?.full_name}</span>
                  <span className="text-[10px] text-slate-500 uppercase">{candidate ? 'Candidate' : adminUser?.role}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="flex-1 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl text-center"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister();
                  }}
                  className="flex-1 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl text-center shadow-xs"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
