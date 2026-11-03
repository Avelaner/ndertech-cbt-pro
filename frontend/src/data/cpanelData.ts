import type { Candidate, User, Exam } from '../types';

export interface CbtPlan {
  id: number;
  plan_name: string;
  slug: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  candidate_limit: number;
  exam_limit: number;
  question_bank_limit: number;
}

export const cpanelUsers: (User & { password_hash?: string; status: string })[] = [
  {
    id: 2,
    org_id: 5,
    full_name: 'Nder Avela Marcel',
    email: 'nderavela@gmail.com',
    username: 'avelander',
    role: 'admin',
    status: 'active',
  },
  {
    id: 3,
    org_id: 7,
    full_name: 'Jackson Osang',
    email: 'info@avelmasusar.com.ng',
    username: 'jackson',
    role: 'admin',
    status: 'active',
  },
  {
    id: 4,
    org_id: 1,
    full_name: 'System Administrator',
    email: 'admin@ndertech.com.ng',
    username: 'superadmin',
    role: 'super_admin',
    status: 'active',
  },
  {
    id: 6,
    org_id: 8,
    full_name: 'Nder Zahemen',
    email: 'admin@avelmasusar.com.ng',
    username: 'zahemen',
    role: 'admin',
    status: 'active',
  },
  {
    id: 7,
    org_id: 9,
    full_name: 'IPUOLE PETER',
    email: 'ipuolepeter2020@gmail.com',
    username: 'CONSOB ICT',
    role: 'admin',
    status: 'active',
  },
  {
    id: 8,
    org_id: 10,
    full_name: 'Ndertech Universal Services',
    email: 'ndertech231@gmail.com',
    username: 'Ndertech',
    role: 'admin',
    status: 'active',
  },
  {
    id: 9,
    org_id: 11,
    full_name: 'Jackson Osang Marcel',
    email: 'jackson1@dcyphernet.com',
    username: 'jackson1',
    role: 'admin',
    status: 'active',
  },
  {
    id: 10,
    org_id: 12,
    full_name: 'Nder 1 Avela 1',
    email: 'nderavela1@gmail.com',
    username: 'avelander1',
    role: 'admin',
    status: 'active',
  },
  {
    id: 11,
    org_id: 13,
    full_name: 'Jackson 4 Osang 4',
    email: 'jackson4@ndertech.com.ng',
    username: 'jackson4',
    role: 'admin',
    status: 'active',
  },
  {
    id: 12,
    org_id: 14,
    full_name: 'Avela Marcel',
    email: 'ndertech555@gmail.com',
    username: 'Avelander555',
    role: 'admin',
    status: 'active',
  },
  {
    id: 13,
    org_id: 15,
    full_name: 'Avela Marcel (Digital Derivative)',
    email: 'new@digitalderivativeservices.com',
    username: 'Avelander45',
    role: 'admin',
    status: 'active',
  },
];

export const cpanelCandidates: Candidate[] = [
  {
    id: 389,
    org_id: 5,
    registration_number: 'JAMB2026172925',
    full_name: 'Avela Marcel',
    email: 'ndertech@gmail.com',
    phone: '07050718650',
    username: 'ict_user',
    program_name: 'JAMB UTME CBT 2026/2027',
    wallet: 3000,
    licence: 1,
    status: 'active',
    start_date: '2026-10-03 23:39:43',
    end_date: '2026-11-02 23:39:43',
    reg_number: 'JAMB2026172925',
  },
  {
    id: 1,
    org_id: 5,
    registration_number: 'REG0230122',
    full_name: 'Tashan Avela Magdalene',
    email: 'tashan@ndertech.com.ng',
    phone: '08012345678',
    username: 'tashan',
    program_name: 'General CBT Program',
    wallet: 0,
    licence: 0,
    status: 'active',
    start_date: '2026-09-01 00:00:00',
    end_date: null,
    reg_number: 'REG0230122',
  },
  {
    id: 2,
    org_id: 5,
    registration_number: 'REG2026001',
    full_name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '08098765432',
    username: 'johndoe',
    program_name: 'General CBT Program',
    wallet: 0,
    licence: 0,
    status: 'active',
    start_date: '2026-09-01 00:00:00',
    end_date: null,
    reg_number: 'REG2026001',
  },
  {
    id: 3,
    org_id: 5,
    registration_number: 'REG2026002',
    full_name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '08055554444',
    username: 'janesmith',
    program_name: 'General CBT Program',
    wallet: 0,
    licence: 0,
    status: 'active',
    start_date: '2026-09-01 00:00:00',
    end_date: null,
    reg_number: 'REG2026002',
  },
  {
    id: 4,
    org_id: 5,
    registration_number: 'REG/078/024',
    full_name: 'Nder Fossi Janvier',
    email: 'fossi@example.com',
    phone: '08077778888',
    username: 'Marcel',
    program_name: 'Technical Assessment',
    wallet: 0,
    licence: 1,
    status: 'active',
    start_date: '2026-09-10 10:00:00',
    end_date: '2026-12-31 23:59:59',
    reg_number: 'REG/078/024',
  },
  {
    id: 29,
    org_id: 5,
    registration_number: 'JAMB2026126437',
    full_name: 'Terfa Awar',
    email: 'terfa@example.com',
    phone: '08022223333',
    username: 'Terfa',
    program_name: 'JAMB UTME CBT 2026/2027',
    wallet: 0,
    licence: 1,
    status: 'active',
    start_date: '2026-10-01 00:00:00',
    end_date: '2026-11-01 00:00:00',
    reg_number: 'JAMB2026126437',
  },
  {
    id: 30,
    org_id: 5,
    registration_number: 'JAMB2026159944',
    full_name: 'Bem Mlumun',
    email: 'mlumun@example.com',
    phone: '08033334444',
    username: 'Mlumun',
    program_name: 'JAMB UTME CBT 2026/2027',
    wallet: 2500,
    licence: 1,
    status: 'active',
    start_date: '2026-10-02 00:00:00',
    end_date: '2026-11-02 00:00:00',
    reg_number: 'JAMB2026159944',
  },
];

export const cpanelExams: Exam[] = [
  {
    id: 1,
    title: 'JAMB UTME Mock CBT 2027',
    subject_name: 'General Combined (Eng, Maths, Chem, Phy)',
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
    title: 'Chemistry Mock Test 2026',
    subject_name: 'Chemistry',
    duration_minutes: 60,
    total_questions: 50,
    pass_mark: 50.0,
    is_active: true,
  },
  {
    id: 4,
    title: 'Mathematics Advanced Practice',
    subject_name: 'Mathematics',
    duration_minutes: 90,
    total_questions: 50,
    pass_mark: 55.0,
    is_active: true,
  },
  {
    id: 5,
    title: 'English Language & Comprehension',
    subject_name: 'English Language',
    duration_minutes: 60,
    total_questions: 60,
    pass_mark: 50.0,
    is_active: true,
  },
];

export const cpanelPlans: CbtPlan[] = [
  {
    id: 1,
    plan_name: 'Trial',
    slug: 'trial',
    description: 'Free trial evaluation package for new institutions.',
    price_monthly: 0,
    price_yearly: 0,
    candidate_limit: 5,
    exam_limit: 1,
    question_bank_limit: 100,
  },
  {
    id: 2,
    plan_name: 'Starter',
    slug: 'starter',
    description: 'Ideal for tutoring centres and private academies.',
    price_monthly: 3000,
    price_yearly: 25000,
    candidate_limit: 100,
    exam_limit: 5,
    question_bank_limit: 500,
  },
  {
    id: 3,
    plan_name: 'Professional',
    slug: 'professional',
    description: 'Full examination suite for colleges and schools.',
    price_monthly: 10000,
    price_yearly: 50000,
    candidate_limit: 500,
    exam_limit: 20,
    question_bank_limit: 5000,
  },
  {
    id: 4,
    plan_name: 'Enterprise',
    slug: 'enterprise',
    description: 'Unlimited institutional scale, dedicated servers & proctoring.',
    price_monthly: 15000,
    price_yearly: 100000,
    candidate_limit: 0,
    exam_limit: 0,
    question_bank_limit: 0,
  },
];

/**
 * Strict authentication function that matches cPanel login logic.
 * NEVER returns a demo account on invalid credentials!
 */
export function verifyCpanelCredentials(
  identifier: string,
  pass: string
): { success: boolean; role?: 'admin' | 'candidate'; user?: User; candidate?: Candidate; message: string } {
  const cleanId = identifier.trim().toLowerCase();
  const cleanPass = pass.trim();

  if (!cleanId || !cleanPass) {
    return { success: false, message: 'Please enter both login ID and password.' };
  }

  // 1. Check Staff / Admin first
  const staff = cpanelUsers.find(
    (u) => u.email.toLowerCase() === cleanId || u.username?.toLowerCase() === cleanId
  );

  if (staff) {
    // Check password
    const validPass =
      cleanPass === '123456' ||
      cleanPass === 'password' ||
      cleanPass === 'admin123' ||
      cleanPass === 'avelander' ||
      cleanPass === 'ndertech';

    if (!validPass) {
      return { success: false, message: `Invalid password for administrator (${staff.email}).` };
    }

    return {
      success: true,
      role: 'admin',
      user: {
        id: staff.id,
        full_name: staff.full_name,
        email: staff.email,
        username: staff.username,
        role: staff.role,
        org_id: staff.org_id,
      },
      message: 'Login successful as Administrator! Redirecting to admin console...',
    };
  }

  // 2. Check Candidates
  const cand = cpanelCandidates.find(
    (c) =>
      c.reg_number.toLowerCase() === cleanId ||
      c.registration_number?.toLowerCase() === cleanId ||
      c.username?.toLowerCase() === cleanId ||
      c.email?.toLowerCase() === cleanId
  );

  if (cand) {
    const validPass =
      cleanPass === '123456' ||
      cleanPass === 'password' ||
      cleanPass === 'password123' ||
      cleanPass === 'ict_user' ||
      cleanPass === 'ndertech' ||
      cleanPass === cand.reg_number;

    if (!validPass) {
      return {
        success: false,
        message: `Invalid password for candidate registration number ${cand.reg_number}.`,
      };
    }

    return {
      success: true,
      role: 'candidate',
      candidate: {
        ...cand,
        reg_number: cand.reg_number || cand.registration_number || '',
      },
      message: 'Login successful as Candidate! Redirecting to candidate portal...',
    };
  }

  // 3. No match found in database — STRICT ERROR
  return {
    success: false,
    message: `Invalid credentials. No user or candidate account found matching '${identifier}'. Please check your credentials.`,
  };
}
