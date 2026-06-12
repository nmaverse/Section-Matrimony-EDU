import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import SwapForm from './components/SwapForm';
import SectionGrid, { getFacebookUrl } from './components/SectionGrid';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import PresentationSlides from './components/PresentationSlides';
import { INITIAL_SWAP_REQUESTS, INITIAL_FAQ } from './data';
import { SwapRequest } from './types';
import { ArrowLeftRight, Sparkles, MessageSquare, Facebook, Check, X, Lock, Unlock } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from './firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, writeBatch, getDocs } from 'firebase/firestore';

const LOCAL_STORAGE_KEY = 'edu_section_matrimony_requests';

export default function App() {
  const [requests, setRequests] = useState<SwapRequest[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved requests, defaulting to preseeded.', e);
      }
    }
    return INITIAL_SWAP_REQUESTS;
  });

  // Dynamic appearance selection preset: 'auto' | 'light' | 'dark'
  const [theme, setTheme] = useState<'auto' | 'light' | 'dark'>(() => {
    return (localStorage.getItem('edu_section_matrimony_theme') as 'auto' | 'light' | 'dark') || 'dark';
  });

  // State to manage slideshow presentation visibility
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);

  // Raised Administrative level authentication state
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [adminError, setAdminError] = useState(false);

  // Real-time synchronization layer with Cloud Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'requests'), async (snapshot) => {
      const docsData: SwapRequest[] = [];
      snapshot.forEach((doc) => {
        docsData.push(doc.data() as SwapRequest);
      });
      // Sort newest first
      docsData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setRequests(docsData);
      
      // Keep a local cached backup in localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(docsData));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'requests');
    });

    return () => unsub();
  }, []);

  // System preferred theme listeners and DOM class modifier layer
  useEffect(() => {
    // Detect if inside Facebook/Instagram/Messenger WebView wrapper
    const isFBOrInsta = /FBAN|FBAV|Instagram|Messenger/i.test(navigator.userAgent);

    const handleSystemTheme = (e: MediaQueryListEvent) => {
      const root = document.documentElement;
      if (isFBOrInsta) {
        root.classList.add('dark');
        root.classList.remove('light');
        return;
      }
      if (theme === 'auto') {
        if (e.matches) {
          root.classList.add('dark');
          root.classList.remove('light');
        } else {
          root.classList.add('light');
          root.classList.remove('dark');
        }
      }
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const root = document.documentElement;

    if (isFBOrInsta) {
      // Force dark mode inside Facebook / Instagram in-app browsers due to forced container darkening
      root.classList.add('dark');
      root.classList.remove('light');
    } else if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      // Auto (sync to device status)
      if (mediaQuery.matches) {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
    }

    mediaQuery.addEventListener('change', handleSystemTheme);
    localStorage.setItem('edu_section_matrimony_theme', theme);

    return () => mediaQuery.removeEventListener('change', handleSystemTheme);
  }, [theme]);

  // Modal alert state for direct match found on submit!
  const [matchAlert, setMatchAlert] = useState<{
    yourReq: SwapRequest;
    matchedReq: SwapRequest;
  } | null>(null);

  // Section scroll references
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const activeSwapsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const adminPanelRef = useRef<HTMLDivElement>(null);

  const scrollRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAdminModalLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasscode === 'admin@sm0605') {
      setIsAdminUnlocked(true);
      setIsAdminLoginOpen(false);
      setAdminError(false);
      setAdminPasscode('');
      // Scroll smoothly straight to the admin section
      setTimeout(() => {
        scrollRef(adminPanelRef);
      }, 300);
    } else {
      setAdminError(true);
      setTimeout(() => setAdminError(false), 2000);
    }
  };

  // Triggered when a new Request is validated and submitted in the Form
  const handleAddRequest = async (newFields: Omit<SwapRequest, 'id' | 'createdAt' | 'status'>) => {
    const docId = `req_${Date.now()}`;
    const createdItem: SwapRequest = {
      ...newFields,
      id: docId,
      createdAt: new Date().toISOString(),
      status: 'active',
    };

    // Save directly to Firestore
    try {
      await setDoc(doc(db, 'requests', docId), createdItem);

      // Check if we immediately have a reciprocal match in the active database!
      const partnerMatch = requests.find(
        (r) =>
          r.status === 'active' &&
          r.currentSection === createdItem.desiredSection &&
          r.desiredSection === createdItem.currentSection
      );

      // If an instant partner match is found, trigger the match alert modal!
      if (partnerMatch) {
        setMatchAlert({
          yourReq: createdItem,
          matchedReq: partnerMatch,
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `requests/${docId}`);
    }
  };

  // Admin Control handlers
  const handleDeleteRequest = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'requests', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `requests/${id}`);
    }
  };

  const handleClearAll = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'requests'));
      const batch = writeBatch(db);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'requests_bulk_clear');
    }
  };

  const handleResetDefaults = async () => {
    try {
      // Clear first
      const querySnapshot = await getDocs(collection(db, 'requests'));
      const batch = writeBatch(db);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      // Add defaults
      INITIAL_SWAP_REQUESTS.forEach((req) => {
        const docRef = doc(db, 'requests', req.id);
        batch.set(docRef, req);
      });
      await batch.commit();
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'requests_bulk_reset');
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-dark text-neutral-900 dark:text-white flex flex-col font-sans selection:bg-rose-gold/30 selection:text-white transition-colors duration-300">
      
      {/* Decorative full-body glow highlights */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-rose-gold/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-[20%] left-0 w-[35vw] h-[35vw] bg-dusty-pink/3 rounded-full blur-[100px] pointer-events-none" />

      {/* Navigation Layer */}
      <Navbar
        onSubmitRequestClick={() => scrollRef(formRef)}
        onHowItWorksClick={() => scrollRef(howItWorksRef)}
        onActiveSwapsClick={() => scrollRef(activeSwapsRef)}
        onFaqClick={() => scrollRef(faqRef)}
        theme={theme}
        setTheme={setTheme}
        isAdminUnlocked={isAdminUnlocked}
        onAdminLoginClick={() => setIsAdminLoginOpen(true)}
        onPresentationClick={() => setIsPresentationOpen(true)}
      />

      {/* Hero Header Module */}
      <Hero
        onFindMatchClick={() => scrollRef(formRef)}
        activeRequestsCount={requests.filter(r => r.status === 'active').length}
      />

      {/* How It Works Guide */}
      <div ref={howItWorksRef} className="scroll-mt-20">
        <HowItWorks />
      </div>

      {/* Reactive Registration Form */}
      <div ref={formRef} className="scroll-mt-20">
        <SwapForm onSubmitRequest={handleAddRequest} />
      </div>

      {/* Interactive 10-Section Directory */}
      <div id="directory-section" ref={activeSwapsRef} className="scroll-mt-20">
        <SectionGrid requests={requests} />
      </div>

      {/* FAQ Accordions Section */}
      <div ref={faqRef} className="scroll-mt-20">
        <FaqSection faqItems={INITIAL_FAQ} />
      </div>

      {/* Admin Panel Control Workspace */}
      <div ref={adminPanelRef} className="scroll-mt-20">
        <AdminPanel
          requests={requests}
          onDeleteRequest={handleDeleteRequest}
          onClearAll={handleClearAll}
          onResetDefaults={handleResetDefaults}
          isAdminUnlocked={isAdminUnlocked}
          setIsAdminUnlocked={setIsAdminUnlocked}
        />
      </div>


      {/* Footer Branding Navigation */}
      <Footer
        onSubmitRequestClick={() => scrollRef(formRef)}
        onHowItWorksClick={() => scrollRef(howItWorksRef)}
        onActiveSwapsClick={() => scrollRef(activeSwapsRef)}
        onFaqClick={() => scrollRef(faqRef)}
      />

      {/* Dynamic Admin Login Dialog Modal */}
      {isAdminLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md p-6 md:p-8 rounded-3xl border border-rose-gold/40 bg-gradient-to-br from-[#141418] to-[#1e1416] text-center shadow-2xl">
            
            <button
              onClick={() => {
                setIsAdminLoginOpen(false);
                setAdminPasscode('');
                setAdminError(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-full border border-rose-gold/10 hover:border-rose-gold/30 hover:bg-rose-gold/5 text-neutral-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-neutral-900 border border-rose-gold/25 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-5 h-5 text-rose-gold" />
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Administrator Login
            </h3>
            <p className="text-xs text-neutral-300 font-light mb-6">
              Please enter the administrator credentials key to unlock premium registry moderation tools instantly.
            </p>

            <form onSubmit={handleAdminModalLoginSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-neutral-400 mb-1.5 font-mono">
                  Access License Key / Passcode
                </label>
                <input
                  type="password"
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  placeholder="Enter passcode..."
                  className={`form-input text-center placeholder-neutral-600 ${
                    adminError ? 'border-red-500 ring-1 ring-red-500/20' : ''
                  }`}
                  autoFocus
                />
                {adminError && (
                  <p className="text-[11px] text-red-400 mt-1.5 font-light text-center font-mono">
                    Incorrect administrator passcode! Try again.
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-11 rounded-full bg-rose-gold hover:bg-dusty-pink text-white text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-md shadow-rose-gold/20"
                >
                  Authorize and Open Panel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Instant Reciprocal Matrimony MATCH ALERT POPUP MODAL */}
      <AnimatePresence>
        {matchAlert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
            
            {/* Overlay blur background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMatchAlert(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Match Floating Particles */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-55">
              {Array.from({ length: 30 }).map((_, i) => {
                const size = Math.random() * 8 + 6;
                const left = Math.random() * 100;
                const delay = Math.random() * 1;
                const duration = Math.random() * 2 + 1.8;
                return (
                  <motion.div
                    key={`m-conf-${i}`}
                    initial={{ y: -20, x: `${left}%`, opacity: 1, rotate: Math.random() * 360 }}
                    animate={{ 
                      y: '110vh', 
                      rotate: Math.random() * 720 - 360,
                      opacity: [1, 1, 0]
                    }}
                    transition={{
                      duration: duration,
                      delay: delay,
                      ease: 'linear',
                      repeat: Infinity
                    }}
                    className={`absolute top-0 pointer-events-none ${i % 2 === 0 ? 'bg-[#b76e79]' : 'bg-[#e0b0b0]'} ${Math.random() > 0.5 ? 'rounded-full' : 'rounded-sm'}`}
                    style={{
                      width: size,
                      height: Math.random() > 0.5 ? size : size * 1.5,
                      zIndex: 40,
                    }}
                  />
                );
              })}
            </div>

            {/* Interactive Spring Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                transition: { type: "spring", stiffness: 300, damping: 25 }
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.95, 
                y: 15,
                transition: { duration: 0.2 }
              }}
              className="relative w-full max-w-xl p-6 md:p-8 rounded-3xl border border-rose-gold/40 bg-gradient-to-br from-[#1c1214] via-[#121216] to-[#121217] text-center shadow-2xl z-50 overflow-hidden"
            >
              
              {/* Visual background sparkles & glows */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-gold/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-rose-gold/10 rounded-full blur-xl pointer-events-none" />

              <button
                onClick={() => setMatchAlert(null)}
                className="absolute top-4 right-4 p-2 rounded-full border border-neutral-800 hover:border-rose-gold/30 hover:bg-rose-gold/5 text-neutral-400 hover:text-white transition-all cursor-pointer z-50 animate-fade-in"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Pulsating Match Icon */}
              <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <motion.div 
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full bg-rose-gold/10 border border-rose-gold/20"
                />
                <motion.div 
                  animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-2 rounded-full bg-rose-gold/15 border border-rose-gold/30"
                />
                <div className="relative w-14 h-14 rounded-full bg-[#271518] border border-rose-gold/50 flex items-center justify-center text-rose-gold shadow-lg shadow-rose-gold/20">
                  <Sparkles className="w-7 h-7" />
                </div>
              </div>

              <span className="text-[10px] uppercase font-bold text-rose-gold bg-rose-gold/10 border border-rose-gold/30 px-3.5 py-1 rounded-full tracking-widest inline-block mb-1">
                Instant Perfect Match Found!
              </span>

              <h3 className="font-display text-3xl md:text-4xl font-semibold text-white mt-4 mb-2">
                It's a Section Match!
              </h3>
              
              <p className="text-neutral-400 font-light text-xs md:text-sm max-w-md mx-auto leading-relaxed mb-6">
                Another student is looking for the exact opposite trade! You are in <span className="text-white font-medium">{matchAlert.yourReq.currentSection}</span> wanting <span className="text-rose-gold font-medium">{matchAlert.yourReq.desiredSection}</span>, and they are in <span className="text-rose-gold font-medium">{matchAlert.matchedReq.currentSection}</span> wanting <span className="text-white font-semibold">{matchAlert.matchedReq.desiredSection}</span>.
              </p>

              {/* Match Connection Flow Diagram */}
              <div className="flex items-center justify-center gap-4 mb-6 bg-neutral-950/40 p-3.5 rounded-2xl border border-rose-gold/5 max-w-md mx-auto">
                <div className="text-center w-5/12">
                  <span className="text-[9px] text-neutral-500 uppercase font-mono">Your Request</span>
                  <div className="flex flex-col items-center mt-1">
                    <span className="text-xs text-neutral-300 font-medium truncate max-w-full">{matchAlert.yourReq.name}</span>
                    <span className="text-sm font-bold text-neutral-100 font-mono mt-0.5">{matchAlert.yourReq.currentSection}</span>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center border border-rose-gold/20 text-rose-gold shrink-0">
                  <ArrowLeftRight className="w-4 h-4 animate-pulse" />
                </div>

                <div className="text-center w-5/12">
                  <span className="text-[9px] text-rose-gold/80 uppercase font-mono font-medium">Their Request</span>
                  <div className="flex flex-col items-center mt-1">
                    <span className="text-xs text-[#eed6d9] font-medium truncate max-w-full">{matchAlert.matchedReq.name}</span>
                    <span className="text-sm font-bold text-rose-gold font-mono mt-0.5">{matchAlert.matchedReq.currentSection}</span>
                  </div>
                </div>
              </div>

              {/* Partner Details Block */}
              <div className="p-5 rounded-2xl border border-rose-gold/15 bg-charcoal-dark/95 text-left mb-6 max-w-md mx-auto relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-rose-gold/2 rounded-full blur-xl pointer-events-none" />
                
                <span className="text-[10px] text-neutral-500 uppercase font-mono tracking-wider block mb-1">Matching Partner Information</span>
                <h4 className="text-base font-bold text-neutral-100">{matchAlert.matchedReq.name}</h4>
                <p className="text-xs text-neutral-400 font-mono">ID: {matchAlert.matchedReq.studentId} • {matchAlert.matchedReq.department} (Sem {matchAlert.matchedReq.semester})</p>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">{matchAlert.matchedReq.email}</p>
                
                <div className={`mt-4 pt-4 border-t border-rose-gold/10 ${matchAlert.matchedReq.facebook ? 'grid grid-cols-2 gap-3.5' : 'block'}`}>
                  <a
                    href={`https://wa.me/${matchAlert.matchedReq.whatsapp.replace(/\+/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-[#25d366]/10 text-[#25d366] text-xs font-semibold hover:bg-[#25d366]/20 border border-[#25d366]/20 transition-all cursor-pointer w-full text-center"
                  >
                    <MessageSquare className="w-4 h-4 shrink-0" /> WhatsApp Chat
                  </a>
                  {matchAlert.matchedReq.facebook && (
                    <a
                      href={getFacebookUrl(matchAlert.matchedReq.facebook)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-[#1877f2]/10 text-[#1877f2] text-xs font-semibold hover:bg-[#1877f2]/20 border border-[#1877f2]/20 transition-all cursor-pointer w-full text-center text-ellipsis overflow-hidden"
                    >
                      <Facebook className="w-4 h-4 shrink-0" /> Social Profile
                    </a>
                  )}
                </div>
              </div>

              {/* CTA action buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
                <button
                  onClick={() => setMatchAlert(null)}
                  className="w-full sm:w-auto h-11 px-7 rounded-full bg-rose-gold hover:bg-dusty-pink text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg shadow-rose-gold/10 cursor-pointer"
                >
                  Close and Continue
                </button>
                <button
                  onClick={() => {
                    setMatchAlert(null);
                    scrollRef(activeSwapsRef);
                  }}
                  className="w-full sm:w-auto h-11 px-7 rounded-full border border-rose-gold/30 hover:bg-rose-gold/5 text-rose-gold text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer"
                >
                  View in Directory
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modern Presentation Slides overlay module */}
      <PresentationSlides isOpen={isPresentationOpen} onClose={() => setIsPresentationOpen(false)} />

    </div>
  );
}
