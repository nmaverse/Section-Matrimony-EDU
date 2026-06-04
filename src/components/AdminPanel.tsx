import React, { useState } from 'react';
import { Trash2, RotateCcw, ShieldCheck, Lock, Unlock, Database, UserMinus, RefreshCw } from 'lucide-react';
import { SwapRequest } from '../types';

interface AdminPanelProps {
  requests: SwapRequest[];
  onDeleteRequest: (id: string) => void;
  onClearAll: () => void;
  onResetDefaults: () => void;
}

export default function AdminPanel({
  requests,
  onDeleteRequest,
  onClearAll,
  onResetDefaults,
}: AdminPanelProps) {
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin@sm0605') {
      setIsAdminUnlocked(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
      setTimeout(() => setPasscodeError(false), 2000);
    }
  };

  return (
    <section id="admin-section" className="py-16 bg-[#08080a] border-t border-neutral-900 relative overflow-hidden">
      {/* Decorative accent background glows */}
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-rose-gold/2 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-gold/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-gold/5 border border-rose-gold/15 text-[11px] text-rose-gold font-mono uppercase tracking-widest mb-3">
              <ShieldCheck className="w-3.5 h-3.5 animate-pulse" />
              CSE Department Panel
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
              Database Admin Portal
            </h2>
            <p className="text-sm text-neutral-400 font-light mt-2 max-w-xl">
              Authorize administration level actions. View live registry data stream, delete custom students' spam requests, or wipe/reset standard listings.
            </p>
          </div>

          {/* Locked status trigger badge */}
          <div className="shrink-0">
            {isAdminUnlocked ? (
              <button
                onClick={() => {
                  setIsAdminUnlocked(false);
                  setConfirmClear(false);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-rose-gold/30 hover:border-rose-gold/50 text-rose-gold text-xs font-semibold uppercase tracking-wider bg-rose-gold/5 transition-all cursor-pointer"
              >
                <Unlock className="w-3.5 h-3.5" />
                Lock Controls
              </button>
            ) : (
              <span className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-800 text-neutral-500 text-xs font-mono uppercase tracking-widest bg-neutral-900/50">
                <Lock className="w-3.5 h-3.5 text-neutral-600" />
                Portal Access Locked
              </span>
            )}
          </div>
        </div>

        {/* Locked View Password form */}
        {!isAdminUnlocked ? (
          <div className="max-w-md mx-auto p-8 rounded-2xl border border-neutral-900 bg-charcoal-mid/40 backdrop-blur-sm text-center">
            <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center mx-auto mb-4 border border-rose-gold/10">
              <Lock className="w-5 h-5 text-rose-gold/80" />
            </div>
            <h3 className="text-lg font-display font-semibold text-[#f5f5f7] mb-1">
              Unlock Administrative Dashboard
            </h3>
            <p className="text-xs text-neutral-400 font-light mb-6">
              Enter the department administrator passcode to grant access.
            </p>
            
            <form onSubmit={handleUnlock} className="space-y-4">
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode..."
                  className={`form-input text-center placeholder-neutral-600 ${
                    passcodeError ? 'border-red-500 ring-1 ring-red-500/20' : ''
                  }`}
                />
                {passcodeError && (
                  <p className="text-[11px] text-red-500 mt-1.5 font-light">
                    Invalid administrator code. Please try again.
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-rose-gold hover:bg-dusty-pink text-white text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
              >
                Unlock Live Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Unlocked Admin Workspace */
          <div className="space-y-6 animate-fade-in">
            
            {/* Global Actions Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-rose-gold/10 bg-rose-gold/5 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <p className="text-xs text-neutral-300 font-light">
                  Active connection to university registry: <span className="text-rose-gold font-mono">{requests.length} students live</span>. Double-click trash bins for quick removal.
                </p>
              </div>

              {/* Reset / Clean Database button actions */}
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={onResetDefaults}
                  className="inline-flex h-9 items-center justify-center gap-1.5 px-4 rounded-xl border border-rose-gold/25 text-rose-gold text-xs font-semibold hover:bg-rose-gold/10 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Restore Student Defaults
                </button>

                {confirmClear ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        onClearAll();
                        setConfirmClear(false);
                      }}
                      className="inline-flex h-9 items-center justify-center gap-1.5 px-3.5 rounded-xl bg-rose-gold hover:bg-dusty-pink text-white text-xs font-semibold transition-all cursor-pointer shrink-0"
                    >
                      Confirm Clear
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmClear(false)}
                      className="inline-flex h-9 items-center justify-center px-3 rounded-xl border border-neutral-800 text-neutral-400 text-xs font-semibold hover:bg-[#141418] transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmClear(true)}
                    className="inline-flex h-9 items-center justify-center gap-1.5 px-4 rounded-xl bg-rose-gold/10 hover:bg-rose-gold/15 text-rose-gold border border-rose-gold/20 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Wipe Total Database
                  </button>
                )}
              </div>
            </div>

            {/* List with Individual Deletion Buttons */}
            {requests.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-neutral-900 rounded-3xl bg-charcoal-mid/10">
                <Database className="w-10 h-10 text-neutral-700 mx-auto mb-3" />
                <h4 className="text-sm text-neutral-300 font-medium">Directory Database is Empty</h4>
                <p className="text-xs text-neutral-500 font-light mt-1 max-w-sm mx-auto">
                  Submit replacement swap listing cards above to instantly populate database stream logs!
                </p>
              </div>
            ) : (
              <div className="border border-neutral-900 rounded-2xl overflow-hidden bg-charcoal-mid/20 backdrop-blur-sm">
                
                {/* Responsive Admin Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-neutral-300">
                    <thead className="bg-[#0b0b0d] border-b border-neutral-900 text-neutral-400 uppercase tracking-widest text-[9px] font-semibold">
                      <tr>
                        <th className="px-6 py-4">Student Info</th>
                        <th className="px-6 py-4">Current Section</th>
                        <th className="px-6 py-4">Desired Section</th>
                        <th className="px-6 py-4 text-center">Social Coordinates</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900 font-light">
                      {requests.map((req) => (
                        <tr key={req.id} className="hover:bg-rose-gold/2 transition-colors">
                          {/* Student Details */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-rose-gold/10 border border-rose-gold/20 text-rose-gold text-xs font-semibold flex items-center justify-center font-display">
                                {req.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                              </div>
                              <div>
                                <span className="font-semibold text-white block transition-colors hover:text-rose-gold">
                                  {req.name}
                                </span>
                                <span className="text-[10px] text-neutral-500 font-mono block mt-0.5">
                                  ID: {req.studentId} • {req.email}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Current Sec */}
                          <td className="px-6 py-4">
                            <span className="inline-flex px-2.5 py-1 rounded-md text-[11px] font-medium text-neutral-300 bg-neutral-900/50 border border-neutral-800">
                              Section {req.currentSection}
                            </span>
                          </td>

                          {/* Desired Sec */}
                          <td className="px-6 py-4">
                            <span className="inline-flex px-2.5 py-1 rounded-md text-[11px] font-bold text-rose-gold bg-rose-gold/5 border border-rose-gold/20">
                              Section {req.desiredSection}
                            </span>
                          </td>

                          {/* Contact Social Links */}
                          <td className="px-6 py-4 text-center">
                            <div className="inline-flex gap-2">
                              {req.whatsapp && (
                                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
                                  WA Enabled
                                </span>
                              )}
                              {req.facebook && (
                                <span className="text-[10px] bg-[#1877f2]/10 text-[#1877f2] border border-[#1877f2]/20 px-2 py-0.5 rounded-full font-mono">
                                  FB Linked
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Individual DELETE with clear visual indicator */}
                          <td className="px-6 py-4 text-right">
                            <button
                              type="button"
                              onClick={() => onDeleteRequest(req.id)}
                              className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-lg border border-rose-gold/20 hover:border-red-500/40 text-rose-gold hover:text-red-400 hover:bg-red-500/10 transition-all font-sans font-medium text-xs cursor-pointer group"
                              title="Remove this swap request from live directory"
                            >
                              <UserMinus className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                              <span>Delete Request</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Database footer */}
                <div className="px-6 py-4 bg-[#0a0a0c] border-t border-neutral-900 flex justify-between items-center text-[10px] text-neutral-500 font-mono">
                  <span>Authorized Token Session: Active</span>
                  <span>Database Key: SQLite-LocalStateEngine</span>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
