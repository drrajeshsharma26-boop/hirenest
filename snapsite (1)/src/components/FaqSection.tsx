import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Who are the programs for?',
      answer:
        'Our tracks are designed for college students, recent graduates, and working professionals looking to transition into software engineering, QA testing, or data analytics. Whether you want to start from scratch or upskill for product companies, our curriculum adapts to your current level.',
    },
    {
      question: 'Do I need prior coding experience?',
      answer:
        'No prior coding background is mandatory. We start every track from foundational principles before transitioning to advanced frameworks and production-grade architectures. Our mentors provide 1-on-1 doubt resolution to ensure you keep pace.',
    },
    {
      question: "What's the difference between online and offline batches?",
      answer:
        'Both online and offline batches follow the exact same industry-aligned curriculum and practical assignments. Online batches feature live interactive video classes with chat and screen sharing, while offline batches take place in physical classrooms with direct in-person lab mentorship and peer study groups.',
    },
    {
      question: 'Do you guarantee a job or placement?',
      answer:
        'We do not offer misleading placement guarantees. Instead, we provide dedicated career preparation: comprehensive resume reviews, portfolio hosting assistance on GitHub, mock technical interviews, and HR prep sessions so you can compete confidently for high-growth tech roles.',
    },
    {
      question: 'How do I learn about fees and batch dates?',
      answer:
        'Simply submit the enquiry form above or reach out directly via phone or email. Our admissions advisor will share the current fee structure, early-bird scholarship opportunities, and upcoming weekday or weekend batch schedules.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50/60 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0c1e44] mt-2 tracking-tight">
            Common questions
          </h2>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200/80 shadow-2xs overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-[#0c1e44]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
