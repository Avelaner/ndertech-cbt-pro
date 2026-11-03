import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { CandidatePortal } from './components/CandidatePortal';
import { AdminPortal } from './components/AdminPortal';
import { ExamRunner } from './components/ExamRunner';
import { AuthModal } from './components/AuthModal';
import type { Candidate, User, Exam, Scorecard, ExamQuestion } from './types';

export function App() {
  const [currentTab, setCurrentTab] = useState<'landing' | 'candidate' | 'admin'>('landing');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authModalDefaultRole, setAuthModalDefaultRole] = useState<'candidate' | 'admin'>('candidate');

  // Authenticated state (preloaded with default credentials for quick testing)
  const [candidate, setCandidate] = useState<Candidate | null>({
    id: 1,
    reg_number: 'JAMB2026172925',
    full_name: 'Avela Marcel',
    email: 'ndertech@gmail.com',
    program_name: 'JAMB UTME CBT 2027',
    org_id: 1,
  });

  const [adminUser, setAdminUser] = useState<User | null>({
    id: 1,
    full_name: 'Institution Administrator',
    email: 'admin@ndertech.com',
    role: 'admin',
    org_id: 1,
  });

  // Active examination state
  const [activeExamSession, setActiveExamSession] = useState<{
    exam: Exam;
    questions: ExamQuestion[];
  } | null>(null);

  const [recentScorecard, setRecentScorecard] = useState<Scorecard | null>(null);

  // Available sample exams
  const [availableExams] = useState<Exam[]>([
    {
      id: 1,
      title: 'JAMB UTME Comprehensive Mock 2027',
      subject_name: 'General Assessment (Eng, Maths, Chem, Phy)',
      duration_minutes: 120,
      total_questions: 60,
      pass_mark: 50.0,
      is_active: true,
    },
    {
      id: 2,
      title: 'Biology Students Assessment 2027',
      subject_name: 'Biology',
      duration_minutes: 45,
      total_questions: 40,
      pass_mark: 50.0,
      is_active: true,
    },
    {
      id: 3,
      title: 'Mathematics Advanced Problem Solving',
      subject_name: 'Mathematics',
      duration_minutes: 60,
      total_questions: 35,
      pass_mark: 55.0,
      is_active: true,
    },
  ]);

  // Questions for active examination
  const sampleExamQuestions: ExamQuestion[] = [
    {
      id: 1,
      question_text: 'Which cellular organelle is responsible for generating most of the chemical energy needed to power biochemical reactions (ATP)?',
      marks: 1.0,
      options: [
        { id: 101, option_text: 'Ribosome' },
        { id: 102, option_text: 'Mitochondria' },
        { id: 103, option_text: 'Nucleolus' },
        { id: 104, option_text: 'Endoplasmic Reticulum' },
      ],
    },
    {
      id: 2,
      question_text: 'Solve for x in the equation: 4x - 7 = 2x + 9.',
      marks: 1.0,
      options: [
        { id: 201, option_text: 'x = 6' },
        { id: 202, option_text: 'x = 8' },
        { id: 203, option_text: 'x = 10' },
        { id: 204, option_text: 'x = 16' },
      ],
    },
    {
      id: 3,
      question_text: 'What is the standard SI unit of electrical resistance?',
      marks: 1.0,
      options: [
        { id: 301, option_text: 'Ohm (Ω)' },
        { id: 302, option_text: 'Ampere (A)' },
        { id: 303, option_text: 'Volt (V)' },
        { id: 304, option_text: 'Joule (J)' },
      ],
    },
    {
      id: 4,
      question_text: 'Which gas is predominantly released during complete combustion of hydrocarbons in excess oxygen?',
      marks: 1.0,
      options: [
        { id: 401, option_text: 'Carbon dioxide (CO2)' },
        { id: 402, option_text: 'Carbon monoxide (CO)' },
        { id: 403, option_text: 'Sulphur dioxide (SO2)' },
        { id: 404, option_text: 'Methane (CH4)' },
      ],
    },
    {
      id: 5,
      question_text: 'Choose the correct synonym for the word "Eloquent":',
      marks: 1.0,
      options: [
        { id: 501, option_text: 'Hesitant' },
        { id: 502, option_text: 'Articulate' },
        { id: 503, option_text: 'Quiet' },
        { id: 504, option_text: 'Ambiguous' },
      ],
    },
  ];

  const handleStartExam = (exam: Exam) => {
    setActiveExamSession({
      exam,
      questions: sampleExamQuestions,
    });
  };

  const handleFinishExam = (results: {
    score: number;
    total: number;
    percentage: number;
    passed: boolean;
  }) => {
    if (activeExamSession && candidate) {
      const newScorecard: Scorecard = {
        session_id: `CBT-${Date.now()}`,
        candidate_name: candidate.full_name,
        reg_number: candidate.reg_number,
        exam_title: activeExamSession.exam.title,
        total_score: results.score,
        max_score: results.total,
        percentage: results.percentage,
        status: 'Completed',
        outcome: results.passed ? 'Passed Assessment' : 'Failed Assessment',
        completed_at: new Date().toLocaleString(),
        breakdown: [
          { subject: activeExamSession.exam.subject_name, score: results.score, total: results.total, percentage: results.percentage },
        ],
      };
      setRecentScorecard(newScorecard);
    }
    setActiveExamSession(null);
  };

  const handleLogout = () => {
    setCandidate(null);
    setAdminUser(null);
    setCurrentTab('landing');
  };

  const openCandidateLogin = () => {
    setAuthModalDefaultRole('candidate');
    setIsAuthOpen(true);
  };

  const openAdminLogin = () => {
    setAuthModalDefaultRole('admin');
    setIsAuthOpen(true);
  };

  // If in live exam session
  if (activeExamSession && candidate) {
    return (
      <ExamRunner
        examTitle={activeExamSession.exam.title}
        durationMinutes={activeExamSession.exam.duration_minutes}
        questions={activeExamSession.questions}
        candidate={candidate}
        onFinishExam={handleFinishExam}
        onExitExam={() => setActiveExamSession(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] flex flex-col">
      {/* Show Navbar on all views (landing has its own hero & quick tabs) */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        candidate={candidate}
        adminUser={adminUser}
        onLogout={handleLogout}
        onOpenLogin={() => setIsAuthOpen(true)}
      />

      <main className="flex-1">
        {currentTab === 'landing' && (
          <LandingPage
            onOpenCandidateLogin={() => {
              if (candidate) {
                setCurrentTab('candidate');
              } else {
                openCandidateLogin();
              }
            }}
            onOpenAdminLogin={() => {
              if (adminUser) {
                setCurrentTab('admin');
              } else {
                openAdminLogin();
              }
            }}
          />
        )}

        {currentTab === 'candidate' && (
          candidate ? (
            <CandidatePortal
              candidate={candidate}
              availableExams={availableExams}
              onStartExam={handleStartExam}
              recentScorecard={recentScorecard}
            />
          ) : (
            <div className="max-w-md mx-auto text-center py-20 px-4">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Candidate Sign-In Required</h2>
              <p className="text-sm text-slate-500 mb-6">
                Please sign in with your student registration number to access scheduled examinations.
              </p>
              <button
                onClick={openCandidateLogin}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-md transition-all"
              >
                Sign In Now
              </button>
            </div>
          )
        )}

        {currentTab === 'admin' && (
          adminUser ? (
            <AdminPortal adminUser={adminUser} exams={availableExams} />
          ) : (
            <div className="max-w-md mx-auto text-center py-20 px-4">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Admin Sign-In Required</h2>
              <p className="text-sm text-slate-500 mb-6">
                Please authenticate with your administrator credentials to access management controls.
              </p>
              <button
                onClick={openAdminLogin}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-md transition-all"
              >
                Sign In Now
              </button>
            </div>
          )
        )}
      </main>

      <AuthModal
        isOpen={isAuthOpen}
        defaultRole={authModalDefaultRole}
        onClose={() => setIsAuthOpen(false)}
        onCandidateLogin={(c) => {
          setCandidate(c);
          setCurrentTab('candidate');
        }}
        onAdminLogin={(u) => {
          setAdminUser(u);
          setCurrentTab('admin');
        }}
      />
    </div>
  );
}

export default App;
