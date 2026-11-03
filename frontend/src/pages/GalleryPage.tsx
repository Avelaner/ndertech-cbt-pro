import React, { useState } from 'react';
import { 
  Laptop, 
  ArrowLeft, 
  LayoutDashboard, 
  GraduationCap, 
  FileText, 
  Layers, 
  HelpCircle, 
  Award, 
  Bell, 
  Settings, 
  CreditCard,
  Maximize2,
  X
} from 'lucide-react';

interface GalleryPageProps {
  onBackToHome: () => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
}

interface GalleryItem {
  id: number;
  category_key: string;
  category_name: string;
  title: string;
  description: string;
  icon: React.ElementType;
  badgeColor: string;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onBackToHome,
  onOpenLogin,
  onOpenRegister,
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activePreview, setActivePreview] = useState<GalleryItem | null>(null);

  const categories = [
    { key: 'all', name: 'All Modules' },
    { key: 'dashboard', name: 'Dashboard' },
    { key: 'programs', name: 'Programs' },
    { key: 'candidates', name: 'Candidates' },
    { key: 'examinations', name: 'Examinations' },
    { key: 'subjects', name: 'Subjects' },
    { key: 'question-bank', name: 'Question Bank' },
    { key: 'results', name: 'Results & Reports' },
    { key: 'notifications', name: 'Notifications' },
    { key: 'settings', name: 'Portal Settings' },
    { key: 'billing', name: 'Billing & Plans' },
  ];

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      category_key: 'dashboard',
      category_name: 'Dashboard',
      title: 'Real-time Super Admin Oversight & Telemetry',
      description: 'Centralized telemetry dashboard displaying concurrent active candidates, examination uptime, and cloud resource metrics.',
      icon: LayoutDashboard,
      badgeColor: 'bg-blue-100 text-blue-700',
    },
    {
      id: 2,
      category_key: 'examinations',
      category_name: 'Examinations',
      title: 'High-Stakes Examination Configuration',
      description: 'Schedule single and multi-subject CBT tests with strict anti-cheating window blur protection and customizable pass marks.',
      icon: FileText,
      badgeColor: 'bg-indigo-100 text-indigo-700',
    },
    {
      id: 3,
      category_key: 'question-bank',
      category_name: 'Question Bank',
      title: 'Bulk Excel Question Importer & KaTeX STEM Engine',
      description: 'Import thousands of complex multiple-choice, fractional math, and chemical equations effortlessly using spreadsheet templates.',
      icon: HelpCircle,
      badgeColor: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: 4,
      category_key: 'candidates',
      category_name: 'Candidates',
      title: 'Student Roster & Verification Management',
      description: 'Track candidate profile statuses, passport photos, exam attempts, registration numbers, and identity verification.',
      icon: GraduationCap,
      badgeColor: 'bg-cyan-100 text-cyan-700',
    },
    {
      id: 5,
      category_key: 'results',
      category_name: 'Results & Reports',
      title: 'Official Scorecard Generation & Email Dispatch',
      description: 'Automated fractional grading with subject-by-subject percentage breakdowns, printable PDF result sheets, and direct email delivery.',
      icon: Award,
      badgeColor: 'bg-amber-100 text-amber-700',
    },
    {
      id: 6,
      category_key: 'billing',
      category_name: 'Billing & Plans',
      title: 'Institutional Wallet & Instant Subscription Upgrades',
      description: 'Fund wallets seamlessly via Paystack or Squad for instant plan renewal, license activation, and candidate slot allocations.',
      icon: CreditCard,
      badgeColor: 'bg-rose-100 text-rose-700',
    },
    {
      id: 7,
      category_key: 'subjects',
      category_name: 'Subjects',
      title: 'Multi-Subject Curricula & Exam Pools',
      description: 'Group academic subjects into JAMB-style multi-subject testing combinations with individual timers and question pools.',
      icon: Layers,
      badgeColor: 'bg-purple-100 text-purple-700',
    },
    {
      id: 8,
      category_key: 'notifications',
      category_name: 'Notifications',
      title: 'Broadcast Announcements & Candidate SMS/Email',
      description: 'Send institution-wide notifications, maintenance bulletins, and exam schedule reminders to candidate and staff portals.',
      icon: Bell,
      badgeColor: 'bg-orange-100 text-orange-700',
    },
    {
      id: 9,
      category_key: 'settings',
      category_name: 'Portal Settings',
      title: 'Custom Institution Branding & White-Label Controls',
      description: 'Upload your school logo, configure institutional color palettes, set custom test guidelines, and manage API keys.',
      icon: Settings,
      badgeColor: 'bg-slate-100 text-slate-700',
    },
  ];

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category_key === activeCategory);

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-800">
      {/* Top Gallery Header Bar */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Laptop className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 text-lg hidden sm:inline">
                Ndertech CBT Pro
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenLogin}
              className="text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
            >
              Log In
            </button>
            <button
              onClick={onOpenRegister}
              className="text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="py-14 sm:py-20 text-center bg-radial from-[#e9f2ff] to-[#f8fbff] border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 mb-4">
            Visual Module Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Explore the Ndertech Platform Gallery
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Take a visual tour through our enterprise CBT ecosystem — from student examination terminals to administrator proctoring suites and automated grading ledgers.
          </p>
        </div>
      </section>

      {/* Main Gallery Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat.key
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-500 transition-all duration-300 flex flex-col group"
              >
                {/* Visual Preview Header */}
                <div 
                  onClick={() => setActivePreview(item)}
                  className="aspect-video bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-6 flex flex-col justify-between relative cursor-pointer overflow-hidden"
                >
                  <div className="flex items-center justify-between text-white/80">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${item.badgeColor}`}>
                      {item.category_name}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-xs flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-white">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-400">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-[11px] text-blue-300 uppercase font-semibold tracking-wider block">
                        System Module
                      </span>
                      <h4 className="text-sm font-bold text-white leading-tight">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={() => setActivePreview(item)}
                    className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Inspect Module</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Inspection Modal */}
      {activePreview && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 relative">
            <button
              onClick={() => setActivePreview(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${activePreview.badgeColor}`}>
                {activePreview.category_name}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {activePreview.title}
              </h3>
            </div>

            <div className="aspect-video bg-slate-900 rounded-2xl flex items-center justify-center text-blue-400 border border-slate-800 p-8 text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
                  <activePreview.icon className="w-8 h-8" />
                </div>
                <h4 className="text-white font-bold text-lg">{activePreview.title}</h4>
                <p className="text-slate-400 text-xs max-w-md mx-auto">
                  Production module screenshot & preview verified from Ndertech CBT Pro database.
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {activePreview.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={onOpenRegister}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm"
              >
                Access this Module
              </button>
              <button
                onClick={() => setActivePreview(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
