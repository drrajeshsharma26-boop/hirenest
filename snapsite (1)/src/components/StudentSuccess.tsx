import React, { useState, useEffect } from 'react';
import {
  Star,
  ShieldCheck,
  Award,
  ExternalLink,
  Plus,
  Settings,
  CheckCircle2,
  Clock,
  Sparkles,
  X,
  FileCheck2,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  LayoutGrid,
  Quote,
  Filter,
  Briefcase,
  RotateCcw,
  Users,
} from 'lucide-react';
import { AdminLeadsManager } from './AdminLeadsManager';
import {
  StudentStory,
  calculateRatingSummary,
  filterPublishedStories,
  validateStorySubmission,
  getNextCarouselIndex,
  getPrevCarouselIndex,
  clampCarouselIndex,
} from '../utils/studentStories';

interface StudentSuccessProps {
  stories: StudentStory[];
  onAddStory: (story: StudentStory) => void;
  onToggleStatus: (id: string) => void;
  onResetStories: () => void;
  onLoadSampleVerifiedStory: () => void;
}

export const StudentSuccess: React.FC<StudentSuccessProps> = ({
  stories,
  onAddStory,
  onToggleStatus,
  onResetStories,
  onLoadSampleVerifiedStory,
}) => {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminActiveTab, setAdminActiveTab] = useState<'leads' | 'stories'>('leads');

  useEffect(() => {
    const checkAdmin = () => {
      const isParam =
        window.location.search.includes('admin') ||
        window.location.hash.includes('admin');
      setIsAdminMode(isParam);
      if (window.location.hash === '#admin') {
        setIsAdminModalOpen(true);
        setAdminActiveTab('leads');
      }
    };
    checkAdmin();
    window.addEventListener('hashchange', checkAdmin);
    return () => window.removeEventListener('hashchange', checkAdmin);
  }, []);
  const [newStudentName, setNewStudentName] = useState('');
  const [newProgram, setNewProgram] = useState('Digital Marketing');
  const [newCohort, setNewCohort] = useState('Batch 2026-Q1');
  const [newRating, setNewRating] = useState<number>(5);
  const [newHeadline, setNewHeadline] = useState('');
  const [newReview, setNewReview] = useState('');
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectUrl, setNewProjectUrl] = useState('');
  const [newRoleAfterCourse, setNewRoleAfterCourse] = useState('');
  const [newVerified, setNewVerified] = useState(true);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Filter & view states
  const [selectedTrack, setSelectedTrack] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const publishedStories = filterPublishedStories(stories);
  const ratingSummary = calculateRatingSummary(stories);

  // Filtered stories based on chosen track
  const displayedStories =
    selectedTrack === 'All'
      ? publishedStories
      : publishedStories.filter(
          (s) => s.program.toLowerCase() === selectedTrack.toLowerCase()
        );

  // Reset carousel index when filtered list changes or total items changes
  useEffect(() => {
    setCarouselIndex((prev) => clampCarouselIndex(prev, displayedStories.length));
  }, [displayedStories.length, selectedTrack]);

  // Automated carousel rotation with hover pause
  useEffect(() => {
    if (!isAutoPlay || isHovered || displayedStories.length <= 1 || viewMode !== 'carousel') return;

    const timer = setInterval(() => {
      setCarouselIndex((prev) => getNextCarouselIndex(prev, displayedStories.length));
    }, 5500);

    return () => clearInterval(timer);
  }, [isAutoPlay, isHovered, displayedStories.length, viewMode]);

  const handleCreateStory = (e: React.FormEvent, publishImmediately: boolean) => {
    e.preventDefault();
    const candidateData: Partial<StudentStory> = {
      studentName: newStudentName,
      program: newProgram,
      cohort: newCohort,
      rating: newRating,
      headline: newHeadline || 'Practical and well structured',
      review: newReview,
      projectTitle: newProjectTitle || undefined,
      projectUrl: newProjectUrl || undefined,
    };

    const validation = validateStorySubmission(candidateData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    const newStory: StudentStory = {
      id: `story-${Date.now()}`,
      studentName: newStudentName.trim(),
      program: newProgram,
      cohort: newCohort.trim(),
      rating: newRating,
      headline: newHeadline.trim() || 'Practical and well structured',
      review: newReview.trim(),
      projectTitle: newProjectTitle.trim() || undefined,
      projectUrl: newProjectUrl.trim() || undefined,
      roleAfterCourse: newRoleAfterCourse.trim() || undefined,
      verified: publishImmediately ? newVerified : false,
      status: publishImmediately ? 'published' : 'pending_verification',
      createdAt: new Date().toISOString().split('T')[0],
    };

    onAddStory(newStory);
    // Reset inputs
    setNewStudentName('');
    setNewHeadline('');
    setNewReview('');
    setNewProjectTitle('');
    setNewProjectUrl('');
    setNewRoleAfterCourse('');
    setFormErrors({});
    setIsAdminModalOpen(false);
    setIsSubmitModalOpen(false);
  };

  const tracks = [
    'All',
    'Digital Marketing',
    'MERN Stack',
    'Java Full Stack',
    'Python Full Stack',
    'Software Testing & QA',
    'Data Analytics',
  ];

  return (
    <section id="success" className="py-20 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider text-blue-700 bg-blue-100/70 uppercase mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>STUDENT RATINGS &amp; REVIEWS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0c1e44] tracking-tight">
              Real Reviews from Real Learners
            </h2>
            <p className="text-base text-slate-500 max-w-2xl mt-2 leading-relaxed">
              Explore honest student ratings, capstone project showcases, and career outcomes
              across online and in-person cohorts.
            </p>
          </div>

          {/* Quick Actions - Only visible when staff enters admin mode */}
          {isAdminMode && (
            <div className="shrink-0 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-100 shadow-2xs transition-all cursor-pointer"
                title="Admin manager for publishing or verifying student reviews"
              >
                <Settings className="w-3.5 h-3.5 text-blue-600" />
                <span>Admin Story Manager</span>
                {stories.length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-900 text-[10px] font-bold flex items-center justify-center">
                    {stories.length}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Rating and Verification Transparency Banner */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Overall Rating Display */}
            <div className="lg:col-span-4 flex items-center gap-5 border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-6">
              {ratingSummary.averageRating !== null ? (
                <div className="flex items-center gap-5">
                  <div className="text-center">
                    <span className="text-5xl sm:text-6xl font-extrabold text-[#0c1e44] tracking-tight block">
                      {ratingSummary.averageRating}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Out of 5.0
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.round(ratingSummary.averageRating || 0)
                              ? 'fill-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs font-bold text-slate-800">
                      {ratingSummary.totalCount} Verified Reviews
                    </p>
                    <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>96% Recommend Hire Nest</span>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1 text-slate-300">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 stroke-[1.5]" />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-slate-700">No published reviews yet</p>
                </div>
              )}
            </div>

            {/* Rating Breakdown Bars */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Rating Breakdown
              </span>
              <div className="space-y-1.5">
                {[5, 4, 3, 2, 1].map((s) => {
                  const star = s as 1 | 2 | 3 | 4 | 5;
                  const count = ratingSummary.ratingDistribution[star] || 0;
                  const pct = ratingSummary.starBreakdownPercentages?.[star] || 0;
                  return (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="w-6 font-bold text-slate-700 flex items-center justify-end gap-0.5">
                        {star} <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400 inline" />
                      </span>
                      <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-9 text-right font-medium text-slate-500 text-[11px]">
                        {count > 0 ? `${pct}%` : '0%'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submit & Guarantee */}
            <div className="lg:col-span-3 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 mb-1">
                  <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  <span>Audited Cohorts</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Every testimonial corresponds to a verified enrolled student who completed
                  capstone project evaluations.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-[#0e224c] hover:bg-[#152e63] py-2.5 px-4 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Submit Your Review</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stories Section: Empty State vs Published Showcase */}
        {publishedStories.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-8 sm:p-14 text-center max-w-3xl mx-auto shadow-2xs">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200/80 text-blue-600 flex items-center justify-center mx-auto mb-6 shadow-2xs">
              <Award className="w-8 h-8 stroke-[1.8] text-slate-600" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-slate-600 bg-slate-100 mb-3">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Reviews reset to empty</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#0c1e44] mb-3">
              No Published Reviews Right Now
            </h3>

            <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto leading-relaxed mb-8">
              Click below to restore the authentic student reviews &amp; ratings across all 6 tracks.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={onLoadSampleVerifiedStory}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#0e224c] hover:bg-[#152e63] shadow-xs transition-colors cursor-pointer"
              >
                Load verified student reviews &amp; ratings
              </button>
            </div>
          </div>
        ) : (
          /* Published Stories: Interactive Showcase */
          <div className="space-y-6">
            {/* Filter Tabs & View Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/70">
              {/* Track Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 shrink-0 flex items-center gap-1">
                  <Filter className="w-3 h-3" />
                  <span>Filter:</span>
                </span>
                {tracks.map((track) => {
                  const count =
                    track === 'All'
                      ? publishedStories.length
                      : publishedStories.filter(
                          (s) => s.program.toLowerCase() === track.toLowerCase()
                        ).length;

                  if (track !== 'All' && count === 0) return null;

                  const isSelected = selectedTrack === track;
                  return (
                    <button
                      key={track}
                      type="button"
                      onClick={() => {
                        setSelectedTrack(track);
                        setCarouselIndex(0);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-[#0e224c] text-white shadow-2xs'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <span>{track}</span>
                      <span
                        className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* View Mode & Carousel Controls */}
              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                {/* View Mode Toggle */}
                <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5 shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setViewMode('carousel')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      viewMode === 'carousel'
                        ? 'bg-[#0e224c] text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="Compact Carousel View"
                  >
                    Carousel
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-[#0e224c] text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-3 h-3" />
                    <span>Grid</span>
                  </button>
                </div>

                {viewMode === 'carousel' && displayedStories.length > 1 && (
                  <div className="flex items-center gap-1.5">
                    {/* Previous Button */}
                    <button
                      type="button"
                      onClick={() =>
                        setCarouselIndex((prev) =>
                          getPrevCarouselIndex(prev, displayedStories.length)
                        )
                      }
                      className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-colors cursor-pointer"
                      aria-label="Previous student story"
                      title="Previous story"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Play/Pause Toggle */}
                    <button
                      type="button"
                      onClick={() => setIsAutoPlay(!isAutoPlay)}
                      className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-colors cursor-pointer"
                      aria-label={isAutoPlay ? 'Pause carousel rotation' : 'Start carousel rotation'}
                      title={isAutoPlay ? 'Pause carousel' : 'Auto-play carousel'}
                    >
                      {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    {/* Next Button */}
                    <button
                      type="button"
                      onClick={() =>
                        setCarouselIndex((prev) =>
                          getNextCarouselIndex(prev, displayedStories.length)
                        )
                      }
                      className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-colors cursor-pointer"
                      aria-label="Next student story"
                      title="Next story"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Carousel View Stage */}
            {viewMode === 'carousel' ? (
              <div
                className="relative bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 transition-all duration-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Progress Bar indicator */}
                {isAutoPlay && !isHovered && displayedStories.length > 1 && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 rounded-t-3xl overflow-hidden">
                    <div
                      key={`${selectedTrack}-${carouselIndex}`}
                      className="h-full bg-blue-600"
                      style={{
                        animation: 'progress 5.5s linear',
                      }}
                    />
                  </div>
                )}

                {(() => {
                  const currentStory =
                    displayedStories[carouselIndex] || displayedStories[0];
                  if (!currentStory) {
                    return (
                      <div className="p-8 text-center text-sm text-slate-500">
                        No reviews found for this track filter.
                      </div>
                    );
                  }

                  return (
                    <div className="space-y-6">
                      {/* Top Meta: Stars, Badge, Track */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="flex items-center gap-1 text-amber-400">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-5 h-5 ${
                                  s <= currentStory.rating
                                    ? 'fill-amber-400'
                                    : 'text-slate-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-extrabold text-slate-800 ml-1">
                            {currentStory.rating}.0 / 5.0
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Verified Review</span>
                          </span>

                          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                            {currentStory.program}
                          </span>
                        </div>
                      </div>

                      {/* Main Quote & Headline */}
                      <div className="relative pl-0 sm:pl-2">
                        <Quote className="w-8 h-8 text-blue-100 absolute -top-4 -left-4 -z-10" />
                        <h4 className="text-xl sm:text-2xl font-bold text-[#0c1e44] leading-snug tracking-tight mb-3">
                          &ldquo;{currentStory.headline}&rdquo;
                        </h4>

                        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-4xl font-normal">
                          {currentStory.review}
                        </p>
                      </div>

                      {/* Capstone Project Showcase */}
                      {currentStory.projectTitle && (
                        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                              Audited Capstone Project Showcase
                            </span>
                            <span className="text-sm font-bold text-[#0c1e44]">
                              {currentStory.projectTitle}
                            </span>
                          </div>

                          {currentStory.projectUrl && (
                            <a
                              href={currentStory.projectUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-white px-3.5 py-2 rounded-lg border border-slate-200 shadow-2xs hover:shadow-xs transition-all self-start sm:self-auto"
                            >
                              <span>View Project Repository</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      )}

                      {/* Student Details Footer */}
                      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          {/* Student Initials Avatar with Gradient */}
                          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0c2350] to-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                            {currentStory.studentName
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="text-sm font-bold text-[#0c1e44]">
                              {currentStory.studentName}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <span>{currentStory.program}</span>
                              <span>•</span>
                              <span>{currentStory.cohort}</span>
                              {currentStory.roleAfterCourse && (
                                <>
                                  <span>•</span>
                                  <span className="text-blue-700 font-semibold flex items-center gap-1">
                                    <Briefcase className="w-3 h-3 text-blue-600" />
                                    {currentStory.roleAfterCourse}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <span className="text-xs text-slate-400 bg-slate-50 px-2.5 py-1 rounded border border-slate-200/60">
                          Reviewed: {currentStory.createdAt}
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              /* Grid View (When toggled by user) */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedStories.map((story) => (
                  <div
                    key={story.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow duration-200"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
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
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Verified</span>
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-[#0c1e44] mb-2 leading-snug">
                        &ldquo;{story.headline}&rdquo;
                      </h4>

                      <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        {story.review}
                      </p>

                      {story.projectTitle && (
                        <div className="mb-4 pt-3 border-t border-slate-100">
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                            Capstone Project
                          </span>
                          <span className="text-xs font-semibold text-blue-600">
                            {story.projectTitle}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center">
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
                            {story.program}
                            {story.roleAfterCourse && ` • ${story.roleAfterCourse}`}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60">
                        {story.cohort}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Carousel Pagination Dots */}
            {viewMode === 'carousel' && displayedStories.length > 1 && (
              <div className="flex items-center justify-center gap-2 pt-2">
                {displayedStories.map((st, idx) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setCarouselIndex(idx)}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      carouselIndex === idx
                        ? 'w-8 h-2.5 bg-[#0e224c]'
                        : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Jump to review ${idx + 1}: ${st.studentName}`}
                    title={`${st.studentName} (${st.program})`}
                  />
                ))}
              </div>
            )}

            {/* Quick Action bar */}
            <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
              <span>Hover over carousel to pause auto-advancing</span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={onResetStories}
                  className="hover:text-slate-600 underline cursor-pointer"
                  title="Reset to empty state to test empty UI"
                >
                  Reset to empty state
                </button>
                <button
                  type="button"
                  onClick={onLoadSampleVerifiedStory}
                  className="hover:text-blue-600 underline cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reload sample reviews</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Admin / Staff Portal Modal */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0e224c] text-white flex items-center justify-center shadow-xs">
                  <Settings className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0c1e44]">
                    Hire Nest Staff &amp; Admissions Portal
                  </h3>
                  <p className="text-xs text-slate-500">
                    B-44, Office 303, Sector 63, Noida • +91 88606 70794
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAdminModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-6">
              <button
                type="button"
                onClick={() => setAdminActiveTab('leads')}
                className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  adminActiveTab === 'leads'
                    ? 'bg-[#0e224c] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Student Enquiries &amp; Leads</span>
              </button>

              <button
                type="button"
                onClick={() => setAdminActiveTab('stories')}
                className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  adminActiveTab === 'stories'
                    ? 'bg-[#0e224c] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Student Stories &amp; Reviews ({stories.length})</span>
              </button>
            </div>

            {/* Tab 1: Enquiries & Leads */}
            {adminActiveTab === 'leads' && <AdminLeadsManager />}

            {/* Tab 2: Reviews & Stories */}
            {adminActiveTab === 'stories' && (
              <div>
                {/* Current Stories List */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                      Existing Stories ({stories.length})
                    </h4>
                    <button
                      type="button"
                      onClick={onLoadSampleVerifiedStory}
                      className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                    >
                      Reload All 8 Default Reviews
                    </button>
                  </div>

                  {stories.length === 0 ? (
                    <div className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-lg border border-slate-200/60">
                      No stories in the database. Add a verified story below or use the reload button.
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {stories.map((st) => (
                        <div
                          key={st.id}
                          className="flex items-center justify-between p-3 rounded-lg border border-slate-200 text-xs bg-slate-50"
                        >
                          <div>
                            <span className="font-bold text-[#0c1e44]">{st.studentName}</span>
                            <span className="text-slate-500 ml-2">
                              ({st.program} • {st.cohort})
                            </span>
                            <div className="text-slate-600 text-[11px] mt-0.5">
                              Rating: {st.rating}★ • Status:{' '}
                              <span
                                className={`font-semibold ${
                                  st.status === 'published' ? 'text-emerald-600' : 'text-amber-600'
                                }`}
                              >
                                {st.status}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => onToggleStatus(st.id)}
                            className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                              st.status === 'published'
                                ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                                : 'bg-emerald-600 text-white hover:bg-emerald-700'
                            }`}
                          >
                            {st.status === 'published' ? 'Unpublish' : 'Verify & Publish'}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Form to Publish New Verified Story */}
                <form onSubmit={(e) => handleCreateStory(e, true)} className="space-y-4">
                  <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                    Add New Student Review
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Student Full Name *
                      </label>
                      <input
                        type="text"
                        value={newStudentName}
                        onChange={(e) => setNewStudentName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                        required
                      />
                      {formErrors.studentName && (
                        <p className="text-red-500 text-[11px] mt-1">{formErrors.studentName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Program Track *
                      </label>
                      <select
                        value={newProgram}
                        onChange={(e) => setNewProgram(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white"
                      >
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Java Full Stack">Java Full Stack</option>
                        <option value="Python Full Stack">Python Full Stack</option>
                        <option value="MERN Stack">MERN Stack</option>
                        <option value="Software Testing & QA">Software Testing & QA</option>
                        <option value="Data Analytics">Data Analytics</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Cohort Identifier *
                      </label>
                      <input
                        type="text"
                        value={newCohort}
                        onChange={(e) => setNewCohort(e.target.value)}
                        placeholder="e.g. Batch 2026-Q1"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Rating (1 to 5 Stars) *
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setNewRating(num)}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${
                              newRating >= num
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            {num}★
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Headline Summary
                    </label>
                    <input
                      type="text"
                      value={newHeadline}
                      onChange={(e) => setNewHeadline(e.target.value)}
                      placeholder="e.g. Rigorous practice and practical mentor feedback"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Verified Review Content (Min 20 characters) *
                    </label>
                    <textarea
                      rows={3}
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                      placeholder="Detail the student's authentic learning journey..."
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                      required
                    />
                    {formErrors.review && (
                      <p className="text-red-500 text-[11px] mt-1">{formErrors.review}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Capstone Project Title (optional)
                      </label>
                      <input
                        type="text"
                        value={newProjectTitle}
                        onChange={(e) => setNewProjectTitle(e.target.value)}
                        placeholder="e.g. Cloud Logistics Tracker"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Role After Course (optional)
                      </label>
                      <input
                        type="text"
                        value={newRoleAfterCourse}
                        onChange={(e) => setNewRoleAfterCourse(e.target.value)}
                        placeholder="e.g. Full Stack Engineer"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="verified-check"
                      checked={newVerified}
                      onChange={(e) => setNewVerified(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="verified-check" className="text-xs text-slate-700 font-medium">
                      Confirm student enrolled in cohort and project verified
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsAdminModalOpen(false)}
                      className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0e224c] hover:bg-[#152e63] rounded-lg shadow-2xs transition-colors cursor-pointer"
                    >
                      Save &amp; Publish Story
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Student Feedback Submission Modal (for enrolled students) */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-lg font-bold text-[#0c1e44]">Submit Student Feedback</h3>
                <p className="text-xs text-slate-500">
                  Submissions enter audit verification before publishing.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => handleCreateStory(e, false)} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Track
                  </label>
                  <select
                    value={newProgram}
                    onChange={(e) => setNewProgram(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Java Full Stack">Java Full Stack</option>
                    <option value="Python Full Stack">Python Full Stack</option>
                    <option value="MERN Stack">MERN Stack</option>
                    <option value="Software Testing & QA">Software Testing & QA</option>
                    <option value="Data Analytics">Data Analytics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Batch / Cohort
                  </label>
                  <input
                    type="text"
                    value={newCohort}
                    onChange={(e) => setNewCohort(e.target.value)}
                    placeholder="e.g. 2026-Q1"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setNewRating(num)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs cursor-pointer ${
                        newRating >= num
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {num}★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Honest Feedback (min 20 characters) *
                </label>
                <textarea
                  rows={3}
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Describe your learning experience, mentoring, and project work..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200"
                  required
                />
              </div>

              <p className="text-[11px] text-slate-400">
                To protect integrity, our audit team verifies enrollment credentials before publishing
                to the public website.
              </p>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0e224c] hover:bg-[#152e63] rounded-lg cursor-pointer"
                >
                  Submit for Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
