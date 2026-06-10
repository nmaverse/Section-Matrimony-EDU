import React from 'react';
import { ArrowLeftRight, Users, Sparkles, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onFindMatchClick: () => void;
  activeRequestsCount: number;
}

export default function Hero({ onFindMatchClick, activeRequestsCount }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      
      {/* Visual background lights for premium glow in dark-charcoal */}
      <div className="glow-spot w-[45vw] h-[45vw] top-[-5vw] left-[-5vw] bg-rose-gold/20" />
      <div className="glow-spot w-[35vw] h-[35vw] bottom-[10vw] right-[-5vw] bg-dusty-pink/15" />
      
      {/* Decorative vertical background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center flex flex-col items-center">
        
        {/* Subtle Brand Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-gold/20 bg-rose-gold/5 text-rose-gold text-xs font-semibold uppercase tracking-[0.2em] mb-8 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          East Delta University • All Departments
        </div>

        {/* Hero Headline (using elegant Cormorant font) */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-neutral-900 dark:text-white max-w-5xl leading-[1.05] mb-6 animate-fade-in">
          Find Your <span className="italic block md:inline font-semibold text-rose-gold text-transparent bg-clip-text bg-gradient-to-r from-rose-gold via-dusty-pink to-rose-gold">Perfect Swap</span>
        </h1>

        {/* Tagline using Jost */}
        <p className="font-sans text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl font-light mb-10 leading-relaxed">
          Finding a section swap is harder than finding the right person in life. <span className="text-rose-gold font-medium">We fixed that.</span>
        </p>

        {/* CTA Hero Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full max-w-xs mx-auto px-4">
          <button
            onClick={onFindMatchClick}
            className="w-full inline-flex items-center justify-center gap-3 px-8 h-14 rounded-full bg-rose-gold text-white font-medium tracking-wider text-base hover:bg-dusty-pink hover:scale-[1.03] hover:shadow-lg hover:shadow-rose-gold/20 active:scale-[0.98] transition-all duration-300 cursor-pointer shrink-0"
          >
            <ArrowLeftRight className="w-5 h-5" />
            Find My Match
          </button>
        </div>

        {/* Elegant Micro-Statistics Container */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 py-8 px-6 md:px-12 rounded-2xl border border-rose-gold/10 bg-charcoal-mid/60 backdrop-blur-sm max-w-3xl w-full">
          <div className="flex flex-col items-center">
            <span className="font-display text-4xl font-bold text-neutral-900 dark:text-white tracking-tight flex items-baseline gap-1">
              {activeRequestsCount}
              <span className="text-xl text-rose-gold font-sans font-normal">+</span>
            </span>
            <span className="text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400 mt-1 font-medium flex items-center gap-1.5 justify-center">
              <Users className="w-3.5 h-3.5 text-rose-gold/70" />
              Active Listings
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-display text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">
              10/10
            </span>
            <span className="text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400 mt-1 font-medium flex items-center gap-1.5 justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-gold/70" />
              Sections Open
            </span>
          </div>

          <div className="col-span-2 md:col-span-1 flex flex-col items-center">
            <span className="font-display text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">
              100%
            </span>
            <span className="text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400 mt-1 font-medium flex items-center gap-1.5 justify-center">
              <Sparkles className="w-3.5 h-3.5 text-rose-gold/70" />
              EDU Restrained
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
