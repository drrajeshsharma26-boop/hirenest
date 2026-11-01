import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  HelpCircle,
  FileText,
  CreditCard,
  Briefcase,
  GraduationCap,
  Lock,
} from 'lucide-react';
import { TRANSPARENCY_POLICIES } from '../utils/transparencyData';

interface TrustTransparencyProps {
  onAskQuestion?: () => void;
}

export const TrustTransparency: React.FC<TrustTransparencyProps> = ({ onAskQuestion }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const icons: Record<string, any> = {
    'course-info': FileText,
    'fees-policies': CreditCard,
    'placement-terms': Briefcase,
    'eligibility': GraduationCap,
    'privacy': Lock,
  };

  const filteredPolicies =
    activeTab === 'all'
      ? TRANSPARENCY_POLICIES
      : TRANSPARENCY_POLICIES.filter((p) => p.id === activeTab);

  return (
    <section id="transparency" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider text-blue-700 bg-blue-50 uppercase mb-3 border border-blue-100">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>TRUST &amp; TRANSPARENCY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#0c1e44] tracking-tight">
            Confirmed Policies &amp; Terms
          </h2>

          <p className="text-base text-slate-500 mt-3 leading-relaxed">
            We publish only confirmed, verifiable operational guidelines. Where details like local
            branch schedules are pending finalization, we explicitly label them as placeholders.
          </p>
        </div>

        {/* Filter / Nav Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#0c1e44] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Policies
          </button>
          {TRANSPARENCY_POLICIES.map((policy) => {
            const Icon = icons[policy.id] || FileText;
            return (
              <button
                key={policy.id}
                type="button"
                onClick={() => setActiveTab(policy.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === policy.id
                    ? 'bg-[#0c1e44] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{policy.title.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Policies Content Grid */}
        <div className="space-y-8">
          {filteredPolicies.map((policy) => {
            const Icon = icons[policy.id] || FileText;
            return (
              <div
                key={policy.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-9 hover:border-slate-300 transition-colors"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0c1e44]">
                        {policy.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                        {policy.shortDescription}
                      </p>
                    </div>
                  </div>

                  <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100/80">
                    {policy.badge}
                  </span>
                </div>

                {/* Confirmed Details List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                  {policy.confirmedDetails.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#0c1e44]">
                          {detail.label}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                          {detail.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear Placeholder State for Missing / Pending Information */}
                {policy.placeholderNotice && (
                  <div className="mt-6 pt-5 border-t border-slate-100">
                    <div className="rounded-2xl bg-amber-50/70 border border-amber-200/70 p-4.5 sm:p-5 flex items-start gap-3.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                            Information Pending Confirmation
                          </span>
                          <span className="text-[10px] bg-amber-200/60 text-amber-900 font-semibold px-2 py-0.5 rounded">
                            Notice
                          </span>
                        </div>
                        <h5 className="text-xs sm:text-sm font-bold text-amber-950 mt-1">
                          {policy.placeholderNotice.title}
                        </h5>
                        <p className="text-xs text-amber-900/80 leading-relaxed mt-1">
                          {policy.placeholderNotice.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Question Prompt */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-slate-600 text-sm">
            <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
            <span>
              Have specific questions regarding course syllabi, refund timelines, or batch
              eligibility?
            </span>
          </div>
          <a
            href="#enquiry"
            onClick={onAskQuestion}
            className="text-xs font-semibold text-[#0c1e44] hover:text-blue-700 underline underline-offset-4"
          >
            Inquire directly with admissions &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};
