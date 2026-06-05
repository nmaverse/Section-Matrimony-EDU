import React from 'react';
import { ArrowLeftRight, HelpCircle, Mail, Globe, MapPin, ExternalLink, Heart, Facebook } from 'lucide-react';

interface FooterProps {
  onHowItWorksClick: () => void;
  onActiveSwapsClick: () => void;
  onFaqClick: () => void;
  onSubmitRequestClick: () => void;
}

export default function Footer({
  onHowItWorksClick,
  onActiveSwapsClick,
  onFaqClick,
  onSubmitRequestClick,
}: FooterProps) {
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08080a] border-t border-rose-gold/15 pt-16 pb-12 overflow-hidden relative">
      
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-[10%] w-[35vw] h-[35vw] bg-rose-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12 pb-12 border-b border-rose-gold/10">
          
          {/* Brand Col */}
          <div className="md:col-span-1.5 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleScrollToTop}>
              <div className="w-9 h-9 rounded-full bg-rose-gold/10 border border-rose-gold/30 flex items-center justify-center text-rose-gold">
                <ArrowLeftRight className="w-4.5 h-4.5" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white">
                SECTION <span className="text-rose-gold">MATRIMONY</span>
              </span>
            </div>
            
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              The premier peer-to-peer schedule trade indexes for East Delta University Computer Science & Engineering department students. Save your study tracking and swap sections.
            </p>

            <div className="space-y-2 pt-2 text-xs text-neutral-500 font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-gold/70" />
                <span>East Delta University, Chattogram</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-rose-gold/70" />
                <a href="mailto:cse@eastdelta.edu.bd" className="hover:text-rose-gold transition-colors">
                  cse@eastdelta.edu.bd
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation Category */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-gold">
              Interactive Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onSubmitRequestClick}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Find My Match
                </button>
              </li>
              <li>
                <button
                  onClick={onActiveSwapsClick}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Section Grid Directory
                </button>
              </li>
              <li>
                <button
                  onClick={onHowItWorksClick}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Swap Process Guide
                </button>
              </li>
              <li>
                <button
                  onClick={onFaqClick}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Department Resources Col */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-gold">
              Resources & Portals
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-neutral-500" />
                <a
                  href="https://www.eastdelta.edu.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  EDU Portal <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-neutral-500" />
                <a
                  href="https://www.eastdelta.edu.bd/programs/cse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  CSE Department <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-neutral-500" />
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  EDU CSE Club <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Built By Col */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-gold">
              Built By
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li className="flex items-center gap-2">
                <Facebook className="w-3.5 h-3.5 text-neutral-500 hover:text-[#1877f2] transition-all" />
                <a
                  href="https://www.facebook.com/nosaibmahmodadil"
               
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  Nosaib Mahmod Adil <ExternalLink className="w-2.5 h-2.5 text-neutral-600" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal and Disclaimer */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-gold">
              Disclaimer
            </h4>
            <p className="text-[10px] text-neutral-500 font-light leading-relaxed">
              This system is is a peer-to-peer student directory designed to help locate opposite swap candidates. All official academic section enrollment transactions are to be authorized exclusively by the East Delta University Registrar or student portal index.
            </p>
          </div>

        </div>

        {/* Bottom Block */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 Section Matrimony — East Delta University CSE Department. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3 h-3 text-rose-gold fill-rose-gold" /> for EDU Students
          </p>
        </div>

      </div>
    </footer>
  );
}
