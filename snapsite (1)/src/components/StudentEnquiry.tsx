import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Copy, Check, MessageSquare, Sparkles } from 'lucide-react';
import {
  validateEnquiryForm,
  VALID_PROGRAMS,
  VALID_LEARNING_MODES,
  EnquiryFormData,
} from '../utils/enquiryValidation';
import {
  createEnquiryLead,
  buildHireNestWhatsAppUrl,
  buildHireNestMailtoUrl,
  EnquiryLead,
  HIRE_NEST_PHONE,
  HIRE_NEST_EMAIL,
} from '../utils/enquiriesData';

export interface StudentEnquiryHandle {
  setProgram: (programName: string) => void;
  setMode: (modeName: string) => void;
  focusForm: () => void;
}

export const StudentEnquiry = forwardRef<StudentEnquiryHandle, {}>((props, ref) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    program: '',
    learningMode: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedLead, setSavedLead] = useState<EnquiryLead | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  useImperativeHandle(ref, () => ({
    setProgram: (programName: string) => {
      setFormData((prev) => ({ ...prev, program: programName }));
      setErrors((prev) => ({ ...prev, program: undefined }));
    },
    setMode: (modeName: string) => {
      setFormData((prev) => ({ ...prev, learningMode: modeName }));
      setErrors((prev) => ({ ...prev, learningMode: undefined }));
    },
    focusForm: () => {
      document.getElementById('full-name-input')?.focus();
    },
  }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof EnquiryFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateEnquiryForm(formData);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setIsSubmitting(true);

    // Save lead into persistent Hire Nest storage
    try {
      const newLead = createEnquiryLead(formData, 'website_form');
      setSavedLead(newLead);
      
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 400);
    } catch (err) {
      console.error('Failed to save lead:', err);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleWhatsAppEnquiry = () => {
    const url = buildHireNestWhatsAppUrl(savedLead || formData);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEmailEnquiry = () => {
    const url = buildHireNestMailtoUrl(savedLead || formData);
    window.location.href = url;
  };

  const handleCopySummary = () => {
    const targetLead = savedLead || formData;
    const text = `Hire Nest Student Enquiry [Ref: ${savedLead?.id || 'Pending'}]
• Name: ${targetLead.fullName}
• Phone: ${targetLead.phone}
• Email: ${targetLead.email}
• Program: ${targetLead.program}
• Mode: ${targetLead.learningMode}
• Message: ${targetLead.message || 'N/A'}
• Destination: Hire Nest Office 303, B-44, Sector 63, Noida (WhatsApp: +91 88606 70794)`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSavedLead(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      program: '',
      learningMode: '',
      message: '',
    });
    setErrors({});
  };

  return (
    <section id="enquiry" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact info & Trust */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider text-blue-700 bg-blue-50 border border-blue-200/60 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>STUDENT ADMISSION ENQUIRY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#0c1e44] tracking-tight leading-tight">
              Talk to us about your next step
            </h2>

            <p className="text-base text-slate-500 leading-relaxed">
              Share your details to receive full syllabus breakdown, fees, and upcoming batch timings.
              All enquiries are directly routed to our admissions team at Sector 63, Noida.
            </p>

            <div className="pt-2 space-y-4 text-slate-600">
              <a
                href={`mailto:${HIRE_NEST_EMAIL}`}
                className="flex items-center gap-3.5 group hover:text-blue-600 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50/80 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Official Email</span>
                  <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600">
                    {HIRE_NEST_EMAIL}
                  </span>
                </div>
              </a>

              <a
                href={`tel:+91${HIRE_NEST_PHONE}`}
                className="flex items-center gap-3.5 group hover:text-blue-600 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50/80 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Admissions Helpline</span>
                  <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600">
                    +91 {HIRE_NEST_PHONE}
                  </span>
                </div>
              </a>

              <a
                href={`https://wa.me/91${HIRE_NEST_PHONE}?text=Hi%20Hire%20Nest%2C%20I%20want%20to%20enquire%20about%20your%20training%20programs`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 group hover:text-emerald-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-emerald-100">
                  <svg className="w-5 h-5 fill-[#25D366]" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">WhatsApp Support</span>
                  <span className="text-sm font-semibold text-emerald-700">
                    +91 {HIRE_NEST_PHONE}
                  </span>
                </div>
              </a>

              <div className="flex items-start gap-3.5 text-slate-600">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Headquarters & Training Campus</span>
                  <span className="text-sm font-semibold text-slate-800 block">
                    Office No. 303, B-44, Sector 63
                  </span>
                  <span className="text-xs text-slate-500">
                    Noida, Uttar Pradesh
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-slate-600 space-y-1.5">
              <div className="font-semibold text-blue-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Privacy &amp; Immediate Lead Response</span>
              </div>
              <p className="text-slate-500 leading-relaxed">
                Your submitted details are securely recorded in the Hire Nest admission registry.
                You can immediately message our counseling desk with the saved reference ID.
              </p>
            </div>
          </div>

          {/* Right Column: Form card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-10">
              {isSubmitted ? (
                <div className="py-4 space-y-6">
                  {/* Top Success Banner */}
                  <div className="text-center space-y-3">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span>✓ Data Successfully Saved to Hire Nest CRM</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#0c1e44]">
                      Thank you, {savedLead?.fullName || formData.fullName}!
                    </h3>
                    <p className="text-slate-600 max-w-lg mx-auto text-sm leading-relaxed">
                      Your enquiry for <span className="font-semibold text-slate-900">{savedLead?.program || formData.program}</span> ({savedLead?.learningMode || formData.learningMode}) has been registered.
                    </p>
                  </div>

                  {/* Summary Card with Lead ID */}
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs text-slate-700 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                      <span className="font-medium text-slate-500">Lead Reference ID</span>
                      <span className="font-mono font-bold text-blue-800 bg-blue-100/70 px-2.5 py-1 rounded-md text-xs">
                        {savedLead?.id || 'HN-2026-PENDING'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-slate-600">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Contact Phone</span>
                        <span className="font-semibold text-slate-800">{savedLead?.phone || formData.phone}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Email Address</span>
                        <span className="font-semibold text-slate-800">{savedLead?.email || formData.email}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Program Track</span>
                        <span className="font-semibold text-blue-700">{savedLead?.program || formData.program}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Learning Mode</span>
                        <span className="font-semibold text-slate-800">{savedLead?.learningMode || formData.learningMode}</span>
                      </div>
                    </div>

                    {formData.message && (
                      <div className="pt-2 border-t border-slate-200/80 text-slate-600">
                        <span className="text-slate-400 block text-[11px]">Your Note</span>
                        <p className="italic text-slate-700 mt-0.5">"{formData.message}"</p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons: WhatsApp Direct & Copy */}
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={handleWhatsAppEnquiry}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] shadow-md transition-all active:scale-[0.99] cursor-pointer"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                      <span>Connect on WhatsApp Now (+91 {HIRE_NEST_PHONE})</span>
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={handleCopySummary}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                      >
                        {copiedSummary ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-600" />
                            <span className="text-emerald-700">Copied to Clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-slate-500" />
                            <span>Copy Enquiry Details</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleEmailEnquiry}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                      >
                        <Mail className="w-4 h-4 text-slate-500" />
                        <span>Email Hire Nest</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="w-full text-center text-xs text-blue-600 hover:text-blue-800 font-medium pt-2 cursor-pointer"
                    >
                      ← Submit another enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="full-name-input"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Full name *
                    </label>
                    <input
                      id="full-name-input"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Maya Sharma"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                        errors.fullName
                          ? 'border-red-400 bg-red-50/20'
                          : 'border-slate-200 hover:border-slate-300 focus:border-blue-500'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email-input"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        Email address *
                      </label>
                      <input
                        id="email-input"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="maya@example.com"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                          errors.email
                            ? 'border-red-400 bg-red-50/20'
                            : 'border-slate-200 hover:border-slate-300 focus:border-blue-500'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone-input"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        Phone number *
                      </label>
                      <input
                        id="phone-input"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                          errors.phone
                            ? 'border-red-400 bg-red-50/20'
                            : 'border-slate-200 hover:border-slate-300 focus:border-blue-500'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Preferred program & Learning mode */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="program-select"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        Preferred program track *
                      </label>
                      <select
                        id="program-select"
                        name="program"
                        value={formData.program}
                        onChange={handleChange}
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                          errors.program
                            ? 'border-red-400 bg-red-50/20'
                            : 'border-slate-200 hover:border-slate-300 focus:border-blue-500'
                        }`}
                      >
                        <option value="">Select a program</option>
                        {VALID_PROGRAMS.map((prog) => (
                          <option key={prog} value={prog}>
                            {prog}
                          </option>
                        ))}
                      </select>
                      {errors.program && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.program}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="learning-mode-select"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        Learning mode *
                      </label>
                      <select
                        id="learning-mode-select"
                        name="learningMode"
                        value={formData.learningMode}
                        onChange={handleChange}
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                          errors.learningMode
                            ? 'border-red-400 bg-red-50/20'
                            : 'border-slate-200 hover:border-slate-300 focus:border-blue-500'
                        }`}
                      >
                        <option value="">Select a mode</option>
                        {VALID_LEARNING_MODES.map((mode) => (
                          <option key={mode} value={mode}>
                            {mode}
                          </option>
                        ))}
                      </select>
                      {errors.learningMode && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.learningMode}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message (optional) */}
                  <div>
                    <label
                      htmlFor="message-input"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Questions / background notes <span className="font-normal text-slate-400">(optional)</span>
                    </label>
                    <textarea
                      id="message-input"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="e.g. Inquiring about weekend classes, syllabus, or payment options"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 hover:border-slate-300 focus:border-blue-500 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-y"
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="pt-2 space-y-2.5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#0e224c] hover:bg-[#152e63] shadow-sm transition-all active:scale-[0.99] disabled:opacity-70 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Saving enquiry...' : 'Submit enquiry'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppEnquiry}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] shadow-2xs transition-all active:scale-[0.99] cursor-pointer"
                    >
                      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                      <span>Direct WhatsApp Enquiry (+91 {HIRE_NEST_PHONE})</span>
                    </button>

                    <p className="text-center text-xs text-slate-400 mt-2">
                      Instant response via WhatsApp or email. Your data is stored securely in our registry.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
