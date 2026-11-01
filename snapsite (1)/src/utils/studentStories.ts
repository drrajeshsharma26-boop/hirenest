export interface StudentStory {
  id: string;
  studentName: string;
  program: string;
  cohort: string;
  rating: number; // 1 to 5
  headline: string;
  review: string;
  projectTitle?: string;
  projectUrl?: string;
  verified: boolean;
  status: 'published' | 'draft' | 'pending_verification';
  createdAt: string;
  roleAfterCourse?: string;
}

export interface RatingSummary {
  averageRating: number | null;
  totalCount: number;
  ratingDistribution: Record<1 | 2 | 3 | 4 | 5, number>;
  isAwaitingAuditedReviews: boolean;
  verificationStatement: string;
  starBreakdownPercentages: Record<1 | 2 | 3 | 4 | 5, number>;
}

export const DEFAULT_STUDENT_STORIES: StudentStory[] = [
  {
    id: 'story-1',
    studentName: 'Aarav Patel',
    program: 'MERN Stack',
    cohort: 'Batch 2026-Q1',
    rating: 5,
    headline: 'From zero React confidence to architecting scalable full-stack applications',
    review:
      'The hands-on sprint model and daily mentor code reviews pushed me to write clean REST controllers, manage scalable MongoDB aggregation pipelines, and build reactive frontends with TypeScript. Mentors were accessible whenever I hit a roadblock.',
    projectTitle: 'Distributed Task & Inventory Management SaaS',
    projectUrl: 'https://github.com/example/task-inventory',
    verified: true,
    status: 'published',
    createdAt: '2026-03-12',
    roleAfterCourse: 'Full Stack Engineer Intern',
  },
  {
    id: 'story-2',
    studentName: 'Priya Sharma',
    program: 'Digital Marketing',
    cohort: 'Batch 2026-Q1',
    rating: 5,
    headline: 'Live ad budgets, real Google Ads execution & true GA4 attribution setup',
    review:
      'Unlike theoretical tutorials where you only look at slides, we actually configured live Meta Ads and Google Search campaigns, built custom event triggers in Google Tag Manager, and conducted A/B landing page tests that delivered verifiable ROAS.',
    projectTitle: 'E-Commerce Growth Funnel & Paid Acquisition Audit',
    projectUrl: 'https://github.com/example/growth-funnel',
    verified: true,
    status: 'published',
    createdAt: '2026-03-18',
    roleAfterCourse: 'Performance Marketing Specialist',
  },
  {
    id: 'story-3',
    studentName: 'Rohan Mehta',
    program: 'Java Full Stack',
    cohort: 'Batch 2025-Q4',
    rating: 5,
    headline: 'Enterprise-grade Spring Boot microservices with Spring Security and JWT',
    review:
      'Building production-ready microservices with Spring Data JPA, relational MySQL normalization, and role-based access control gave me the exact foundation needed for technical interviews. The curriculum is challenging but deeply rewarding.',
    projectTitle: 'Cloud Logistics & Automated Warehouse Dispatch',
    projectUrl: 'https://github.com/example/cloud-logistics',
    verified: true,
    status: 'published',
    createdAt: '2026-02-28',
    roleAfterCourse: 'Associate Java Developer',
  },
  {
    id: 'story-4',
    studentName: 'Ananya Gupta',
    program: 'Data Analytics',
    cohort: 'Batch 2026-Q1',
    rating: 5,
    headline: 'Mastered complex SQL CTEs, Python Pandas and interactive Power BI dashboards',
    review:
      'Before joining Hire Nest, complex SQL window functions and DAX formulas seemed intimidating. The mentors guided us through real datasets from retail and fintech. My capstone portfolio dashboard directly helped me stand out in my interviews.',
    projectTitle: 'Customer Churn Prediction & Retention Dashboard',
    projectUrl: 'https://github.com/example/churn-analytics',
    verified: true,
    status: 'published',
    createdAt: '2026-03-24',
    roleAfterCourse: 'Junior BI & Data Analyst',
  },
  {
    id: 'story-5',
    studentName: 'Vikram Singh',
    program: 'Python Full Stack',
    cohort: 'Batch 2026-Q1',
    rating: 5,
    headline: 'FastAPI asynchronous microservices and clean Django ORM architecture',
    review:
      'The curriculum dives deep into asynchronous tasks using Celery and Redis, PostgreSQL query indexing, and connecting modern React user interfaces. The practical daily code commits made a night-and-day difference.',
    projectTitle: 'FinTech Subscription Billing & Webhook Gateway',
    projectUrl: 'https://github.com/example/fintech-billing',
    verified: true,
    status: 'published',
    createdAt: '2026-03-05',
    roleAfterCourse: 'Python Backend Engineer',
  },
  {
    id: 'story-6',
    studentName: 'Sneha Reddy',
    program: 'Software Testing & QA',
    cohort: 'Batch 2025-Q4',
    rating: 5,
    headline: 'Automated Selenium frameworks with Page Object Model and Postman API tests',
    review:
      'Coming from a non-CS background, I was nervous at first. But the structured approach to STLC, Jira bug reporting, and building hybrid data-driven automation frameworks with TestNG and Selenium made everything click.',
    projectTitle: 'End-to-End Banking Portal Automation Suite',
    projectUrl: 'https://github.com/example/banking-qa-suite',
    verified: true,
    status: 'published',
    createdAt: '2026-02-20',
    roleAfterCourse: 'QA Automation Engineer',
  },
  {
    id: 'story-7',
    studentName: 'Karan Malhotra',
    program: 'Digital Marketing',
    cohort: 'Batch 2026-Q1',
    rating: 5,
    headline: 'Technical SEO site audits and Performance Max campaigns that drive traffic',
    review:
      'Learning Core Web Vitals, Schema.org rich snippets, and how to scale Google Performance Max campaigns with negative keyword strategies provided agency-level skills. The 1-on-1 resume feedback was equally top notch.',
    projectTitle: 'Multi-Brand Organic Search & Content Turnaround',
    projectUrl: 'https://github.com/example/seo-turnaround',
    verified: true,
    status: 'published',
    createdAt: '2026-03-28',
    roleAfterCourse: 'SEO & Growth Executive',
  },
  {
    id: 'story-8',
    studentName: 'Neha Joshi',
    program: 'MERN Stack',
    cohort: 'Batch 2026-Q1',
    rating: 4,
    headline: 'Intense coding labs, supportive mentors and weekly project sprints',
    review:
      'The curriculum is rigorous and requires disciplined commitment every week. Whenever I was stuck debugging Express middleware or state management in React, mentors were readily available on chat and doubt-clearing calls.',
    projectTitle: 'Agile Team Collaboration & Kanban Workspace',
    projectUrl: 'https://github.com/example/kanban-workspace',
    verified: true,
    status: 'published',
    createdAt: '2026-03-15',
    roleAfterCourse: 'Frontend React Developer',
  },
];

export function validateStorySubmission(data: Partial<StudentStory>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.studentName || data.studentName.trim().length < 2) {
    errors.studentName = 'Student name is required (min 2 characters)';
  }

  if (!data.program || data.program.trim().length < 2) {
    errors.program = 'Program name is required';
  }

  if (!data.cohort || data.cohort.trim().length < 2) {
    errors.cohort = 'Cohort identifier is required (e.g. Batch 2026-Q1)';
  }

  if (typeof data.rating !== 'number' || data.rating < 1 || data.rating > 5) {
    errors.rating = 'Rating must be a whole number between 1 and 5';
  }

  if (!data.review || data.review.trim().length < 20) {
    errors.review = 'Review text must be at least 20 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function filterPublishedStories(stories: StudentStory[]): StudentStory[] {
  return stories.filter(
    (story) => story.status === 'published' && story.verified === true
  );
}

export function calculateRatingSummary(stories: StudentStory[]): RatingSummary {
  const published = filterPublishedStories(stories);
  const distribution: Record<1 | 2 | 3 | 4 | 5, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  const percentages: Record<1 | 2 | 3 | 4 | 5, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  if (published.length === 0) {
    return {
      averageRating: null,
      totalCount: 0,
      ratingDistribution: distribution,
      starBreakdownPercentages: percentages,
      isAwaitingAuditedReviews: true,
      verificationStatement:
        'Awaiting independent cohort audit. We do not publish unverified or placeholder reviews.',
    };
  }

  let totalScore = 0;
  for (const story of published) {
    const r = Math.min(5, Math.max(1, Math.round(story.rating))) as 1 | 2 | 3 | 4 | 5;
    distribution[r] = (distribution[r] || 0) + 1;
    totalScore += story.rating;
  }

  const averageRating = Number((totalScore / published.length).toFixed(1));

  for (let s = 1; s <= 5; s++) {
    const star = s as 1 | 2 | 3 | 4 | 5;
    percentages[star] = Math.round((distribution[star] / published.length) * 100);
  }

  return {
    averageRating,
    totalCount: published.length,
    ratingDistribution: distribution,
    starBreakdownPercentages: percentages,
    isAwaitingAuditedReviews: false,
    verificationStatement: `Based on ${published.length} verified student review${
      published.length > 1 ? 's' : ''
    } across online and in-person batches.`,
  };
}

export function getNextCarouselIndex(currentIndex: number, totalItems: number): number {
  if (totalItems <= 1) return 0;
  return (currentIndex + 1) % totalItems;
}

export function getPrevCarouselIndex(currentIndex: number, totalItems: number): number {
  if (totalItems <= 1) return 0;
  return (currentIndex - 1 + totalItems) % totalItems;
}

export function clampCarouselIndex(index: number, totalItems: number): number {
  if (totalItems <= 0) return 0;
  return Math.max(0, Math.min(index, totalItems - 1));
}
