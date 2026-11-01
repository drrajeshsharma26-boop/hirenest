/**
 * Validation logic for student enquiry submissions
 */

export interface EnquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  program: string;
  learningMode: string;
  message?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof EnquiryFormData, string>>;
}

export const VALID_PROGRAMS = [
  'Digital Marketing',
  'Java Full Stack',
  'Python Full Stack',
  'MERN Stack',
  'Software Testing & QA',
  'Data Analytics',
] as const;

export const VALID_LEARNING_MODES = [
  'Online',
  'Offline',
] as const;

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  // Allow international and local format (digits, +, spaces, hyphens, min 7 digits)
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 7 && digitsOnly.length <= 15;
}

export function validateEnquiryForm(data: Partial<EnquiryFormData>): ValidationResult {
  const errors: Partial<Record<keyof EnquiryFormData, string>> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters)';
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.phone || !validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number (at least 7 digits)';
  }

  if (!data.program || !VALID_PROGRAMS.includes(data.program as any)) {
    errors.program = 'Please select a preferred program';
  }

  if (!data.learningMode || !VALID_LEARNING_MODES.includes(data.learningMode as any)) {
    errors.learningMode = 'Please select a learning mode (Online or Offline)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
