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
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [semesterFilter, setSemesterFilter] = useState<string>('all');

  const departmentsList = ['CSE', 'EEE', 'ETE', 'ENGLISH', 'ECONOMICS', 'BBA', 'BSBA'];
  const semestersList = Array.from({ length: 12 }, (_, i) => String(i + 1));

  const sectionsList = Array.from({ length: 10 }, (_, i) => {
    const num = i + 1;
    return `Section ${num < 10 ? '0' + num : num}`;
  });

  // Calculate stats for each section
  const sectionStats = useMemo(() => {
    return sectionsList.map((sectionName) => {
      let filteredForStats = requests;
      if (deptFilter !== 'all') {
        filteredForStats = filteredForStats.filter(r => r.department === deptFilter);
      }
      if (semesterFilter !== 'all') {
        filteredForStats = filteredForStats.filter(r => r.semester === semesterFilter);
      }

      const outgoingCount = filteredForStats.filter(r => r.currentSection === sectionName).length;
      const incomingCount = filteredForStats.filter(r => r.desiredSection === sectionName).length;
      return {
        sectionName,
        outgoingCount,
        incomingCount
      };
    });
  }, [requests, deptFilter, semesterFilter]);

  // Find all reciprocal perfect matches!
  // A perfect match is where Student A is (Curr: X, Des: Y) and Student B is (Curr: Y, Des: X) and they are in the same department!
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
          reqA.department === reqB.department && // Swap matches must be of same department
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

      // Department filter
      if (deptFilter !== 'all' && req.department !== deptFilter) return false;

      // Semester filter
      if (semesterFilter !== 'all' && req.semester !== semesterFilter) return false;

      // Search query check (Name, Student ID, email, sections)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = req.name.toLowerCase().includes(query);
        const matchesID = req.studentId.includes(query);
        const matchesEmail = req.email.toLowerCase().includes(query);
        const matchesCurrent = req.currentSection.toLowerCase().includes(query);
        const matchesDesired = req.desiredSection.toLowerCase().includes(query);
        const matchesDept = (req.department || '').toLowerCase().includes(query);
        const matchesSem = `semester ${(req.semester || '')}`.includes(query) || (req.semester || '').includes(query);

        if (!matchesName && !matchesID && !matchesEmail && !matchesCurrent && !matchesDesired && !matchesDept && !matchesSem) {
          return false;
        }
      }

      return true;
    });
  }, [requests, selectedSection, searchQuery, directionFilter, deptFilter, semesterFilter]);

  return (
    <section id="section-grid-section" className="relative py-24 bg-charcoal-dark overflow-hidden border-t border-rose-gold/10">
      
      <div className="glow-spot w-[35vw] h-[35vw] top-[10%] right-[10%] bg-rose-gold/10" />
      <div className="glow-spot w-[30vw] h-[30vw] bottom-[20%] left-[5%] bg-dusty-pink/8" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-gold block mb-3">
            Real-time Exchange Index
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-white mb-4">
            Browse Sections & Swaps
          </h2>
          <div className="h-[2px] w-12 bg-rose-gold mx-auto mb-4" />
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-light max-w-2xl mx-auto">
            Select a specific section card from the grid to examine outbound or inbound swap requests, or view direct matchmaking partners instantly.
          </p>
        </div>

        {/* 1. Reciprocal Matches Sparkle Bar - Always display if any exist! */}
        {perfectMatches.length > 0 && (
          <div className="mb-14 p-6 md:p-8 rounded-3xl border border-rose-gold/30 bg-gradient-to-r from-rose-gold/5 via-charcoal-mid to-[#161113] dark:to-[#161113] relative overflow-hidden shadow-xl">
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-gold/15 rounded-full blur-2xl" />
            
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-rose-gold animate-bounce" />
              <h3 className="font-display text-2xl font-semibold text-neutral-900 dark:text-white">
                Perfect Reciprocal Matches Found ({perfectMatches.length})
              </h3>
              <span className="text-[10px] uppercase font-bold text-rose-gold bg-rose-gold/10 border border-rose-gold/30 px-2.5 py-0.5 rounded-full tracking-wider animate-pulse ml-2">
                Immediate Swap Available
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {perfectMatches.map(({ reqA, reqB }, idx) => (
                <div key={`match-${idx}`} className="p-5 rounded-2xl border border-rose-gold/15 bg-charcoal-dark/75 relative">
                  
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
                      <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 truncate">{reqA.name}</h4>
                      <p className="text-[11px] text-neutral-600 dark:text-neutral-500 font-mono mb-2">{reqA.studentId} • {reqA.department} (Sem {reqA.semester})</p>
                      <div className="flex gap-2">
                        <a
                          href={`https://wa.me/${reqA.whatsapp.replace(/\+/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-rose-gold/10 text-rose-gold hover:bg-rose-gold/20 transition-all font-light text-xs shrink-0 flex items-center justify-center"
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
                      <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 truncate">{reqB.name}</h4>
                      <p className="text-[11px] text-neutral-600 dark:text-neutral-500 font-mono mb-2">{reqB.studentId} • {reqB.department} (Sem {reqB.semester})</p>
                      <div className="flex gap-2">
                        <a
                          href={`https://wa.me/${reqB.whatsapp.replace(/\+/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-rose-gold/10 text-rose-gold hover:bg-rose-gold/20 transition-all font-light text-xs shrink-0 flex items-center justify-center"
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

        {/* 2. Filtering Toolbar & Results Directory */}
        <div className="p-6 md:p-8 rounded-3xl border border-rose-gold/10 bg-charcoal-mid/40 backdrop-blur-md mb-16">
          
          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-rose-gold/5">
            
            <div className="flex flex-wrap items-center gap-3">
              <Filter className="w-4 h-4 text-rose-gold" />
              <h4 className="font-display text-xl font-semibold text-neutral-900 dark:text-white">
                {selectedSection 
                  ? `${selectedSection} Requests` 
                  : deptFilter !== 'all' 
                    ? `${deptFilter} Registry` 
                    : 'All Department Registry'
                } ({filteredRequests.length})
              </h4>
            </div>

            {/* Combined Filter Controllers */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 w-full lg:w-auto">
              
              {/* Query Search */}
               <div className="relative w-full sm:w-60">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search ID, Code, Name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-charcoal-dark text-neutral-900 dark:text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-rose-gold/50 transition-all font-light"
                />
              </div>

              {/* Department Filter Selector */}
              <div className="relative w-full sm:w-auto">
                <select
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                  className="w-full sm:border sm:border-neutral-200 dark:sm:border-neutral-800 h-10 px-3 pr-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-charcoal-dark text-neutral-900 dark:text-white text-xs appearance-none focus:outline-none focus:border-rose-gold/50 cursor-pointer font-light"
                >
                  <option value="all">All Departments</option>
                  {departmentsList.map((dept) => (
                    <option key={`filter-${dept}`} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-[10px]">
                  ▼
                </div>
              </div>

              {/* Semester Filter Selector */}
              <div className="relative w-full sm:w-auto">
                <select
                  value={semesterFilter}
                  onChange={(e) => setSemesterFilter(e.target.value)}
                  className="w-full sm:border sm:border-neutral-200 dark:sm:border-neutral-800 h-10 px-3 pr-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-charcoal-dark text-neutral-900 dark:text-white text-xs appearance-none focus:outline-none focus:border-rose-gold/50 cursor-pointer font-light"
                >
                  <option value="all">All Semesters</option>
                  {semestersList.map((sem) => (
                    <option key={`filter-sem-${sem}`} value={sem}>
                      Semester {sem}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-[10px]">
                  ▼
                </div>
              </div>

              {/* Status/Direction Filters (Only applicable if a Section is selected) */}
              {selectedSection && (
                <div className="relative w-full sm:w-auto">
                  <select
                    value={directionFilter}
                    onChange={(e) => setDirectionFilter(e.target.value as any)}
                    className="w-full sm:border sm:border-neutral-200 dark:sm:border-neutral-800 h-10 px-3 pr-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-charcoal-dark text-neutral-900 dark:text-white text-xs appearance-none focus:outline-none focus:border-rose-gold/50 cursor-pointer font-light"
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
              <AlertCircle className="w-10 h-10 text-neutral-400 mb-3" />
              <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light mb-2">No active swap listings match your filters.</p>
              <p className="text-xs text-neutral-500 font-light">Be the first to post a swap with Section {selectedSection || '01'}!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-5 rounded-2xl border border-rose-gold/10 bg-charcoal-dark/80 hover:border-rose-gold/20 transition-all duration-300 relative group"
                >
                  {/* Swap Visual Indicator */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">Current</span>
                      <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-300">{req.currentSection}</span>
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
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      <span className="text-[10px] text-rose-gold bg-rose-gold/5 border border-rose-gold/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold font-mono">
                        {req.department || 'CSE'}
                      </span>
                      <span className="text-[10px] text-neutral-700 dark:text-neutral-300 bg-charcoal-mid border border-neutral-200 dark:border-neutral-800 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                        Semester {req.semester || 'N/A'}
                      </span>
                    </div>
                    <h5 className="text-base font-semibold text-neutral-900 dark:text-white mt-2 truncate">{req.name}</h5>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light font-mono mt-0.5">{req.studentId}</p>
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

        {/* 3. Interactive Section Grid (Showing all 10 sections) */}
        <div className="p-6 md:p-8 rounded-3xl border border-rose-gold/10 bg-charcoal-mid/20 backdrop-blur-md">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h3 className="font-display text-2xl font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
              <span>Select Section to View Filings</span>
              {selectedSection && (
                <button
                  onClick={() => setSelectedSection(null)}
                  className="text-xs font-semibold px-3 py-1 bg-rose-gold/10 text-rose-gold border border-rose-gold/25 rounded-full hover:bg-rose-gold/20 cursor-pointer flex items-center gap-1.5 transition-all animate-fade-in"
                >
                  Clear Selection <X className="w-3 h-3" />
                </button>
              )}
            </h3>

            {/* Quick Semester Filter for the Section grid */}
            <div className="flex items-center gap-2.5 self-start md:self-auto">
              <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium font-mono uppercase tracking-wider">Semester:</span>
              <div className="relative">
                <select
                  value={semesterFilter}
                  onChange={(e) => setSemesterFilter(e.target.value)}
                  className="h-8.5 px-3 pr-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-charcoal-mid text-neutral-900 dark:text-white text-xs appearance-none focus:outline-none focus:border-rose-gold/50 cursor-pointer font-light min-w-[130px] transition-all"
                >
                  <option value="all">All Semesters</option>
                  {semestersList.map((sem) => (
                    <option key={`grid-sem-${sem}`} value={sem}>
                      Semester {sem}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 text-[8px]">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Department Tabs */}
          <div className="mb-8 border-b border-rose-gold/10 pb-5">
            <div className="text-[10px] uppercase font-bold text-neutral-600 dark:text-neutral-400 tracking-widest mb-3 font-mono">
              Filter by Department
            </div>
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
              <button
                onClick={() => setDeptFilter('all')}
                className={`h-9 px-4 text-xs font-semibold rounded-full duration-250 cursor-pointer border whitespace-nowrap transition-all ${
                  deptFilter === 'all'
                    ? 'bg-rose-gold text-black border-rose-gold shadow-lg shadow-rose-gold/10 hover:opacity-90'
                    : 'bg-charcoal-mid border-neutral-200 dark:border-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:text-rose-gold hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                All Departments
              </button>
              {departmentsList.map((dept) => (
                <button
                  key={`tab-${dept}`}
                  onClick={() => setDeptFilter(dept)}
                  className={`h-9 px-4 text-xs font-semibold rounded-full duration-250 cursor-pointer border whitespace-nowrap transition-all ${
                    deptFilter === dept
                      ? 'bg-rose-gold text-black border-rose-gold shadow-lg shadow-rose-gold/10 hover:opacity-90'
                      : 'bg-charcoal-mid border-neutral-200 dark:border-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:text-rose-gold hover:border-neutral-300 dark:hover:border-neutral-700'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 animate-fade-in">
            {sectionStats.map(({ sectionName, outgoingCount, incomingCount }) => {
              const isSelected = selectedSection === sectionName;
              return (
                <button
                  key={sectionName}
                  onClick={() => setSelectedSection(isSelected ? null : sectionName)}
                  className={`p-5 rounded-2xl text-left border transition-all duration-300 relative group cursor-pointer ${
                    isSelected
                      ? 'border-rose-gold bg-rose-gold/10 shadow-lg shadow-rose-gold/5 scale-[1.03]'
                      : 'border-rose-gold/15 bg-charcoal-mid/60 hover:bg-charcoal-light/20 hover:border-rose-gold/30'
                  }`}
                >
                  {/* Decorative corner indicator */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-rose-gold animate-ping" />
                  )}

                  <span className="text-[10px] uppercase tracking-wider text-rose-gold/80 font-mono font-medium block mb-1">
                    {deptFilter === 'all' ? 'EDU ALL' : `EDU ${deptFilter}`}
                  </span>
                  
                  <span className="font-display text-xl font-bold text-neutral-900 dark:text-white block mb-4 group-hover:text-rose-gold transition-colors duration-200">
                    {sectionName}
                  </span>

                  {/* Outbound vs Inbound sub-stats */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                      <span>Outgoing:</span>
                      <span className={`font-mono font-semibold ${outgoingCount > 0 ? 'text-neutral-900 dark:text-white' : 'text-neutral-400 dark:text-neutral-600'}`}>
                        {outgoingCount}
                      </span>
                    </div>
                    <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                      <span>Incoming:</span>
                      <span className={`font-mono font-semibold ${incomingCount > 0 ? 'text-rose-gold' : 'text-neutral-400 dark:text-neutral-600'}`}>
                        {incomingCount}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
