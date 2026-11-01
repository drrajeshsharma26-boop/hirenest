import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  MessageCircle,
  Trash2,
  Plus,
  RefreshCw,
  ExternalLink,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  FileSpreadsheet,
  X,
  Edit3,
} from 'lucide-react';
import {
  EnquiryLead,
  LeadStatus,
  getStoredEnquiries,
  updateLeadStatus,
  updateLeadNotes,
  deleteLead,
  resetEnquiriesToSeed,
  downloadLeadsCSV,
  buildStudentReplyWhatsAppUrl,
  buildHireNestWhatsAppUrl,
  createEnquiryLead,
  HIRE_NEST_PHONE,
} from '../utils/enquiriesData';
import { VALID_PROGRAMS, VALID_LEARNING_MODES } from '../utils/enquiryValidation';

export const AdminLeadsManager: React.FC = () => {
  const [leads, setLeads] = useState<EnquiryLead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [programFilter, setProgramFilter] = useState<string>('All');
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  // Form state for adding manual walk-in / call lead
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualProgram, setManualProgram] = useState(VALID_PROGRAMS[0]);
  const [manualMode, setManualMode] = useState<string>(VALID_LEARNING_MODES[0]);
  const [manualMessage, setManualMessage] = useState('');

  // Load leads initially and listen for live updates
  useEffect(() => {
    const refreshLeads = () => {
      setLeads(getStoredEnquiries());
    };

    refreshLeads();
    window.addEventListener('hire_nest_enquiries_updated', refreshLeads);
    return () => window.removeEventListener('hire_nest_enquiries_updated', refreshLeads);
  }, []);

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      !searchQuery ||
      lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.notes && lead.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchesProgram = programFilter === 'All' || lead.program === programFilter;

    return matchesSearch && matchesStatus && matchesProgram;
  });

  // Calculate quick stats
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'New').length;
  const inDiscussion = leads.filter((l) => l.status === 'In Discussion' || l.status === 'Contacted').length;
  const enrolled = leads.filter((l) => l.status === 'Enrolled').length;

  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    const updated = updateLeadStatus(id, newStatus);
    setLeads(updated);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete enquiry lead for ${name}?`)) {
      const updated = deleteLead(id);
      setLeads(updated);
    }
  };

  const handleStartEditNotes = (lead: EnquiryLead) => {
    setEditingNotesId(lead.id);
    setTempNotes(lead.notes || '');
  };

  const handleSaveNotes = (id: string) => {
    const updated = updateLeadNotes(id, tempNotes.trim());
    setLeads(updated);
    setEditingNotesId(null);
  };

  const handleCreateManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim() || !manualPhone.trim()) {
      alert('Name and phone are required for walk-in leads');
      return;
    }

    createEnquiryLead(
      {
        fullName: manualName,
        phone: manualPhone,
        email: manualEmail.trim() || `${manualName.toLowerCase().replace(/\s+/g, '')}@walkin.lead`,
        program: manualProgram,
        learningMode: manualMode,
        message: manualMessage,
      },
      'walkin_reception'
    );

    // Reset form
    setManualName('');
    setManualPhone('');
    setManualEmail('');
    setManualMessage('');
    setIsAddingLead(false);
    setLeads(getStoredEnquiries());
  };

  const handleResetToSeed = () => {
    if (window.confirm('Reset leads list to initial realistic sample data?')) {
      const seeded = resetEnquiriesToSeed();
      setLeads(seeded);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Total Enquiries</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-800 mt-1">{totalLeads}</div>
          <span className="text-[10px] text-slate-400">All captured records</span>
        </div>

        <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between text-blue-700 text-xs font-semibold">
            <span>New Leads</span>
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          </div>
          <div className="text-2xl font-bold text-blue-900 mt-1">{newLeads}</div>
          <span className="text-[10px] text-blue-600">Pending initial contact</span>
        </div>

        <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200">
          <div className="flex items-center justify-between text-amber-700 text-xs font-semibold">
            <span>In Discussion</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-900 mt-1">{inDiscussion}</div>
          <span className="text-[10px] text-amber-600">Counseling in progress</span>
        </div>

        <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200">
          <div className="flex items-center justify-between text-emerald-700 text-xs font-semibold">
            <span>Enrolled Students</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-900 mt-1">{enrolled}</div>
          <span className="text-[10px] text-emerald-600">
            {totalLeads > 0 ? `${Math.round((enrolled / totalLeads) * 100)}% Conversion` : '0%'}
          </span>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by name, phone, or track..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
          />
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-700"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="In Discussion">In Discussion</option>
            <option value="Enrolled">Enrolled</option>
            <option value="Closed">Closed</option>
          </select>

          {/* Program Filter */}
          <select
            value={programFilter}
            onChange={(e) => setProgramFilter(e.target.value)}
            className="px-2.5 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-700"
          >
            <option value="All">All Programs</option>
            {VALID_PROGRAMS.map((prog) => (
              <option key={prog} value={prog}>
                {prog}
              </option>
            ))}
          </select>

          {/* Action buttons */}
          <button
            type="button"
            onClick={() => downloadLeadsCSV(filteredLeads)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
            title="Download CSV spreadsheet of current leads"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddingLead(!isAddingLead)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#0e224c] text-white hover:bg-[#152e63] transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Walk-in Lead</span>
          </button>
        </div>
      </div>

      {/* Manual Walk-In Lead Drawer / Form */}
      {isAddingLead && (
        <form
          onSubmit={handleCreateManualLead}
          className="bg-blue-50/50 p-4 sm:p-5 rounded-2xl border border-blue-200/80 space-y-3"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">
              Log Offline / Phone Walk-in Lead (Sector 63 Desk)
            </h4>
            <button
              type="button"
              onClick={() => setIsAddingLead(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Student Name *
              </label>
              <input
                type="text"
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                placeholder="e.g. Vikas Patel"
                required
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                value={manualPhone}
                onChange={(e) => setManualPhone(e.target.value)}
                placeholder="+91 98765 00000"
                required
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={manualEmail}
                onChange={(e) => setManualEmail(e.target.value)}
                placeholder="optional"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Program Track
              </label>
              <select
                value={manualProgram}
                onChange={(e) => setManualProgram(e.target.value as any)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
              >
                {VALID_PROGRAMS.map((prog) => (
                  <option key={prog} value={prog}>
                    {prog}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Learning Mode
              </label>
              <select
                value={manualMode}
                onChange={(e) => setManualMode(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
              >
                {VALID_LEARNING_MODES.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Counselor Note / Requirement
              </label>
              <input
                type="text"
                value={manualMessage}
                onChange={(e) => setManualMessage(e.target.value)}
                placeholder="Visited center, asked about fees"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingLead(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs"
            >
              Save Walk-in Lead
            </button>
          </div>
        </form>
      )}

      {/* Leads List / Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {filteredLeads.length === 0 ? (
          <div className="py-12 text-center text-slate-400 space-y-2">
            <Users className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-sm font-medium">No leads match your active filters</p>
            <p className="text-xs text-slate-400">Try clearing your search query or reset sample data.</p>
            <button
              type="button"
              onClick={handleResetToSeed}
              className="mt-2 text-xs text-blue-600 hover:underline cursor-pointer"
            >
              Restore realistic sample leads
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredLeads.map((lead) => {
              const replyWhatsAppUrl = buildStudentReplyWhatsAppUrl(lead);

              const statusColor =
                lead.status === 'New'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : lead.status === 'Enrolled'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : lead.status === 'In Discussion'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : lead.status === 'Contacted'
                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                  : 'bg-slate-50 text-slate-600 border-slate-200';

              return (
                <div key={lead.id} className="p-4 sm:p-5 hover:bg-slate-50/60 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    {/* Left: Lead Identity & Contact */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {lead.id}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{lead.fullName}</h4>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusColor}`}
                        >
                          {lead.status}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        {lead.source && (
                          <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                            {lead.source === 'walkin_reception'
                              ? '🏢 Walk-in'
                              : lead.source === 'whatsapp_direct'
                              ? '💬 WhatsApp'
                              : '🌐 Website'}
                          </span>
                        )}
                      </div>

                      {/* Contact details */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                        <a
                          href={`tel:${lead.phone}`}
                          className="hover:text-blue-600 flex items-center gap-1 font-medium text-slate-800"
                        >
                          <Phone className="w-3.5 h-3.5 text-blue-600" />
                          <span>{lead.phone}</span>
                        </a>

                        <a
                          href={`mailto:${lead.email}`}
                          className="hover:text-blue-600 flex items-center gap-1 text-slate-500"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>{lead.email}</span>
                        </a>

                        <div className="flex items-center gap-1.5 font-medium text-blue-800 bg-blue-50/70 px-2 py-0.5 rounded">
                          <span>{lead.program}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-600">{lead.learningMode}</span>
                        </div>
                      </div>

                      {/* Student Message */}
                      {lead.message && (
                        <div className="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-slate-700 italic">
                          "{lead.message}"
                        </div>
                      )}

                      {/* Internal Counselor Notes */}
                      <div className="pt-1">
                        {editingNotesId === lead.id ? (
                          <div className="flex items-center gap-2 mt-1">
                            <input
                              type="text"
                              value={tempNotes}
                              onChange={(e) => setTempNotes(e.target.value)}
                              placeholder="Add counselor remarks, batch preference, call notes..."
                              className="flex-1 px-2.5 py-1 text-xs rounded border border-blue-300 bg-white"
                              autoFocus
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveNotes(lead.id)}
                              className="px-2.5 py-1 text-xs font-semibold bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingNotesId(null)}
                              className="px-2 py-1 text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="font-medium text-slate-400">Internal Note:</span>
                            <span className="text-slate-700">
                              {lead.notes || 'No notes added yet.'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleStartEditNotes(lead)}
                              className="text-blue-600 hover:text-blue-800 text-[11px] underline flex items-center gap-0.5 cursor-pointer ml-1"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>{lead.notes ? 'Edit' : 'Add Note'}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Quick Action Controls */}
                    <div className="shrink-0 flex flex-wrap lg:flex-col items-center lg:items-end gap-2 pt-2 lg:pt-0">
                      {/* Status Selector Dropdown */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-slate-400">Status:</span>
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                          className="px-2 py-1 text-xs rounded-md border border-slate-200 bg-white font-medium text-slate-700 cursor-pointer"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Discussion">In Discussion</option>
                          <option value="Enrolled">Enrolled</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </div>

                      {/* Contact Action Buttons */}
                      <div className="flex items-center gap-1.5">
                        <a
                          href={replyWhatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md bg-[#25D366] text-white hover:bg-[#20ba59] shadow-2xs transition-colors cursor-pointer"
                          title="Message student on WhatsApp directly"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                          </svg>
                          <span>WhatsApp</span>
                        </a>

                        <a
                          href={`tel:${lead.phone}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                          title="Call student"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Call</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleDelete(lead.id, lead.fullName)}
                          className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete enquiry record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 pt-2 border-t border-slate-100">
        <p>
          Enquiries are saved persistently in Hire Nest storage. Official contact: +91 {HIRE_NEST_PHONE}
        </p>
        <button
          type="button"
          onClick={handleResetToSeed}
          className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset Sample Demo Data</span>
        </button>
      </div>
    </div>
  );
};
