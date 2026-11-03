import React, { useState } from 'react';
import { 
  Users, 
  FileCheck, 
  BookOpen, 
  Plus, 
  ShieldCheck,
  Search,
  CheckCircle2,
  Wallet
} from 'lucide-react';
import type { User, Exam, Candidate } from '../types';
import { cpanelCandidates } from '../data/cpanelData';

interface AdminPortalProps {
  adminUser: User;
  exams: Exam[];
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ adminUser, exams }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'candidates' | 'questions'>('overview');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [candidateSearch, setCandidateSearch] = useState('');

  // Real candidates list from cPanel database
  const [candidates] = useState<Candidate[]>(cpanelCandidates);

  // Sample questions list
  const [questions, setQuestions] = useState([
    {
      id: 1,
      subject: 'Biology',
      text: 'Which organelle is known as the powerhouse of the cell?',
      type: 'Multiple Choice',
      marks: 1.0,
    },
    {
      id: 2,
      subject: 'Mathematics',
      text: 'Solve for x in the linear equation: 3x + 9 = 24.',
      type: 'Multiple Choice',
      marks: 1.0,
    },
    {
      id: 3,
      subject: 'Physics',
      text: 'What is the SI unit of electric current?',
      type: 'Multiple Choice',
      marks: 1.0,
    },
  ]);

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    setQuestions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        subject: 'General Science',
        text: newQuestionText,
        type: 'Multiple Choice',
        marks: 1.0,
      },
    ]);

    setNewQuestionText('');
    setShowAddModal(false);
  };

  const filteredCandidates = candidates.filter((c) => {
    const q = candidateSearch.toLowerCase();
    return (
      c.full_name.toLowerCase().includes(q) ||
      c.reg_number.toLowerCase().includes(q) ||
      (c.email && c.email.toLowerCase().includes(q)) ||
      (c.username && c.username.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome Banner (Matching cPanel Admin Console) */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                Institutional Administration Console
              </span>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300">
                Active Organization #{adminUser.org_id || 5}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome, {adminUser.full_name}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Administrator ID: <strong className="font-mono text-white">{adminUser.email}</strong> {adminUser.username ? `(@${adminUser.username})` : ''} | Role: <span className="capitalize font-semibold text-blue-300">{adminUser.role.replace('_', ' ')}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Question</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards (Real metrics matching cPanel SQL dump) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Enrolled Candidates</span>
            <h3 className="text-xl font-bold text-slate-900">106</h3>
            <span className="text-xs text-emerald-600 font-medium">Mapped from cPanel DB</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Scheduled Exams</span>
            <h3 className="text-xl font-bold text-slate-900">{exams.length}</h3>
            <span className="text-xs text-indigo-600 font-medium">25 total in bank</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Curriculum Subjects</span>
            <h3 className="text-xl font-bold text-slate-900">44</h3>
            <span className="text-xs text-emerald-600 font-medium">Active subjects</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Licence Plan</span>
            <h3 className="text-xl font-bold text-slate-900">Enterprise</h3>
            <span className="text-xs text-amber-600 font-medium">Full proctoring enabled</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200 flex space-x-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 text-sm font-semibold transition-all relative ${
            activeTab === 'overview'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Scheduled Examinations ({exams.length})
        </button>
        <button
          onClick={() => setActiveTab('candidates')}
          className={`pb-3 text-sm font-semibold transition-all relative ${
            activeTab === 'candidates'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Candidate Directory ({candidates.length})
        </button>
        <button
          onClick={() => setActiveTab('questions')}
          className={`pb-3 text-sm font-semibold transition-all relative ${
            activeTab === 'questions'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Question Bank Repository ({questions.length})
        </button>
      </div>

      {/* Tab 1: Scheduled Examinations */}
      {activeTab === 'overview' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3.5 px-6">Exam Title</th>
                <th className="py-3.5 px-6">Subject</th>
                <th className="py-3.5 px-6">Duration</th>
                <th className="py-3.5 px-6">Questions</th>
                <th className="py-3.5 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {exams.map((exam) => (
                <tr key={exam.id} className="hover:bg-slate-50/50">
                  <td className="py-4 px-6 font-semibold text-slate-900">{exam.title}</td>
                  <td className="py-4 px-6">{exam.subject_name}</td>
                  <td className="py-4 px-6">{exam.duration_minutes} Mins</td>
                  <td className="py-4 px-6">{exam.total_questions} Items</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1 w-fit">
                      <CheckCircle2 className="w-3 h-3" />
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Candidate Directory (Matching cPanel admin/candidates/) */}
      {activeTab === 'candidates' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={candidateSearch}
                onChange={(e) => setCandidateSearch(e.target.value)}
                placeholder="Search candidate by name, reg number, email..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Showing {filteredCandidates.length} candidate account(s)
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="py-3.5 px-6">Reg. Number</th>
                  <th className="py-3.5 px-6">Candidate Name</th>
                  <th className="py-3.5 px-6">Program / Email</th>
                  <th className="py-3.5 px-6">Wallet Balance</th>
                  <th className="py-3.5 px-6">Licence</th>
                  <th className="py-3.5 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCandidates.map((cand) => (
                  <tr key={cand.id} className="hover:bg-slate-50/50">
                    <td className="py-4 px-6 font-mono text-xs font-semibold text-blue-600">
                      {cand.reg_number}
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-900">
                      {cand.full_name}
                      {cand.username ? (
                        <span className="text-xs text-slate-400 block font-normal">@{cand.username}</span>
                      ) : null}
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-medium text-slate-800 text-xs block">{cand.program_name}</span>
                      <span className="text-xs text-slate-400">{cand.email || 'N/A'}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-900">
                        <Wallet className="w-3.5 h-3.5 text-emerald-600" />
                        ₦{Number(cand.wallet ?? 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        cand.licence === 1 ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {cand.licence === 1 ? 'Licenced' : 'Unlicenced'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                        {cand.status || 'Active'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Question Bank */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="py-3.5 px-6">#</th>
                  <th className="py-3.5 px-6">Subject</th>
                  <th className="py-3.5 px-6">Question Content</th>
                  <th className="py-3.5 px-6">Type</th>
                  <th className="py-3.5 px-6">Marks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {questions.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/50">
                    <td className="py-4 px-6 font-mono text-xs text-slate-400">{q.id}</td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                        {q.subject}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-800 max-w-md truncate">
                      {q.text}
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-500">{q.type}</td>
                    <td className="py-4 px-6 font-semibold text-slate-900">{q.marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleCreateQuestion}
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-4"
          >
            <h3 className="text-lg font-bold text-slate-900">Add New Question</h3>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Question Text
              </label>
              <textarea
                rows={3}
                required
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                placeholder="Enter question statement..."
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs"
              >
                Save to Repository
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
