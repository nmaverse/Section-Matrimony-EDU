import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  ShieldAlert, 
  Zap, 
  Compass, 
  Cpu, 
  Network, 
  Users, 
  MessageSquare, 
  Sparkles,
  Layers,
  ArrowRightLeft,
  Play,
  Pause,
  RefreshCw,
  Heart
} from 'lucide-react';

interface PresentationSlidesProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PresentationSlides({ isOpen, onClose }: PresentationSlidesProps) {
  // Define our robust 13-stage presentation timeline
  const timeline = [
    { slideIndex: 0, subStep: 0, label: "Intro" },
    { slideIndex: 1, subStep: 0, label: "Social Media Chaos" },
    { slideIndex: 1, subStep: 1, label: "Blind Searching" },
    { slideIndex: 1, subStep: 2, label: "Schedule Deadlocks" },
    { slideIndex: 2, subStep: 0, label: "Solution Spotlight: Registry" },
    { slideIndex: 2, subStep: 1, label: "Solution Overview" },
    { slideIndex: 3, subStep: 0, label: "Walkthrough: Form Post" },
    { slideIndex: 3, subStep: 1, label: "Walkthrough: Sync Board" },
    { slideIndex: 3, subStep: 2, label: "Walkthrough: Reciprocal Alert" },
    { slideIndex: 3, subStep: 3, label: "Walkthrough: Direct Message" },
    { slideIndex: 4, subStep: 0, label: "Live Match Protocol" },
    { slideIndex: 5, subStep: 0, label: "Technology Stack" },
    { slideIndex: 6, subStep: 0, label: "Roadmap Scope" }
  ];

  const [timelineIndex, setTimelineIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  // Compute active slide & active sub-step based on our single source of truth (timelineIndex)
  const currentStep = timeline[timelineIndex];
  const currentSlide = currentStep.slideIndex;
  const currentSubStep = currentStep.subStep;

  // Jump to a major slide (takes the presenter to the first sub-step of that slide)
  const goToSlide = (slideIdx: number) => {
    const firstStepIdx = timeline.findIndex(step => step.slideIndex === slideIdx);
    if (firstStepIdx !== -1) {
      setDirection(slideIdx > currentSlide ? 1 : -1);
      setTimelineIndex(firstStepIdx);
    }
  };

  const handleNext = () => {
    setDirection(1);
    setTimelineIndex((prev) => (prev + 1) % timeline.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setTimelineIndex((prev) => (prev - 1 + timeline.length) % timeline.length);
  };

  // Keyboard navigation
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
  }, [isOpen, timelineIndex]);

  // Autoplay loop timer (Advances sequentially every 3500ms to allow comfortable viewing)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        setDirection(1);
        setTimelineIndex((prev) => {
          if (prev >= timeline.length - 1) {
            setIsPlaying(false); // End reached
            return 0; // Return to first slide
          }
          return prev + 1;
        });
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  // Secondary sub-step rotation on Slide 4 features ONLY whenidle / not autoplaying
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && !isPlaying && currentSlide === 3) {
      interval = setInterval(() => {
        setDirection(1);
        setTimelineIndex((prev) => {
          const step = timeline[prev];
          if (step.slideIndex === 3) {
            const nextSub = (step.subStep + 1) % 4;
            const targetIdx = timeline.findIndex(s => s.slideIndex === 3 && s.subStep === nextSub);
            return targetIdx !== -1 ? targetIdx : prev;
          }
          return prev;
        });
      }, 2500); // Gentle 2.5s timer
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying, currentSlide]);

  if (!isOpen) return null;

  // Custom Feature steps copy mapped as variables so dry rendering is immaculate
  const featureSteps = [
    {
      title: "1. Post Swap Offer",
      metric: "Step 01",
      icon: <Layers className="w-5 h-5 text-rose-gold" />,
      desc: "Students catalog their course and section details. Fields are verified on submit.",
      color: "from-rose-gold/20 via-rose-gold/5 to-transparent",
      visual: (
        <div className="p-5 rounded-2xl border border-rose-gold/25 bg-[#141419] relative overflow-hidden h-full flex flex-col justify-between shadow-2xl">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-gold/10 rounded-full blur-2xl" />
          <div>
            <div className="flex justify-between items-center mb-4 border-b border-rose-gold/10 pb-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-rose-gold font-bold">New Offer Form</span>
              <span className="text-[8px] font-mono text-neutral-500">Peer verified</span>
            </div>
            <div className="space-y-2 text-left">
              <div className="h-7 bg-charcoal-mid/60 border border-neutral-800 rounded px-2 flex items-center justify-between text-[11px] text-neutral-400">
                <span>Course Code:</span>
                <span className="font-mono text-white font-semibold">CSE231</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-7 bg-charcoal-mid/60 border border-neutral-800 rounded px-2 flex items-center justify-between text-[11px] text-neutral-400">
                  <span>Current:</span>
                  <span className="font-mono text-red-400 font-semibold">Sec 01</span>
                </div>
                <div className="h-7 bg-charcoal-mid/60 border border-neutral-800 rounded px-2 flex items-center justify-between text-[11px] text-neutral-400">
                  <span>Wants:</span>
                  <span className="font-mono text-emerald-450 font-semibold">Sec 04</span>
                </div>
              </div>
              <div className="h-7 bg-charcoal-mid/60 border border-neutral-800 rounded px-2 flex items-center justify-between text-[11px] text-neutral-400">
                <span>Student ID:</span>
                <span className="font-mono text-neutral-300">221-115-043</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-900 flex justify-between items-center text-[10px] text-neutral-400">
            <span className="text-emerald-400 flex items-center gap-1 font-mono">● Active Validations passed</span>
            <button className="h-7 px-3 rounded bg-rose-gold text-black font-semibold text-[10px] hover:bg-dusty-pink transition-all">Submit swap</button>
          </div>
        </div>
      )
    },
    {
      title: "2. Live Sync Grid",
      metric: "Step 02",
      icon: <Network className="w-5 h-5 text-blue-400" />,
      desc: "Submissions instantly stream into the 10-section visual tracking board without reload.",
      color: "from-blue-500/10 via-blue-500/5 to-transparent",
      visual: (
        <div className="p-5 rounded-2xl border border-blue-500/20 bg-[#141419] relative overflow-hidden h-full flex flex-col justify-between shadow-2xl">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
          <div>
            <div className="flex justify-between items-center mb-4 border-b border-neutral-800 pb-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-blue-400 font-bold">Smart Filter Grid</span>
              <span className="text-[8px] font-mono text-emerald-400 animate-pulse">● Live listeners active</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-left">
              <div className="p-2.5 rounded-lg bg-charcoal-mid/40 border border-blue-500/35 relative">
                <span className="text-[9px] font-mono text-blue-450 uppercase tracking-widest block font-bold">CSE</span>
                <span className="text-sm font-bold text-white block">Sec 01</span>
                <div className="mt-1 text-[8px] text-neutral-500">2 Active Trades</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0e0e12] border border-neutral-850">
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block">BBA</span>
                <span className="text-sm font-bold text-neutral-400 block">Sec 03</span>
                <div className="mt-1 text-[8px] text-neutral-600">0 Trades</div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-900 text-xs text-neutral-400 text-center font-mono">
            Firestore listeners stream updates in <span className="text-emerald-400 font-bold">&lt;100ms</span>
          </div>
        </div>
      )
    },
    {
      title: "3. Reciprocal Match",
      metric: "Step 03",
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      desc: "Automated queries detect reciprocal trade offerings and prompt a matched alert.",
      color: "from-amber-500/10 via-amber-500/5 to-transparent",
      visual: (
        <div className="p-5 rounded-2xl border border-amber-500/20 bg-[#141419] relative overflow-hidden h-full flex flex-col justify-between shadow-2xl">
          <div className="absolute inset-0 bg-radial from-amber-500/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl" />
          <div>
            <div className="flex justify-between items-center mb-3 border-b border-neutral-800 pb-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold">Matrimony Match Engine</span>
              <span className="text-[8px] font-mono text-amber-400 animate-pulse bg-amber-500/10 px-1 rounded">100% Reciprocal</span>
            </div>
            <div className="p-2.5 bg-amber-500/5 border border-amber-500/20 rounded-xl text-center space-y-1">
              <div className="text-[11px] font-bold text-white uppercase tracking-wider">Perfect Match Found!</div>
              <p className="text-[9px] text-neutral-400 leading-relaxed max-w-xs mx-auto">
                Tanvir wants Sec 01 (Your Sec). You want Sec 02 (Tanvir's Sec).
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-center gap-1.5 bg-[#0e0e12] p-2 rounded-lg border border-neutral-850 text-[10px] text-neutral-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Connect channels open</span>
          </div>
        </div>
      )
    },
    {
      title: "4. Peer Integration",
      metric: "Step 04",
      icon: <MessageSquare className="w-5 h-5 text-emerald-400" />,
      desc: "Secure deep-links route students with pre-filled, polished WhatsApp message text copy.",
      color: "from-emerald-500/10 via-emerald-500/5 to-transparent",
      visual: (
        <div className="p-5 rounded-2xl border border-emerald-500/20 bg-[#141419] relative overflow-hidden h-full flex flex-col justify-between shadow-2xl">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
          <div>
            <div className="flex justify-between items-center mb-4 border-b border-neutral-800 pb-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold">One-Click Engagement</span>
              <span className="text-[8px] font-mono text-neutral-500">Safe redirect</span>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-800/40 text-left space-y-1">
              <span className="text-[8px] font-mono text-emerald-400 uppercase font-bold block">WhatsApp Copy Preview:</span>
              <p className="text-[9px] text-neutral-300 italic">
                "Assalamu Alaikum! My Section Matrimony match code is [221-CSE]. Let's proceed with swap registration..."
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <div className="h-8 cursor-pointer text-center flex-1 bg-emerald-500 hover:bg-emerald-600 font-bold rounded text-neutral-900 text-[10px] transition-all flex items-center justify-center gap-1 shadow-lg shadow-emerald-500/10">
              <span>Open WhatsApp</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Map slide index structures to make rendering precise and easily accessible
  const slides = [
    // SLIDE 0: Intro slide
    {
      subtitle: "Academic Registry Innovation",
      title: "Section Matrimony",
      tagline: "Bridging registration conflicts with real-time algorithmic matchmaking at East Delta University.",
      content: (
        <div className="flex flex-col items-center justify-center text-center h-full py-8 md:py-16">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-rose-gold/25 rounded-full blur-2xl animate-pulse" />
            <motion.div 
              initial={{ scale: 0.8, rotate: -15 }}
              animate={{ scale: 1.1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              className="w-24 h-24 rounded-full bg-rose-gold/15 border border-rose-gold flex items-center justify-center text-rose-gold shadow-lg shadow-rose-gold/10"
            >
              <ArrowRightLeft className="w-12 h-12" />
            </motion.div>
          </div>
          <span className="text-[10px] font-mono tracking-[0.3em] text-rose-gold uppercase mb-4 bg-rose-gold/10 px-5 py-2 rounded-full border border-rose-gold/20 font-bold">
            Project Showcase
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-5">
            SECTION <span className="text-rose-gold">MATRIMONY</span>
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-10 px-4">
            An elegant peer-to-peer section and course trading directory designed explicitly to eliminate student registration stress and course conflicts.
          </p>
          <div className="flex flex-wrap gap-3 items-center justify-center font-mono text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400">
            <span className="bg-[#14141a]/80 border border-rose-gold/10 px-5 py-2.5 rounded-2xl backdrop-blur">Presenter: Nosaib Adil</span>
            <span className="bg-[#14141a]/80 border border-rose-gold/10 px-5 py-2.5 rounded-2xl backdrop-blur">Target: East Delta University</span>
            <span className="bg-[#14141a]/80 border border-rose-gold/10 px-5 py-2.5 rounded-2xl backdrop-blur">Stack: React + Firebase + Tailwind</span>
          </div>
        </div>
      )
    },
    // SLIDE 1: Problem space with step-by-step card highlights
    {
      subtitle: "The Student Registration Struggle",
      title: "The Problem Space",
      tagline: "Step through the three major friction barriers students experience every semester.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 items-stretch select-none">
          {/* Card 1: Social Media Chaos */}
          <motion.div
            animate={{
              scale: currentSubStep === 0 ? 1.05 : 0.94,
              opacity: currentSubStep === 0 ? 1 : 0.35,
              y: currentSubStep === 0 ? -6 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 border ${
              currentSubStep === 0
                ? "bg-red-500/[0.04] dark:bg-[#181113] border-red-500/50 shadow-xl shadow-red-500/10"
                : "bg-red-500/5 dark:bg-[#121013] border-neutral-850"
            }`}
          >
            <div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border transition-all ${
                currentSubStep === 0 ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-red-500/5 text-red-500/50 border-neutral-800"
              }`}>
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white mb-2.5">1. Social Media Chaos</h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                Students resort to spamming unofficial student groups, Facebook pages, and WhatsApp chats, causing critical posts to drown in spam instantly.
              </p>
            </div>
            <span className={`text-xs font-mono font-bold mt-5 uppercase tracking-widest px-3 py-1 rounded w-fit transition-all ${
              currentSubStep === 0 ? "text-red-400 bg-red-500/15 border border-red-500/20" : "text-neutral-600 bg-neutral-900/40"
            }`}>Unorganized Spam ❌</span>
          </motion.div>

          {/* Card 2: Blind Matching Game */}
          <motion.div
            animate={{
              scale: currentSubStep === 1 ? 1.05 : 0.94,
              opacity: currentSubStep === 1 ? 1 : 0.35,
              y: currentSubStep === 1 ? -6 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 border ${
              currentSubStep === 1
                ? "bg-red-500/[0.04] dark:bg-[#181113] border-red-500/50 shadow-xl shadow-red-500/10"
                : "bg-red-500/5 dark:bg-[#121013] border-neutral-850"
            }`}
          >
            <div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border transition-all ${
                currentSubStep === 1 ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-red-500/5 text-red-500/50 border-neutral-800"
              }`}>
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white mb-2.5">2. Blind Searching</h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                Finding someone who is enrolled in your desired section AND desperately wants to get into your exact section is a mathematical micro-probability.
              </p>
            </div>
            <span className={`text-xs font-mono font-bold mt-5 uppercase tracking-widest px-3 py-1 rounded w-fit transition-all ${
              currentSubStep === 1 ? "text-red-400 bg-red-500/15 border border-red-500/20" : "text-neutral-600 bg-neutral-900/40"
            }`}>Low Probabilities ❌</span>
          </motion.div>

          {/* Card 3: Graduation Delays */}
          <motion.div
            animate={{
              scale: currentSubStep === 2 ? 1.05 : 0.94,
              opacity: currentSubStep === 2 ? 1 : 0.35,
              y: currentSubStep === 2 ? -6 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 border ${
              currentSubStep === 2
                ? "bg-red-500/[0.04] dark:bg-[#181113] border-red-500/50 shadow-xl shadow-red-500/10"
                : "bg-red-500/5 dark:bg-[#121013] border-neutral-850"
            }`}
          >
            <div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border transition-all ${
                currentSubStep === 2 ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-red-500/5 text-red-500/50 border-neutral-800"
              }`}>
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-neutral-900 dark:text-white mb-2.5">3. Schedule Deadlocks</h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                Due to unresolvable schedule overlaps, students miss out on essential prerequisite courses, needlessly delaying complete graduation plans by semesters.
              </p>
            </div>
            <span className={`text-xs font-mono font-bold mt-5 uppercase tracking-widest px-3 py-1 rounded w-fit transition-all ${
              currentSubStep === 2 ? "text-red-400 bg-red-500/15 border border-red-500/20" : "text-neutral-600 bg-neutral-900/40"
            }`}>Delayed Degree ❌</span>
          </motion.div>
        </div>
      )
    },
    // SLIDE 2: Registry Protocol spotlight view vs normal view
    {
      subtitle: "The Automated Matchmaker",
      title: "The Section Matrimony Solution",
      tagline: "Registry Protocol highlights live peer transactions as verified records.",
      content: (
        <div className="flex flex-col md:flex-row gap-8 py-4 items-center justify-center relative min-h-[360px]">
          {/* Left copy blocks (fades out during subStep 0: spotlight) */}
          <motion.div
            animate={{
              opacity: currentSubStep === 1 ? 1 : 0.15,
              filter: currentSubStep === 1 ? "blur(0px)" : "blur(2px)",
              scale: currentSubStep === 1 ? 1 : 0.95
            }}
            transition={{ duration: 0.4 }}
            className="w-full md:w-1/2 space-y-6 text-left"
          >
            <h3 className="font-display text-xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white leading-snug">
              A structured index linking student needs instantly.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              Instead of scattering messages across social platforms, students catalog their trade offer once. The platform organizes listing variables cleanly to resolve conflicts.
            </p>
            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-light">Centralized structured registry</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-light">Direct peer-to-peer handshakes</span>
              </div>
            </div>
          </motion.div>

          {/* Right Spotlight component, centers and blows up on subStep 0. Transitions are GPU elements only (no layout recalculations) to ensure butter-smoothness on all devices */}
          <motion.div
            animate={{
              scale: currentSubStep === 0 ? 1.05 : 1,
              x: currentSubStep === 0 ? "-8%" : "0%",
              boxShadow: currentSubStep === 0 ? "0 25px 50px -12px rgba(183, 110, 121, 0.25)" : "0 10px 15px -3px rgba(0,0,0,0.1)"
            }}
            style={{ originX: 0.5 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className={`p-6 rounded-3xl border w-full max-w-md ${
              currentSubStep === 0 
                ? "border-rose-gold bg-[#16161c]" 
                : "border-[#202027] bg-[#121216]"
            } relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-gold/15 rounded-full blur-3xl animate-pulse" />
            <div className="flex items-center justify-between border-b border-rose-gold/10 pb-4 mb-4">
              <span className="text-xs font-mono font-bold text-rose-gold bg-rose-gold/10 px-3 py-1 rounded border border-rose-gold/20">
                {currentSubStep === 0 ? "★ spotlight: Registry Protocol" : "Registry Protocol"}
              </span>
              <span className="text-[10px] font-mono text-neutral-500 animate-pulse">Live Matching Live</span>
            </div>
            
            <div className="space-y-3 font-sans">
              <div className="p-3.5 rounded-xl border border-neutral-800 bg-[#141419] select-none text-left">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">CSE 221</span>
                    <span className="text-[10px] font-mono text-neutral-500">Sec 1</span>
                  </div>
                  <ArrowRightLeft className="w-3.5 h-3.5 text-rose-gold animate-pulse" />
                  <span className="text-xs font-semibold text-rose-gold">Wants Sec 3</span>
                </div>
                <div className="flex justify-between items-center mt-2.5 text-[10px] text-neutral-500 font-mono">
                  <span>Student ID: ***325</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">● Active Offer</span>
                </div>
              </div>

              <div className="flex items-center justify-center my-1 text-rose-gold">
                <div className="w-12 h-px bg-rose-gold/20" />
                <span className="text-[10px] font-mono uppercase bg-rose-gold/10 px-3 py-1 rounded-full border border-rose-gold/20 text-rose-gold font-bold mx-2 animate-pulse">Mutual Match</span>
                <div className="w-12 h-px bg-rose-gold/20" />
              </div>

              <div className="p-3.5 rounded-xl border border-neutral-800 bg-[#141419] select-none text-left">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">CSE 221</span>
                    <span className="text-[10px] font-mono text-neutral-500">Sec 3</span>
                  </div>
                  <ArrowRightLeft className="w-3.5 h-3.5 text-rose-gold" />
                  <span className="text-xs font-semibold text-rose-gold">Wants Sec 1</span>
                </div>
                <div className="flex justify-between items-center mt-2.5 text-[10px] text-neutral-500 font-mono">
                  <span>Student ID: ***414</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">● Active Offer</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )
    },
    // SLIDE 3: Interactive Walkthrough with highlighted status
    {
      subtitle: "The Core Walkthrough",
      title: "Interactive Feature Walkthrough",
      tagline: "These step modules are engineered under premium card expansions.",
      content: (
        <div className="flex flex-col lg:flex-row gap-6 lg:items-stretch py-4">
          {/* Steps List on Left */}
          <div className="w-full lg:w-1/2 flex flex-col gap-3 justify-center text-left">
            {featureSteps.map((step, idx) => {
              const isSelected = currentSubStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    const stepIdx = timeline.findIndex(s => s.slideIndex === 3 && s.subStep === idx);
                    if (stepIdx !== -1) setTimelineIndex(stepIdx);
                  }}
                  className={`p-4 rounded-xl text-left border transition-all duration-300 relative overflow-hidden cursor-pointer flex items-start gap-4 ${
                    isSelected
                      ? "border-rose-gold bg-gradient-to-r from-rose-gold/10 via-rose-gold/5 to-transparent scale-[1.03] shadow-lg shadow-rose-gold/5"
                      : "border-neutral-850 bg-[#121217]/50 hover:bg-[#181822]/80 hover:border-neutral-750 opacity-55"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-rose-gold animate-pulse" />
                  )}
                  <div className={`p-2.5 rounded-lg border ${
                    isSelected ? "bg-rose-gold/20 border-rose-gold/40 text-rose-gold animate-bounce" : "bg-neutral-900 border-neutral-805 text-neutral-500"
                  } shrink-0`}>
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-display font-bold text-white text-sm sm:text-base">{step.title}</h4>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-rose-gold bg-rose-gold/10 px-1.5 py-0.5 rounded border border-rose-gold/15">
                        {step.metric}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">{step.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Demonstration showcase preview block */}
          <div className="w-full lg:w-1/2 flex items-center justify-center min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSubStep}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full"
              >
                {featureSteps[currentSubStep].visual}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )
    },
    // SLIDE 4: "How It Matches" live interactive particle model
    {
      subtitle: "The Mathematical Proof",
      title: "How It Matches",
      tagline: "Live-simulating the instant matchmaking engine when a reciprocal trade enters the registry.",
      content: (
        <div className="relative py-4 flex flex-col items-center justify-center overflow-hidden min-h-[380px]">
          <div className="w-full max-w-4xl p-6 rounded-3xl border border-rose-gold/20 bg-[#121217] relative shadow-2xl overflow-hidden">
            
            {/* Absolute Particle Streams */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-20 pointer-events-none overflow-visible hidden md:block">
              {/* Left back glow */}
              <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-28 h-28 bg-rose-gold/8 rounded-full blur-2xl animate-pulse" />
              
              {/* Glow particle vectors streaming left to center */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`left-${i}`}
                  className="absolute w-2 h-2 rounded-full bg-rose-gold shadow-lg shadow-rose-gold"
                  style={{ top: '40%' }}
                  initial={{ x: "80px", opacity: 0 }}
                  animate={{ 
                    x: ["80px", "380px"],
                    opacity: [0, 1, 1, 0],
                    scale: [0.5, 1.2, 1, 0.3]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: i * 0.5,
                    ease: "easeIn" 
                  }}
                />
              ))}

              {/* Glow particle vectors streaming right to center */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`right-${i}`}
                  className="absolute w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400"
                  style={{ top: '40%' }}
                  initial={{ x: "680px", opacity: 0 }}
                  animate={{ 
                    x: ["680px", "380px"],
                    opacity: [0, 1, 1, 0],
                    scale: [0.5, 1.2, 1, 0.3]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: i * 0.5,
                    ease: "easeIn" 
                  }}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch text-center z-10 relative">
              
              {/* Alpha submittor card */}
              <motion.div 
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-left p-4.5 rounded-2xl bg-[#16161c] border border-rose-gold/15"
              >
                <div className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-rose-gold/10 border border-rose-gold/20 text-rose-gold font-mono text-[10px] font-bold mb-3">
                  Student Alpha (Submitter)
                </div>
                <h5 className="font-display text-sm sm:text-base font-bold text-white">Nosaib Adil</h5>
                <p className="text-[10px] text-neutral-500 font-mono mt-0.5">ID: 221-115-*** | CSE Dept</p>
                
                <div className="mt-4 p-3.5 rounded-xl bg-[#0f0f13] border border-neutral-850 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Course Code:</span>
                    <span className="font-bold text-white font-mono">CSE 143</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500">Enrolled In:</span>
                    <span className="font-bold text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded text-[10px] font-mono border border-red-500/10">SEC 01</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500">Desires:</span>
                    <span className="font-semibold text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded text-[10px] font-mono border border-emerald-500/10">SEC 02</span>
                  </div>
                </div>
              </motion.div>

              {/* Match protocol center reactor engine */}
              <div className="flex flex-col items-center justify-center py-6 px-2 min-h-[160px]">
                <div className="relative mb-4 flex items-center justify-center">
                  {/* Concentric rotating glowing halos */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute w-24 h-24 rounded-full border-2 border-dashed border-rose-gold/15"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute w-20 h-20 rounded-full border border-dashed border-emerald-450/15"
                  />
                  {/* Pulse core */}
                  <motion.div
                    animate={{ scale: [1, 1.12, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 rounded-full bg-rose-gold text-white flex items-center justify-center shadow-xl shadow-rose-gold/15 shrink-0 z-10"
                  >
                    <ArrowRightLeft className="w-7 h-7" />
                  </motion.div>
                </div>
                
                <span className="text-[10px] font-mono text-rose-gold bg-rose-gold/10 px-3.5 py-1 rounded-full border border-rose-gold/20 font-bold mb-2 uppercase tracking-widest text-center">
                  Engine active
                </span>
                <span className="text-[9px] text-neutral-450 font-light text-center leading-relaxed max-w-[180px]">
                  Real-time indices trigger matching handshake immediately on filing.
                </span>
              </div>

              {/* Beta matching card */}
              <motion.div 
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="text-left p-4.5 rounded-2xl bg-[#16161c] border border-emerald-400/15"
              >
                <div className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 font-mono text-[10px] font-bold mb-3">
                  Student Beta (Reciprocal)
                </div>
                <h5 className="font-display text-sm sm:text-base font-bold text-white">S. M. Rahat</h5>
                <p className="text-[10px] text-neutral-500 font-mono mt-0.5">ID: 212-115-*** | CSE Dept</p>

                <div className="mt-4 p-3.5 rounded-xl bg-[#0f0f13] border border-neutral-850 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Course Code:</span>
                    <span className="font-bold text-white font-mono">CSE 143</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500">Enrolled In:</span>
                    <span className="font-bold text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded text-[10px] font-mono border border-red-500/10">SEC 02</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500">Desires:</span>
                    <span className="font-semibold text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded text-[10px] font-mono border border-emerald-500/10">SEC 01</span>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Glowing match success notifier */}
            <motion.div
              initial={{ opacity: 0.8 }}
              animate={{ opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-6 pt-3.5 border-t border-neutral-900 text-center text-[11px] font-mono text-emerald-400 flex items-center justify-center gap-2"
            >
              <Heart className="w-3.5 h-3.5 text-emerald-400 animate-pulse fill-emerald-400" />
              <span>✓ Match Metromony Completed: Dynamic preconfigured deep-links available for WhatsApp chat.</span>
            </motion.div>
          </div>
        </div>
      )
    },
    // SLIDE 5: Technology Stack Architecture
    {
      subtitle: "System Engineering Blueprint",
      title: "Technology Stack Architecture",
      tagline: "Ultra-lean serverless client structures mapped for near-instant data streams.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-4 text-center">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="p-5 rounded-2xl border border-neutral-850 bg-[#121217] hover:border-rose-gold/25 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-rose-gold block mb-1">Runtime Client</span>
              <h4 className="text-lg font-bold text-white">React 18</h4>
              <div className="h-[1px] bg-rose-gold/15 my-3" />
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Serverless single-page app architecture running speedy hooks and live state caches.
              </p>
            </div>
            <span className="text-[9px] font-mono text-neutral-500 uppercase mt-4">Vite Sandbox Bundled</span>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="p-5 rounded-2xl border border-neutral-850 bg-[#121217] hover:border-rose-gold/25 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-rose-gold block mb-1">Styling Paradigm</span>
              <h4 className="text-lg font-bold text-white">Tailwind CSS</h4>
              <div className="h-[1px] bg-rose-gold/15 my-3" />
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Strict utility classes for responsive grids, copper-gold ambient halos, and precise margin rhythm.
              </p>
            </div>
            <span className="text-[9px] font-mono text-neutral-500 uppercase mt-4">Safe Fluid Densities</span>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="p-5 rounded-2xl border border-neutral-850 bg-[#121217] hover:border-rose-gold/25 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-rose-gold block mb-1">Real-time DB</span>
              <h4 className="text-lg font-bold text-white">Google Firestore</h4>
              <div className="h-[1px] bg-rose-gold/15 my-3" />
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Persistent reactive listeners distribute swap filings synchronously in &lt;100ms.
              </p>
            </div>
            <span className="text-[9px] font-mono text-neutral-500 uppercase mt-4">Firestore Blueprints</span>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="p-5 rounded-2xl border border-neutral-850 bg-[#121217] hover:border-rose-gold/25 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-rose-gold block mb-1">State & Motion</span>
              <h4 className="text-lg font-bold text-white">Framer Motion</h4>
              <div className="h-[1px] bg-rose-gold/15 my-3" />
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Physics-based animations power micro-transitions, slide springings, and layout morphing hooks.
              </p>
            </div>
            <span className="text-[9px] font-mono text-neutral-500 uppercase mt-4">Motion/React Spring</span>
          </motion.div>
        </div>
      )
    },
    // SLIDE 6: Future Roadmap
    {
      subtitle: "The Future of Section Matrimony",
      title: "Roadmap and Scope",
      tagline: "Scaling from simple direct peer barter agreements to advanced circular loops.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 items-center">
          <div className="space-y-4 text-left">
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

          <div className="space-y-4 text-left">
            <div className="p-4 rounded-xl border border-neutral-800 bg-[#121217] flex gap-4 hover:border-rose-gold/25 transition-all">
              <div className="w-10 h-10 rounded-xl bg-rose-gold/10 text-rose-gold flex items-center justify-center shrink-0 border border-rose-gold/20">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-white mb-1">Circular Multi-Ways</h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                  Query loops using graph traversal algorithms. Students get matched in chains of 3, 4, or 5 people, completing dense registration networks.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-neutral-800 bg-[#121217] flex gap-4 hover:border-rose-gold/25 transition-all">
              <div className="w-10 h-10 rounded-xl bg-rose-gold/10 text-rose-gold flex items-center justify-center shrink-0 border border-rose-gold/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-neutral-900 dark:text-white mb-1">Official Academic Integration</h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                  Partnering with universities to automate official registration submissions the minute a digital matchmaking handshake is completed.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const current = slides[currentSlide];

  // Slide motion definitions: elegant, cinematic opacity crossfade and subtle scaling
  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 0.995,
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        opacity: { duration: 0.4, ease: "easeOut" },
        scale: { duration: 0.4, ease: "easeOut" },
      }
    },
    exit: {
      opacity: 0,
      scale: 0.995,
      transition: {
        opacity: { duration: 0.3, ease: "easeIn" },
        scale: { duration: 0.3, ease: "easeIn" },
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0b0b0e] text-white overflow-hidden p-4 sm:p-8 select-none font-sans">
      
      {/* Glow spots */}
      <div className="absolute top-[10%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-rose-gold/3 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-dusty-pink/3 blur-[140px] pointer-events-none" />

      {/* Presentation slide header */}
      <div className="flex justify-between items-center z-10 border-b border-rose-gold/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest text-[#d4af37] bg-rose-gold/15 px-3 py-1 rounded-full font-bold border border-rose-gold/20 shrink-0">
              Slide {currentSlide + 1} of {slides.length}
            </span>
            <span className="text-[10px] font-mono text-neutral-400 hidden md:inline-block">/</span>
            <span className="text-xs text-neutral-450 font-mono hidden md:inline-flex items-center gap-1">
              Timeline Step {timelineIndex + 1} of {timeline.length}
              <span className="text-rose-gold">({currentStep.label})</span>
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1 font-sans hidden sm:block">East Delta University Project Presentation</p>
        </div>
        
        {/* Play control mode */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-1.5 rounded-full border border-rose-gold/20 bg-[#121217] transition-all hover:border-rose-gold/50 flex items-center gap-2 text-xs font-mono font-bold cursor-pointer ${
              isPlaying ? "text-rose-gold bg-rose-gold/10" : "text-neutral-300"
            }`}
            title="Autoplay full presentation comfortably over 45 seconds"
          >
            {isPlaying ? (
              <>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-gold"></span>
                </span>
                <Pause className="w-3.5 h-3.5 animate-pulse" />
                <span>PLAYING (45s)</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
                <span>AUTO-PLAY PRESENTATION</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="p-2 border border-neutral-800 hover:border-rose-gold/40 bg-[#141418]/90 text-neutral-400 hover:text-white rounded-full transition-all cursor-pointer"
            title="Exit Presentation Mode (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main interactive slide stage */}
      <div className="flex-1 flex flex-col justify-center max-w-6xl w-full mx-auto z-10 py-4 md:py-6 my-auto relative overflow-visible px-4 md:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide} // Keys based on major slide index to allow inner components to smoothly animate step-by-step
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full flex flex-col justify-center relative select-none"
          >
            
            {/* Heading meta block */}
            <div className="mb-4 text-left select-text relative">
              <span className="text-xs uppercase font-mono tracking-[0.25em] text-rose-gold block mb-1 font-bold animate-pulse">
                {current.subtitle}
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                {current.title}
                
                {/* Micro step indicators under header so presenter has absolute clarity */}
                {currentSlide === 1 && (
                  <div className="flex gap-1.5 ml-4 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-850">
                    <div className={`w-2.5 h-2.5 rounded-full transition-all ${currentSubStep === 0 ? "bg-red-500 scale-125" : "bg-neutral-700"}`} />
                    <div className={`w-2.5 h-2.5 rounded-full transition-all ${currentSubStep === 1 ? "bg-red-500 scale-125" : "bg-neutral-700"}`} />
                    <div className={`w-2.5 h-2.5 rounded-full transition-all ${currentSubStep === 2 ? "bg-red-500 scale-125" : "bg-neutral-700"}`} />
                  </div>
                )}
                {currentSlide === 2 && (
                  <div className="flex gap-1.5 ml-4 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-850">
                    <div className={`w-2.5 h-2.5 rounded-full transition-all ${currentSubStep === 0 ? "bg-rose-gold scale-125" : "bg-neutral-700"}`} />
                    <div className={`w-2.5 h-2.5 rounded-full transition-all ${currentSubStep === 1 ? "bg-rose-gold scale-125" : "bg-neutral-700"}`} />
                  </div>
                )}
                {currentSlide === 3 && (
                  <div className="flex gap-1.5 ml-4 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-850">
                    <div className={`w-2.5 h-2.5 rounded-full transition-all ${currentSubStep === 0 ? "bg-emerald-400 scale-125" : "bg-neutral-700"}`} />
                    <div className={`w-2.5 h-2.5 rounded-full transition-all ${currentSubStep === 1 ? "bg-emerald-400 scale-125" : "bg-neutral-700"}`} />
                    <div className={`w-2.5 h-2.5 rounded-full transition-all ${currentSubStep === 2 ? "bg-emerald-400 scale-125" : "bg-neutral-700"}`} />
                    <div className={`w-2.5 h-2.5 rounded-full transition-all ${currentSubStep === 3 ? "bg-emerald-400 scale-125" : "bg-neutral-700"}`} />
                  </div>
                )}
              </h2>
              <div className="h-[2px] w-12 bg-rose-gold my-3" />
              <p className="text-xs sm:text-xs md:text-sm text-neutral-405 font-light max-w-3xl leading-relaxed">
                {current.tagline}
              </p>
            </div>

            {/* Dynamic visual stage */}
            <div className="w-full relative select-text">
              {current.content}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide footer controls */}
      <div className="z-10 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-rose-gold/10 pt-4 mt-auto">
        
        {/* Keyboard hints */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-500 order-2 sm:order-1 select-none">
          <span>Keyboard:</span>
          <span className="bg-charcoal-mid/60 px-2 py-0.5 rounded border border-neutral-805 font-semibold text-neutral-300">Space</span>
          <span>/</span>
          <span className="bg-charcoal-mid/60 px-2 py-0.5 rounded border border-neutral-805 font-semibold text-neutral-300">→</span>
          <span>Next</span>
          <span className="bg-charcoal-mid/60 px-2 py-0.5 rounded border border-neutral-805 font-semibold text-neutral-300">←</span>
          <span>Prev</span>
        </div>

        {/* 7 major slides dot navigation */}
        <div className="flex items-center gap-2.5 order-1 sm:order-2 select-none">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-rose-gold' : 'w-2 bg-neutral-850 hover:bg-neutral-600'
              }`}
              title={`Jump to Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Previous / Next buttons */}
        <div className="flex items-center gap-3 order-3 select-none">
          <button
            onClick={handlePrev}
            className="flex items-center justify-center w-10 sm:w-28 h-10 rounded-full border border-neutral-800 hover:border-rose-gold/45 bg-[#141418]/60 hover:bg-rose-gold/10 text-neutral-400 hover:text-white transition-all cursor-pointer text-xs font-semibold gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>
          
          <button
            onClick={handleNext}
            className="flex items-center justify-center w-10 sm:w-28 h-10 rounded-full bg-rose-gold hover:bg-dusty-pink text-neutral-900 font-extrabold transition-all cursor-pointer text-xs gap-1 shadow-lg shadow-rose-gold/10 hover:shadow-rose-gold/20"
          >
            <span className="hidden sm:inline font-bold">Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
