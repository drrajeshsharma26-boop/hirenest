import React from 'react';
import { FileText, MessageSquareQuote, Layout, Info } from 'lucide-react';

export const CareerPreparation: React.FC = () => {
  const items = [
    {
      title: 'Resume guidance',
      description: 'Feedback to help you present your skills and projects clearly.',
      icon: FileText,
    },
    {
      title: 'Interview practice',
      description: 'Mock technical and HR rounds with constructive feedback.',
      icon: MessageSquareQuote,
    },
    {
      title: 'Project portfolio',
      description: 'Support in organising your work on GitHub and a portfolio page.',
      icon: Layout,
    },
  ];

  return (
    <section id="career-prep" className="py-20 bg-[#0c204c] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-bold tracking-wider text-blue-300 uppercase">
            CAREER PREPARATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-3 tracking-tight">
            Support as you get ready for opportunities
          </h2>
          <p className="text-base text-slate-300 max-w-2xl">
            Alongside training, we help you prepare to present your skills with confidence.
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 text-blue-300 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2.5">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Disclaimer */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-400">
          <Info className="w-4 h-4 shrink-0 text-slate-400" />
          <span>
            Career support is guidance to improve readiness; it is not a job or placement guarantee.
          </span>
        </div>
      </div>
    </section>
  );
};
