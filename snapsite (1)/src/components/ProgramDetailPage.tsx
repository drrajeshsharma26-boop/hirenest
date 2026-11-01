import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Laptop,
  CheckCircle2,
  Briefcase,
  Layers,
  Sparkles,
  Send,
  Download,
  Share2,
  ChevronRight,
  TrendingUp,
  Star,
  Quote,
  ExternalLink,
} from 'lucide-react';
import { ALL_PROGRAMS, ProgramDetail } from '../utils/programsData';
import { DEFAULT_STUDENT_STORIES } from '../utils/studentStories';

interface ProgramDetailPageProps {
  initialProgramId?: string;
  onBackToHome: () => void;
  onEnquireProgram: (programName: string) => void;
}

export const ProgramDetailPage: React.FC<ProgramDetailPageProps> = ({
  initialProgramId = 'digital-marketing',
  onBackToHome,
  onEnquireProgram,
}) => {
  const [selectedId, setSelectedId] = useState<string>(initialProgramId);
  const [activeTab, setActiveTab] = useState<'syllabus' | 'projects' | 'tools' | 'career' | 'reviews'>('syllabus');

  const currentProgram: ProgramDetail =
    ALL_PROGRAMS.find((p) => p.id === selectedId) || ALL_PROGRAMS[0];

  const programReviews = DEFAULT_STUDENT_STORIES.filter(
    (s) => s.program.toLowerCase() === currentProgram.name.toLowerCase()
  );
  const reviewsToShow = programReviews.length > 0 ? programReviews : DEFAULT_STUDENT_STORIES.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50/60 pb-24">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0c1e44] hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          {/* Quick Enquire CTA */}
          <button
            type="button"
            onClick={() => onEnquireProgram(currentProgram.name)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#0e224c] hover:bg-[#152e63] shadow-xs transition-colors cursor-pointer"
          >
            <span>Enquire for {currentProgram.name}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Program Selector Tabs Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
              Programs:
            </span>
            {ALL_PROGRAMS.map((prog) => {
              const isSelected = prog.id === currentProgram.id;
              return (
                <button
                  key={prog.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(prog.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0e224c] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {prog.name}
                  {prog.id === 'digital-marketing' && (
                    <span className="ml-1.5 text-[10px] bg-emerald-500 text-white px-1.5 py-0.2 rounded-full">
                      New
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Program Hero Section */}
      <div className="bg-gradient-to-b from-white via-blue-50/20 to-slate-50 pt-10 pb-12 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Badge & Rating Row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider text-blue-700 bg-blue-100/80 uppercase">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{currentProgram.badge || 'Training Program'}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200/90 shadow-2xs">
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
                <span className="font-bold text-[#0c1e44]">4.9 / 5.0</span>
                <span className="text-slate-300">•</span>
                <button
                  type="button"
                  onClick={() => setActiveTab('reviews')}
                  className="text-blue-700 font-semibold hover:underline cursor-pointer"
                >
                  {reviewsToShow.length}+ Student Reviews
                </button>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0c1e44] tracking-tight leading-tight">
              {currentProgram.name}
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl font-medium text-blue-900 mt-2">
              {currentProgram.tagline}
            </p>

            {/* Full description */}
            <p className="text-base text-slate-600 mt-4 leading-relaxed max-w-3xl">
              {currentProgram.fullDescription}
            </p>

            {/* Key stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-200/70">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span>Duration</span>
                </div>
                <p className="text-sm font-bold text-[#0c1e44]">{currentProgram.duration}</p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Effort</span>
                </div>
                <p className="text-sm font-bold text-[#0c1e44]">{currentProgram.hoursPerWeek}</p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
                  <Laptop className="w-3.5 h-3.5 text-blue-600" />
                  <span>Format</span>
                </div>
                <p className="text-sm font-bold text-[#0c1e44]">{currentProgram.format}</p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                  <span>Skill Level</span>
                </div>
                <p className="text-sm font-bold text-[#0c1e44]">{currentProgram.level}</p>
              </div>
            </div>

            {/* Highlights bullet list */}
            <div className="mt-8 bg-blue-50/50 rounded-2xl p-6 border border-blue-100/80">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-3">
                Key Program Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentProgram.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections: Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex border-b border-slate-200 gap-6 mb-8 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('syllabus')}
            className={`pb-3.5 text-sm font-bold transition-all relative cursor-pointer ${
              activeTab === 'syllabus'
                ? 'text-[#0c1e44] border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Curriculum &amp; Syllabus ({currentProgram.syllabus.length} Modules)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tools')}
            className={`pb-3.5 text-sm font-bold transition-all relative cursor-pointer ${
              activeTab === 'tools'
                ? 'text-[#0c1e44] border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Tools &amp; Tech Stack ({currentProgram.tools.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`pb-3.5 text-sm font-bold transition-all relative cursor-pointer ${
              activeTab === 'projects'
                ? 'text-[#0c1e44] border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Hands-on Projects ({currentProgram.projects.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('career')}
            className={`pb-3.5 text-sm font-bold transition-all relative cursor-pointer ${
              activeTab === 'career'
                ? 'text-[#0c1e44] border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Career Paths &amp; Roles
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`pb-3.5 text-sm font-bold transition-all relative cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'text-[#0c1e44] border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Student Reviews &amp; Ratings</span>
            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
              4.9★
            </span>
          </button>
        </div>

        {/* Tab 1: Detailed Module by Module Syllabus */}
        {activeTab === 'syllabus' && (
          <div className="space-y-6">
            {currentProgram.syllabus.map((mod) => (
              <div
                key={mod.moduleNumber}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 sm:p-8 hover:border-slate-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center">
                      {mod.moduleNumber}
                    </span>
                    <h3 className="text-lg font-bold text-[#0c1e44]">{mod.title}</h3>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md self-start sm:self-center">
                    {mod.duration}
                  </span>
                </div>

                <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Key Topics Covered
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {mod.topics.map((t, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-900 block mb-1">
                        Practical Deliverable
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium">
                        {mod.handsOn}
                      </p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-slate-200/50 flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Reviewed by Industry Mentor</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Tools & Technologies Covered */}
        {activeTab === 'tools' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {currentProgram.tools.map((tool, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {tool.category}
                  </span>
                  <h4 className="text-base font-bold text-[#0c1e44] mt-3">{tool.name}</h4>
                </div>
                <div className="pt-3 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Hands-on practice</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Hands-on Projects */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentProgram.projects.map((proj, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-2xs flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Capstone Project 0{idx + 1}
                  </span>
                  <h4 className="text-lg font-bold text-[#0c1e44] mt-1 mb-2.5">
                    {proj.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {proj.description}
                  </p>
                </div>

                <div>
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Competencies Built
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.skillsLearned.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded text-xs font-medium text-slate-700 bg-slate-100 border border-slate-200/60"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Career Paths & Prerequisites */}
        {activeTab === 'career' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
              <div className="flex items-center gap-2.5 mb-4 text-[#0c1e44]">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold">Target Career Roles</h3>
              </div>
              <p className="text-sm text-slate-500 mb-6">
                Graduates of this track are prepared to apply for the following roles across
                product companies, agencies, and consulting firms:
              </p>
              <ul className="space-y-3">
                {currentProgram.careerRoles.map((role, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm font-semibold text-[#0c1e44]"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-4 text-[#0c1e44]">
                  <Layers className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold">Eligibility &amp; Prerequisites</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {currentProgram.prerequisites}
                </p>

                <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-100 text-xs text-blue-900 leading-relaxed">
                  <strong>Career Preparation Support:</strong> Includes 1-on-1 resume reviews, mock
                  technical interviews, GitHub portfolio presentation, and active hiring leads.
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onEnquireProgram(currentProgram.name)}
                  className="w-full py-3 rounded-lg text-sm font-semibold text-white bg-[#0e224c] hover:bg-[#152e63] shadow-xs transition-colors cursor-pointer"
                >
                  Apply &amp; Reserve Seat for {currentProgram.name}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Student Reviews & Ratings for this Track */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Rating summary bar */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-extrabold text-[#0c1e44]">4.9</span>
                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4.5 h-4.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-slate-600">
                    Cohort Average for {currentProgram.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Student Reviews</span>
                </span>
              </div>
            </div>

            {/* List of reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviewsToShow.map((story) => (
                <div
                  key={story.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-4 h-4 ${
                              s <= story.rating ? 'fill-amber-400' : 'text-slate-200'
                            }`}
                          />
                        ))}
                        <span className="text-xs font-bold text-slate-700 ml-1">
                          {story.rating}.0
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        Verified
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-[#0c1e44] mb-2 leading-snug">
                      &ldquo;{story.headline}&rdquo;
                    </h4>

                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {story.review}
                    </p>

                    {story.projectTitle && (
                      <div className="pt-3 border-t border-slate-100 mb-4 bg-slate-50 p-3 rounded-lg">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                          Capstone Project
                        </span>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-[#0c1e44]">
                            {story.projectTitle}
                          </span>
                          {story.projectUrl && (
                            <a
                              href={story.projectUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-xs inline-flex items-center gap-1"
                            >
                              <span>Repo</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#0c1e44] text-white font-bold text-xs flex items-center justify-center">
                        {story.studentName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-[#0c1e44]">{story.studentName}</p>
                        <p className="text-slate-500 text-[11px]">
                          {story.cohort}
                          {story.roleAfterCourse && ` • ${story.roleAfterCourse}`}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {story.createdAt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Program Enquiry Bar */}
        <div className="mt-14 bg-white rounded-3xl border border-slate-200/90 shadow-md p-8 sm:p-12 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-[#0c1e44]">
            Ready to start learning {currentProgram.name}?
          </h3>
          <p className="text-sm text-slate-500 max-w-xl mx-auto mt-2 leading-relaxed">
            Get complete batch commencement schedules, fee structures, and scholarship criteria
            directly from our counseling team.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 mt-6">
            <button
              type="button"
              onClick={() => onEnquireProgram(currentProgram.name)}
              className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#0e224c] hover:bg-[#152e63] shadow-xs transition-all cursor-pointer"
            >
              Enquire for this Program &rarr;
            </button>
            <button
              type="button"
              onClick={onBackToHome}
              className="px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Browse All Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
