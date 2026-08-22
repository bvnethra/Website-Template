import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Cpu, 
  Bot, 
  User, 
  Code2, 
  Check, 
  RotateCcw, 
  Lightbulb,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  code?: string;
  timestamp: string;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: "Hello! I'm your Eduvora AI Study Buddy powered by cutting-edge neural models. What concept, code snippet, or architectural pattern can I help you master today?",
      timestamp: 'Just now'
    }
  ]);

  const quickPrompts = [
    'Explain Scaled Dot-Product Attention simply',
    'Why use React 19 startTransition?',
    'What is the difference between RAG and Fine-tuning?',
    'How do I calculate learning rate decay?'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query.trim(),
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Dynamic smart responses
    setTimeout(() => {
      let aiResponse = '';
      let codeSnippet = '';

      if (query.toLowerCase().includes('attention') || query.toLowerCase().includes('scaled')) {
        aiResponse = "In scaled dot-product attention, we calculate the similarity between Query ($Q$) and Key ($K$) vectors. We divide by $\\sqrt{d_k}$ because when the vector dimensionality $d_k$ is large, the dot products grow very large in magnitude. This pushes the softmax function into regions with extremely small gradients (vanishing gradient problem). The $\\sqrt{d_k}$ factor normalizes the variance back to 1.0.";
        codeSnippet = `// Scaled Attention Formula:\n// Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V`;
      } else if (query.toLowerCase().includes('react') || query.toLowerCase().includes('transition')) {
        aiResponse = "React 19's `startTransition` lets you mark UI updates as non-urgent (transitions). This allows urgent user interactions (like typing in an input field or clicking a button) to immediately interrupt and render without feeling sluggish!";
        codeSnippet = `import { useState, useTransition } from 'react';\n\nconst [isPending, startTransition] = useTransition();\n\nfunction handleSearchChange(e) {\n  // Urgent: updates input immediately\n  setInputValue(e.target.value);\n  // Non-urgent: deferred filter transition\n  startTransition(() => {\n    setSearchQuery(e.target.value);\n  });\n}`;
      } else if (query.toLowerCase().includes('rag') || query.toLowerCase().includes('fine-tuning')) {
        aiResponse = "Think of RAG (Retrieval-Augmented Generation) as giving the model an open textbook to search for factual, dynamic data at runtime. Fine-tuning is like sending the model to specialized medical or legal school to alter its writing style, tone, or internal domain vocabulary.";
      } else {
        aiResponse = `Great technical question about "${query}". In production systems, you want to decouple state computation from UI rendering, enforce strict type invariants, and test edge cases with deterministic seed mocks.`;
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponse,
        code: codeSnippet || undefined,
        timestamp: 'Just now'
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[650px] max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  Eduvora AI Study Buddy
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    Online 24/7
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Ask any question about lessons, code, or mathematics</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-violet-600/30 border border-violet-500/40 text-violet-300 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white font-medium rounded-tr-sm'
                      : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-sm'
                  }`}
                >
                  <p>{msg.text}</p>

                  {msg.code && (
                    <pre className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                      <code>{msg.code}</code>
                    </pre>
                  )}

                  <span className="text-[10px] text-slate-400 mt-2 block opacity-70">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-violet-600/30 text-violet-300 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:0.4s]" />
                  <span>Synthesizing explanation...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="px-6 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[11px] text-slate-500 shrink-0 flex items-center gap-1 font-medium">
              <Lightbulb className="w-3 h-3 text-amber-400" /> Suggestions:
            </span>
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] whitespace-nowrap transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-3">
            <input
              id="ai-tutor-input-box"
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about the curriculum, code, or mathematics..."
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputQuery.trim() || isTyping}
              className="p-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold disabled:opacity-40 shadow-md shadow-indigo-600/30 transition-transform active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
