import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrainingPrograms } from './components/TrainingPrograms';
import { LearningModes } from './components/LearningModes';
import { LearningPathway } from './components/LearningPathway';
import { StudentSuccess } from './components/StudentSuccess';
import { TrustTransparency } from './components/TrustTransparency';
import { CareerPreparation } from './components/CareerPreparation';
import { StudentEnquiry, StudentEnquiryHandle } from './components/StudentEnquiry';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { ProgramDetailPage } from './components/ProgramDetailPage';
import { WhatsAppButton } from './components/WhatsAppButton';
import { StudentStory, DEFAULT_STUDENT_STORIES } from './utils/studentStories';

export default function App() {
  const enquiryRef = useRef<StudentEnquiryHandle>(null);

  // Pre-populated with verified student stories & ratings across all tracks
  const [stories, setStories] = useState<StudentStory[]>(DEFAULT_STUDENT_STORIES);

  // State for viewing a particular program detail page
  const [viewingProgramId, setViewingProgramId] = useState<string | null>(null);

  // Check URL hash for direct links like #program/digital-marketing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#program/')) {
        const id = hash.replace('#program/', '');
        setViewingProgramId(id);
      } else if (hash === '#programs-catalog') {
        setViewingProgramId('digital-marketing');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const scrollToEnquiry = () => {
    if (viewingProgramId) {
      setViewingProgramId(null);
    }
    setTimeout(() => {
      const el = document.getElementById('enquiry');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          enquiryRef.current?.focusForm();
        }, 500);
      }
    }, 50);
  };

  const handleSelectProgram = (programName: string) => {
    if (viewingProgramId) {
      setViewingProgramId(null);
    }
    setTimeout(() => {
      enquiryRef.current?.setProgram(programName);
      scrollToEnquiry();
    }, 50);
  };

  const handleSelectMode = (mode: 'Online' | 'Offline') => {
    enquiryRef.current?.setMode(mode);
    scrollToEnquiry();
  };

  const handleGetGuidance = () => {
    scrollToEnquiry();
  };

  const handleViewProgramDetails = (programId: string) => {
    setViewingProgramId(programId);
    window.location.hash = `program/${programId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setViewingProgramId(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddStory = (newStory: StudentStory) => {
    setStories((prev) => [newStory, ...prev]);
  };

  const handleToggleStatus = (id: string) => {
    setStories((prev) =>
      prev.map((story) => {
        if (story.id !== id) return story;
        const willPublish = story.status !== 'published';
        return {
          ...story,
          status: willPublish ? 'published' : 'draft',
          verified: willPublish ? true : story.verified,
        };
      })
    );
  };

  const handleResetStories = () => {
    setStories([]);
  };

  const handleLoadSampleVerifiedStory = () => {
    setStories(DEFAULT_STUDENT_STORIES);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navigation */}
      <Navbar
        onEnquireClick={scrollToEnquiry}
        onProgramsClick={() => {
          if (viewingProgramId) {
            setViewingProgramId(null);
            setTimeout(() => {
              document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          }
        }}
      />

      {/* Main Content: Dedicated Program Detail Page vs Main Landing */}
      <main className="flex-1">
        {viewingProgramId ? (
          <ProgramDetailPage
            initialProgramId={viewingProgramId}
            onBackToHome={handleBackToHome}
            onEnquireProgram={handleSelectProgram}
          />
        ) : (
          <>
            <Hero
              onExploreClick={() => {
                document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onTalkToUsClick={scrollToEnquiry}
            />

            <TrainingPrograms
              onSelectProgram={handleSelectProgram}
              onGetGuidance={handleGetGuidance}
              onViewProgramDetails={handleViewProgramDetails}
            />

            <LearningModes onSelectMode={handleSelectMode} />

            <LearningPathway />

            {/* STUDENT SUCCESS & RATING SECTION */}
            <StudentSuccess
              stories={stories}
              onAddStory={handleAddStory}
              onToggleStatus={handleToggleStatus}
              onResetStories={handleResetStories}
              onLoadSampleVerifiedStory={handleLoadSampleVerifiedStory}
            />

            {/* TRUST & TRANSPARENCY SECTION */}
            <TrustTransparency onAskQuestion={scrollToEnquiry} />

            <CareerPreparation />

            <StudentEnquiry ref={enquiryRef} />

            <FaqSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Connect Button */}
      <WhatsAppButton />
    </div>
  );
}
