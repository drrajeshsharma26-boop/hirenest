export interface PolicySection {
  id: string;
  title: string;
  shortDescription: string;
  badge: string;
  confirmedDetails: {
    label: string;
    description: string;
  }[];
  placeholderNotice?: {
    title: string;
    message: string;
    status: 'pending_schedule' | 'under_review' | 'awaiting_launch';
  };
}

export const TRANSPARENCY_POLICIES: PolicySection[] = [
  {
    id: 'course-info',
    title: 'Course Information & Delivery',
    shortDescription: 'Confirmed curriculum architecture, session formats, and completion requirements.',
    badge: 'Curriculum Standards',
    confirmedDetails: [
      {
        label: 'Program Tracks',
        description:
          'Five specialized curriculums: Java Full Stack, Python Full Stack, MERN Stack, Software Testing & QA, and Data Analytics.',
      },
      {
        label: 'Learning Delivery',
        description:
          'Dual format offerings: Live instructor-led online sessions with recorded video archives, or in-person classroom lab cohorts.',
      },
      {
        label: 'Practical Capstone Requirement',
        description:
          'Students must complete at least 2 structured module assignments and 1 independent production capstone deployed publicly on GitHub.',
      },
      {
        label: 'Credential Verification',
        description:
          'Digital Certificate of Completion issued only upon achieving ≥85% attendance and passing all mandatory project reviews.',
      },
    ],
    placeholderNotice: {
      title: 'Upcoming Batch Calendar',
      message:
        'Specific weekday and weekend batch commencement dates for the upcoming term are currently being finalized. Submit an enquiry to receive the confirmed calendar directly.',
      status: 'pending_schedule',
    },
  },
  {
    id: 'fees-policies',
    title: 'Fees & Refund Policies',
    shortDescription: 'Transparent pricing structure, installment schedules, and consumer protections.',
    badge: 'Financial Terms',
    confirmedDetails: [
      {
        label: 'No Hidden Charges',
        description:
          'All course material, lab access, session recordings, and mentor review sessions are bundled. Zero unexpected registration or test fees.',
      },
      {
        label: '7-Day Refund Policy',
        description:
          'If you decide the course is not suitable within the first 7 calendar days (or first 2 attended classes), receive a 100% full refund with zero deduction.',
      },
      {
        label: 'Installment Options',
        description:
          'Course fees can be split into two equal milestone installments: 50% at registration and 50% at the completion of Foundation Module 2.',
      },
    ],
    placeholderNotice: {
      title: 'Physical Center Fee Surcharge',
      message:
        'Offline lab branch location and seat allocations are subject to venue capacity. Local center operational fee schedules will be published upon city lease execution.',
      status: 'under_review',
    },
  },
  {
    id: 'placement-terms',
    title: 'Placement Assistance Terms',
    shortDescription: 'Clear, ethical boundaries around career readiness support versus employment outcomes.',
    badge: 'Career Support Scope',
    confirmedDetails: [
      {
        label: 'Readiness Guidance, Not a Job Guarantee',
        description:
          'We do not promise or advertise 100% placement guarantees, inflated salary statistics, or tie-up claims that cannot be legally substantiated.',
      },
      {
        label: 'Resume & Portfolio Audit',
        description:
          'Mentors review student resumes, optimize LinkedIn profiles, and audit code repositories to ensure work is presented with industry standards.',
      },
      {
        label: 'Mock Interview Practice',
        description:
          'Includes structured technical drill rounds, coding challenges, and HR behavioral interview practice with constructive rubric scoring.',
      },
      {
        label: 'Referral & Opportunity Sharing',
        description:
          'Job openings and hiring leads from partner networks and tech communities are shared openly with batch graduates who complete their capstones.',
      },
    ],
  },
  {
    id: 'eligibility',
    title: 'Eligibility & Requirements',
    shortDescription: 'Baseline academic, technical, and commitment prerequisites.',
    badge: 'Prerequisites',
    confirmedDetails: [
      {
        label: 'Academic Background',
        description:
          'Open to undergraduates, graduates, and working professionals from any discipline. Strong curiosity and logical problem-solving interest required.',
      },
      {
        label: 'Hardware & System Specifications',
        description:
          'A working personal laptop or desktop with minimum 8GB RAM, modern 64-bit OS (macOS, Windows 10/11, or Linux), and webcam/microphone for live calls.',
      },
      {
        label: 'Time Commitment',
        description:
          'Estimated 12 to 15 hours per week including lecture sessions, mentor labs, and self-directed coding practice.',
      },
    ],
  },
  {
    id: 'privacy',
    title: 'Student Privacy & Data Ethics',
    shortDescription: 'How student identities, data, and submissions are protected.',
    badge: 'Data Ethics',
    confirmedDetails: [
      {
        label: 'Zero Data Commercialization',
        description:
          'We never sell, rent, or trade your contact info or student records to third-party telemarketers or external recruitment agencies.',
      },
      {
        label: 'Consent-First Testimonial Publishing',
        description:
          'Student names, reviews, and project links are only published with explicit written authorization and after independent cohort verification.',
      },
      {
        label: 'Code Ownership',
        description:
          'All intellectual property and code created by students during project modules remains 100% the property of the student.',
      },
    ],
  },
];
