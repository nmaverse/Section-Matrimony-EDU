export interface SwapRequest {
  id: string;
  name: string;
  studentId: string;
  email: string;
  currentSection: string; // 'Section 01' to 'Section 10'
  desiredSection: string; // 'Section 01' to 'Section 10'
  whatsapp: string;
  facebook: string;
  createdAt: string;
  status: 'active' | 'matched' | 'completed';
}

export interface SectionStat {
  sectionName: string;
  outgoingCount: number;
  incomingCount: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}
