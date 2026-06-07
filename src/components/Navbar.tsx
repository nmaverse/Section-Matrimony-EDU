import React, { useState } from 'react';
import { ArrowLeftRight, Menu, X, Sparkles, Sun, Moon, Monitor, Lock, Unlock } from 'lucide-react';

interface NavbarProps {
  onSubmitRequestClick: () => void;
  onHowItWorksClick: () => void;
  onActiveSwapsClick: () => void;
  onFaqClick: () => void;
  theme: 'auto' | 'light' | 'dark';
  setTheme: (t: 'auto' | 'light' | 'dark') => void;
  isAdminUnlocked: boolean;
  onAdminLoginClick: () => void;
}

export default function Navbar({
  onSubmitRequestClick,
  onHowItWorksClick,
  onActiveSwapsClick,
  onFaqClick,
  theme,
  setTheme,
  isAdminUnlocked,
  onAdminLoginClick
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (scrollFn: () => void) => {
    scrollFn();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-rose-gold/10 bg-charcoal-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-rose-gold/10 border border-rose-gold/30 text-rose-gold overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-tr from-rose-gold/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ArrowLeftRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-500 group-hover:rotate-180" />
            </div>
            
            <div className="flex flex-col">
              <span className="font-display text-lg sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white group-hover:text-rose-gold transition-colors duration-300 flex items-center gap-1">
                SECTION <span className="text-rose-gold">MATRIMONY</span>
              </span>
              <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-rose-gold/60 font-medium">
                East Delta University
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button
              onClick={() => handleLinkClick(onHowItWorksClick)}
              className="text-sm font-medium tracking-wide text-neutral-600 dark:text-neutral-300 hover:text-rose-gold transition-colors duration-200 cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => handleLinkClick(onActiveSwapsClick)}
              className="text-sm font-medium tracking-wide text-neutral-600 dark:text-neutral-300 hover:text-rose-gold transition-colors duration-200 cursor-pointer"
            >
              Active Directory
            </button>
            <button
              onClick={() => handleLinkClick(onFaqClick)}
              className="text-sm font-medium tracking-wide text-neutral-600 dark:text-neutral-300 hover:text-rose-gold transition-colors duration-200 cursor-pointer"
            >
              FAQ
            </button>
            
            {/* Admin Login Link */}
            <button
              onClick={() => {
                setIsOpen(false);
                onAdminLoginClick();
              }}
              className="text-sm font-medium tracking-wide text-neutral-600 dark:text-neutral-300 hover:text-rose-gold transition-colors duration-200 cursor-pointer flex items-center gap-1.5"
            >
              {isAdminUnlocked ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Admin Panel</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Admin Login</span>
                </>
              )}
            </button>

            {/* Custom Segmented Dark/Light/Auto Theme Switcher */}
            <div className="flex items-center bg-charcoal-mid/90 border border-rose-gold/20 p-1 rounded-full text-neutral-500">
              <button
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  theme === 'light' ? 'bg-rose-gold text-white shadow-sm' : 'hover:text-rose-gold'
                }`}
                title="Force Light Mode"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  theme === 'dark' ? 'bg-rose-gold text-white shadow-sm' : 'hover:text-rose-gold'
                }`}
                title="Force Dark Mode"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTheme('auto')}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  theme === 'auto' ? 'bg-rose-gold text-white shadow-sm' : 'hover:text-rose-gold'
                }`}
                title="System Auto Preference"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <button
              onClick={() => handleLinkClick(onSubmitRequestClick)}
              className="inline-flex items-center gap-2 px-5 h-11 rounded-full bg-rose-gold text-white text-sm font-medium tracking-wider hover:bg-dusty-pink hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md shadow-rose-gold/10 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Find My Match
            </button>
          </div>

          {/* Mobile Hamburguer Icon & Theme Option */}
          <div className="flex items-center gap-2.5 md:hidden">
            {/* Quick Toggle for Mobile */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'auto' : 'dark')}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-rose-gold/20 bg-charcoal-mid/60 text-rose-gold cursor-pointer"
              title={`Switch theme (Current: ${theme})`}
            >
              {theme === 'light' ? (
                <Sun className="w-4 h-4" />
              ) : theme === 'dark' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Monitor className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-neutral-800 dark:text-neutral-200 hover:text-rose-gold focus:outline-none transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="w-6 h-6 text-rose-gold" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden border-b border-rose-gold/10 bg-charcoal-dark/95 backdrop-blur-xl animate-fade-in text-neutral-900 dark:text-white">
          <div className="px-4 pt-2 pb-6 space-y-4 sm:px-3 flex flex-col">
            <button
              onClick={() => handleLinkClick(onHowItWorksClick)}
              className="px-3 py-2 rounded-md text-left text-base font-medium text-neutral-700 dark:text-gray-300 hover:text-rose-gold hover:bg-charcoal-light transition-all cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => handleLinkClick(onActiveSwapsClick)}
              className="px-3 py-2 rounded-md text-left text-base font-medium text-neutral-700 dark:text-gray-300 hover:text-rose-gold hover:bg-charcoal-light transition-all cursor-pointer"
            >
              Active Directory
            </button>
            <button
              onClick={() => handleLinkClick(onFaqClick)}
              className="px-3 py-2 rounded-md text-left text-base font-medium text-neutral-700 dark:text-gray-300 hover:text-rose-gold hover:bg-charcoal-light transition-all cursor-pointer"
            >
              FAQ
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                onAdminLoginClick();
              }}
              className="px-3 py-2 rounded-md text-left text-base font-medium text-neutral-700 dark:text-gray-300 hover:text-rose-gold hover:bg-charcoal-light transition-all cursor-pointer flex items-center gap-2"
            >
              {isAdminUnlocked ? (
                <>
                  <Unlock className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Admin Panel (Unlocked)</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-neutral-500" />
                  <span>Admin Panel Login</span>
                </>
              )}
            </button>

            {/* Mobile Theme selector display row */}
            <div className="px-3 py-2 flex items-center justify-between border-t border-rose-gold/10 pt-4">
              <span className="text-xs text-neutral-500 font-mono tracking-wider">Appearance</span>
              <div className="flex bg-charcoal-mid border border-rose-gold/20 p-0.5 rounded-full text-neutral-500">
                <button
                  onClick={() => setTheme('light')}
                  className={`px-3 py-1 text-xs rounded-full cursor-pointer transition-all ${
                    theme === 'light' ? 'bg-rose-gold text-white' : 'hover:text-rose-gold'
                  }`}
                >
                  Light
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`px-3 py-1 text-xs rounded-full cursor-pointer transition-all ${
                    theme === 'dark' ? 'bg-rose-gold text-white' : 'hover:text-rose-gold'
                  }`}
                >
                  Dark
                </button>
                <button
                  onClick={() => setTheme('auto')}
                  className={`px-3 py-1 text-xs rounded-full cursor-pointer transition-all ${
                    theme === 'auto' ? 'bg-rose-gold text-white' : 'hover:text-rose-gold'
                  }`}
                >
                  Auto
                </button>
              </div>
            </div>
            
            <button
              onClick={() => handleLinkClick(onSubmitRequestClick)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-rose-gold text-white text-base font-medium tracking-wider hover:bg-dusty-pink transition-all duration-300 shadow-md shadow-rose-gold/10 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Find My Match
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

