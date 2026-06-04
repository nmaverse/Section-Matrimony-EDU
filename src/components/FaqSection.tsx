import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../types';

interface FaqSectionProps {
  faqItems: FAQItem[];
}

export default function FaqSection({ faqItems }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default open the first one

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="relative py-24 bg-[#0a0a0c] border-t border-rose-gold/10 overflow-hidden">
      
      {/* Glow Spots */}
      <div className="glow-spot w-[35vw] h-[35vw] top-[40%] left-[-10vw] bg-rose-gold/8" />
      <div className="glow-spot w-[35vw] h-[35vw] bottom-[-5vw] right-[-5vw] bg-dusty-pink/8" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-gold block mb-3">
            Inquiries answered
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <div className="h-[2px] w-12 bg-rose-gold mx-auto mb-4" />
          <p className="text-sm md:text-base text-neutral-400 font-light">
            Everything you need to verify before jumping into section-trade negotiations with individual students.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={`faq-${idx}`}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-rose-gold/30 bg-charcoal-mid'
                    : 'border-rose-gold/10 bg-[#121216]/40 hover:border-rose-gold/20'
                }`}
              >
                
                {/* Trigger Button */}
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                >
                  <div className="flex items-center gap-4 pr-4">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${isOpen ? 'text-rose-gold' : 'text-neutral-500 group-hover:text-neutral-300'}`} />
                    <span className="font-display text-base md:text-lg font-semibold text-white group-hover:text-rose-gold/90 transition-colors">
                      {item.question}
                    </span>
                  </div>

                  <div className={`p-1.5 rounded-full border shrink-0 transition-all ${isOpen ? 'border-rose-gold text-rose-gold bg-rose-gold/5' : 'border-neutral-800 text-neutral-500'}`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Dropdown Content */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-72 border-t border-rose-gold/10' : 'max-h-0'
                  } overflow-hidden`}
                >
                  <div className="p-6 text-sm text-neutral-400 leading-relaxed font-light bg-[#0c0c0e]/40">
                    <p>{item.answer}</p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
