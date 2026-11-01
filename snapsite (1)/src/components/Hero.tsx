import React from 'react';
import { ArrowRight, Laptop, Star, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onExploreClick?: () => void;
  onTalkToUsClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onTalkToUsClick }) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-20 md:pt-10 md:pb-28 bg-gradient-to-b from-[#eaf4fd] via-[#f7fafd] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Batch mode badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200/90 bg-white/80 backdrop-blur-xs text-xs font-medium text-slate-600 shadow-2xs">
              <Laptop className="w-3.5 h-3.5 text-slate-500" />
              <span>Online &amp; offline batches</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold text-[#0c1e44] tracking-tight leading-[1.12]">
              Build skills.
              <span className="block font-serif-italic font-normal text-[#1a3875] pt-1">
                Get career-ready.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Hire Nest helps students learn in-demand tech skills through practical,
              project-based training — with career preparation support along the way.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <a
                href="#programs"
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold text-white bg-[#0b1d44] hover:bg-[#142b60] shadow-sm transition-all hover:translate-x-0.5"
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#enquiry"
                onClick={onTalkToUsClick}
                className="inline-flex items-center justify-center px-6 py-3 rounded-md text-sm font-semibold text-[#0c1e44] bg-white border border-slate-200/90 hover:bg-slate-50/80 shadow-2xs transition-colors"
              >
                Talk to Us
              </a>

              <a
                href="https://wa.me/918860670794?text=Hi%20Hire%20Nest%2C%20I%20want%20to%20enquire%20about%20your%20training%20programs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] shadow-sm transition-all hover:scale-[1.02]"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Rating & Social Proof */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 bg-white/95 border border-slate-200/90 px-3.5 py-1.5 rounded-full shadow-2xs">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-[#0c1e44]">4.9 / 5.0</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600 font-medium">180+ Student Reviews</span>
              </div>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>94% Practical Projects Satisfaction</span>
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual with Badge */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Photo with rounded corners */}
              <div className="overflow-hidden rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 bg-white">
                <img
                  src="/hero-students.png"
                  alt="Students learning tech together in a practical session"
                  className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-500"
                  width={505}
                  height={415}
                  loading="eager"
                />
              </div>

              {/* Floating feature badge with rating */}
              <div className="absolute -bottom-4 right-4 sm:right-6 bg-white rounded-2xl px-5 py-3.5 shadow-lg border border-slate-100/80 backdrop-blur-md">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-extrabold text-[#0c1e44]">4.9★</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-[#0c1e44]">
                  6 career-focused programs
                </p>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                  Projects in every track
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
