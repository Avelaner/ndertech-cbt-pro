import React, { useState } from 'react';
import { 
  Laptop, 
  GraduationCap, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  FileSpreadsheet, 
  FlaskConical, 
  ShieldAlert, 
  LineChart, 
  MonitorPlay, 
  CloudLightning, 
  Layers, 
  SearchCode, 
  MailCheck, 
  Shuffle, 
  ScanFace, 
  UserCheck2, 
  Wallet, 
  Receipt, 
  Coins, 
  Play, 
  Calendar, 
  Send, 
  X,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

interface LandingPageProps {
  onOpenCandidateLogin: () => void;
  onOpenAdminLogin: () => void;
  onSelectPlan?: (planSlug: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenCandidateLogin,
  onOpenAdminLogin,
}) => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedVideoCategory, setSelectedVideoCategory] = useState('All Modules');
  const [activeVideoModal, setActiveVideoModal] = useState<{ title: string; embedUrl: string } | null>(null);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Video demos from cPanel
  const demoVideos = [
    {
      id: 1,
      title: 'Super Admin Dashboard & Navigation Overview',
      category: 'Dashboard',
      description: 'Discover how administrators monitor active test sessions, manage licensing metrics, and review system logs in real time.',
      embedUrl: 'https://www.youtube.com/embed/MEeSkExzJJo',
      date: 'Recent',
    },
    {
      id: 2,
      title: 'Creating & Configuring High-Stakes Examinations',
      category: 'Examinations',
      description: 'Learn how to configure exam durations, anti-cheat locks, randomized question pools, and grading rubrics easily.',
      embedUrl: 'https://www.youtube.com/embed/MEeSkExzJJo',
      date: 'Recent',
    },
    {
      id: 3,
      title: 'Bulk Excel Question Import & KaTeX Math Editor',
      category: 'Question Bank',
      description: 'Master importing thousands of questions instantly via Excel spreadsheets with full mathematical equation rendering.',
      embedUrl: 'https://www.youtube.com/embed/MEeSkExzJJo',
      date: 'Recent',
    },
  ];

  const videoCategories = ['All Modules', 'Dashboard', 'Examinations', 'Question Bank', 'Results', 'Billing'];

  const filteredVideos = selectedVideoCategory === 'All Modules' 
    ? demoVideos 
    : demoVideos.filter(v => v.category === selectedVideoCategory);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactSubject('');
      setContactMessage('');
      setContactSubmitted(false);
    }, 4000);
  };

  return (
    <div className="bg-[#f8fbff] text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      {/* Sticky Glass Navbar */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 text-blue-600 font-bold text-xl sm:text-2xl tracking-tight">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Laptop className="w-5 h-5" />
            </div>
            <span>Ndertech CBT Pro</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#demos" className="hover:text-blue-600 transition-colors">Video Demos</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#audience" className="hover:text-blue-600 transition-colors">Who It's For</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>

          {/* Auth Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenCandidateLogin}
              className="text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
            >
              Candidate Log In
            </button>
            <button
              onClick={onOpenAdminLogin}
              className="text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
            >
              Admin Portal
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 text-center overflow-hidden bg-radial from-[#e9f2ff] to-[#f8fbff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-blue-100/80 text-blue-700 mb-6 border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            v2.0 Next-Gen Platform Live
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-[1.15] mb-6">
            The Ultimate{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Examination Matrix
            </span>{' '}
            for Modern Institutions
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Deploy secure, scalable, and fully automated computer-based testing environments. Effortlessly import assessments, support advanced STEM question formats, and guarantee zero data loss.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenCandidateLogin}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg shadow-blue-600/25 transition-all text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <span>Take CBT Test</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#pricing"
              className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-full border border-slate-200 shadow-sm transition-all text-sm sm:text-base"
            >
              View Licensing Plans
            </a>
            <a
              href="#demos"
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              <span>Watch Demos</span>
            </a>
          </div>
        </div>
      </section>

      {/* Target Audience Section ("Who Ndertech CBT Pro is Meant For") */}
      <section id="audience" className="py-20 bg-white border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600">
              Built For Everyone
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Who is Ndertech CBT Pro Meant For?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Tailored assessment solutions designed for independent educators and large institutions alike.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Audience 1: Individuals & Tutors */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Individuals & Independent Tutors
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Perfect for private tutors, freelance educators, and coaching centers conducting weekly quizzes, entrance screenings, or certification drills. Enjoy quick setup, automated grading, and zero server headaches.
                </p>
                <ul className="space-y-3 text-sm text-slate-700 mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Lightweight & Quick Assessment Creation</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Instant Result Scorecards & Email Dispatch</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Pay-as-You-Go / Flexible Slot Models</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Wallet Integration for Instant Renewals</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={onOpenCandidateLogin}
                className="w-full py-3.5 px-6 rounded-full border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition-all text-sm flex items-center justify-center gap-2"
              >
                <span>Get Started as Individual</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Audience 2: Schools & Organizations */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Building2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Schools & Large Organizations
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Designed for secondary schools, universities, professional bodies, and corporate institutions running high-stakes semester exams or recruitment tests with multi-subject pools and live proctoring.
                </p>
                <ul className="space-y-3 text-sm text-slate-700 mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Offline LAN & Click-to-Run Security Support</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Granular Role-Based Staff Permissions</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Enterprise Automated Subscription Management</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span>Custom Institution Branding & Logo Display</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={onOpenAdminLogin}
                className="w-full py-3.5 px-6 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-md transition-all text-sm flex items-center justify-center gap-2"
              >
                <span>Register Institution Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Grid (15 Core Capabilities matching cPanel) */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Engineered for Excellence
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Everything your institution needs to conduct flawless digital examinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: FileSpreadsheet,
                title: 'Bulk Excel Question Import',
                desc: 'Skip manual data entry. Easily upload large question banks using structured Excel or CSV templates, instantly populating your repository.',
              },
              {
                icon: FlaskConical,
                title: 'KaTeX Math & STEM Support',
                desc: 'Natively render complex mathematical equations, scientific formulas, and fractions perfectly across exams and review panels.',
              },
              {
                icon: ShieldAlert,
                title: 'Anti-Fraud & Violation Locks',
                desc: 'Enable strict anti-cheat policies that auto-submit exams and flag candidates caught exiting fullscreen or switching browser tabs.',
              },
              {
                icon: LineChart,
                title: 'Dynamic Fractional Grading',
                desc: 'Calculate results precisely with dynamic total marks and percentage metrics, accommodating custom-weighted questions.',
              },
              {
                icon: MonitorPlay,
                title: 'Live Proctoring Dashboard',
                desc: 'Supervise candidates dynamically. Add or reduce time, track active connections, force-submit exams, or pause sessions cleanly.',
              },
              {
                icon: CloudLightning,
                title: 'Auto-Save & Cloud Recovery',
                desc: 'Protect candidates against dropped internet connections or power failures with continuous asynchronous saves and instant restoration.',
              },
              {
                icon: Layers,
                title: 'Multi-Subject Exam Pools',
                desc: 'Bind multiple subjects to a single examination with JAMB-style subject navigation tabs and dynamic question palettes.',
              },
              {
                icon: SearchCode,
                title: 'Interactive Exam Review',
                desc: 'Allow candidates to review past submissions question-by-question with highlighted correct options, images, and explanations.',
              },
              {
                icon: MailCheck,
                title: 'Automated Result Dispatch',
                desc: 'Generate professional printable PDF scorecards and dispatch grades directly to candidates’ mailboxes securely.',
              },
              {
                icon: Shuffle,
                title: 'Randomization & Shuffling',
                desc: 'Prevent collusion by dynamically randomizing both question order and answer options per candidate so no two test sheets match.',
              },
              {
                icon: ScanFace,
                title: 'Biometric & Face ID Ready',
                desc: 'Confirm candidate identity before and during tests using periodic webcam snapshots to eliminate impersonation proxy cheating.',
              },
              {
                icon: UserCheck2,
                title: 'Granular Role Permissions',
                desc: 'Delegate responsibilities securely by assigning precise permissions to super admins, examiners, proctors, and department heads.',
              },
              {
                icon: Wallet,
                title: 'Wallet-Powered Subscriptions',
                desc: 'Fund your institutional wallet to instantly renew licenses, upgrade tiers, or activate new modules without payment gateway delays.',
              },
              {
                icon: Receipt,
                title: 'Transparent Audit Trails',
                desc: 'Maintain absolute financial accountability with immutable transaction ledgers and real-time balance updates for every credit or debit.',
              },
              {
                icon: Coins,
                title: 'Flexible Candidate Slot Top-Ups',
                desc: 'Easily manage pay-per-exam models or candidate slot allocations by leveraging flexible wallet micro-transactions.',
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 border border-slate-200/90 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <f.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-lg mb-2.5">{f.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Video Demos Section (#demos) */}
      <section id="demos" className="py-20 bg-white border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600">
              Interactive Video Guides
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Watch Platform Demo in Action
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Explore step-by-step walkthroughs showing key modules and workflows.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {videoCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedVideoCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    selectedVideoCategory === cat
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-500 transition-all flex flex-col group"
              >
                <div 
                  className="relative aspect-video bg-slate-900 cursor-pointer overflow-hidden"
                  onClick={() => setActiveVideoModal({ title: video.title, embedUrl: video.embedUrl })}
                >
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    className="w-full h-full pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-blue-600/30 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                        {video.category}
                      </span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {video.date}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-blue-600 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-6">
                      {video.description}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveVideoModal({ title: video.title, embedUrl: video.embedUrl })}
                    className="w-full py-2.5 px-4 rounded-xl border border-blue-600 text-blue-600 font-bold text-xs hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 mt-auto"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Full Demo</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section with Monthly/Annual Toggle */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Transparent Licensing Plans
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Flexible pricing structures designed to scale with your institutional growth.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-3 bg-white p-1.5 rounded-full border border-slate-200 mt-6 shadow-xs">
              <button
                type="button"
                onClick={() => setIsAnnual(false)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  !isAnnual ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setIsAnnual(true)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                  isAnnual ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Annually</span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Save 69%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Trial Plan */}
            {!isAnnual && (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col justify-between hover:shadow-lg transition-all">
                <div>
                  <h3 className="font-bold text-xl text-slate-900 mb-1">TRIAL PLAN</h3>
                  <p className="text-xs text-slate-500 mb-6">Perfect for exploration and pilot testing</p>
                  <div className="mb-6">
                    <span className="text-4xl font-black text-blue-600">₦0</span>
                    <span className="text-xs text-slate-400"> / 14 days</span>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-600 mb-8">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Up to 15 Candidates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>2 Active Examinations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>50 Questions Repository</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Excel Question Import</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Auto-Saved Cloud Sessions</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={onOpenAdminLogin}
                  className="w-full py-3 rounded-full border border-blue-600 text-blue-600 font-bold hover:bg-blue-50 transition-colors text-sm"
                >
                  Start Free Trial
                </button>
              </div>
            )}

            {/* Standard Plan */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col justify-between hover:shadow-lg transition-all">
              <div>
                <h3 className="font-bold text-xl text-slate-900 mb-1">STANDARD</h3>
                <p className="text-xs text-slate-500 mb-6">Ideal for growing colleges and tutoring centers</p>
                <div className="mb-6">
                  <span className="text-4xl font-black text-blue-600">
                    {isAnnual ? '₦120,000' : '₦15,000'}
                  </span>
                  <span className="text-xs text-slate-400"> {isAnnual ? '/ year' : '/ month'}</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-600 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Up to 500 Candidates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>20 Active Examinations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>2,500 Questions Bank</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Automated Email Scorecards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Anti-Cheating Window Blur Locks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>24/7 Customer Support</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={onOpenAdminLogin}
                className="w-full py-3 rounded-full border border-blue-600 text-blue-600 font-bold hover:bg-blue-50 transition-colors text-sm"
              >
                Select Standard
              </button>
            </div>

            {/* Professional Plan (Most Popular) */}
            <div className="bg-white rounded-3xl p-8 border-2 border-blue-600 shadow-xl flex flex-col justify-between relative">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-600 text-white shadow-md">
                Most Popular
              </span>
              <div>
                <h3 className="font-bold text-xl text-slate-900 mb-1">PROFESSIONAL</h3>
                <p className="text-xs text-slate-500 mb-6">Unrestricted power for large educational institutions</p>
                <div className="mb-6">
                  <span className="text-4xl font-black text-blue-600">
                    {isAnnual ? '₦350,000' : '₦45,000'}
                  </span>
                  <span className="text-xs text-slate-400"> {isAnnual ? '/ year' : '/ month'}</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-600 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <strong className="text-slate-900">Unlimited Candidates</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <strong className="text-slate-900">Unlimited Active Exams</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <strong className="text-slate-900">Unlimited Question Bank</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>JAMB UTME Simulation Mode</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Custom Institution Branding & Logo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Full API Integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Priority Enterprise Support</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={onOpenAdminLogin}
                className="w-full py-3.5 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-md transition-colors text-sm"
              >
                Select Professional
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section (#contact) */}
      <section id="contact" className="py-20 bg-slate-100/70 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
              Get in Touch
            </span>
            <h2 className="text-3xl font-black text-slate-900">We’d Love to Hear From You</h2>
            <p className="text-slate-600 text-sm">
              Fill out the form below to speak directly with our engineering or support team.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200">
            {contactSubmitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Message Transmitted!</h3>
                <p className="text-sm text-slate-500">
                  Thank you! Our technical support team will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Avela Marcel"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                      Institutional Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="name@school.edu"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+234..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      placeholder="How can we assist your institution?"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Message Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Provide details about your requirements..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-md transition-all text-sm flex items-center justify-center gap-2 mt-4"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Secure Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black">
            Ready to digitize your assessment workflow?
          </h2>
          <p className="text-blue-100 text-base max-w-xl mx-auto">
            Join the institutions already transforming their examination processes with Ndertech CBT Pro.
          </p>
          <div className="pt-4">
            <button
              onClick={onOpenAdminLogin}
              className="px-8 py-3.5 bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-full shadow-lg transition-all text-sm sm:text-base"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <Laptop className="w-5 h-5 text-blue-500" />
              <span>Ndertech CBT Pro</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Universal Assessment, STEM examination engine & proctored testing matrix for institutions and tutors.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-white transition-colors">Features Matrix</a></li>
              <li><a href="#demos" className="hover:text-white transition-colors">Interactive Demos</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Licensing & Plans</a></li>
              <li><a href="#audience" className="hover:text-white transition-colors">Who It's For</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Portals</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenCandidateLogin} className="hover:text-white transition-colors">
                  Candidate Exam Portal
                </button>
              </li>
              <li>
                <button onClick={onOpenAdminLogin} className="hover:text-white transition-colors">
                  Institution Administrator
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">Support Contact</h4>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              <span>support@ndertech.com.ng</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400" />
              <span>+234 705 071 8650</span>
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Nigeria / Global Cloud Delivery</span>
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© 2026 Ndertech CBT Pro. All rights reserved. Powered by NderTech Universal Services.</p>
        </div>
      </footer>

      {/* Video Demo Modal Player */}
      {activeVideoModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative">
            <div className="flex items-center justify-between p-4 border-b border-slate-800 text-white">
              <h4 className="font-bold text-sm sm:text-base flex items-center gap-2">
                <Play className="w-4 h-4 text-blue-500 fill-blue-500" />
                <span>{activeVideoModal.title}</span>
              </h4>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`${activeVideoModal.embedUrl}?autoplay=1`}
                title={activeVideoModal.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
