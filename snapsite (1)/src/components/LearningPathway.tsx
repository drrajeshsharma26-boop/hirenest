import React from 'react';
import { BookOpen, Wrench, FolderGit2, Rocket } from 'lucide-react';

export const LearningPathway: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Foundations',
      description: 'Strengthen the core concepts each program builds on.',
      icon: BookOpen,
    },
    {
      step: '02',
      title: 'Hands-on practice',
      description: 'Guided exercises and assignments after every module.',
      icon: Wrench,
    },
    {
      step: '03',
      title: 'Projects',
      description: 'Apply your skills in mini and capstone projects.',
      icon: FolderGit2,
    },
    {
      step: '04',
      title: 'Career readiness',
      description: 'Prepare your resume, portfolio and interview approach.',
      icon: Rocket,
    },
  ];

  return (
    <section id="pathway" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
            LEARNING PATHWAY
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0c1e44] mt-2 tracking-tight">
            A practical path, step by step
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-7 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl font-light text-slate-300 font-serif">
                      {item.step}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-blue-50/70 text-blue-600 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 stroke-[1.8]" />
                  </div>

                  <h3 className="text-lg font-bold text-[#0c1e44] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
