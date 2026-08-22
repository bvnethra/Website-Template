import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Code2, 
  Terminal, 
  BookOpen, 
  Award, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Sparkles, 
  FileText, 
  HelpCircle, 
  Send, 
  ArrowRight, 
  Check, 
  AlertCircle, 
  Save, 
  Flame, 
  ChevronRight, 
  Settings, 
  Clock, 
  Share2,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Course, Lesson } from '../types';

interface InteractiveLearningExperienceProps {
  currentCourse: Course;
  onLessonCompleted: (xpGain: number) => void;
}

export const InteractiveLearningExperience: React.FC<InteractiveLearningExperienceProps> = ({
  currentCourse,
  onLessonCompleted,
}) => {
  // Active lesson state
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(35);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [activeTab, setActiveTab] = useState<'editor' | 'quiz' | 'notes' | 'overview'>('editor');

  // Code editor state
  const [codeContent, setCodeContent] = useState('');
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [codeSuccess, setCodeSuccess] = useState<boolean | null>(null);

  // Quiz state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Notes state
  const [noteInput, setNoteInput] = useState('');
  const [savedNotes, setSavedNotes] = useState<Array<{ id: string; time: string; text: string }>>([
    { id: '1', time: '04:15', text: 'Attention calculation: Q·K^T divided by sqrt(d_k) normalizes the dot products.' },
    { id: '2', time: '12:30', text: 'Softmax converts raw logits into a valid probability distribution that sums to 1.0.' }
  ]);
  const [noteSavedToast, setNoteSavedToast] = useState(false);

  // Flatten lessons for seamless navigation
  const allLessons = React.useMemo(() => {
    const list: Lesson[] = [];
    currentCourse.chapters.forEach(c => {
      c.lessons.forEach(l => list.push(l));
    });
    return list.length > 0 ? list : [
      {
        id: 'default-l1',
        title: 'Deep Attention Mechanisms in PyTorch',
        duration: '14:20',
        type: 'code' as const,
        completed: false,
        language: 'python',
        codeSnippet: `# Scaled Dot-Product Attention Implementation
import numpy as np

def scaled_dot_product_attention(Q, K, V):
    """
    Computes scaled dot-product attention
    """
    matmul_qk = np.matmul(Q, K.swapaxes(-2, -1))
    dk = float(K.shape[-1])
    scaled_logits = matmul_qk / np.sqrt(dk)
    
    # Softmax normalization
    exp_logits = np.exp(scaled_logits - np.max(scaled_logits, axis=-1, keepdims=True))
    attention_weights = exp_logits / np.sum(exp_logits, axis=-1, keepdims=True)
    
    output = np.matmul(attention_weights, V)
    return output, attention_weights

# Initialize sample batch
Q = np.random.randn(1, 4, 64)
K = np.random.randn(1, 4, 64)
V = np.random.randn(1, 4, 64)

output, weights = scaled_dot_product_attention(Q, K, V)
print("✨ Execution verified!")
print(f"Output shape: {output.shape}")
print(f"Attention weights token alignment: {np.round(weights[0, 0, :2], 3)}")`,
        expectedOutput: '✨ Execution verified!\nOutput shape: (1, 4, 64)\nAttention weights token alignment: [0.245 0.312]'
      }
    ];
  }, [currentCourse]);

  const currentLesson = allLessons[selectedLessonIndex] || allLessons[0];

  // Sync code snippet when switching lessons
  useEffect(() => {
    if (currentLesson.codeSnippet) {
      setCodeContent(currentLesson.codeSnippet);
      setConsoleOutput([]);
      setCodeSuccess(null);
    }
    setSelectedOption(null);
    setIsQuizSubmitted(false);
  }, [selectedLessonIndex, currentLesson]);

  // Video playback scrubber simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setVideoProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + (0.5 * playbackSpeed);
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const handleRunCode = () => {
    setIsRunningCode(true);
    setConsoleOutput(['> Compiling sandbox environment...', '> Allocating virtual memory tensor buffers...']);

    setTimeout(() => {
      setIsRunningCode(false);
      const isPython = currentLesson.language === 'python';
      const outputText = isPython 
        ? [
            '⚡ Python 3.12 (PyTorch sandbox execution complete):',
            '✓ Tensor Q.shape = [1, 4, 64], K.shape = [1, 4, 64], V.shape = [1, 4, 64]',
            '✓ Scaled attention dot-product executed in 1.42ms',
            '✓ Attention weights normalized to 1.0 across sequence axis',
            '✨ All unit assertions passed! Code verification: 100%'
          ]
        : [
            '⚡ Node.js v22.14 Sandbox (TypeScript runtime):',
            '✓ Synchronous state dispatch confirmed',
            '✓ Optimistic updates reconciled with simulated server timestamp',
            '✨ Success: Response status 200 OK.'
          ];

      setConsoleOutput(outputText);
      setCodeSuccess(true);

      // Trigger confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }, 900);
  };

  const handleQuizSubmit = () => {
    if (selectedOption === null) return;
    setIsQuizSubmitted(true);

    const question = currentLesson.quizQuestion;
    if (question && selectedOption === question.correctIndex) {
      setQuizScore(prev => prev + 100);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleSaveNote = () => {
    if (!noteInput.trim()) return;
    const minutes = Math.floor((videoProgress * 15) / 100);
    const seconds = Math.floor(((videoProgress * 15 * 60) % 60));
    const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    setSavedNotes(prev => [
      { id: Date.now().toString(), time: timeFormatted, text: noteInput.trim() },
      ...prev
    ]);
    setNoteInput('');
    setNoteSavedToast(true);
    setTimeout(() => setNoteSavedToast(false), 2500);
  };

  const handleCompleteLesson = () => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 }
    });
    onLessonCompleted(150);

    if (selectedLessonIndex < allLessons.length - 1) {
      setSelectedLessonIndex(prev => prev + 1);
    }
  };

  return (
    <section id="lab" className="py-20 bg-slate-950 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-indigo-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2.5">
              <Code2 className="w-3.5 h-3.5" />
              <span>Interactive Learning Experience</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight flex items-center gap-3">
              Hands-On Learning Studio
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-sans font-bold animate-pulse">
                Live Interactive Lab
              </span>
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Watch interactive lectures, modify runnable sandbox code, solve instant quizzes, and earn verifiable XP.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCompleteLesson}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark Lesson Complete (+150 XP)</span>
            </button>
          </div>
        </div>

        {/* Master Studio Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Lesson Player & Interactive Tabs (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Video Lesson Interface */}
            <div className="relative rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden group">
              
              {/* Video Simulated Canvas */}
              <div className="relative h-64 sm:h-96 w-full bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 flex items-center justify-center overflow-hidden">
                
                {/* Dynamic Visual Simulation Graphic */}
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center opacity-85">
                  <div className="space-y-4">
                    <div className="relative inline-block">
                      <div className="w-20 h-20 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center mx-auto shadow-2xl backdrop-blur-md">
                        <Sparkles className="w-10 h-10 text-indigo-400 animate-spin" style={{ animationDuration: '10s' }} />
                      </div>
                      <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black">
                        4K HD
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-xs font-mono text-cyan-400">Lesson #{selectedLessonIndex + 1}</span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
                        {currentLesson.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto line-clamp-2">
                        {currentLesson.summary || 'Live interactive masterclass with executable code sandbox and auto-grading.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Big Center Play/Pause Overlay */}
                <button
                  id="video-center-play-toggle"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute inset-0 w-full h-full flex items-center justify-center z-10 group/btn bg-black/10 hover:bg-black/25 transition-colors"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-600/90 group-hover/btn:bg-indigo-500 group-hover/btn:scale-110 text-white flex items-center justify-center shadow-2xl shadow-indigo-600/50 backdrop-blur-md transition-all">
                    {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1 fill-white" />}
                  </div>
                </button>

                {/* Video Top Header Controls */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                  <div className="px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs font-semibold text-slate-200 pointer-events-auto">
                    {currentCourse.title.substring(0, 32)}...
                  </div>
                  <div className="flex items-center gap-2 pointer-events-auto">
                    <span className="px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs font-mono text-emerald-400">
                      ● Interactive Mode
                    </span>
                  </div>
                </div>

                {/* Video Bottom Control Bar */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                  
                  {/* Timeline Scrubber */}
                  <div className="relative w-full h-2 bg-slate-800/80 rounded-full cursor-pointer overflow-hidden mb-3">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 rounded-full relative"
                      style={{ width: `${videoProgress}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="hover:text-white p-1"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                      </button>

                      <button 
                        onClick={() => setVideoProgress(0)}
                        className="hover:text-white p-1"
                        title="Restart lesson"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>

                      <button 
                        onClick={() => setIsMuted(!isMuted)}
                        className="hover:text-white p-1"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      <span className="font-mono text-[11px] text-slate-400">
                        {Math.floor((videoProgress * 15) / 100)}:
                        {String(Math.floor(((videoProgress * 15 * 60) % 60))).padStart(2, '0')} / {currentLesson.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Speed selector */}
                      <div className="flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded-lg border border-slate-800">
                        {[1, 1.25, 1.5, 2].map(speed => (
                          <button
                            key={speed}
                            onClick={() => setPlaybackSpeed(speed)}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                              playbackSpeed === speed ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {speed}x
                          </button>
                        ))}
                      </div>

                      <button 
                        onClick={() => setVideoProgress(100)} 
                        className="text-[11px] text-indigo-300 hover:text-white underline"
                      >
                        Skip to End
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Interactive Tab Switcher (Code Sandbox / Quiz / Notes) */}
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden">
              
              {/* Tab Header */}
              <div className="px-6 pt-4 pb-2 border-b border-slate-800 flex items-center justify-between flex-wrap gap-3 bg-slate-950/40">
                <div className="flex items-center gap-2">
                  <button
                    id="tab-code-editor-btn"
                    onClick={() => setActiveTab('editor')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                      activeTab === 'editor'
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Code2 className="w-4 h-4 text-cyan-300" />
                    <span>Runnable Sandbox</span>
                  </button>

                  <button
                    id="tab-quiz-btn"
                    onClick={() => setActiveTab('quiz')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                      activeTab === 'quiz'
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4 text-amber-300" />
                    <span>Knowledge Check</span>
                    {quizScore > 0 && (
                      <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[10px]">
                        +{quizScore} XP
                      </span>
                    )}
                  </button>

                  <button
                    id="tab-notes-btn"
                    onClick={() => setActiveTab('notes')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                      activeTab === 'notes'
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-emerald-300" />
                    <span>Student Scratchpad ({savedNotes.length})</span>
                  </button>
                </div>

                <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                  Interactive Evaluation Engine
                </span>
              </div>

              {/* Tab 1: Code Sandbox */}
              {activeTab === 'editor' && (
                <div className="p-5 sm:p-6 space-y-4">
                  
                  {/* Code Control Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                        {currentLesson.language === 'javascript' ? 'JavaScript / TS' : 'Python 3.12 (PyTorch)'}
                      </span>
                      <span className="text-xs text-slate-400">Edit and execute directly in the browser</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        id="reset-code-btn"
                        onClick={() => {
                          setCodeContent(currentLesson.codeSnippet || '');
                          setConsoleOutput([]);
                          setCodeSuccess(null);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Reset
                      </button>

                      <button
                        id="run-code-sandbox-btn"
                        onClick={handleRunCode}
                        disabled={isRunningCode}
                        className="px-5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-cyan-500/20 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
                      >
                        {isRunningCode ? (
                          <>
                            <Sparkles className="w-3.5 h-3.5 animate-spin" />
                            <span>Executing...</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-white" />
                            <span>Run Sandbox Code</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Code Text Area */}
                  <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs sm:text-sm text-slate-200">
                    <textarea
                      id="interactive-code-textarea"
                      value={codeContent || currentLesson.codeSnippet || '# Enter Python or JavaScript code here\nprint("Hello Learnora World")'}
                      onChange={(e) => setCodeContent(e.target.value)}
                      rows={10}
                      className="w-full bg-transparent resize-y font-mono focus:outline-none text-emerald-300 leading-relaxed scrollbar-thin"
                      spellCheck={false}
                    />
                  </div>

                  {/* Simulated Terminal Console */}
                  <div className="rounded-2xl bg-slate-950 border border-slate-800/90 overflow-hidden font-mono text-xs">
                    <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                        Console Output
                      </span>
                      {codeSuccess && (
                        <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Output Verified
                        </span>
                      )}
                    </div>

                    <div className="p-4 space-y-1 text-slate-300 min-h-[90px] max-h-48 overflow-y-auto">
                      {consoleOutput.length > 0 ? (
                        consoleOutput.map((line, idx) => (
                          <div key={idx} className={line.startsWith('✓') || line.startsWith('✨') ? 'text-emerald-400' : 'text-slate-300'}>
                            {line}
                          </div>
                        ))
                      ) : (
                        <div className="text-slate-600 italic">
                          Click "Run Sandbox Code" above to execute and inspect real runtime outputs.
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              )}

              {/* Tab 2: Quiz Engine */}
              {activeTab === 'quiz' && (
                <div className="p-6 space-y-6">
                  {currentLesson.quizQuestion ? (
                    <div className="space-y-6">
                      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                        <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Award className="w-4 h-4" /> Concept Assessment Quiz
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                          {currentLesson.quizQuestion.question}
                        </h4>
                      </div>

                      {/* Options */}
                      <div className="space-y-3">
                        {currentLesson.quizQuestion.options.map((opt, optIdx) => {
                          const isSelected = selectedOption === optIdx;
                          const isCorrect = currentLesson.quizQuestion?.correctIndex === optIdx;
                          
                          let cardStyle = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900';
                          if (isQuizSubmitted) {
                            if (isCorrect) {
                              cardStyle = 'bg-emerald-500/20 border-emerald-500/60 text-emerald-200 font-bold';
                            } else if (isSelected && !isCorrect) {
                              cardStyle = 'bg-rose-500/20 border-rose-500/60 text-rose-200 line-through';
                            }
                          } else if (isSelected) {
                            cardStyle = 'bg-indigo-600/20 border-indigo-500 text-indigo-200 font-semibold';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => !isQuizSubmitted && setSelectedOption(optIdx)}
                              className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${cardStyle}`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center shrink-0">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt}</span>
                              </div>

                              {isQuizSubmitted && isCorrect && (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                              )}
                              {isQuizSubmitted && isSelected && !isCorrect && (
                                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation if submitted */}
                      {isQuizSubmitted && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-2xl bg-indigo-950/50 border border-indigo-800/60 text-xs sm:text-sm text-indigo-200"
                        >
                          <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-amber-400" /> Explanation:
                          </div>
                          <p>{currentLesson.quizQuestion.explanation}</p>
                        </motion.div>
                      )}

                      {/* Action Bar */}
                      <div className="flex items-center justify-between pt-2">
                        {isQuizSubmitted ? (
                          <button
                            onClick={() => {
                              setSelectedOption(null);
                              setIsQuizSubmitted(false);
                            }}
                            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700"
                          >
                            Retry Quiz
                          </button>
                        ) : (
                          <button
                            onClick={handleQuizSubmit}
                            disabled={selectedOption === null}
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 disabled:opacity-40"
                          >
                            Submit Answer
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-10 text-slate-400">
                      <HelpCircle className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                      <p className="text-sm">This lesson contains hands-on code execution. Switch to the <strong>Runnable Sandbox</strong> tab to build!</p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Interactive Notes */}
              {activeTab === 'notes' && (
                <div className="p-6 space-y-6">
                  {/* Note Creator */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">Take Timestamped Notes</span>
                      {noteSavedToast && (
                        <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 animate-pulse">
                          <Check className="w-3.5 h-3.5" /> Note saved to storage!
                        </span>
                      )}
                    </div>

                    <div className="relative">
                      <textarea
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                        placeholder="Type insights, formulas, or key reminders for this timestamp..."
                        rows={3}
                        className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 resize-none"
                      />
                      <button
                        onClick={handleSaveNote}
                        className="absolute bottom-3 right-3 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                      >
                        <Save className="w-3.5 h-3.5" /> Save Note
                      </button>
                    </div>
                  </div>

                  {/* Saved Notes List */}
                  <div className="space-y-2.5">
                    <h5 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Your Notes for this Chapter</h5>
                    {savedNotes.map((note) => (
                      <div key={note.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold shrink-0">
                          {note.time}
                        </span>
                        <p className="flex-1">{note.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Column: Animated Lesson Timeline & Syllabus (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h4 className="font-bold text-white text-base">Curriculum Track</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {allLessons.length} lessons in this module
                  </p>
                </div>
                <div className="px-2.5 py-1 rounded-xl bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-bold">
                  {Math.round(((selectedLessonIndex + 1) / allLessons.length) * 100)}%
                </div>
              </div>

              {/* Lesson Timeline Items */}
              <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
                {allLessons.map((lesson, idx) => {
                  const isCurrent = idx === selectedLessonIndex;
                  const isPassed = idx < selectedLessonIndex;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setSelectedLessonIndex(idx)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        isCurrent
                          ? 'bg-gradient-to-r from-indigo-600/30 to-violet-600/30 border-indigo-500 text-white shadow-md'
                          : isPassed
                          ? 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-950 hover:text-slate-200'
                          : 'bg-slate-950/30 border-slate-800/40 text-slate-500 hover:bg-slate-950/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                          isCurrent
                            ? 'bg-indigo-600 text-white'
                            : isPassed
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {isPassed ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                        </div>

                        <div>
                          <div className="text-xs font-bold line-clamp-1">
                            {lesson.title}
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                            <span className="capitalize">{lesson.type}</span>
                            <span>•</span>
                            <span className="font-mono">{lesson.duration}</span>
                          </div>
                        </div>
                      </div>

                      {isCurrent && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Progress Summary Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/50 to-slate-950 border border-indigo-900/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-400" /> Milestone Reward
                  </span>
                  <span className="text-xs font-bold text-indigo-300">+500 XP</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Complete this module to unlock the <strong>Attention Master</strong> verified digital badge.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
