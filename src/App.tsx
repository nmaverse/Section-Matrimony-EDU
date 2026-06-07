import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import SwapForm from './components/SwapForm';
import SectionGrid, { getFacebookUrl } from './components/SectionGrid';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
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
    const handleSystemTheme = (e: MediaQueryListEvent) => {
      if (theme === 'auto') {
        const root = document.documentElement;
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

    if (theme === 'dark') {
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
      <div ref={activeSwapsRef} className="scroll-mt-20">
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
      {matchAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl p-6 md:p-8 rounded-3xl border border-rose-gold/40 bg-gradient-to-br from-charcoal-mid to-[#1e1416] text-center shadow-2xl overflow-hidden">
            
            {/* Visual background sparkles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-gold/15 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-rose-gold/10 rounded-full blur-xl" />

            <button
              onClick={() => setMatchAlert(null)}
              className="absolute top-4 right-4 p-2 rounded-full border border-rose-gold/10 hover:border-rose-gold/30 hover:bg-rose-gold/5 text-neutral-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 rounded-full border border-rose-gold bg-rose-gold/10 text-rose-gold flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>

            <span className="text-[10px] uppercase font-bold text-rose-gold bg-rose-gold/10 border border-rose-gold/30 px-3 py-1 rounded-full tracking-widest">
              Instant Perfect Match Found!
            </span>

            <h3 className="font-display text-3xl md:text-4xl font-semibold text-white mt-4 mb-2">
              It's a Section match!
            </h3>
            
            <p className="text-neutral-400 font-light text-xs md:text-sm max-w-md mx-auto leading-relaxed mb-8">
              A student is currently looking for the exact opposite trade! You are in <span className="text-white font-medium">{matchAlert.yourReq.currentSection}</span> wanting <span className="text-rose-gold font-medium">{matchAlert.yourReq.desiredSection}</span>, and they are in <span className="text-rose-gold font-medium">{matchAlert.matchedReq.currentSection}</span> wanting <span className="text-white font-semibold">{matchAlert.matchedReq.desiredSection}</span>.
            </p>

            {/* Partner Details Block */}
            <div className="p-5 rounded-2xl border border-rose-gold/10 bg-charcoal-dark/90 text-left mb-8">
              <span className="text-[10px] text-neutral-500 uppercase font-mono tracking-wider">Your Matching Partner</span>
              <h4 className="text-lg font-bold text-neutral-100 mt-1">{matchAlert.matchedReq.name}</h4>
              <p className="text-xs text-neutral-400 font-mono">ID: {matchAlert.matchedReq.studentId}</p>
              <p className="text-xs text-neutral-500 font-mono mt-0.5">{matchAlert.matchedReq.email}</p>
              
              <div className={`mt-4 pt-4 border-t border-rose-gold/5 ${matchAlert.matchedReq.facebook ? 'grid grid-cols-2 gap-4' : 'block'}`}>
                <a
                  href={`https://wa.me/${matchAlert.matchedReq.whatsapp.replace(/\+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-[#25d366]/10 text-[#25d366] text-xs font-semibold hover:bg-[#25d366]/20 border border-[#25d366]/20 transition-all cursor-pointer w-full"
                >
                  <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
                </a>
                {matchAlert.matchedReq.facebook && (
                  <a
                    href={getFacebookUrl(matchAlert.matchedReq.facebook)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-[#1877f2]/10 text-[#1877f2] text-xs font-semibold hover:bg-[#1877f2]/20 border border-[#1877f2]/20 transition-all cursor-pointer w-full"
                  >
                    <Facebook className="w-4 h-4" /> Facebook Profile
                  </a>
                )}
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <button
                onClick={() => setMatchAlert(null)}
                className="w-full sm:w-auto h-11 px-6 rounded-full bg-rose-gold hover:bg-dusty-pink text-white text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
              >
                Close and Continue
              </button>
              <button
                onClick={() => {
                  setMatchAlert(null);
                  scrollRef(activeSwapsRef);
                }}
                className="w-full sm:w-auto h-11 px-6 rounded-full border border-rose-gold/30 hover:bg-rose-gold/5 text-rose-gold text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
              >
                View in Directory
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
