import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useApp } from '../../../context/AppContext';
import { GrievanceTicket } from '../../../types/auth';
import { 
  HelpCircle, 
  PlusCircle, 
  Send, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Building,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const SupportView: React.FC = () => {
  const { grievanceTickets, submitGrievance, addGrievanceReply } = useAuth();
  const { addToast } = useApp();

  const [activeTicket, setActiveTicket] = useState<GrievanceTicket | null>(grievanceTickets[0] || null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

  // New ticket state
  const [category, setCategory] = useState<GrievanceTicket['category']>('Examinations & Hall Ticket');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<GrievanceTicket['priority']>('Normal');

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      addToast({ type: 'error', title: 'Input Required', message: 'Please enter a ticket subject and description.' });
      return;
    }

    const newTicket = submitGrievance(category, subject, description, priority);
    setActiveTicket(newTicket);
    setIsCreateModalOpen(false);
    setSubject('');
    setDescription('');
    addToast({
      type: 'success',
      title: 'Grievance Ticket Lodged',
      message: `Ticket #${newTicket.ticketNumber} assigned to the Controller of Examinations Desk.`
    });
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicket || !replyText.trim()) return;

    addGrievanceReply(activeTicket.id, replyText);
    setReplyText('');
    addToast({
      type: 'success',
      title: 'Reply Dispatched',
      message: 'Your message has been added to the grievance thread.'
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#0D2F2F]">
            Autonomous Examination Grievance Redressal Desk
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5D4E]">
            Lodge inquiries regarding hall ticket venue allocation, marksheet updates, fee receipts, or valuation discrepancies.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-[#0D2F2F] hover:bg-[#082020] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center gap-2 self-start"
        >
          <PlusCircle className="w-4 h-4 text-[#FF6B4A]" />
          <span>Raise New Grievance</span>
        </button>
      </div>

      {/* Main Grid: Ticket List (4 cols) & Active Thread (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 4 Cols: Tickets Ledger */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="font-heading text-xs font-bold text-[#0D2F2F] uppercase tracking-wider">
            Your Active Support Dockets ({grievanceTickets.length})
          </h3>

          <div className="space-y-3">
            {grievanceTickets.map((ticket) => {
              const isSelected = activeTicket?.id === ticket.id;
              return (
                <div
                  key={ticket.id}
                  onClick={() => setActiveTicket(ticket)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#0D2F2F] shadow-sm ring-1 ring-[#0D2F2F]'
                      : 'bg-white border-[#E8EAE3] hover:border-[#DDD8CE]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-[10px] font-bold text-[#0D2F2F] bg-[#F4F1EA] px-2 py-0.5 rounded">
                      {ticket.ticketNumber}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      ticket.status === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : ticket.status === 'Under Investigation'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-[#0D2F2F] line-clamp-1">{ticket.subject}</h4>
                  <p className="text-[11px] text-[#4A5D4E] line-clamp-2 mt-1">{ticket.description}</p>

                  <div className="flex items-center justify-between text-[10px] text-[#4A5D4E] pt-2 mt-2 border-t border-[#E8EAE3]">
                    <span>{ticket.category}</span>
                    <span>{ticket.createdAt.split(' ')[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 8 Cols: Discussion Thread */}
        <div className="lg:col-span-8">
          {activeTicket ? (
            <div className="bg-white rounded-3xl p-6 border border-[#E8EAE3] shadow-xs space-y-6 flex flex-col h-full min-h-[500px]">
              
              {/* Active Ticket Header */}
              <div className="pb-4 border-b border-[#E8EAE3]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#0D2F2F] bg-[#F4F1EA] px-2.5 py-1 rounded-md">
                      {activeTicket.ticketNumber}
                    </span>
                    <span className="text-xs text-[#4A5D4E]">
                      Category: <strong>{activeTicket.category}</strong>
                    </span>
                  </div>

                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    activeTicket.status === 'Resolved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {activeTicket.status}
                  </span>
                </div>

                <h3 className="font-heading text-base font-bold text-[#0D2F2F]">
                  {activeTicket.subject}
                </h3>
                <p className="text-xs text-[#4A5D4E] mt-1">
                  Assigned Officer: <strong>{activeTicket.assignedOfficer}</strong> • Last Activity: {activeTicket.lastUpdated}
                </p>
              </div>

              {/* Messages Thread Container */}
              <div className="space-y-4 flex-1 overflow-y-auto pr-1">
                {activeTicket.messages.map((msg) => {
                  const isStudent = msg.sender === 'Student';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isStudent ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] text-[#4A5D4E] mb-1">
                        <span className="font-bold text-[#0D2F2F]">{msg.sender}</span>
                        <span>• {msg.timestamp}</span>
                      </div>
                      <div className={`p-4 rounded-2xl max-w-xl text-xs leading-relaxed ${
                        isStudent
                          ? 'bg-[#0D2F2F] text-white rounded-tr-xs'
                          : 'bg-[#F4F1EA] text-[#0D2F2F] border border-[#E0DCD3] rounded-tl-xs'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="pt-4 border-t border-[#E8EAE3] flex gap-3">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type a follow-up response or additional clarification..."
                  className="flex-1 px-4 py-2.5 bg-[#FDFBF7] border border-[#DDD8CE] rounded-xl text-xs text-[#0D2F2F] focus:outline-none focus:ring-2 focus:ring-[#0D2F2F]"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="bg-[#0D2F2F] hover:bg-[#082020] text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 disabled:opacity-60"
                >
                  <Send className="w-3.5 h-3.5 text-[#FF6B4A]" />
                  <span>Send</span>
                </button>
              </form>

            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-[#E8EAE3] text-center space-y-3">
              <MessageSquare className="w-8 h-8 text-[#A7B3A2] mx-auto" />
              <h4 className="font-heading text-sm font-bold text-[#0D2F2F]">No Grievance Selected</h4>
              <p className="text-xs text-[#4A5D4E]">Select a ticket on the left or raise a new inquiry.</p>
            </div>
          )}
        </div>

      </div>

      {/* New Grievance Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#DDD8CE] shadow-2xl relative space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E8EAE3]">
              <h3 className="font-heading text-lg font-bold text-[#0D2F2F]">
                Lodge Academic Grievance Ticket
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-[#4A5D4E] hover:text-[#0D2F2F] font-bold text-xs"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">
                  Issue Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as GrievanceTicket['category'])}
                  className="w-full px-3 py-2.5 bg-[#FDFBF7] border border-[#DDD8CE] rounded-xl text-xs text-[#0D2F2F] font-medium"
                >
                  <option value="Examinations & Hall Ticket">Examinations & Hall Ticket Schedule</option>
                  <option value="Marksheet Discrepancy">Marksheet Discrepancy & CIE Marks</option>
                  <option value="Fee & Payment">Fee Payment & Bursar Clearance</option>
                  <option value="Photocopy / Revaluation">Photocopy & Revaluation Tracking</option>
                  <option value="Profile & Registration">Student Profile & Elective Course Registration</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">
                  Subject / Summary
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Discrepancy in CIE Mid-Term Marks for CS602"
                  required
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#DDD8CE] rounded-xl text-xs text-[#0D2F2F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">
                  Detailed Description & Reference Numbers
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please state all course codes, dates, and specific concerns clearly..."
                  required
                  className="w-full p-3 bg-[#FDFBF7] border border-[#DDD8CE] rounded-xl text-xs text-[#0D2F2F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">
                  Urgency Priority
                </label>
                <div className="flex gap-2">
                  {(['Normal', 'High', 'Urgent'] as GrievanceTicket['priority'][]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors ${
                        priority === p
                          ? 'bg-[#0D2F2F] text-white shadow-xs'
                          : 'bg-[#F4F1EA] text-[#4A5D4E] hover:bg-[#E8EAE3]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 bg-[#F4F1EA] text-[#0D2F2F] rounded-xl text-xs font-bold"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0D2F2F] hover:bg-[#082020] text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
                >
                  <span>Submit Ticket</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#FF6B4A]" />
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
