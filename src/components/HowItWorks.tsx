import React from 'react';
import { Send, Search, Bell, Sparkles } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Submit Request',
      description: 'Fill out the matchmaking card with your name, batch ID, current section (01-10), and desired section.',
      icon: Send,
    },
    {
      number: '02',
      title: 'System Searches',
      description: 'Our index registers your request and instantly searches for direct, reciprocal partners across the department.',
      icon: Search,
    },
    {
      number: '03',
      title: 'Get Notified',
      description: 'Find active matches dynamically listed on the section grid, filtered by current or desired status.',
      icon: Bell,
    },
    {
      number: '04',
      title: 'Complete the Swap',
      description: 'Connect directly via the provided WhatsApp or Facebook profile to coordinate and lock in your new section.',
      icon: Sparkles,
    }
  ];

  return (
    <section className="relative py-24 border-y border-rose-gold/10 bg-charcoal-mid/30 overflow-hidden">
      
      {/* Decorative Blur Spot */}
      <div className="glow-spot w-[35vw] h-[35vw] top-[30%] left-[35%] bg-rose-gold/8" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-gold block mb-3">
            Simple Verification Process
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4">
            How It Works
          </h2>
          <div className="h-[2px] w-12 bg-rose-gold mx-auto mb-4" />
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-light max-w-2xl mx-auto">
            Find an opposite match in four straightforward steps. No tedious group chats or manual tracking of dozens of student threads.
          </p>
        </div>

        {/* 4 Steps Timeline / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Connecting line vector hidden on smaller screens */}
          <div className="hidden lg:block absolute top-[2.25rem] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-rose-gold/10 via-rose-gold/30 to-rose-gold/10 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="step-card group relative flex flex-col items-center md:items-start z-10"
              >
                
                {/* Step badge & Icon Header */}
                <div className="flex items-center justify-between w-full mb-6">
                  <div className="w-12 h-12 rounded-full border border-rose-gold/30 bg-rose-gold/5 text-rose-gold flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-display text-3xl font-bold text-rose-gold">
                    {step.number}
                  </span>
                </div>

                {/* Text Group */}
                <h3 className="font-display text-xl font-semibold text-neutral-900 dark:text-white mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed text-center md:text-left font-light">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
