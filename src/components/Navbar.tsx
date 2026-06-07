import React, { useState } from 'react';
import { ArrowLeftRight, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onSubmitRequestClick: () => void;
  onHowItWorksClick: () => void;
  onActiveSwapsClick: () => void;
  onFaqClick: () => void;
}

export default function Navbar({
  onSubmitRequestClick,
  onHowItWorksClick,
  onActiveSwapsClick,
  onFaqClick
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (scrollFn: () => void) => {
    scrollFn();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-rose-gold/10 bg-[#0c0c0e]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-rose-gold/10 border border-rose-gold/30 text-rose-gold overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-tr from-rose-gold/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <ArrowLeftRight className="w-5 h-5 transition-transform duration-500 group-hover:rotate-180" />
            </div>
            
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-tight text-white group-hover:text-rose-gold transition-colors duration-300 flex items-center gap-1.5">
                SECTION <span className="text-rose-gold">MATRIMONY</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-rose-gold/60 font-medium">
                East Delta University
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleLinkClick(onHowItWorksClick)}
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-rose-gold transition-colors duration-200 cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => handleLinkClick(onActiveSwapsClick)}
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-rose-gold transition-colors duration-200 cursor-pointer"
            >
              Active Directory
            </button>
            <button
              onClick={() => handleLinkClick(onFaqClick)}
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-rose-gold transition-colors duration-200 cursor-pointer"
            >
              FAQ
            </button>
            
            <button
              onClick={() => handleLinkClick(onSubmitRequestClick)}
              className="inline-flex items-center gap-2 px-5 h-11 rounded-full bg-rose-gold text-white text-sm font-medium tracking-wider hover:bg-dusty-pink hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md shadow-rose-gold/10 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Find My Match
            </button>
          </div>

          {/* Mobile Hamburguer Icon */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-charcoal-light focus:outline-none transition-colors duration-200"
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
        <div className="md:hidden border-b border-rose-gold/10 bg-[#0c0c0e]/95 backdrop-blur-xl animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-4 sm:px-3 flex flex-col">
            <button
              onClick={() => handleLinkClick(onHowItWorksClick)}
              className="px-3 py-2 rounded-md text-left text-base font-medium text-gray-300 hover:text-rose-gold hover:bg-charcoal-light transition-all cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => handleLinkClick(onActiveSwapsClick)}
              className="px-3 py-2 rounded-md text-left text-base font-medium text-gray-300 hover:text-rose-gold hover:bg-charcoal-light transition-all cursor-pointer"
            >
              Active Directory
            </button>
            <button
              onClick={() => handleLinkClick(onFaqClick)}
              className="px-3 py-2 rounded-md text-left text-base font-medium text-gray-300 hover:text-rose-gold hover:bg-charcoal-light transition-all cursor-pointer"
            >
              FAQ
            </button>
            
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
