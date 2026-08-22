import React, { useState } from 'react';
import {
  LifeBuoy,
  Send,
  MessageSquare,
  Plus,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
  ShieldCheck,
  User,
  Building2,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SupportTicket } from '../../types';

export const SupportView: React.FC = () => {
  const { supportTickets, createTicket, replyTicket, currentUser } = useAuth();
  const [selectedTicketId, setSelectedTicketId] = useState<string>(supportTickets[0]?.id || '');
  const [replyText, setReplyText] = useState('');
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // New ticket state
  const [newCategory, setNewCategory] = useState<SupportTicket['category']>('Examination');
  const [newPriority, setNewPriority] = useState<SupportTicket['priority']>('Medium');
  const [newSubject, setNewSubject] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const selectedTicket =
    supportTickets.find((t) => t.id === selectedTicketId) || supportTickets[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;
    replyTicket(selectedTicket.id, replyText.trim());
    setReplyText('');
  };

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newMessage.trim()) return;
    const res = createTicket(newCategory, newSubject.trim(), newMessage.trim(), newPriority);
    setIsCreatingNew(false);
    setSelectedTicketId(res.id);
    setNewSubject('');
    setNewMessage('');
  };

  const getPriorityBadge = (p: SupportTicket['priority']) => {
    switch (p) {
      case 'Urgent':
        return 'bg-red-100 text-red-900 border-red-300';
      case 'High':
        return 'bg-orange-100 text-orange-900 border-orange-300';
      case 'Medium':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      default:
        return 'bg-slate-100 text-slate-900 border-slate-300';
    }
  };

  const getStatusBadge = (s: SupportTicket['status']) => {
    switch (s) {
      case 'Resolved':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'In Progress':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      default:
        return 'bg-blue-100 text-blue-900 border-blue-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#FDFBF7] p-6 sm:p-8 rounded-3xl border border-[#EAE4D7] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2F2F] text-white text-xs font-bold mb-2">
            <LifeBuoy className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>Controller of Examinations Support Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0D2F2F]">
            Student Grievance & Helpdesk
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Official ticketing channel for examination disputes, hall ticket corrections, and fee inquiries.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingNew(true)}
          className="px-5 py-3 rounded-2xl bg-[#FF6B4A] hover:bg-[#E55535] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Raise New Grievance Ticket</span>
        </button>
      </div>

      {/* Main Grid: Ticket List (4 cols) vs Ticket Conversation View (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Ticket List (4 cols) */}
        <div className="lg:col-span-4 bg-[#FDFBF7] p-5 rounded-3xl border border-[#EAE4D7] shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#EAE4D7]">
            <h3 className="font-serif font-bold text-base text-[#0D2F2F]">Your Support Tickets</h3>
            <span className="text-xs font-bold text-slate-500">{supportTickets.length} Total</span>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {supportTickets.map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  setSelectedTicketId(t.id);
                  setIsCreatingNew(false);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedTicketId === t.id && !isCreatingNew
                    ? 'bg-white border-[#0D2F2F] shadow-sm ring-1 ring-[#0D2F2F]'
                    : 'bg-[#FAF7F2] border-[#EAE4D7] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono font-bold text-[11px] text-[#0D2F2F]">{t.id}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-bold border ${getStatusBadge(
                      t.status
                    )}`}
                  >
                    {t.status}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-[#0D2F2F] line-clamp-1">{t.subject}</h4>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                  <span>{t.category}</span>
                  <span className={`px-1.5 py-0.2 rounded border ${getPriorityBadge(t.priority)}`}>
                    {t.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Active Ticket Thread (8 cols) */}
        <div className="lg:col-span-8 bg-[#FDFBF7] rounded-3xl border border-[#EAE4D7] shadow-xs flex flex-col justify-between overflow-hidden">
          {isCreatingNew ? (
            /* Create New Ticket Form */
            <div className="p-6 sm:p-8 space-y-5">
              <div className="pb-3 border-b border-[#EAE4D7] flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#0D2F2F]">
                    Open Institutional Support Ticket
                  </h3>
                  <p className="text-xs text-slate-500">
                    A designated COE officer will review and reply within 12–24 business hours.
                  </p>
                </div>
                <button
                  onClick={() => setIsCreatingNew(false)}
                  className="text-xs font-bold text-slate-600 hover:text-[#0D2F2F]"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleCreateTicketSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD6C8] text-xs font-semibold text-[#0D2F2F]"
                    >
                      <option value="Examination">Examination / Hall Ticket</option>
                      <option value="Revaluation">Revaluation & Review</option>
                      <option value="Photocopy">Photocopy Script</option>
                      <option value="Fee Payment">Fee Remittance Issue</option>
                      <option value="General">General Academic Query</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">
                      Priority Level
                    </label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD6C8] text-xs font-semibold text-[#0D2F2F]"
                    >
                      <option value="Low">Low Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="High">High Priority</option>
                      <option value="Urgent">Urgent (Within 6h)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">
                    Subject Summary
                  </label>
                  <input
                    type="text"
                    required
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="Brief description of the grievance or inquiry..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD6C8] text-xs font-semibold text-[#0D2F2F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">
                    Detailed Message & Relevant Course Codes
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Explain your situation in detail. Attach any transaction reference numbers or question numbers if applicable..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD6C8] text-xs text-[#0D2F2F]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatingNew(false)}
                    className="px-4 py-2.5 rounded-xl border border-[#DDD6C8] text-xs font-bold text-slate-700 hover:bg-[#EAE4D7]"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#FF6B4A] hover:bg-[#E55535] text-white text-xs font-bold shadow-sm"
                  >
                    Submit Ticket
                  </button>
                </div>
              </form>
            </div>
          ) : selectedTicket ? (
            /* Thread View */
            <div className="flex flex-col h-full justify-between">
              {/* Thread Header */}
              <div className="p-6 border-b border-[#EAE4D7] bg-[#FAF7F2]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#0D2F2F]">
                      Ticket {selectedTicket.id}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] border ${getStatusBadge(
                        selectedTicket.status
                      )}`}
                    >
                      {selectedTicket.status}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] border ${getPriorityBadge(
                        selectedTicket.priority
                      )}`}
                    >
                      {selectedTicket.priority} Priority
                    </span>
                  </div>

                  <span className="text-xs text-slate-500">
                    Logged: {selectedTicket.createdDate}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-[#0D2F2F]">
                  {selectedTicket.subject}
                </h3>
              </div>

              {/* Message Feed */}
              <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
                {selectedTicket.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 ${
                      msg.sender === 'Student' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.sender !== 'Student' && (
                      <div className="w-8 h-8 rounded-xl bg-[#0D2F2F] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        EV
                      </div>
                    )}

                    <div
                      className={`max-w-lg p-4 rounded-2xl text-xs space-y-1 ${
                        msg.sender === 'Student'
                          ? 'bg-[#0D2F2F] text-white'
                          : 'bg-white border border-[#EAE4D7] text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 text-[10px] opacity-75 font-semibold">
                        <span>{msg.senderName}</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>

                    {msg.sender === 'Student' && (
                      <img
                        src={currentUser?.avatarUrl}
                        alt="Avatar"
                        className="w-8 h-8 rounded-xl object-cover ring-1 ring-[#FF6B4A] shrink-0"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Reply Box */}
              <div className="p-4 border-t border-[#EAE4D7] bg-[#FAF7F2]">
                <form onSubmit={handleSendReply} className="flex gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type follow-up response or clarification to Helpdesk..."
                    className="flex-1 px-4 py-3 rounded-2xl bg-white border border-[#DDD6C8] text-xs focus:ring-2 focus:ring-[#FF6B4A] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-2xl bg-[#0D2F2F] hover:bg-[#081E1E] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5 text-[#FF6B4A]" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500">Select a ticket to view conversation</div>
          )}
        </div>
      </div>
    </div>
  );
};
