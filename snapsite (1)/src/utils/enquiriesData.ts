/**
 * Centralized data management and persistent storage for Hire Nest student enquiries and leads.
 */

import { EnquiryFormData } from './enquiryValidation';

export type LeadStatus = 'New' | 'Contacted' | 'In Discussion' | 'Enrolled' | 'Closed';

export interface EnquiryLead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  program: string;
  learningMode: 'Online' | 'Offline' | string;
  message?: string;
  status: LeadStatus;
  createdAt: string; // ISO 8601 string
  notes?: string;
  source: 'website_form' | 'whatsapp_direct' | 'walkin_reception';
}

export const HIRE_NEST_PHONE = '8860670794';
export const HIRE_NEST_PHONE_INTL = '+918860670794';
export const HIRE_NEST_EMAIL = 'hirenestsolution@gmail.com';
export const HIRE_NEST_OFFICE = 'Office No. 303, B-44, Sector 63, Noida, Uttar Pradesh';

const STORAGE_KEY = 'hire_nest_student_enquiries_v1';

export const INITIAL_SEED_ENQUIRIES: EnquiryLead[] = [
  {
    id: 'HN-2026-1048',
    fullName: 'Pooja Verma',
    email: 'pooja.verma@example.com',
    phone: '+91 98112 34567',
    program: 'Digital Marketing',
    learningMode: 'Offline',
    message: 'Want to know batch timings for upcoming SEO & Performance Marketing classes at Sector 63.',
    status: 'New',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 mins ago
    source: 'website_form',
    notes: 'Requested weekend offline batch schedule',
  },
  {
    id: 'HN-2026-1045',
    fullName: 'Rohan Deshmukh',
    email: 'rohan.d@example.com',
    phone: '+91 97654 32189',
    program: 'Java Full Stack',
    learningMode: 'Online',
    message: 'Looking for Spring Boot and microservices capstone details and interview preparation support.',
    status: 'In Discussion',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    source: 'website_form',
    notes: 'Counselor shared curriculum syllabus on WhatsApp',
  },
  {
    id: 'HN-2026-1039',
    fullName: 'Ananya Sengupta',
    email: 'ananya.s@example.com',
    phone: '+91 99887 76655',
    program: 'MERN Stack',
    learningMode: 'Offline',
    message: 'Currently in final year BCA. Need hands-on React and Node.js internship training.',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(), // 22 hours ago
    source: 'website_form',
  },
  {
    id: 'HN-2026-1022',
    fullName: 'Amanpreet Singh',
    email: 'aman.tech@example.com',
    phone: '+91 98722 11098',
    program: 'Python Full Stack',
    learningMode: 'Online',
    message: 'Looking for Django + FastAPI training with real placement assistance.',
    status: 'Enrolled',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    source: 'whatsapp_direct',
    notes: 'Enrolled in Batch 2026-Q1 weekday online cohort',
  },
];

/**
 * Retrieve all enquiries from localStorage, seeding default records on first launch.
 */
export function getStoredEnquiries(): EnquiryLead[] {
  if (typeof window === 'undefined') {
    return INITIAL_SEED_ENQUIRIES;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_ENQUIRIES));
      return INITIAL_SEED_ENQUIRIES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_SEED_ENQUIRIES;
  } catch (err) {
    console.warn('Failed to load enquiries from storage, using seed data:', err);
    return INITIAL_SEED_ENQUIRIES;
  }
}

/**
 * Save all enquiries to localStorage and trigger storage event for live UI reactivity.
 */
export function saveAllEnquiries(enquiries: EnquiryLead[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(enquiries));
    window.dispatchEvent(new CustomEvent('hire_nest_enquiries_updated', { detail: enquiries }));
  } catch (err) {
    console.error('Failed to save enquiries to storage:', err);
  }
}

/**
 * Generate unique human-readable lead tracking ID like "HN-2026-4821".
 */
export function generateLeadId(): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `HN-${year}-${randomSuffix}`;
}

/**
 * Create and persist a new enquiry lead from the enquiry form.
 */
export function createEnquiryLead(
  formData: EnquiryFormData,
  source: EnquiryLead['source'] = 'website_form'
): EnquiryLead {
  const newLead: EnquiryLead = {
    id: generateLeadId(),
    fullName: formData.fullName.trim(),
    email: formData.email.trim().toLowerCase(),
    phone: formData.phone.trim(),
    program: formData.program,
    learningMode: formData.learningMode,
    message: formData.message?.trim() || '',
    status: 'New',
    createdAt: new Date().toISOString(),
    source,
  };

  const current = getStoredEnquiries();
  const updated = [newLead, ...current];
  saveAllEnquiries(updated);
  return newLead;
}

/**
 * Update the status of an enquiry lead (e.g., 'New' -> 'Contacted' -> 'Enrolled').
 */
export function updateLeadStatus(id: string, newStatus: LeadStatus): EnquiryLead[] {
  const current = getStoredEnquiries();
  const updated = current.map((lead) =>
    lead.id === id ? { ...lead, status: newStatus } : lead
  );
  saveAllEnquiries(updated);
  return updated;
}

/**
 * Update counselor internal notes for an enquiry.
 */
export function updateLeadNotes(id: string, notes: string): EnquiryLead[] {
  const current = getStoredEnquiries();
  const updated = current.map((lead) =>
    lead.id === id ? { ...lead, notes } : lead
  );
  saveAllEnquiries(updated);
  return updated;
}

/**
 * Delete an enquiry lead.
 */
export function deleteLead(id: string): EnquiryLead[] {
  const current = getStoredEnquiries();
  const updated = current.filter((lead) => lead.id !== id);
  saveAllEnquiries(updated);
  return updated;
}

/**
 * Reset enquiry leads to the default realistic seed list.
 */
export function resetEnquiriesToSeed(): EnquiryLead[] {
  saveAllEnquiries(INITIAL_SEED_ENQUIRIES);
  return INITIAL_SEED_ENQUIRIES;
}

/**
 * Generate a pre-formatted WhatsApp enquiry URL sent to Hire Nest official number.
 */
export function buildHireNestWhatsAppUrl(
  data: Partial<EnquiryFormData> & { id?: string }
): string {
  const leadId = data.id ? ` [Ref: ${data.id}]` : '';
  const lines = [
    `*Hello Hire Nest Admission Team*${leadId},`,
    `I would like to enquire about your training program:`,
    ``,
    `*Student Name:* ${data.fullName?.trim() || 'Prospective Student'}`,
    `*Phone:* ${data.phone?.trim() || 'N/A'}`,
    `*Email:* ${data.email?.trim() || 'N/A'}`,
    `*Program Track:* ${data.program || 'Need guidance on selection'}`,
    `*Learning Mode:* ${data.learningMode || 'Online / Offline'}`,
  ];

  if (data.message && data.message.trim().length > 0) {
    lines.push(`*Message / Question:* ${data.message.trim()}`);
  }

  lines.push(``);
  lines.push(`Please share batch schedules, curriculum syllabus, and fee details.`);
  lines.push(`Center: B-44, Office 303, Sector 63, Noida`);

  const fullText = lines.join('\n');
  return `https://wa.me/91${HIRE_NEST_PHONE}?text=${encodeURIComponent(fullText)}`;
}

/**
 * Generate a WhatsApp URL for Hire Nest counselors to reply directly to a student's phone number.
 */
export function buildStudentReplyWhatsAppUrl(lead: EnquiryLead): string {
  const cleanPhone = lead.phone.replace(/\D/g, '');
  const targetPhone = cleanPhone.startsWith('91') && cleanPhone.length > 10 
    ? cleanPhone 
    : cleanPhone.length === 10 
    ? `91${cleanPhone}` 
    : cleanPhone;

  const lines = [
    `Hello ${lead.fullName},`,
    `Greetings from *Hire Nest* (Sector 63, Noida)!`,
    ``,
    `We received your enquiry for the *${lead.program}* (${lead.learningMode}) training program [Ref: ${lead.id}].`,
    `I am contacting you to answer your questions and share the upcoming cohort schedule and curriculum details.`,
    ``,
    `Are you available for a quick 5-minute call or chat?`,
    `- Hire Nest Admissions Team`,
  ];

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(lines.join('\n'))}`;
}

/**
 * Generate a mailto link with structured lead info to hirenestsolution@gmail.com
 */
export function buildHireNestMailtoUrl(
  data: Partial<EnquiryFormData> & { id?: string }
): string {
  const subject = encodeURIComponent(
    `Course Enquiry: ${data.program || 'Training Program'} - ${data.fullName || 'Student'} [${data.id || 'Web'}]`
  );

  const body = encodeURIComponent(
    `Hello Hire Nest Team,\n\n` +
    `Student Enquiry Details:\n` +
    `• Reference: ${data.id || 'N/A'}\n` +
    `• Name: ${data.fullName || ''}\n` +
    `• Email: ${data.email || ''}\n` +
    `• Phone: ${data.phone || ''}\n` +
    `• Program: ${data.program || ''}\n` +
    `• Mode: ${data.learningMode || ''}\n` +
    `• Message: ${data.message || ''}\n\n` +
    `Location preference: B-44, Sector 63, Noida / Online`
  );

  return `mailto:${HIRE_NEST_EMAIL}?subject=${subject}&body=${body}`;
}

/**
 * Generate CSV text from enquiry leads for instant spreadsheet export.
 */
export function generateLeadsCSV(leads: EnquiryLead[]): string {
  const headers = [
    'Lead ID',
    'Date & Time',
    'Full Name',
    'Email',
    'Phone',
    'Program',
    'Learning Mode',
    'Status',
    'Source',
    'Student Message',
    'Internal Notes',
  ];

  const escapeCSV = (str: string | undefined = '') => {
    const val = str.replace(/"/g, '""');
    return `"${val}"`;
  };

  const rows = leads.map((lead) => [
    escapeCSV(lead.id),
    escapeCSV(new Date(lead.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })),
    escapeCSV(lead.fullName),
    escapeCSV(lead.email),
    escapeCSV(lead.phone),
    escapeCSV(lead.program),
    escapeCSV(lead.learningMode),
    escapeCSV(lead.status),
    escapeCSV(lead.source),
    escapeCSV(lead.message),
    escapeCSV(lead.notes || ''),
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
}

/**
 * Trigger client-side file download of CSV export.
 */
export function downloadLeadsCSV(leads: EnquiryLead[]): void {
  const csvContent = generateLeadsCSV(leads);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const filename = `hire-nest-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
