import React from 'react';
import { Coffee, Code, Layers, ShieldCheck, BarChart3, TrendingUp, ArrowRight, BookOpen, Star } from 'lucide-react';

interface TrainingProgramsProps {
  onSelectProgram?: (programName: string) => void;
  onGetGuidance?: () => void;
  onViewProgramDetails?: (programId: string) => void;
}

export const TrainingPrograms: React.FC<TrainingProgramsProps> = ({
  onSelectProgram,
  onGetGuidance,
  onViewProgramDetails,
}) => {
  const programs = [
    {
      id: 'digital-marketing',
      name: 'Digital Marketing',
      description: 'SEO, Google & Meta Ads, web analytics (GA4), and growth marketing funnels.',
      tags: ['SEO', 'Google Ads', 'Meta Ads', 'GA4 Analytics'],
      icon: TrendingUp,
      rating: '4.9',
      reviewsCount: 54,
      isNew: true,
    },
    {
      id: 'java-full-stack',
      name: 'Java Full Stack',
      description: 'Core Java, Spring Boot, REST APIs, SQL and a modern front end.',
      tags: ['Java', 'Spring Boot', 'React', 'MySQL'],
      icon: Coffee,
      rating: '4.8',
      reviewsCount: 68,
    },
    {
      id: 'python-full-stack',
      name: 'Python Full Stack',
      description: 'Python fundamentals, Django, APIs and responsive web interfaces.',
      tags: ['Python', 'Django', 'REST', 'PostgreSQL'],
      icon: Code,
      rating: '4.9',
      reviewsCount: 42,
    },
    {
      id: 'mern-stack',
      name: 'MERN Stack',
      description: 'Build complete JavaScript applications from database to UI.',
      tags: ['MongoDB', 'Express', 'React', 'Node.js'],
      icon: Layers,
      rating: '4.9',
      reviewsCount: 76,
    },
    {
      id: 'software-testing-qa',
      name: 'Software Testing & QA',
      description: 'Manual testing, test design, automation basics and bug reporting.',
      tags: ['Manual', 'Selenium', 'API testing', 'Agile'],
      icon: ShieldCheck,
      rating: '4.8',
      reviewsCount: 38,
    },
    {
      id: 'data-analytics',
      name: 'Data Analytics',
      description: 'Clean, analyse and visualise data to answer real questions.',
      tags: ['Excel', 'SQL', 'Python', 'Power BI'],
      icon: BarChart3,
      rating: '4.9',
      reviewsCount: 50,
    },
  ];

  return (
    <section id="programs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
              TRAINING PROGRAMS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0c1e44] mt-2 mb-3 tracking-tight">
              Choose a track that fits your goals
            </h2>
            <p className="text-base text-slate-500 max-w-2xl">
              Each program blends concepts, guided practice and real projects.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onViewProgramDetails?.('digital-marketing')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 self-start sm:self-auto cursor-pointer"
          >
            <span>Browse Full Syllabus &amp; Curriculum</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Programs Grid + 1 Guidance Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((prog) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.id}
                className="group p-7 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between relative"
              >
                {prog.isNew && (
                  <span className="absolute top-6 right-6 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                    New Track
                  </span>
                )}

                <div>
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-blue-50/80 text-blue-600 flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-105">
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#0c1e44] mb-1.5">
                    {prog.name}
                  </h3>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-1.5 text-xs mb-3 text-slate-500">
                    <div className="flex items-center text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                    </div>
                    <span className="font-bold text-slate-700">{prog.rating}</span>
                    <span className="text-slate-400 font-normal">({prog.reviewsCount} reviews)</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    {prog.description}
                  </p>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 pb-4 border-t border-slate-100">
                    {prog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions: View syllabus & Select track */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onViewProgramDetails?.(prog.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors py-1 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>View syllabus</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectProgram?.(prog.name)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors py-1 cursor-pointer"
                    >
                      Enquire track &rarr;
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Guidance Card */}
          <div className="p-7 rounded-2xl bg-[#0e224c] text-white flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow duration-200 md:col-span-2 lg:col-span-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1.5">
                  Not sure which track fits your career goals?
                </h3>
                <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Talk to an academic counsellor about your background, career switch plans, and
                  technical interests.
                </p>
              </div>

              <button
                type="button"
                onClick={onGetGuidance}
                className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all hover:translate-x-1 cursor-pointer self-start sm:self-auto"
              >
                <span>Get Guidance &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
