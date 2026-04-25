import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  ChevronRight, 
  Layout, 
  PenTool, 
  Mic2, 
  Search, 
  Home,
  ArrowLeft,
  Trophy,
  Send,
  User,
  Bot,
  Sparkles,
  Menu,
  X,
  History,
  Plus,
  Volume2,
  Check,
  AlertCircle
} from 'lucide-react';
import Markdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";
import confetti from 'canvas-confetti';
import { MODULES, Module, Lesson, Question, Quiz } from './constants';
import Logo from './components/Logo';
import { playSound } from './lib/sounds';
import ThreeDIcon from './components/ThreeDIcon';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPortal from './components/LoginPortal';

// Initialize Gemini
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function App() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState<{ score: number; total: number } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const startAmbient = () => {
      playSound('ambient');
      window.removeEventListener('click', startAmbient);
      window.removeEventListener('keydown', startAmbient);
    };
    window.addEventListener('click', startAmbient);
    window.addEventListener('keydown', startAmbient);
    return () => {
      window.removeEventListener('click', startAmbient);
      window.removeEventListener('keydown', startAmbient);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number, height: number;
    let particles: any[] = [];
    const symbols = ['∑', 'π', '∞', 'Ω', '∆', '∫', 'μ', 'λ', '§', 'φ'];

    class Particle {
      x: number; y: number; size: number; speedX: number; speedY: number;
      symbol: string; opacity: number;
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 10 + 10;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * -0.5 - 0.2;
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
        this.opacity = Math.random() * 0.3 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y < -50) {
          this.y = height + 50;
          this.x = Math.random() * width;
        }
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.font = `${this.size}px Georgia`;
        ctx.fillText(this.symbol, this.x, this.y);
      }
    }

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < 50; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => window.removeEventListener('resize', resize);
  }, []);

  const handleSendMessage = async (e?: React.FormEvent, customInput?: string) => {
    e?.preventDefault();
    playSound('click');
    const messageText = customInput || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("API_KEY_MISSING");
      }
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, userMessage].map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: `You are a helpful and knowledgeable tutor for FLSHM (Faculté des Lettres et des Sciences Humaines de Mohammedia) students, specifically for Semester 2 (S2) English Studies. 
          Your goal is to help students with their modules: Grammar 2, Paragraph Writing (Composition 1), Spoken English 2, and British Civilization.
          You have access to the following knowledge base: ${JSON.stringify(MODULES)}.
          When students ask about specific topics, use the information from the knowledge base to provide clear, simple explanations with examples. 
          Encourage them to take practice quizzes. 
          Be supportive, professional, and academic in your tone. 
          If they ask about something not in the knowledge base, provide accurate information based on standard English studies curricula.
          Keep your responses concise and well-formatted using Markdown.`
        }
      });

      const botMessage: Message = { role: 'model', content: response.text || "I'm sorry, I couldn't process that." };
      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      console.error("Gemini Error:", error);
      const errorMsg = error.message === "API_KEY_MISSING" 
        ? "Please set your `GEMINI_API_KEY` in the Settings menu to start chatting." 
        : "Sorry, I encountered an error. Please try again later.";
      setMessages(prev => [...prev, { role: 'model', content: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModuleClick = (module: Module) => {
    playSound('whoosh');
    setActiveModule(module);
    setActiveLesson(null);
    setActiveQuiz(null);
    setShowQuiz(false);
    setQuizScore(null);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const handleNewChat = () => {
    playSound('click');
    setMessages([]);
    setActiveModule(null);
    setActiveLesson(null);
    setActiveQuiz(null);
    setShowQuiz(false);
  };

  return (
    <div className="min-h-screen bg-bg-dark text-text-main font-sans overflow-x-hidden relative flex flex-col">
      <AnimatePresence>
        {!user && (
          <LoginPortal onLogin={setUser} />
        )}
      </AnimatePresence>

      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-40 z-0"
      />

      {user && (
        <>
          <Header user={user} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          
          <div className="flex flex-1 overflow-hidden relative">
            {/* Sidebar */}
            <motion.aside 
              initial={false}
              animate={{ width: isSidebarOpen ? 320 : 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className={`glass-panel flex-shrink-0 flex flex-col border-r border-border-subtle relative z-20 ${!isSidebarOpen && 'invisible'}`}
            >
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3 px-2">
                  <ThreeDIcon icon={History} size={24} color="#d4af37" />
                  <h3 className="text-xs font-display font-bold uppercase tracking-[0.2em] text-accent-gold">Archives</h3>
                </div>
                <button 
                  onClick={() => {
                    playSound('click');
                    setIsSidebarOpen(false);
                  }}
                  className="p-2 hover:bg-white/5 rounded-full lg:hidden"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="px-6 pb-6">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNewChat}
                  className="w-full flex items-center justify-center gap-2 bg-accent-gold/10 hover:bg-accent-gold/20 px-4 py-4 rounded-2xl text-sm font-display font-bold transition-all border border-accent-gold/20 text-accent-gold"
                >
                  <Plus className="w-5 h-5" />
                  NEW INQUIRY
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 space-y-8 py-4 custom-scrollbar">
                <div>
                  <h3 className="px-4 text-[10px] font-display font-bold text-text-muted uppercase tracking-[0.25em] mb-4">Knowledge Modules</h3>
                  <div className="space-y-2">
                    {MODULES.map((module) => (
                      <button
                        key={module.id}
                        onClick={() => handleModuleClick(module)}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-sm transition-all duration-300 group ${
                          activeModule?.id === module.id 
                            ? 'bg-accent-gold/10 text-accent-gold border border-accent-gold/30 shadow-[0_0_20px_rgba(212,175,55,0.1)]' 
                            : 'hover:bg-white/5 text-text-muted'
                        }`}
                      >
                        <span className="text-xl group-hover:scale-125 transition-transform">{module.icon}</span>
                        <span className="truncate font-display font-semibold">{module.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {activeModule && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-8"
                    >
                      {activeModule.lessons.length > 0 && (
                        <div>
                          <h3 className="px-4 text-[10px] font-display font-bold text-text-muted uppercase tracking-[0.25em] mb-4">Lessons</h3>
                          <div className="space-y-2">
                            {activeModule.lessons.map((lesson) => (
                              <button
                                key={lesson.id}
                                onClick={() => {
                                  setActiveLesson(lesson);
                                  setActiveQuiz(null);
                                  setShowQuiz(false);
                                  handleSendMessage(undefined, `Tell me about ${lesson.title} in ${activeModule.title}.`);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                                  activeLesson?.id === lesson.id 
                                    ? 'bg-white/10 text-accent-gold' 
                                    : 'hover:bg-white/5 text-text-muted'
                                }`}
                              >
                                <div className={`w-1.5 h-1.5 rounded-full ${activeLesson?.id === lesson.id ? 'bg-accent-gold pulse-glow' : 'bg-border-subtle'}`} />
                                <span className="truncate font-sans">{lesson.title}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeModule.quizzes.length > 0 && (
                        <div>
                          <h3 className="px-4 text-[10px] font-display font-bold text-text-muted uppercase tracking-[0.25em] mb-4">Archives</h3>
                          <div className="space-y-2">
                            {activeModule.quizzes.map((quiz) => (
                              <button
                                key={quiz.id}
                                onClick={() => {
                                  setActiveQuiz(quiz);
                                  setShowQuiz(true);
                                  setActiveLesson(null);
                                  playSound('whoosh');
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                                  activeQuiz?.id === quiz.id && showQuiz 
                                    ? 'bg-accent-gold text-bg-dark font-bold' 
                                    : 'bg-bg-dark/50 border border-border-subtle hover:border-accent-gold/50 text-text-muted'
                                }`}
                              >
                                <Trophy size={16} className={activeQuiz?.id === quiz.id && showQuiz ? 'text-bg-dark' : 'text-accent-gold'} />
                                <span className="truncate font-display uppercase tracking-wider text-[11px]">{quiz.title}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-6 border-t border-border-subtle">
                <div className="glass-card p-4 rounded-2xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center">
                    <GraduationCap size={20} className="text-accent-gold" />
                  </div>
                  <div>
                    <p className="text-xs font-display font-bold">Scholar Status</p>
                    <p className="text-[10px] text-accent-gold uppercase tracking-widest">Level 1 Initiate</p>
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
              <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-8">
                <div className="max-w-4xl mx-auto space-y-8">
                  <AnimatePresence mode="wait">
                    {showQuiz && activeQuiz ? (
                      <motion.div
                        key="quiz"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden"
                      >
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="flex items-center justify-between mb-12">
                          <div className="flex items-center gap-4">
                            <ThreeDIcon icon={Trophy} size={40} color="#d4af37" />
                            <div>
                              <h2 className="text-3xl font-display font-bold">{activeQuiz.title}</h2>
                              <p className="text-accent-gold font-sans text-sm uppercase tracking-[0.2em]">Academic Evaluation</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => setShowQuiz(false)}
                            className="p-3 hover:bg-white/5 rounded-full transition-colors text-text-muted hover:text-text-main"
                          >
                            <X size={24} />
                          </button>
                        </div>

                        <QuizView 
                          quiz={activeQuiz} 
                          onComplete={(score) => setQuizScore({ score, total: activeQuiz.questions.length })} 
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="chat"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6 pb-32"
                      >
                        {messages.length === 0 ? (
                          <div className="text-center py-20 space-y-8">
                            <motion.div
                              animate={{ 
                                y: [0, -20, 0],
                                rotate: [0, 5, -5, 0]
                              }}
                              transition={{ duration: 6, repeat: Infinity }}
                              className="inline-block"
                            >
                              <ThreeDIcon icon={Bot} size={120} color="#d4af37" />
                            </motion.div>
                            <div>
                              <h2 className="text-5xl font-display font-bold mb-4 tracking-tight">Welcome, Scholar.</h2>
                              <p className="text-xl font-sans text-text-muted max-w-2xl mx-auto leading-relaxed">
                                I am your Academic Assistant. Explore the archives, consult the modules, or ask me anything about your English Studies.
                              </p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-4">
                              {['Grammar 2', 'Composition 1', 'British Civilization'].map((topic) => (
                                <button
                                  key={topic}
                                  onClick={() => handleSendMessage(undefined, `Tell me about ${topic}.`)}
                                  className="glass-card px-6 py-3 rounded-full text-sm font-display font-semibold hover:text-accent-gold transition-all"
                                >
                                  {topic}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          messages.map((m, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 20, x: m.role === 'user' ? 20 : -20 }}
                              animate={{ opacity: 1, y: 0, x: 0 }}
                              className={`flex gap-4 sm:gap-6 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                                m.role === 'user' ? 'bg-accent-gold text-bg-dark' : 'bg-bg-panel border border-border-subtle text-accent-gold'
                              }`}>
                                {m.role === 'user' ? <User size={24} /> : <Bot size={24} />}
                              </div>
                              <div className={`max-w-[85%] p-6 rounded-3xl shadow-xl relative ${
                                m.role === 'user' 
                                  ? 'bg-accent-gold/10 border border-accent-gold/20 text-text-main rounded-tr-none' 
                                  : 'glass-panel text-text-main rounded-tl-none'
                              }`}>
                                <div className="prose prose-invert prose-sm sm:prose-base">
                                  <Markdown>{m.content}</Markdown>
                                </div>
                                <div className={`absolute top-0 ${m.role === 'user' ? '-right-2' : '-left-2'} w-4 h-4 rotate-45 ${
                                  m.role === 'user' ? 'bg-accent-gold/10' : 'bg-bg-panel'
                                } border-t border-l border-border-subtle`} />
                              </div>
                            </motion.div>
                          ))
                        )}
                        {isLoading && (
                          <div className="flex gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-bg-panel border border-border-subtle flex items-center justify-center shrink-0">
                              <Bot size={24} className="text-accent-gold animate-pulse" />
                            </div>
                            <div className="glass-panel p-6 rounded-3xl rounded-tl-none flex items-center gap-2">
                              <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-accent-gold rounded-full" />
                              <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-accent-gold rounded-full" />
                              <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-accent-gold rounded-full" />
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Input Area */}
              {!showQuiz && (
                <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8 bg-gradient-to-t from-bg-dark via-bg-dark/95 to-transparent">
                  <form 
                    onSubmit={handleSendMessage}
                    className="max-w-4xl mx-auto relative group"
                  >
                    <div className="absolute inset-0 bg-accent-gold/20 rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                    <div className="relative glass-panel rounded-3xl p-2 flex items-center gap-2 border-accent-gold/20 group-focus-within:border-accent-gold/50 transition-all">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Inquire about the archives..."
                        className="flex-1 bg-transparent border-none focus:ring-0 px-6 py-4 font-sans text-lg"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="bg-accent-gold text-bg-dark p-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-accent-gold/20 transition-all"
                      >
                        <Send size={24} />
                      </motion.button>
                    </div>
                  </form>
                </div>
              )}
            </main>
          </div>

          <Footer />
        </>
      )}
    </div>
  );
}

function QuizView({ quiz, onComplete }: { quiz: Quiz; onComplete: (score: number) => void }) {
  const { questions } = quiz;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [feedbackIndex, setFeedbackIndex] = useState<number | null>(null);

  // Tutor Bar State
  const [tutorInput, setTutorInput] = useState("");
  const [tutorResponse, setTutorResponse] = useState("");
  const [isTutorLoading, setIsTutorLoading] = useState(false);
  const [isTutorExpanded, setIsTutorExpanded] = useState(false);

  const readAloud = (text: string) => {
    playSound('click');
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handleTutorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorInput.trim() || isTutorLoading) return;

    setIsTutorLoading(true);
    playSound('click');
    try {
      const questionText = questions[currentQuestion].text;
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{
          role: 'user',
          parts: [{
            text: `Context: The student is currently answering this question: ${questionText}. Student Question: ${tutorInput}. Provide a brief, encouraging explanation in the language the student used (English or Arabic).`
          }]
        }]
      });
      setTutorResponse(response.text || "I'm sorry, I couldn't generate an explanation.");
    } catch (error) {
      console.error("Tutor Error:", error);
      setTutorResponse("Sorry, I encountered an error. Please try again.");
    } finally {
      setIsTutorLoading(false);
    }
  };

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(index);
    const correct = index === questions[currentQuestion].answer;
    setIsCorrect(correct);
    setFeedbackIndex(currentQuestion);
    
    if (correct) {
      setScore(s => s + 1);
      playSound('success');
      setTutorResponse("Precisely correct. Your understanding of the material is commendable.");
      
      if (currentQuestion === questions.length - 1) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#f1c40f', '#ffffff']
        });
      }
    } else {
      playSound('error');
      setTutorResponse("Not quite. Re-examine the core concepts of this lesson.");
    }
    setIsTutorExpanded(true);
  };

  const handleNext = () => {
    playSound('click');
    if (!isCorrect) {
      setSelectedOption(null);
      setIsCorrect(null);
      setFeedbackIndex(null);
      setTutorResponse("");
      return;
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(c => c + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setFeedbackIndex(null);
      setTutorInput("");
      setTutorResponse("");
      setIsTutorExpanded(false);
    } else {
      playSound('relic');
      setShowResult(true);
      onComplete(score);
    }
  };

  if (showResult) {
    return (
      <div className="py-12 space-y-8 text-center">
        <div className="inline-block p-8 rounded-full bg-accent-gold/10 mb-8 relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-accent-gold/30 rounded-full"
          />
          <Trophy size={80} className="text-accent-gold relative z-10" />
        </div>
        <h3 className="text-4xl font-display font-bold mb-4">Evaluation Complete</h3>
        <p className="text-2xl font-sans text-text-muted mb-8">
          Your score: <span className="text-accent-gold font-bold">{score}</span> / {questions.length}
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => {
              playSound('click');
              setCurrentQuestion(0);
              setScore(0);
              setShowResult(false);
              setSelectedOption(null);
              setIsCorrect(null);
              setTutorResponse("");
              setIsTutorExpanded(false);
            }}
            className="btn-premium"
          >
            RETAKE EVALUATION
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between border-b border-border-subtle pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-bg-dark border border-border-subtle flex items-center justify-center font-display font-bold text-accent-gold text-xl">
            {currentQuestion + 1}
          </div>
          <div>
            <p className="text-[10px] font-display font-bold text-accent-gold uppercase tracking-[0.2em]">Inquiry</p>
            <p className="text-sm font-sans text-text-muted">{currentQuestion + 1} of {questions.length}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-display font-bold text-accent-gold uppercase tracking-[0.2em]">Current Score</p>
          <p className="text-xl font-display font-bold">{score}</p>
        </div>
      </div>

      <div className="space-y-10 relative">
        <div className="flex items-start justify-between gap-6">
          <h3 className="text-2xl font-sans font-medium leading-relaxed flex-1">{question.text}</h3>
          <button 
            onClick={() => readAloud(question.text)}
            className="p-3 hover:bg-white/5 rounded-full text-accent-gold transition-colors shrink-0"
            title="Read Aloud"
          >
            <Volume2 size={24} />
          </button>
        </div>

        <div className="grid gap-4">
          {question.options.map((option, idx) => (
            <motion.button
              key={idx}
              whileHover={selectedOption === null ? { scale: 1.01, x: 5 } : {}}
              whileTap={selectedOption === null ? { scale: 0.99 } : {}}
              onClick={() => handleOptionClick(idx)}
              className={`w-full text-left p-6 rounded-2xl border transition-all flex items-center justify-between group ${
                selectedOption === idx
                  ? isCorrect 
                    ? 'border-success-light bg-success-light/10 text-success-light'
                    : 'border-danger-light bg-danger-light/10 text-danger-light'
                  : selectedOption !== null && idx === question.answer
                    ? 'border-success-light bg-success-light/10 text-success-light'
                    : 'glass-card hover:border-accent-gold/50'
              }`}
            >
              <span className="font-sans text-lg group-hover:text-accent-gold transition-colors">{option}</span>
              {selectedOption === idx && (
                isCorrect ? <Check size={24} /> : <AlertCircle size={24} />
              )}
            </motion.button>
          ))}
        </div>

        {/* 3D Feedback Animation */}
        <AnimatePresence>
          {feedbackIndex === currentQuestion && (
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-12 -right-4"
            >
              {isCorrect ? (
                <div className="bg-success-light p-4 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                  <Check size={40} className="text-white" />
                </div>
              ) : (
                <div className="bg-danger-light p-4 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                  <AlertCircle size={40} className="text-white" />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {selectedOption !== null && (
        <div className="flex justify-end pt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className={`px-10 py-4 rounded-2xl font-display font-bold transition-all flex items-center gap-3 text-lg uppercase tracking-widest shadow-xl ${
              isCorrect 
                ? 'btn-premium' 
                : 'bg-danger-dark text-white hover:bg-danger-light'
            }`}
          >
            {isCorrect ? (currentQuestion + 1 === questions.length ? 'Finalize Evaluation' : 'Proceed') : 'Re-attempt Inquiry'}
            <ChevronRight size={20} />
          </motion.button>
        </div>
      )}

      {/* Tutor Bar */}
      <div className="mt-12 pt-8 border-t border-border-subtle">
        <div className="glass-panel rounded-3xl p-6 border border-accent-gold/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-accent-gold" />
          <div className="flex items-center gap-3 mb-4">
            <ThreeDIcon icon={Bot} size={24} color="#d4af37" />
            <h4 className="font-display font-bold text-accent-gold uppercase tracking-widest text-sm">The Academic Tutor</h4>
          </div>
          
          <div className="space-y-6">
            <div className="text-sm text-text-main leading-relaxed font-sans italic opacity-90 min-h-[3em]">
              {tutorResponse || "I am here to provide scholarly clarification on this inquiry."}
            </div>
            
            <form onSubmit={handleTutorSubmit} className="flex gap-2">
              <input 
                type="text"
                value={tutorInput}
                onChange={(e) => setTutorInput(e.target.value)}
                placeholder="Ask for clarification..."
                className="flex-1 bg-bg-dark/50 border border-border-subtle rounded-xl px-4 py-3 text-sm font-sans focus:outline-none focus:border-accent-gold transition-all"
              />
              <button 
                type="submit"
                disabled={!tutorInput.trim() || isTutorLoading}
                className="bg-accent-gold/10 hover:bg-accent-gold/20 text-accent-gold p-3 rounded-xl border border-accent-gold/20 transition-all disabled:opacity-50"
              >
                {isTutorLoading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Sparkles size={18} /></motion.div> : <Send size={18} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
