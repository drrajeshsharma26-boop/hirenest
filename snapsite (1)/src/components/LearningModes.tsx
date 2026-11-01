import React from 'react';
import { Monitor, Users } from 'lucide-react';

interface LearningModesProps {
  onSelectMode?: (mode: 'Online' | 'Offline') => void;
}

export const LearningModes: React.FC<LearningModesProps> = ({ onSelectMode }) => {
  const modes = [
    {
      id: 'online',
      name: 'Online',
      icon: Monitor,
      points: [
        'Live, instructor-led sessions',
        'Session recordings for revision',
        'Doubt-clearing over chat and calls',
        'Learn from anywhere',
      ],
    },
    {
      id: 'offline',
      name: 'Offline',
      icon: Users,
      points: [
        'Classroom sessions with mentors',
        'In-person lab practice',
        'Peer learning and group projects',
        'Structured daily routine',
      ],
    },
  ];

  return (
    <section id="learning-modes" className="py-20 bg-[#f1f6fb] border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-bold tracking-wider text-blue-600 uppercase">
            LEARNING MODES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0c1e44] mt-2 mb-3 tracking-tight">
            Learn online or in the classroom
          </h2>
          <p className="text-base text-slate-500 max-w-2xl">
            Same curriculum and mentoring — choose the format that suits your schedule.
          </p>
        </div>

        {/* 2 Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modes.map((mode) => {
            const Icon = mode.icon;
            return (
              <div
                key={mode.id}
                className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200/70 shadow-xs hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#0e224c] text-white flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0c1e44]">
                    {mode.name}
                  </h3>
                </div>

                <ul className="space-y-4">
                  {mode.points.map((pt, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-600 text-sm sm:text-base">
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onSelectMode?.(mode.name as 'Online' | 'Offline')}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Enquire for {mode.name} batches &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
