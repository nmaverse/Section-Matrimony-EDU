import React, { useState } from 'react';
import { Send, CheckCircle, AlertTriangle, HelpCircle, ArrowRightLeft, Sparkles } from 'lucide-react';
import { SwapRequest } from '../types';

interface SwapFormProps {
  onSubmitRequest: (newReq: Omit<SwapRequest, 'id' | 'createdAt' | 'status'>) => void;
}

export default function SwapForm({ onSubmitRequest }: SwapFormProps) {
  // Form values
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [currentSection, setCurrentSection] = useState('');
  const [desiredSection, setDesiredSection] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [facebook, setFacebook] = useState('');

  // Form states
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const departmentsList = ['CSE', 'EEE', 'ETE', 'ENGLISH', 'ECONOMICS', 'BBA', 'BSBA'];
  const semestersList = Array.from({ length: 12 }, (_, i) => String(i + 1));

  const sectionsList = Array.from({ length: 10 }, (_, i) => {
    const num = i + 1;
    return `Section ${num < 10 ? '0' + num : num}`;
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Basic Validation
    if (!name.trim()) return setErrorMsg('Student Name is required.');
    if (!studentId.trim()) return setErrorMsg('Student ID is required.');
    if (!email.trim()) return setErrorMsg('University Email is required.');
    if (!department) return setErrorMsg('Please choose your Department.');
    if (!semester) return setErrorMsg('Please choose your Semester.');
    if (!currentSection) return setErrorMsg('Please choose your Current Section.');
    if (!desiredSection) return setErrorMsg('Please choose your Desired Section.');
    if (!whatsapp.trim()) return setErrorMsg('WhatsApp Number is required to coordinate.');

    // Email Check (East Delta University preferred but validate standard Email form)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return setErrorMsg('Please provide a valid University Email address.');
    }

    // Constraint Check: Current Section & Desired Section cannot be the same
    if (currentSection === desiredSection) {
      return setErrorMsg('Validation Error: Current Section and Desired Section cannot be identical. You must select different sections to swap.');
    }

    // Pass up to App state
    setIsSubmitting(true);
    try {
      // Simulate slight smooth visual saving pause
      await new Promise((resolve) => setTimeout(resolve, 800));

      await onSubmitRequest({
        name,
        studentId,
        email,
        department,
        semester,
        currentSection,
        desiredSection,
        whatsapp,
        facebook,
      });

      setSuccess(true);

      // Clear Form Fields on success
      setName('');
      setStudentId('');
      setEmail('');
      setDepartment('');
      setSemester('');
      setCurrentSection('');
      setDesiredSection('');
      setWhatsapp('');
      setFacebook('');
    } catch (err: any) {
      console.error("Firestore submit error caught in UI:", err);
      // Clean up the error message for display if it's JSON from handleFirestoreError
      let userFriendlyError = 'Failed to register your request. Please check your internet connection and try again.';
      if (err instanceof Error) {
        try {
          const parsed = JSON.parse(err.message);
          if (parsed && parsed.error) {
            userFriendlyError = `Database Connection Error: ${parsed.error}`;
          }
        } catch {
          userFriendlyError = err.message;
        }
      }
      setErrorMsg(userFriendlyError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="form-section" className="relative py-24 bg-[#0a0a0c] overflow-hidden">
      {/* Decorative background overlay */}
      <div className="glow-spot w-[40vw] h-[40vw] bottom-[-5vw] left-[5%] bg-rose-gold/10" />
      <div className="glow-spot w-[30vw] h-[30vw] top-[-5vw] right-[5%] bg-dusty-pink/10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-gold block mb-3">
            Matchmaking Registration
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">
            Register Your Swap Request
          </h2>
          <div className="h-[2px] w-12 bg-rose-gold mx-auto mb-4" />
          <p className="text-sm md:text-base text-neutral-400 font-light">
            Fill in your scheduling data below. Once submitted, your request will instantly go live inside our 10-section database for potential swap partners to view.
          </p>
        </div>

        {/* Success Modal/Banner */}
        {success && (
          <div className="mb-12 p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 text-center relative overflow-hidden animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-50" />
            <div className="w-16 h-16 rounded-full border border-emerald-500 bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-display text-3xl font-semibold text-white mb-2">
              Swap Registration Complete!
            </h3>
            <p className="text-neutral-300 max-w-lg mx-auto text-sm leading-relaxed mb-6">
              Your match listing is now <span className="text-emerald-400 font-medium">LIVE</span> in the Active Directory. Potential swap partners can now see your request and reach out to you via WhatsApp or Facebook Profile.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="inline-flex h-11 px-6 rounded-full border border-emerald-500/40 hover:bg-emerald-500/10 text-white text-sm font-medium transition-all"
            >
              Register Another Request / Close
            </button>
          </div>
        )}

        {/* Normal High Refinement Reactive Form */}
        <div className="p-6 md:p-10 rounded-3xl border border-rose-gold/10 bg-charcoal-mid/70 backdrop-blur-md shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-gold/2 rounded-full blur-xl pointer-events-none" />
          
          <form onSubmit={handleFormSubmit} className="space-y-6">
              
              {/* Form Error Banner */}
              {errorMsg && (
                <div className="p-4 rounded-xl border border-rose-gold/35 bg-rose-gold/5 flex items-start gap-3 animate-shake">
                  <AlertTriangle className="w-5 h-5 text-rose-gold shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-rose-gold/90">
                    {errorMsg}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div>
                  <label htmlFor="student-name" className="block text-xs font-semibold uppercase tracking-widest text-neutral-300 mb-2">
                    Student Name <span className="text-rose-gold">*</span>
                  </label>
                  <input
                    id="student-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. S. M. Rahat"
                    className="form-input"
                  />
                </div>

                {/* ID */}
                <div>
                  <label htmlFor="student-id" className="block text-xs font-semibold uppercase tracking-widest text-neutral-300 mb-2">
                    Student ID <span className="text-rose-gold">*</span>
                  </label>
                  <input
                    id="student-id"
                    type="text"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="e.g. 221002015"
                    className="form-input"
                  />
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label htmlFor="student-email" className="block text-xs font-semibold uppercase tracking-widest text-neutral-300 mb-2">
                    University Email <span className="text-rose-gold">*</span>
                  </label>
                  <input
                    id="student-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. 221002015@eastdelta.edu.bd"
                    className="form-input"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1.5 font-light">
                    Your official university domain email address is safe.
                  </p>
                </div>

                {/* Department Dropdown */}
                <div>
                  <label htmlFor="student-department" className="block text-xs font-semibold uppercase tracking-widest text-neutral-300 mb-2">
                    Department <span className="text-rose-gold">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="student-department"
                      required
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="form-input bg-charcoal-dark"
                    >
                      <option value="">Choose Department</option>
                      {departmentsList.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Semester Dropdown */}
                <div>
                  <label htmlFor="student-semester" className="block text-xs font-semibold uppercase tracking-widest text-neutral-300 mb-2">
                    Semester <span className="text-rose-gold">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="student-semester"
                      required
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="form-input bg-charcoal-dark"
                    >
                      <option value="">Choose Semester</option>
                      {semestersList.map((sem) => (
                        <option key={`sem-${sem}`} value={sem}>
                          Semester {sem}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Current Section Dropdown */}
                <div>
                  <label htmlFor="current-section" className="block text-xs font-semibold uppercase tracking-widest text-neutral-300 mb-2">
                    Current Section <span className="text-rose-gold">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="current-section"
                      required
                      value={currentSection}
                      onChange={(e) => setCurrentSection(e.target.value)}
                      className="form-input bg-charcoal-dark"
                    >
                      <option value="">Choose Current Section</option>
                      {sectionsList.map((sec) => (
                        <option key={`curr-${sec}`} value={sec}>
                          {sec}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Desired Section Dropdown */}
                <div>
                  <label htmlFor="desired-section" className="block text-xs font-semibold uppercase tracking-widest text-neutral-300 mb-2">
                    Desired Section <span className="text-rose-gold">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="desired-section"
                      required
                      value={desiredSection}
                      onChange={(e) => setDesiredSection(e.target.value)}
                      className="form-input bg-charcoal-dark"
                    >
                      <option value="">Choose Desired Section</option>
                      {sectionsList.map((sec) => (
                        <option key={`des-${sec}`} value={sec}>
                          {sec}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                      ▼
                    </div>
                  </div>
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label htmlFor="student-whatsapp" className="block text-xs font-semibold uppercase tracking-widest text-neutral-300 mb-2">
                    WhatsApp Number <span className="text-rose-gold">*</span>
                  </label>
                  <input
                    id="student-whatsapp"
                    type="text"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="e.g. +88017XXXXXXXX"
                    className="form-input"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1.5 font-light">
                    Double-check so matching partners can message you.
                  </p>
                </div>

                {/* Facebook Profile Link */}
                <div>
                  <label htmlFor="student-facebook" className="block text-xs font-semibold uppercase tracking-widest text-neutral-300 mb-2">
                    Facebook Username or Link <span className="text-neutral-500 font-normal text-[10px] lowercase">(optional)</span>
                  </label>
                  <input
                    id="student-facebook"
                    type="text"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    placeholder="e.g. username or facebook.com/username"
                    className="form-input"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1.5 font-light">
                    Optional secondary channel to sync up on Facebook.
                  </p>
                </div>

              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-rose-gold/10 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 h-12 rounded-full bg-rose-gold text-white font-medium tracking-wider hover:bg-dusty-pink disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer shadow-md shadow-rose-gold/5"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Saving and Syncing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Register Search Request
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        
      </div>
    </section>
  );
}
