export interface Candidate {
  id: number;
  reg_number: string;
  registration_number?: string;
  full_name: string;
  email?: string;
  phone?: string | number;
  username?: string;
  program_name: string;
  passport_url?: string;
  org_id: number;
  wallet?: number;
  licence?: number;
  status?: string;
  start_date?: string | null;
  end_date?: string | null;
}

export interface User {
  id: number;
  full_name: string;
  email: string;
  username?: string;
  role: 'super_admin' | 'admin' | 'invigilator';
  org_id: number;
}

export interface ExamOption {
  id: number;
  option_text: string;
}

export interface ExamQuestion {
  id: number;
  question_text: string;
  marks: number;
  options: ExamOption[];
  question_image?: string;
}

export interface Exam {
  id: number;
  title: string;
  exam_code?: string;
  subject_name: string;
  duration_minutes: number;
  total_questions: number;
  pass_mark: number;
  is_active: boolean;
}

export interface ScorecardSubject {
  subject: string;
  score: number;
  total: number;
  percentage: number;
}

export interface Scorecard {
  session_id: string | number;
  candidate_name: string;
  reg_number: string;
  exam_title: string;
  total_score: number;
  max_score: number;
  percentage: number;
  status: string;
  outcome: string;
  completed_at?: string;
  breakdown?: ScorecardSubject[];
}
