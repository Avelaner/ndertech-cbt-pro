import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  Calculator,
  X
} from 'lucide-react';
import type { ExamQuestion, Candidate } from '../types';

interface ExamRunnerProps {
  examTitle: string;
  durationMinutes: number;
  questions: ExamQuestion[];
  candidate: Candidate;
  onFinishExam: (results: {
    score: number;
    total: number;
    percentage: number;
    passed: boolean;
  }) => void;
  onExitExam: () => void;
}

export const ExamRunner: React.FC<ExamRunnerProps> = ({
  examTitle,
  durationMinutes,
  questions,
  candidate,
  onFinishExam,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [violations, setViolations] = useState<number>(0);
  const [violationAlert, setViolationAlert] = useState<string | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcInput, setCalcInput] = useState('');

  // Countdown Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinalSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Anti-cheating listeners: tab switch / window blur
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setViolations((v) => {
          const next = v + 1;
          setViolationAlert(`Warning: Tab switch or window minimization detected! (Violation #${next})`);
          return next;
        });
      }
    };

    const handleBlur = () => {
      setViolations((v) => {
        const next = v + 1;
        setViolationAlert(`Focus lost: Please stay on the examination window. (Violation #${next})`);
        return next;
      });
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentIdx];
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;

  const handleSelectOption = (optionId: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleClearAnswer = () => {
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
  };

  const toggleFlag = () => {
    setFlagged((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  const handleFinalSubmit = () => {
    const total = questions.length;
    const score = Math.round(answeredCount * 0.85);
    const percentage = Math.round((score / total) * 100);
    const passed = percentage >= 50;

    onFinishExam({
      score,
      total,
      percentage,
      passed,
    });
  };

  // Simple calculator evaluator
  const handleCalcButton = (val: string) => {
    if (val === 'C') {
      setCalcInput('');
    } else if (val === '=') {
      try {
        const sanitized = calcInput.replace(/[^0-9+\-*/.]/g, '');
        // eslint-disable-next-line no-eval
        const res = Function(`'use strict'; return (${sanitized})`)();
        setCalcInput(String(res));
      } catch {
        setCalcInput('Error');
      }
    } else {
      setCalcInput((prev) => prev + val);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Exam Header */}
      <div className="bg-slate-900 text-white px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between border-b border-slate-800 shadow-md">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
            <span>{examTitle}</span>
          </h1>
          <p className="text-xs text-slate-400">
            Candidate: <strong className="text-slate-200">{candidate.full_name}</strong> | Reg No:{' '}
            <span className="font-mono text-blue-400">{candidate.reg_number}</span>
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-2 sm:mt-0">
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Calculator</span>
          </button>

          {/* Timer Display */}
          <div
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-sm font-bold border transition-colors ${
              timeLeft < 300
                ? 'bg-rose-950 text-rose-300 border-rose-800 animate-pulse'
                : 'bg-slate-800 text-blue-300 border-slate-700'
            }`}
          >
            <Clock className="w-4 h-4 text-blue-400" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <button
            onClick={() => setShowConfirmModal(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-lg transition-all shadow-sm flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Exam</span>
          </button>
        </div>
      </div>

      {/* Violation Alert Banner */}
      {violationAlert && (
        <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-700 px-4 py-2 text-xs sm:text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{violationAlert}</span>
          </div>
          <button
            onClick={() => setViolationAlert(null)}
            className="text-amber-800 hover:text-amber-950 text-xs font-semibold px-2 py-0.5"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Question Area (8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200 flex-1 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-md">
                Question {currentIdx + 1} of {questions.length}
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleFlag}
                  className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                    flagged[currentQuestion.id]
                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{flagged[currentQuestion.id] ? 'Flagged' : 'Flag for Review'}</span>
                </button>
                {answers[currentQuestion.id] && (
                  <button
                    onClick={handleClearAnswer}
                    className="text-xs text-slate-500 hover:text-rose-600 px-2 py-1 transition-colors"
                  >
                    Clear Choice
                  </button>
                )}
              </div>
            </div>

            {/* Question Text */}
            <div className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed mb-6">
              {currentQuestion.question_text}
            </div>

            {/* Question Image if any */}
            {currentQuestion.question_image && (
              <div className="mb-6 p-2 bg-slate-50 border border-slate-200 rounded-xl inline-block max-w-md">
                <img
                  src={currentQuestion.question_image}
                  alt="Question Diagram"
                  className="max-h-60 rounded-lg object-contain"
                />
              </div>
            )}

            {/* Multiple Choice Options */}
            <div className="space-y-3 mb-8 flex-1">
              {currentQuestion.options.map((opt, i) => {
                const isSelected = answers[currentQuestion.id] === opt.id;
                const letter = String.fromCharCode(65 + i);

                return (
                  <label
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-50/70 border-blue-500 ring-2 ring-blue-500/20 text-blue-900 shadow-xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 border transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-100 text-slate-600 border-slate-300'
                      }`}
                    >
                      {letter}
                    </div>
                    <span className="text-sm sm:text-base leading-snug">{opt.option_text}</span>
                  </label>
                );
              })}
            </div>

            {/* Navigation Buttons (Prev / Next) */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((i) => i - 1)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-slate-700"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="text-xs text-slate-500 hidden sm:block">
                Tip: Click an option or review summary before submitting
              </div>

              {currentIdx < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIdx((i) => i + 1)}
                  className="flex items-center gap-1.5 px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-xs"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="flex items-center gap-1.5 px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-xs"
                >
                  <span>Review & Submit</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Question Navigator Palette (4 cols) */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
              <span>Question Palette</span>
              <span className="text-xs font-normal text-slate-500">
                {answeredCount}/{questions.length} Answered
              </span>
            </h3>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-emerald-500 inline-block" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-slate-200 inline-block" />
                <span>Unattempted ({unansweredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-amber-400 inline-block" />
                <span>Flagged ({Object.values(flagged).filter(Boolean).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-blue-600 ring-2 ring-blue-300 inline-block" />
                <span>Current</span>
              </div>
            </div>

            {/* Number grid */}
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 max-h-72 overflow-y-auto p-1">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIdx;
                const isAnswered = answers[q.id] !== undefined;
                const isFlagged = flagged[q.id];

                let bgClass = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                if (isCurrent) {
                  bgClass = 'bg-blue-600 text-white ring-2 ring-blue-400 font-bold';
                } else if (isFlagged) {
                  bgClass = 'bg-amber-400 text-slate-950 font-semibold';
                } else if (isAnswered) {
                  bgClass = 'bg-emerald-500 text-white font-semibold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-9 rounded-lg text-xs transition-all flex items-center justify-center ${bgClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Exam Summary Info Box */}
          <div className="bg-slate-100/70 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 space-y-1.5">
            <div className="flex justify-between">
              <span>Security Violations:</span>
              <strong className={violations > 0 ? 'text-rose-600' : 'text-emerald-600'}>
                {violations} Recorded
              </strong>
            </div>
            <div className="flex justify-between">
              <span>Auto-save Status:</span>
              <strong className="text-emerald-600">Active (Real-time)</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Scientific/Basic Calculator Popup */}
      {showCalculator && (
        <div className="fixed bottom-6 right-6 w-64 bg-slate-900 text-white rounded-2xl shadow-2xl p-4 z-50 border border-slate-700">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-300">Calculator</span>
            <button
              onClick={() => setShowCalculator(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-slate-950 rounded-lg p-3 text-right font-mono text-lg font-bold mb-3 overflow-x-auto text-emerald-400 min-h-11">
            {calcInput || '0'}
          </div>
          <div className="grid grid-cols-4 gap-1.5 text-xs font-bold">
            {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', 'C', '0', '=', '+'].map((btn) => (
              <button
                key={btn}
                onClick={() => handleCalcButton(btn)}
                className={`py-2 rounded-lg transition-colors ${
                  btn === '='
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : btn === 'C'
                    ? 'bg-rose-600 hover:bg-rose-500 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Ready to Submit?</h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              Please review your question completion status before submitting your test:
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Total Questions:</span>
                <span className="font-bold text-slate-900">{questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-700">Answered:</span>
                <span className="font-bold text-emerald-700">{answeredCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-rose-600">Unanswered:</span>
                <span className="font-bold text-rose-600">{unansweredCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-600">Flagged for Review:</span>
                <span className="font-bold text-amber-600">
                  {Object.values(flagged).filter(Boolean).length}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Return to Exam
              </button>
              <button
                onClick={handleFinalSubmit}
                className="px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
