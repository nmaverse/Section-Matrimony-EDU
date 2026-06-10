import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  ShieldAlert, 
  Zap, 
  Compass, 
  HelpCircle, 
  Maximize2, 
  Cpu, 
  Network, 
  Users, 
  MessageSquare, 
  Sparkles,
  Award,
  Layers,
  ArrowRightLeft
} from 'lucide-react';

interface PresentationSlidesProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PresentationSlides({ isOpen, onClose }: PresentationSlidesProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      subtitle: "Academic Registry Innovation",
      title: "Section Matrimony",
      tagline: "Bridging registration conflicts with real-time algorithmic matchmaking at East Delta University.",
      type: "intro",
      content: (
        <div className="flex flex-col items-center justify-center text-center h-full py-6">
          <div className="relative mb-6 animate-bounce">
            <div className="absolute inset-0 bg-rose-gold/20 rounded-full blur-xl animate-pulse" />
            <div className="w-20 h-20 rounded-full bg-rose-gold/10 border-2 border-rose-gold flex items-center justify-center text-rose-gold scale-110">
              <ArrowRightLeft className="w-10 h-10" />
            </div>
          </div>
          <span className="text-xs font-mono tracking-[0.3em] text-rose-gold uppercase mb-3 bg-rose-gold/15 px-4 py-1.5 rounded-full font-bold">
            Project Showcase
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
            SECTION <span className="text-rose-gold">MATRIMONY</span>
          </h1>
          <p className="max-w-xl text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-8">
            An elegant peer-to-peer section and course trading directory designed explicitly to eliminate student registration stress.
          </p>
          <div className="flex flex-wrap gap-4 items-center justify-center font-mono text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400">
            <span className="bg-charcoal-mid/40 border border-rose-gold/10 px-4 py-2 rounded-xl">Presenter: Nosaib Adil</span>
            <span className="bg-charcoal-mid/40 border border-rose-gold/10 px-4 py-2 rounded-xl">Target: EDU Students</span>
            <span className="bg-charcoal-mid/40 border border-rose-gold/10 px-4 py-2 rounded-xl">Stack: React + Firebase + Tailwind</span>
          </div>
        </div>
      )
    },
    {
      subtitle: "The Student Registration Struggle",
      title: "The Problem Space",
      tagline: "Manual scheduling is broken, chaotic, and heavily delays students' graduation tracks.",
      type: "problem",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 items-stretch">
          <div className="p-6 rounded-2xl bg-red-500/5 dark:bg-red-500/5 border border-red-500/10 dark:border-red-500/20 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white mb-2">Social Media Chaos</h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                Students resort to spamming unofficial student groups, Facebook pages, and WhatsApp chats, causing critical posts to drown in spam instantly.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-red-500 mt-4">Unorganized Spam ❌</span>
          </div>

          <div className="p-6 rounded-2xl bg-red-500/5 dark:bg-red-500/5 border border-red-500/10 dark:border-red-500/20 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white mb-2">The Blind Matching Game</h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                Finding someone who is enrolled in your desired section AND desperately wants to get into your exact section is a mathematical micro-probability.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-red-500 mt-4">Low Matching Probability ❌</span>
          </div>

          <div className="p-6 rounded-2xl bg-red-500/5 dark:bg-red-500/5 border border-red-500/10 dark:border-red-500/20 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white mb-2">Graduation Delays</h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                Due to unresolvable schedule overlaps, students miss out on essential prerequisite courses, needlessly delaying complete graduation plans by semesters.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-red-500 mt-4">Schedule Deadlocks ❌</span>
          </div>
        </div>
      )
    },
    {
      subtitle: "The Automated Matchmaker",
      title: "The Section Matrimony Solution",
      tagline: "A single centralized database replacing chaos with real-time peer-to-peer verification.",
      type: "solution",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 items-center">
          <div className="space-y-4">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white leading-tight">
              A structured index linking student needs instantly.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              Instead of scattering messages, students catalog their trade offer once. The platform organizes listings by Course Code, Department, and Semester to form a transparent visual grid of mutual goals.
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Zap className="w-3 h-3" />
                </div>
                <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-light">Centralized structured registry</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Zap className="w-3 h-3" />
                </div>
                <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-light">No intermediaries, student-to-student transactions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Zap className="w-3 h-3" />
                </div>
                <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-light">Instant perfect reciprocity alerts</span>
              </div>
            </div>
          </div>
          <div className="p-5 rounded-2xl border border-rose-gold/25 bg-charcoal-mid/30 dark:bg-charcoal-mid/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-gold/10 rounded-full blur-xl" />
            <div className="flex items-center justify-between border-b border-rose-gold/10 pb-4 mb-4">
              <span className="text-xs font-mono font-semibold text-rose-gold bg-rose-gold/10 px-2 rounded">Registry Protocol</span>
              <span className="text-[10px] font-mono text-neutral-500">Live Matching Engine</span>
            </div>
            
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-charcoal-dark select-none">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-neutral-800 dark:text-white">CSE 221 - Section 1</span>
                  <ArrowRight className="w-3.5 h-3.5 text-rose-gold" />
                  <span className="text-xs font-semibold text-rose-gold">Wants Section 3</span>
                </div>
                <div className="flex justify-between items-center mt-2 text-[10px] text-neutral-500 font-mono">
                  <span>Student ID: ***325</span>
                  <span className="text-emerald-500 flex items-center gap-1">● Active</span>
                </div>
              </div>

              <div className="flex items-center justify-center my-1 text-rose-gold animate-pulse">
                <ArrowRightLeft className="w-5 h-5 rotate-90" />
              </div>

              <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-charcoal-dark select-none">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-neutral-800 dark:text-white">CSE 221 - Section 3</span>
                  <ArrowRight className="w-3.5 h-3.5 text-rose-gold" />
                  <span className="text-xs font-semibold text-rose-gold">Wants Section 1</span>
                </div>
                <div className="flex justify-between items-center mt-2 text-[10px] text-neutral-500 font-mono">
                  <span>Student ID: ***414</span>
                  <span className="text-emerald-500 flex items-center gap-1">● Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      subtitle: "Innovative User Experience",
      title: "Core Platform Features",
      tagline: "Designed specifically to guide students from listing to agreement flawlessly.",
      type: "features",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-charcoal-mid/20 hover:border-rose-gold/20 transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-rose-gold/10 text-rose-gold flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-white mb-2">Reciprocal Alerts</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                Our database automatically scans reverse combinations. If Student A wants Section B, and Student B wants Section A, it triggers an instant matchup modal.
              </p>
            </div>
            <span className="text-[10px] font-mono text-rose-gold mt-4 font-bold uppercase">Dynamic Matchmaking</span>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-charcoal-mid/20 hover:border-rose-gold/20 transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-rose-gold/10 text-rose-gold flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-white mb-2">Direct Contact channels</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                With one-click direct WhatsApp integration and option-based Facebook paths, students initiate direct, friction-free negotiations immediately.
              </p>
            </div>
            <span className="text-[10px] font-mono text-rose-gold mt-4 font-bold uppercase">Peer-To-Peer Chat</span>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-charcoal-mid/20 hover:border-rose-gold/20 transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-rose-gold/10 text-rose-gold flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-white mb-2">10-Section Filtering</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                Filter instantly across CSE, EEE, BBA, Law and English departments; filter by semester levels, and restrict views specifically to your current section.
              </p>
            </div>
            <span className="text-[10px] font-mono text-rose-gold mt-4 font-bold uppercase">Grid Filtering</span>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-charcoal-mid/20 hover:border-rose-gold/20 transition-all flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-rose-gold/10 text-rose-gold flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-white mb-2">Double Guard Security</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                An administrator login protection keeps spam, fake profiles, or outdated swaps clear. Defaults can be restored instantly via admin keys.
              </p>
            </div>
            <span className="text-[10px] font-mono text-rose-gold mt-4 font-bold uppercase">Moderation Control</span>
          </div>
        </div>
      )
    },
    {
      subtitle: "The Mathematical Proof",
      title: "How It Matches",
      tagline: "Converting manual discovery into a clean P2P matching protocol.",
      type: "match",
      content: (
        <div className="relative py-4 flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl p-6 rounded-2xl border border-rose-gold/20 bg-charcoal-mid/20 relative">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center">
              <div>
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-rose-gold/10 border border-rose-gold/20 text-rose-gold font-mono text-xs font-bold mb-3">
                  Student Alpha (You)
                </div>
                <h5 className="font-display text-base font-bold text-neutral-900 dark:text-white">Nosaib Adil</h5>
                <p className="text-xs text-neutral-500 font-mono mt-1">ID: ***321</p>
                
                <div className="mt-4 p-3 rounded-xl bg-charcoal-dark/80 border border-neutral-200 dark:border-neutral-800 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Subject:</span>
                    <span className="font-bold text-neutral-800 dark:text-white">CSE 143</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Current:</span>
                    <span className="font-bold text-red-400">Section 01</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Desires:</span>
                    <span className="font-semibold text-emerald-400">Section 02</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center py-4">
                <span className="text-[11px] font-mono text-rose-gold bg-rose-gold/10 px-3 py-1 rounded-full border border-rose-gold/25 font-bold mb-2 uppercase tracking-wide">
                  Algorithmic Marriage
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-rose-gold" />
                  <div className="w-10 h-10 rounded-full bg-rose-gold text-white flex items-center justify-center animate-pulse shrink-0">
                    <ArrowRightLeft className="w-5 h-5" />
                  </div>
                  <div className="w-8 h-px bg-rose-gold" />
                </div>
                <span className="text-[10px] text-neutral-400 font-light mt-2 text-center">
                  Matched via exact reciprocal mapping query on Firestore.
                </span>
              </div>

              <div>
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 font-mono text-xs font-semibold mb-3">
                  Student Beta (Target)
                </div>
                <h5 className="font-display text-base font-bold text-neutral-900 dark:text-white">S. M. Rahat</h5>
                <p className="text-xs text-neutral-500 font-mono mt-1">ID: ***109</p>

                <div className="mt-4 p-3 rounded-xl bg-charcoal-dark/80 border border-neutral-200 dark:border-neutral-800 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Subject:</span>
                    <span className="font-bold text-neutral-800 dark:text-white">CSE 143</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Current:</span>
                    <span className="font-bold text-red-400">Section 02</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Desires:</span>
                    <span className="font-semibold text-emerald-400">Section 01</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-xs font-mono text-emerald-500">
              ✓ Match Success: WhatsApp deep-link maps custom messages instantly to initiate trade exchange.
            </p>
          </div>
        </div>
      )
    },
    {
      subtitle: "System Engineering Blueprint",
      title: "Technology Stack Architecture",
      tagline: "Engineered under ultra-lightweight client structures with zero complex overheads.",
      type: "tech",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-4 text-center">
          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-charcoal-mid/10">
            <span className="text-xs uppercase font-mono tracking-wider text-rose-gold block mb-1">Runtime Client</span>
            <h4 className="text-xl font-bold text-neutral-900 dark:text-white">React 18</h4>
            <div className="h-[1px] bg-rose-gold/20 my-3" />
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              Provides client-side single-page reactivity with robust hooks, rapid component state maps, and responsive form submissions.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-charcoal-mid/10">
            <span className="text-xs uppercase font-mono tracking-wider text-rose-gold block mb-1">Styling Paradigm</span>
            <h4 className="text-xl font-bold text-neutral-900 dark:text-white">Tailwind CSS</h4>
            <div className="h-[1px] bg-rose-gold/20 my-3" />
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              Maintains responsive layout density, fluid spacing patterns, high contrast accessibility, and dual-mode appearance adaptation.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-charcoal-mid/10">
            <span className="text-xs uppercase font-mono tracking-wider text-rose-gold block mb-1">State Database</span>
            <h4 className="text-xl font-bold text-neutral-900 dark:text-white">Firestore</h4>
            <div className="h-[1px] bg-rose-gold/20 my-3" />
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              Leverages Real-time listeners to push live swap offers to all active screens without forcing any tedious manual refreshing.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-charcoal-mid/10">
            <span className="text-xs uppercase font-mono tracking-wider text-rose-gold block mb-1">Visual Identity</span>
            <h4 className="text-xl font-bold text-neutral-900 dark:text-white">Rose Gold</h4>
            <div className="h-[1px] bg-rose-gold/20 my-3" />
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              Combines luxury dark aesthetics, copper-rose glow-spots, elegant display typography, and smooth active transitions.
            </p>
          </div>
        </div>
      )
    },
    {
      subtitle: "The Future of Section Matrimony",
      title: "Roadmap and Scope",
      tagline: "Expanding from peer-to-peer to full multi-way algorithmic loop exchanges.",
      type: "future",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 items-center">
          <div className="space-y-4">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2 leading-tight">
              A comprehensive vision for streamlined student schedules.
            </h3>
            
            <div className="space-y-4 font-light text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm">
              <p>
                Currently, Section Matrimony relies on direct 1:1 barter-style matches. While highly effective, many swap deadlocks require a third student to facilitate. Our next developmental update addresses exactly this.
              </p>
              <p>
                By shifting to circular matching paths, the platform will offer automated combinations like A wants Section 1, B wants Section 2, C wants Section 3, forming an automated loop that satisfies all three parties in single transactions.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-charcoal-mid/10 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-gold/10 text-rose-gold flex items-center justify-center shrink-0">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-white mb-1">Circular Multi-Ways</h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                  Query loops using graph traversal algorithms. Students get matched in chains of 3, 4, or 5 people, completing dense registration networks.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-charcoal-mid/10 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-gold/10 text-rose-gold flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-white mb-1">Official Academic Integration</h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                  Partnering with universites to automate official registration submissions the minute a digital matchmaking handshake is completed.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlide]);

  if (!isOpen) return null;

  const current = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0e0e12] text-white overflow-hidden p-4 sm:p-8 select-none">
      
      {/* Absolute Decorative Glowspots */}
      <div className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-rose-gold/4 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-dusty-pink/4 blur-[130px] pointer-events-none" />

      {/* Slide Header */}
      <div className="flex justify-between items-center z-10 border-b border-rose-gold/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono tracking-widest text-rose-gold uppercase bg-rose-gold/10 px-2.5 py-0.5 rounded-full font-bold">
              Slide {currentSlide + 1} of {slides.length}
            </span>
            <span className="text-xs text-neutral-500 font-mono hidden sm:inline">| East Delta University Project Presentation</span>
          </div>
          <p className="text-xs text-neutral-400 mt-1 font-sans hidden sm:block">{current.subtitle}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 border border-rose-gold/20 hover:border-rose-gold/50 bg-[#141418]/60 hover:bg-rose-gold/10 rounded-full transition-all text-neutral-400 hover:text-white cursor-pointer"
            title="Exit Presentation Mode (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Stage */}
      <div className="flex-1 flex flex-col justify-center max-w-6xl w-full mx-auto z-10 py-6 sm:py-8 my-auto relative focus:outline-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 15, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.985 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex-1 flex flex-col justify-center"
          >
            {/* Slide Title */}
            <div className="mb-6 select-text">
              <span className="text-xs uppercase font-mono tracking-[0.25em] text-rose-gold block mb-1">
                {current.subtitle}
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
                {current.title}
              </h2>
              <div className="h-[2px] w-12 bg-rose-gold my-3" />
              <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-3xl leading-relaxed">
                {current.tagline}
              </p>
            </div>

            {/* Dynamic content */}
            <div className="w-full relative select-text">
              {current.content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Footer with Controls */}
      <div className="z-10 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-rose-gold/10 pt-4 mt-auto">
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-500 order-2 sm:order-1 select-none">
          <span>Keyboard:</span>
          <span className="bg-charcoal-mid px-2 py-0.5 rounded border border-neutral-800 font-semibold text-neutral-300">Space</span>
          <span>/</span>
          <span className="bg-charcoal-mid px-2 py-0.5 rounded border border-neutral-800 font-semibold text-neutral-300">→</span>
          <span>Next</span>
          <span className="bg-charcoal-mid px-2 py-0.5 rounded border border-neutral-800 font-semibold text-neutral-300">←</span>
          <span>Previous</span>
        </div>

        {/* Presentation progress bar dots */}
        <div className="flex items-center gap-2 order-1 sm:order-2 select-none">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-rose-gold' : 'w-2 bg-neutral-700 hover:bg-neutral-500'
              }`}
              title={`Jump to Slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3 order-3 select-none">
          <button
            onClick={handlePrev}
            className="flex items-center justify-center w-10 sm:w-28 h-10 rounded-full border border-rose-gold/20 hover:border-rose-gold/50 bg-[#141418]/60 hover:bg-rose-gold/10 text-neutral-400 hover:text-white transition-all cursor-pointer text-xs font-semibold gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>
          
          <button
            onClick={handleNext}
            className="flex items-center justify-center w-10 sm:w-28 h-10 rounded-full bg-rose-gold hover:bg-dusty-pink text-white transition-all cursor-pointer text-xs font-bold gap-1 shadow-lg shadow-rose-gold/10 hover:shadow-rose-gold/20"
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
