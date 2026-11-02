import React, { useState } from 'react';
import { 
  Users, 
  FileCheck, 
  TrendingUp, 
  Plus, 
  CheckCircle2
} from 'lucide-react';
import type { User, Exam } from '../types';

interface AdminPortalProps {
  adminUser: User;
  exams: Exam[];
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ exams }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'questions'>('overview');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Administrator Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Institution Management, Assessment Banks & Live Proctoring
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Question</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Candidates</span>
            <h3 className="text-xl font-bold text-slate-900">452</h3>
            <span className="text-xs text-emerald-600 font-medium">+18 this week</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Active Exams</span>
            <h3 className="text-xl font-bold text-slate-900">{exams.length}</h3>
            <span className="text-xs text-indigo-600 font-medium">All systems green</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Tests Taken</span>
            <h3 className="text-xl font-bold text-slate-900">1,248</h3>
            <span className="text-xs text-emerald-600 font-medium">98.4% uptime</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Avg Pass Rate</span>
            <h3 className="text-xl font-bold text-slate-900">68.2%</h3>
            <span className="text-xs text-slate-500 font-medium">Across all programs</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 flex space-x-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 text-sm font-semibold transition-all relative ${
            activeTab === 'overview'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Scheduled Examinations
        </button>
        <button
          onClick={() => setActiveTab('questions')}
          className={`pb-3 text-sm font-semibold transition-all relative ${
            activeTab === 'questions'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Question Bank Repository
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
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Question Bank */}
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
                className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save Question
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
