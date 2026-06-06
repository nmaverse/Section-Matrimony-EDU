import React, { useState, useMemo } from 'react';
import { Search, ArrowRight, MessageSquare, Facebook, Filter, Sparkles, Check, RefreshCw, X, AlertCircle } from 'lucide-react';
import { SwapRequest } from '../types';

export const getFacebookUrl = (value: string | undefined): string => {
  if (!value) return '';
  const trimmed = value.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  if (trimmed.startsWith('facebook.com/') || trimmed.startsWith('www.facebook.com/')) {
    return 'https://' + trimmed;
  }
  return 'https://facebook.com/' + trimmed;
};

interface SectionGridProps {
  requests: SwapRequest[];
}

export default function SectionGrid({
  requests,
}: SectionGridProps) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [directionFilter, setDirectionFilter] = useState<'all' | 'outgoing' | 'incoming'>('all');

  const sectionsList = Array.from({ length: 10 }, (_, i) => {
    const num = i + 1;
    return `Section ${num < 10 ? '0' + num : num}`;
  });

  // Calculate stats for each section
  const sectionStats = useMemo(() => {
    return sectionsList.map((sectionName) => {
      const outgoingCount = requests.filter(r => r.currentSection === sectionName).length;
      const incomingCount = requests.filter(r => r.desiredSection === sectionName).length;
      return {
        sectionName,
        outgoingCount,
        incomingCount
      };
    });
  }, [requests]);

  // Find all reciprocal perfect matches!
  // A perfect match is where Student A is (Curr: X, Des: Y) and Student B is (Curr: Y, Des: X)
  const perfectMatches = useMemo(() => {
    const matches: Array<{ reqA: SwapRequest; reqB: SwapRequest }> = [];
    const processed = new Set<string>();

    for (let i = 0; i < requests.length; i++) {
      const reqA = requests[i];
      if (processed.has(reqA.id)) continue;

      for (let j = i + 1; j < requests.length; j++) {
        const reqB = requests[j];
        if (processed.has(reqB.id)) continue;

        if (
          reqA.currentSection === reqB.desiredSection &&
          reqA.desiredSection === reqB.currentSection
        ) {
          matches.push({ reqA, reqB });
          processed.add(reqA.id);
          processed.add(reqB.id);
          break; // break inner loop so we don't double match inside this pass
        }
      }
    }
    return matches;
  }, [requests]);

  // Filtering requests based on section click, query, and direction dropdown
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      // Section selection check
      if (selectedSection) {
        if (directionFilter === 'outgoing' && req.currentSection !== selectedSection) return false;
        if (directionFilter === 'incoming' && req.desiredSection !== selectedSection) return false;
        if (directionFilter === 'all' && req.currentSection !== selectedSection && req.desiredSection !== selectedSection) return false;
      }

      // Search query check (Name, Student ID, email, sections)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = req.name.toLowerCase().includes(query);
        const matchesID = req.studentId.includes(query);
        const matchesEmail = req.email.toLowerCase().includes(query);
        const matchesCurrent = req.currentSection.toLowerCase().includes(query);
        const matchesDesired = req.desiredSection.toLowerCase().includes(query);

        if (!matchesName && !matchesID && !matchesEmail && !matchesCurrent && !matchesDesired) {
          return false;
        }
      }

      return true;
    });
  }, [requests, selectedSection, searchQuery, directionFilter]);

  return (
    <section id="section-grid-section" className="relative py-24 bg-[#0c0c0e] overflow-hidden border-t border-rose-gold/10">
      
      <div className="glow-spot w-[35vw] h-[35vw] top-[10%] right-[10%] bg-rose-gold/10" />
      <div className="glow-spot w-[30vw] h-[30vw] bottom-[20%] left-[5%] bg-dusty-pink/8" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-gold block mb-3">
            Real-time Exchange Index
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">
            Browse Sections & Swaps
          </h2>
          <div className="h-[2px] w-12 bg-rose-gold mx-auto mb-4" />
          <p className="text-sm md:text-base text-neutral-400 font-light max-w-2xl mx-auto">
            Select a specific section card from the grid to examine outbound or inbound swap requests, or view direct matchmaking partners instantly.
          </p>
        </div>

        {/* 1. Reciprocal Matches Sparkle Bar - Always display if any exist! */}
        {perfectMatches.length > 0 && (
          <div className="mb-14 p-6 md:p-8 rounded-3xl border border-rose-gold/30 bg-gradient-to-r from-rose-gold/5 via-charcoal-mid to-[#161113] relative overflow-hidden shadow-xl">
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-gold/15 rounded-full blur-2xl" />
            
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-rose-gold animate-bounce" />
              <h3 className="font-display text-2xl font-semibold text-white">
                Perfect Reciprocal Matches Found ({perfectMatches.length})
              </h3>
              <span className="text-[10px] uppercase font-bold text-rose-gold bg-rose-gold/10 border border-rose-gold/30 px-2.5 py-0.5 rounded-full tracking-wider animate-pulse ml-2">
                Immediate Swap Available
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {perfectMatches.map(({ reqA, reqB }, idx) => (
                <div key={`match-${idx}`} className="p-5 rounded-2xl border border-white/5 bg-charcoal-dark/75 relative">
                  
                  {/* Perfect Match Header */}
                  <div className="flex justify-between items-center text-xs text-rose-gold mb-4 border-b border-rose-gold/10 pb-3">
                    <span className="font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Reciprocal Match #{idx + 1}
                    </span>
                    <span className="font-semibold px-2 py-0.5 rounded bg-rose-gold/10">
                      {reqA.currentSection} ⇆ {reqA.desiredSection}
                    </span>
                  </div>

                  {/* Dual columns representation */}
                  <div className="grid grid-cols-2 gap-4 divide-x divide-rose-gold/10">
                    
                    {/* Student A info */}
                    <div className="pr-2">
                      <h4 className="text-sm font-semibold text-neutral-100 truncate">{reqA.name}</h4>
                      <p className="text-[11px] text-neutral-500 font-mono mb-2">{reqA.studentId}</p>
                      <div className="flex gap-2">
                        <a
                          href={`https://wa.me/${reqA.whatsapp.replace(/\+/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-rose-gold/10 text-rose-gold hover:bg-rose-gold/20 transition-all"
                          title="WhatsApp chat"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                        {reqA.facebook && (
                          <a
                            href={getFacebookUrl(reqA.facebook)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-rose-gold/10 text-rose-gold hover:bg-rose-gold/20 transition-all font-light text-xs shrink-0 flex items-center gap-1"
                            title="Facebook Profile Link"
                          >
                            <Facebook className="w-3.5 h-3.5" /> Social
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Student B info */}
                    <div className="pl-4">
                      <h4 className="text-sm font-semibold text-neutral-100 truncate">{reqB.name}</h4>
                      <p className="text-[11px] text-neutral-500 font-mono mb-2">{reqB.studentId}</p>
                      <div className="flex gap-2">
                        <a
                          href={`https://wa.me/${reqB.whatsapp.replace(/\+/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-rose-gold/10 text-rose-gold hover:bg-rose-gold/20 transition-all"
                          title="WhatsApp chat"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                        {reqB.facebook && (
                          <a
                            href={getFacebookUrl(reqB.facebook)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-rose-gold/10 text-rose-gold hover:bg-rose-gold/20 transition-all font-light text-xs shrink-0 flex items-center gap-1"
                            title="Facebook Profile Link"
                          >
                            <Facebook className="w-3.5 h-3.5" /> Social
                          </a>
                        )}
                      </div>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Interactive Section Grid (Showing all 10 sections) */}
        <div className="mb-12">
          <h3 className="font-display text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <span>Select Section to View Filings</span>
            {selectedSection && (
              <button
                onClick={() => setSelectedSection(null)}
                className="text-xs font-semibold px-3 py-1 bg-rose-gold/10 text-rose-gold border border-rose-gold/25 rounded-full hover:bg-rose-gold/20 cursor-pointer flex items-center gap-1.5 transition-all"
              >
                Clear Selection <X className="w-3 h-3" />
              </button>
            )}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {sectionStats.map(({ sectionName, outgoingCount, incomingCount }) => {
              const isSelected = selectedSection === sectionName;
              return (
                <button
                  key={sectionName}
                  onClick={() => setSelectedSection(isSelected ? null : sectionName)}
                  className={`p-5 rounded-2xl text-left border transition-all duration-300 relative group cursor-pointer ${
                    isSelected
                      ? 'border-rose-gold bg-rose-gold/10 shadow-lg shadow-rose-gold/5 scale-[1.03]'
                      : 'border-rose-gold/15 bg-[#141418]/60 hover:bg-charcoal-light/95 hover:border-rose-gold/30'
                  }`}
                >
                  {/* Decorative corner indicator */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-rose-gold animate-ping" />
                  )}

                  <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono font-medium block mb-1">
                    EDU CSE
                  </span>
                  
                  <span className="font-display text-xl font-bold text-white block mb-4 group-hover:text-rose-gold transition-colors duration-200">
                    {sectionName}
                  </span>

                  {/* Outbound vs Inbound sub-stats */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-neutral-400">
                      <span>Outgoing:</span>
                      <span className={`font-mono font-semibold ${outgoingCount > 0 ? 'text-white' : 'text-neutral-600'}`}>
                        {outgoingCount}
                      </span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Incoming:</span>
                      <span className={`font-mono font-semibold ${incomingCount > 0 ? 'text-rose-gold' : 'text-neutral-600'}`}>
                        {incomingCount}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Filtering Toolbar & Results Directory */}
        <div className="p-6 md:p-8 rounded-3xl border border-rose-gold/10 bg-charcoal-mid/40 backdrop-blur-md">
          
          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-rose-gold/5">
            
            <div className="flex flex-wrap items-center gap-3">
              <Filter className="w-4 h-4 text-rose-gold" />
              <h4 className="font-display text-xl font-semibold text-white">
                {selectedSection ? `${selectedSection} Requests` : 'All CSE Requests'} ({filteredRequests.length})
              </h4>
            </div>

            {/* Combined Filter Controllers */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              
              {/* Query Search */}
              <div className="relative w-full sm:w-60">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search ID, Code, Name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-xl border border-neutral-800 bg-[#0c0c0e] text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-rose-gold/50 transition-all font-light"
                />
              </div>

              {/* Status/Direction Filters (Only applicable if a Section is selected) */}
              {selectedSection && (
                <div className="relative w-full sm:w-auto">
                  <select
                    value={directionFilter}
                    onChange={(e) => setDirectionFilter(e.target.value as any)}
                    className="w-full sm:w-40 h-10 px-3 pr-8 rounded-xl border border-neutral-800 bg-[#0c0c0e] text-white text-xs appearance-none focus:outline-none focus:border-rose-gold/50 cursor-pointer font-light"
                  >
                    <option value="all">Outgoing & Incoming</option>
                    <option value="outgoing">Outgoing only</option>
                    <option value="incoming">Incoming only</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-[10px]">
                    ▼
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Directory Listings */}
          {filteredRequests.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center">
              <AlertCircle className="w-10 h-10 text-neutral-600 mb-3" />
              <p className="text-sm text-neutral-400 font-light mb-2">No active swap listings match your filters.</p>
              <p className="text-xs text-neutral-500 font-light">Be the first to post a swap with Section {selectedSection || '01'}!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-5 rounded-2xl border border-rose-gold/10 bg-[#0c0c0e]/80 hover:border-rose-gold/20 transition-all duration-300 relative group"
                >
                  {/* Swap Visual Indicator */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">Current</span>
                      <span className="text-xs font-semibold text-neutral-300">{req.currentSection}</span>
                    </div>

                    <div className="flex items-center justify-center p-2 rounded-full bg-rose-gold/10 text-rose-gold border border-rose-gold/10 shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </div>

                    <div className="flex flex-col text-right">
                      <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">Desired</span>
                      <span className="text-xs font-semibold text-rose-gold">{req.desiredSection}</span>
                    </div>
                  </div>

                  {/* Student Basic Metadata */}
                  <div className="border-t border-rose-gold/5 pt-4 mb-4">
                    <span className="text-[10px] text-rose-gold bg-rose-gold/5 border border-rose-gold/20 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                      Verified CSE Student
                    </span>
                    <h5 className="text-base font-semibold text-white mt-2 truncate">{req.name}</h5>
                    <p className="text-xs text-neutral-400 font-light font-mono mt-0.5">{req.studentId}</p>
                    <p className="text-[11px] text-neutral-500 font-mono mt-0.5 max-w-full truncate">{req.email}</p>
                  </div>

                  {/* Visual timestamp */}
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-4">
                    <span>Registered on:</span>
                    <span className="font-mono">{new Date(req.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>

                  {/* Active Contact CTAs */}
                  <div className={`pt-3 border-t border-rose-gold/5 ${req.facebook ? 'grid grid-cols-2 gap-3' : 'block'}`}>
                    <a
                      href={`https://wa.me/${req.whatsapp.replace(/\+/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center justify-center gap-1.5 px-3 rounded-xl bg-[#25d366]/10 text-[#25d366] text-xs font-semibold hover:bg-[#25d366]/20 border border-[#25d366]/20 transition-all cursor-pointer w-full"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                    
                    {req.facebook && (
                      <a
                        href={getFacebookUrl(req.facebook)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 items-center justify-center gap-1.5 px-3 rounded-xl bg-[#1877f2]/10 text-[#1877f2] text-xs font-semibold hover:bg-[#1877f2]/20 border border-[#1877f2]/20 transition-all cursor-pointer w-full"
                      >
                        <Facebook className="w-3.5 h-3.5" />
                        Facebook
                      </a>
                    )}
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
