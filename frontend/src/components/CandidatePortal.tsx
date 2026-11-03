import React, { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  Clock, 
  ArrowRight, 
  FileText, 
  Download,
  Wallet,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import type { Candidate, Exam, Scorecard } from '../types';

interface CandidatePortalProps {
  candidate: Candidate;
  availableExams: Exam[];
  onStartExam: (exam: Exam) => void;
  recentScorecard: Scorecard | null;
}

export const CandidatePortal: React.FC<CandidatePortalProps> = ({
  candidate,
  availableExams,
  onStartExam,
  recentScorecard,
}) => {
  const [selectedResult, setSelectedResult] = useState<Scorecard | null>(null);

  // Sample history matching the CBT dump
  const sampleResults: Scorecard[] = [
    {
      session_id: 'CBT-2026-091',
      candidate_name: candidate.full_name,
      reg_number: candidate.reg_number,
      exam_title: 'Biology Students Assessment 2027',
      total_score: 75,
      max_score: 231,
      percentage: 32.5,
      status: 'Completed',
      outcome: 'Failed Assessment',
      completed_at: '2026-11-01 13:43',
      breakdown: [
        { subject: 'Chemistry - 2027', score: 25, total: 66, percentage: 37.88 },
        { subject: 'English Language - 2027', score: 19, total: 53.5, percentage: 35.51 },
        { subject: 'Mathematics - 2027', score: 20, total: 61.5, percentage: 32.52 },
        { subject: 'Physics - 2027', score: 11, total: 50, percentage: 22.0 },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-xs text-white">
              Candidate Workspace
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome back, {candidate.full_name}
            </h1>
            <p className="text-blue-100 text-sm max-w-xl">
              Registration No: <strong className="font-mono text-white">{candidate.reg_number}</strong> | Program: {candidate.program_name}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center sm:text-right shrink-0">
            <span className="text-xs uppercase tracking-wider text-blue-200 block font-semibold">
              Account Status
            </span>
            <span className="text-lg font-bold text-white flex items-center justify-center sm:justify-end gap-1.5 mt-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              Active Access
            </span>
          </div>
        </div>
      </div>

      {/* Candidate CBT Metrics Bar (Matching cPanel Candidate Portal) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Wallet Balance</span>
            <h3 className="text-xl font-bold text-slate-900">
              ₦{Number(candidate.wallet ?? 3000).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </h3>
            <span className="text-xs text-emerald-600 font-medium">Ready for auto-renewal</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">CBT Licence</span>
            <h3 className="text-xl font-bold text-slate-900">
              {candidate.licence === 1 ? 'Active Licence' : 'Evaluation Access'}
            </h3>
            <span className="text-xs text-blue-600 font-medium">Single-device locked</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Access Period</span>
            <h3 className="text-sm font-bold text-slate-900 truncate">
              {candidate.end_date ? new Date(candidate.end_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Valid Access'}
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Org ID #{candidate.org_id}
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Available Exams and Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Available Exams (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>Available Examinations</span>
            </h2>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              {availableExams.length} Scheduled
            </span>
          </div>

          <div className="space-y-4">
            {availableExams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                      {exam.subject_name}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{exam.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {exam.duration_minutes} Minutes
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      {exam.total_questions} Questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-slate-400" />
                      Pass Mark: {exam.pass_mark}%
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onStartExam(exam)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span>Start Test</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Results & Scorecards (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              <span>Assessment Results</span>
            </h2>
          </div>

          <div className="space-y-3">
            {recentScorecard && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                  Latest Exam Finished Just Now
                </span>
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-900 text-sm">
                    {recentScorecard.exam_title}
                  </h4>
                  <span className="font-bold text-lg text-emerald-600">
                    {recentScorecard.percentage}%
                  </span>
                </div>
                <button
                  onClick={() => setSelectedResult(recentScorecard)}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline block"
                >
                  View Full Scorecard Breakdown →
                </button>
              </div>
            )}

            {sampleResults.map((res, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{res.exam_title}</h4>
                    <p className="text-xs text-slate-400">{res.completed_at}</p>
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      res.percentage >= 50
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {res.percentage}%
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-slate-600">
                    Score: <strong>{res.total_score}</strong> / {res.max_score}
                  </span>
                  <button
                    onClick={() => setSelectedResult(res)}
                    className="font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <span>View Scorecard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scorecard Modal */}
      {selectedResult && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Ndertech CBT Pro
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Official Examination Scorecard
              </h3>
              <p className="text-xs text-slate-500">
                Candidate: <strong>{selectedResult.candidate_name}</strong> ({selectedResult.reg_number})
              </p>
            </div>

            {/* Scorecard Metric Pill */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex justify-around text-center">
              <div>
                <span className="text-xs text-slate-500 block">Score</span>
                <span className="text-xl font-bold text-blue-600">
                  {selectedResult.total_score} <span className="text-xs text-slate-400 font-normal">/ {selectedResult.max_score}</span>
                </span>
              </div>
              <div className="w-px bg-slate-200" />
              <div>
                <span className="text-xs text-slate-500 block">Percentage</span>
                <span className="text-xl font-bold text-slate-800">
                  {selectedResult.percentage}%
                </span>
              </div>
              <div className="w-px bg-slate-200" />
              <div>
                <span className="text-xs text-slate-500 block">Status</span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                    selectedResult.percentage >= 50
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {selectedResult.outcome}
                </span>
              </div>
            </div>

            {/* Subject Breakdown if available */}
            {selectedResult.breakdown && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Subject Breakdown
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedResult.breakdown.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-slate-700">{item.subject}</span>
                      <div className="text-right">
                        <strong className="text-slate-900">{item.score}</strong> / {item.total}
                        <span className="text-slate-500 ml-1.5">({item.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print Scorecard</span>
              </button>

              <button
                onClick={() => setSelectedResult(null)}
                className="px-5 py-2 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
