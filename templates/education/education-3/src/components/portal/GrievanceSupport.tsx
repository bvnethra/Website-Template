import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  X, 
  ShieldCheck, 
  User, 
  Building2,
  Sparkles,
  Search,
  Filter
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { initialGrievances, GrievanceTicket } from '../../data/portalData';

export const GrievanceSupport: React.FC = () => {
  const { currentUser } = useAuth();
  const [tickets, setTickets] = useState<GrievanceTicket[]>(initialGrievances);
  const [selectedTicket, setSelectedTicket] = useState<GrievanceTicket | null>(initialGrievances[0]);
  const [showNewModal, setShowNewModal] = useState(false);

  // New ticket state
  const [category, setCategory] = useState<GrievanceTicket['category']>('Examination');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<GrievanceTicket['priority']>('Medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Active chat response state
  const [replyMessage, setReplyMessage] = useState('');

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !description) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const newTicket: GrievanceTicket = {
        id: `GRV-2026-0${Math.floor(95 + Math.random() * 20)}`,
        category,
        subject,
        description,
        priority,
        status: 'Open',
        createdAt: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        updatedAt: 'Just now',
        assignedOfficer: 'Officer Assigned (In Queue)',
        responses: [
          {
            sender: 'student',
            senderName: currentUser?.name || 'Student',
            message: description,
            timestamp: 'Just now'
          }
        ]
      };

      setTickets(prev => [newTicket, ...prev]);
      setSelectedTicket(newTicket);
      setIsSubmitting(false);
      setShowNewModal(false);
      setSubject('');
      setDescription('');
    }, 800);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !selectedTicket) return;

    const newResponse = {
      sender: 'student' as const,
      senderName: currentUser?.name || 'Student',
      message: replyMessage.trim(),
      timestamp: 'Just now'
    };

    const updated = {
      ...selectedTicket,
      responses: [...selectedTicket.responses, newResponse],
      updatedAt: 'Just now'
    };

    setSelectedTicket(updated);
    setTickets(prev => prev.map(t => t.id === updated.id ? updated : t));
    setReplyMessage('');

    // Simulate officer reply after short delay
    setTimeout(() => {
      const officerReply = {
        sender: 'officer' as const,
        senderName: 'Examination Registry Desk',
        message: 'Your query has been acknowledged by the duty officer. We are actively reviewing the registry records and will update this thread shortly.',
        timestamp: 'Just now'
      };

      const finalUpdated = {
        ...updated,
        responses: [...updated.responses, officerReply]
      };

      setSelectedTicket(finalUpdated);
      setTickets(prev => prev.map(t => t.id === finalUpdated.id ? finalUpdated : t));
    }, 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2F2F]/5 border border-[#0D2F2F]/10 text-xs font-bold text-[#0D2F2F] mb-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>Student Support & Ombudsman</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0D2F2F] font-display tracking-tight">
            Academic & Examination Grievance Desk
          </h1>
          <p className="text-xs sm:text-sm text-[#476666] mt-0.5">
            Direct communication channel to the Controller of Examinations and Academic Registrar.
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="px-5 py-2.5 rounded-xl bg-[#FF6B4A] hover:bg-[#E85535] text-white text-xs font-extrabold uppercase tracking-wider shadow-md shadow-[#FF6B4A]/25 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Lodge New Grievance</span>
        </button>
      </div>

      {/* Main Grievance Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 5 Cols: Tickets List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-[#0D2F2F] uppercase tracking-wider">
              My Support Tickets ({tickets.length})
            </span>
          </div>

          <div className="space-y-3">
            {tickets.map((t) => {
              const isSelected = selectedTicket?.id === t.id;

              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTicket(t)}
                  className={`p-4 rounded-3xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-white border-[#0D2F2F] shadow-md ring-1 ring-[#0D2F2F]'
                      : 'bg-white/80 hover:bg-white border-[#E5DFD5]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#FF6B4A] bg-[#FF6B4A]/10 px-2 py-0.5 rounded-full">
                      {t.id}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {t.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-[#0D2F2F] line-clamp-1">
                    {t.subject}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-[#476666]">
                    <span>Category: <strong>{t.category}</strong></span>
                    <span>{t.createdAt.split(',')[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 7 Cols: Ticket Details & Active Chat Thread */}
        <div className="lg:col-span-7">
          {selectedTicket ? (
            <div className="bg-white rounded-3xl border border-[#E5DFD5] shadow-xs flex flex-col h-[560px] overflow-hidden">
              
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-[#E5DFD5] bg-[#FAF8F5] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#FF6B4A]">{selectedTicket.id}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0D2F2F]/10 text-[#0D2F2F]">
                      {selectedTicket.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#0D2F2F] mt-1 line-clamp-1">
                    {selectedTicket.subject}
                  </h3>
                </div>

                <div className="text-right text-[11px] text-[#476666]">
                  <div>Priority: <strong className="text-[#0D2F2F]">{selectedTicket.priority}</strong></div>
                  <div>Officer: <strong>{selectedTicket.assignedOfficer.split(' ')[0]}</strong></div>
                </div>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#F7F4EE]/50">
                {selectedTicket.responses.map((msg, i) => {
                  const isMe = msg.sender === 'student';

                  return (
                    <div
                      key={i}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div className="text-[10px] text-[#8A9E9E] font-semibold mb-1 flex items-center gap-1.5">
                        {isMe ? (
                          <>
                            <span>{msg.senderName} (You)</span>
                            <span>• {msg.timestamp}</span>
                          </>
                        ) : (
                          <>
                            <Building2 className="w-3 h-3 text-[#0D2F2F]" />
                            <span className="text-[#0D2F2F] font-bold">{msg.senderName}</span>
                            <span>• {msg.timestamp}</span>
                          </>
                        )}
                      </div>

                      <div
                        className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                          isMe
                            ? 'bg-[#0D2F2F] text-white rounded-tr-xs'
                            : 'bg-white text-[#0D2F2F] border border-[#E5DFD5] shadow-xs rounded-tl-xs'
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Input Box */}
              <form onSubmit={handleSendReply} className="p-3 border-t border-[#E5DFD5] bg-white flex items-center gap-2">
                <input
                  type="text"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your response to the examination officer..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#D8D0C5] text-xs text-[#0D2F2F] focus:outline-none focus:border-[#FF6B4A]"
                />
                <button
                  type="submit"
                  disabled={!replyMessage.trim()}
                  className="p-2.5 rounded-xl bg-[#FF6B4A] hover:bg-[#E85535] text-white transition-colors disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-[#E5DFD5] text-center text-xs text-[#476666]">
              Select a grievance ticket to inspect communication records.
            </div>
          )}
        </div>

      </div>

      {/* New Grievance Modal */}
      <AnimatePresence>
        {showNewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D2F2F]/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="w-full max-w-lg bg-white rounded-3xl border border-[#E5DFD5] shadow-2xl p-6 sm:p-8 relative"
            >
              <button
                onClick={() => setShowNewModal(false)}
                className="absolute top-4 right-4 p-2 rounded-lg text-[#476666] hover:text-[#0D2F2F] hover:bg-[#F7F4EE]"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-[#0D2F2F] font-display">
                Lodge Academic Grievance / Ticket
              </h3>
              <p className="text-xs text-[#476666] mt-1">
                Your ticket will be assigned to a designated registrar desk officer within 24 business hours.
              </p>

              <form onSubmit={handleCreateTicket} className="mt-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#0D2F2F] block mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#D8D0C5] text-xs font-bold text-[#0D2F2F] focus:outline-none focus:border-[#FF6B4A]"
                    >
                      <option value="Examination">Examination</option>
                      <option value="Hall Ticket">Hall Ticket</option>
                      <option value="Evaluation">Evaluation</option>
                      <option value="Fee & Payment">Fee & Payment</option>
                      <option value="Portal Bug">Portal Bug</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#0D2F2F] block mb-1">
                      Priority
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#D8D0C5] text-xs font-bold text-[#0D2F2F] focus:outline-none focus:border-[#FF6B4A]"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0D2F2F] block mb-1">
                    Subject / Concern Summary
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Discrepancy in Hall Ticket Seat Allocation"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#D8D0C5] text-xs text-[#0D2F2F] font-semibold focus:outline-none focus:border-[#FF6B4A]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0D2F2F] block mb-1">
                    Detailed Explanation
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your issue with reference numbers, course codes, or screenshots..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#D8D0C5] text-xs text-[#0D2F2F] focus:outline-none focus:border-[#FF6B4A]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-[#FF6B4A] hover:bg-[#E85535] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? 'Creating Ticket...' : 'Submit Grievance to Registry'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
