import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Calendar,
  PhoneCall,
  Building,
  HeartPulse,
  Loader2
} from 'lucide-react';

interface LiveChatWidgetProps {
  onOpenBooking: () => void;
  onOpenEmergency: () => void;
  onNavigateTo: (section: string) => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-init',
    sender: 'assistant',
    text: 'Hello! I am your NovaCare digital assistant. How can I assist you with specialists, departments, or booking an appointment today?',
    timestamp: 'Just now',
    suggestions: [
      'Book an appointment',
      'What departments are available?',
      'Emergency hotline',
      'Cardiology specialists'
    ]
  }
];

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  onOpenBooking,
  onOpenEmergency,
  onNavigateTo
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate smart automated response
    setTimeout(() => {
      const lower = query.toLowerCase();
      let responseText = '';
      let suggestions: string[] = [];
      let actionLink: ChatMessage['actionLink'] | undefined = undefined;

      if (lower.includes('book') || lower.includes('appointment') || lower.includes('schedule') || lower.includes('doctor')) {
        responseText = 'Sure! You can choose your preferred specialist, select an available date/time slot, and confirm your booking immediately.';
        actionLink = {
          label: 'Open Appointment Booking',
          actionType: 'book'
        };
        suggestions = ['Cardiology specialists', 'What departments are available?'];
      } else if (lower.includes('department') || lower.includes('specialties') || lower.includes('services')) {
        responseText = 'We currently have 6 comprehensive clinical departments: Cardiology, Neurology, Orthopedics, Pediatrics, Oncology, and Emergency Care.';
        actionLink = {
          label: 'View All Departments',
          actionType: 'department'
        };
        suggestions = ['Book an appointment', 'Cardiology specialists'];
      } else if (lower.includes('emergency') || lower.includes('urgent') || lower.includes('911') || lower.includes('ambulance')) {
        responseText = 'For acute or life-threatening medical situations, please call 911 immediately or reach our 24/7 Emergency trauma center at +1 (800) 555-0911.';
        actionLink = {
          label: 'Open 24/7 Emergency Center',
          actionType: 'emergency'
        };
      } else if (lower.includes('cardio') || lower.includes('heart') || lower.includes('mitchell')) {
        responseText = 'Our Cardiology department is led by Dr. Sarah Mitchell (MD, FACC). We offer 3D echocardiography, coronary interventions, and cardiac wellness screenings.';
        actionLink = {
          label: 'View Cardiology Doctors',
          actionType: 'doctors',
          payload: 'Cardiology'
        };
        suggestions = ['Book with Dr. Mitchell', 'Emergency hotline'];
      } else if (lower.includes('hour') || lower.includes('time') || lower.includes('open') || lower.includes('location')) {
        responseText = 'Our Emergency Department is open 24/7/365 at 742 Healthcare Blvd. Outpatient clinical specialty suites operate Monday through Saturday: 7:30 AM – 8:00 PM.';
        actionLink = {
          label: 'View Campus Location & Hours',
          actionType: 'contact'
        };
      } else {
        responseText = `Thank you for your question. You can explore verified specialists in our directory, book consultations online, or visit our emergency center.`;
        suggestions = ['Book an appointment', 'What departments are available?', 'Emergency hotline'];
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: suggestions.length > 0 ? suggestions : undefined,
        actionLink
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleActionClick = (action: ChatMessage['actionLink']) => {
    if (!action) return;
    if (action.actionType === 'book') {
      onOpenBooking();
    } else if (action.actionType === 'emergency') {
      onOpenEmergency();
    } else if (action.actionType === 'department') {
      onNavigateTo('departments');
    } else if (action.actionType === 'doctors') {
      onNavigateTo('doctors');
    } else if (action.actionType === 'contact') {
      onNavigateTo('contact');
    }
  };

  return (
    <aside aria-label="Support chat" className="fixed bottom-5 right-5 z-40">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          id="open-live-chat-btn"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-[#3157D5] hover:bg-[#2443AE] text-white rounded-full shadow-2xl shadow-[#3157D5]/30 border-2 border-white transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Open NovaCare Demo Assistant"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 border border-[#3157D5]" />
          </div>
          <span className="text-xs sm:text-sm font-bold tracking-tight">Need Help? Chat</span>
        </button>
      )}

      {/* Expanded Chat Box */}
      {isOpen && (
        <div
          id="live-chat-panel"
          className="w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-3xl shadow-2xl border border-[#E4E9F2] overflow-hidden flex flex-col h-[520px] max-h-[85vh] animate-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#15213D] to-[#2443AE] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#28B8D4]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  NovaCare Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </h4>
                <p className="text-[10px] text-slate-300">Automated Patient Support</p>
              </div>
            </div>

            <button
              id="close-live-chat-btn"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Demo disclaimer banner */}
          <div className="bg-[#EEF3FA] px-3.5 py-1.5 border-b border-[#E4E9F2] text-[10px] text-[#667085] flex items-center justify-between">
            <span>Demo Interactive Assistant</span>
            <span className="font-semibold text-[#3157D5]">Instant Responses</span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F6F8FC]">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                      isUser
                        ? 'bg-[#3157D5] text-white rounded-br-xs shadow-xs'
                        : 'bg-white text-[#15213D] border border-[#E4E9F2] rounded-bl-xs shadow-xs'
                    }`}
                  >
                    {msg.text}

                    {/* Optional Interactive Action Link */}
                    {msg.actionLink && (
                      <button
                        onClick={() => handleActionClick(msg.actionLink)}
                        className="mt-2.5 w-full py-1.5 px-3 bg-[#3157D5]/10 hover:bg-[#3157D5] text-[#3157D5] hover:text-white text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        {msg.actionLink.actionType === 'book' && <Calendar className="w-3 h-3" />}
                        {msg.actionLink.actionType === 'emergency' && <PhoneCall className="w-3 h-3" />}
                        {msg.actionLink.actionType === 'department' && <Building className="w-3 h-3" />}
                        <span>{msg.actionLink.label}</span>
                      </button>
                    )}
                  </div>
                  <span className="text-[9px] text-[#667085] mt-1 px-1">{msg.timestamp}</span>

                  {/* Suggestion Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {msg.suggestions.map((sug, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(sug)}
                          className="text-[10px] bg-white hover:bg-[#EEF3FA] text-[#3157D5] font-semibold px-2.5 py-1 rounded-full border border-[#E4E9F2] transition-colors cursor-pointer"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#667085] bg-white px-3 py-2 rounded-2xl w-fit border border-[#E4E9F2]">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#3157D5]" />
                <span>NovaCare is replying...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-[#E4E9F2] flex items-center gap-2"
          >
            <input
              id="live-chat-text-input"
              type="text"
              placeholder="Ask about specialists, booking, emergency..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 py-2 px-3 bg-[#F6F8FC] rounded-xl text-xs text-[#15213D] border border-[#E4E9F2] focus:outline-none focus:ring-2 focus:ring-[#3157D5]/30 placeholder-[#667085]/70"
            />
            <button
              id="live-chat-send-btn"
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-[#3157D5] hover:bg-[#2443AE] disabled:bg-slate-200 text-white rounded-xl transition-colors cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </aside>
  );
};
