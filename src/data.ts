import { SwapRequest, FAQItem } from './types';

export const INITIAL_SWAP_REQUESTS: SwapRequest[] = [
  {
    id: 'req_1',
    name: 'Samiul Islam',
    studentId: '221002015',
    email: '221002015@eastdelta.edu.bd',
    currentSection: 'Section 01',
    desiredSection: 'Section 03',
    whatsapp: '+8801712345678',
    facebook: 'https://facebook.com/samiul.islam',
    createdAt: '2026-06-03T10:30:00Z',
    status: 'active'
  },
  {
    id: 'req_2',
    name: 'Nafisa Tasnim',
    studentId: '221002042',
    email: '221002042@eastdelta.edu.bd',
    currentSection: 'Section 03',
    desiredSection: 'Section 01',
    whatsapp: '+8801812345678',
    facebook: 'https://facebook.com/nafisa.tasnim.edu',
    createdAt: '2026-06-03T14:15:00Z',
    status: 'active' // Notice how Semiul and Nafisa are a PERFECT reciprocal swap! (Sec 1 -> 3 vs Sec 3 -> 1)
  },
  {
    id: 'req_3',
    name: 'Arif Chowdhury',
    studentId: '231002102',
    email: '231002102@eastdelta.edu.bd',
    currentSection: 'Section 05',
    desiredSection: 'Section 02',
    whatsapp: '+8801912345678',
    facebook: 'https://facebook.com/arif.chy.9',
    createdAt: '2026-06-02T09:00:00Z',
    status: 'active'
  },
  {
    id: 'req_4',
    name: 'Zahedul Hoque',
    studentId: '212002154',
    email: '212002154@eastdelta.edu.bd',
    currentSection: 'Section 02',
    desiredSection: 'Section 05',
    whatsapp: '+8801512345678',
    facebook: 'https://facebook.com/zahed.cse',
    createdAt: '2026-06-04T08:20:00Z',
    status: 'active' // Perfect match with Arif Chowdhury!
  },
  {
    id: 'req_5',
    name: 'Fariha Rahman',
    studentId: '223002213',
    email: '223002213@eastdelta.edu.bd',
    currentSection: 'Section 04',
    desiredSection: 'Section 06',
    whatsapp: '+8801312345678',
    facebook: 'https://facebook.com/fariha.rahman.cse',
    createdAt: '2026-06-04T11:45:00Z',
    status: 'active'
  },
  {
    id: 'req_6',
    name: 'Tanvir Ahmed',
    studentId: '221002088',
    email: '221002088@eastdelta.edu.bd',
    currentSection: 'Section 06',
    desiredSection: 'Section 04',
    whatsapp: '+8801700112233',
    facebook: 'https://facebook.com/tanvir.ahmed.edu',
    createdAt: '2026-06-04T12:05:00Z',
    status: 'active' // Perfect match with Fariha!
  },
  {
    id: 'req_7',
    name: 'Mehedi Hasan',
    studentId: '231002055',
    email: '231002055@eastdelta.edu.bd',
    currentSection: 'Section 07',
    desiredSection: 'Section 09',
    whatsapp: '+8801644332211',
    facebook: 'https://facebook.com/mehedi.hasan.cse',
    createdAt: '2026-06-01T15:30:00Z',
    status: 'active'
  },
  {
    id: 'req_8',
    name: 'Sadia Sultana',
    studentId: '232002199',
    email: '232002199@eastdelta.edu.bd',
    currentSection: 'Section 09',
    desiredSection: 'Section 07',
    whatsapp: '+8801833445566',
    facebook: 'https://facebook.com/sadia.sultana.edu',
    createdAt: '2026-06-04T05:10:00Z',
    status: 'active' // Perfect match with Mehedi!
  },
  {
    id: 'req_9',
    name: 'Kamrul Hasan',
    studentId: '211002005',
    email: '211002005@eastdelta.edu.bd',
    currentSection: 'Section 10',
    desiredSection: 'Section 08',
    whatsapp: '+8801555667788',
    facebook: 'https://facebook.com/kamrul.hasan.cse',
    createdAt: '2026-06-04T16:50:00Z',
    status: 'active'
  },
  {
    id: 'req_10',
    name: 'Adrita Sen',
    studentId: '222002111',
    email: '222002111@eastdelta.edu.bd',
    currentSection: 'Section 08',
    desiredSection: 'Section 02',
    whatsapp: '+8801999887766',
    facebook: 'https://facebook.com/adrita.sen.3',
    createdAt: '2026-06-04T17:15:00Z',
    status: 'active'
  },
  {
    id: 'req_11',
    name: 'Tahsin Kabir',
    studentId: '221002195',
    email: '221002195@eastdelta.edu.bd',
    currentSection: 'Section 02',
    desiredSection: 'Section 10',
    whatsapp: '+8801777223344',
    facebook: 'https://facebook.com/tahsin.kabir.cse',
    createdAt: '2026-06-04T18:22:00Z',
    status: 'active'
  }
];

export const INITIAL_FAQ: FAQItem[] = [
  {
    question: 'How does Section Matrimony work?',
    answer: 'Section Matrimony acts as a matchmaker for course sections. You submit a request identifying your current section and your desired section. The platform analyzes submissions across the East Delta University CSE Department to find "reciprocal matches" — for instance, if you are in Section 01 and want Section 03, and another student in Section 03 is looking for Section 01. When a match is found, their contact channels (WhatsApp or Facebook) are displayed so you can instantly coordinate the final official swap.'
  },
  {
    question: 'Is my student and contact information safe on this platform?',
    answer: 'Your privacy is highly valued. We only require student email configuration to verify you are a genuine EDU CSE department student. Your WhatsApp and Facebook profiles are shown on the platform exclusively to let potential match partners find and message you to complete the swap. These links are never shared with search engines or external third parties.'
  },
  {
    question: 'Why does the form restrict same-section submissions?',
    answer: 'You cannot select the same section for both your current section and desired section. The purpose of Section Matrimony is to facilitate swaps between different class timings. If they were the same, there would be no transfer needed.'
  },
  {
    question: 'Is this an official platform managed by East Delta University?',
    answer: 'No, Section Matrimony is an independent peer-to-peer helper platform created by and for the students of the East Delta University CSE Department. It helps you locate match partners quickly. However, the final official section changes must still be completed through the EDU student portal or directly via the department coordinator according to academic advisory rules.'
  },
  {
    question: 'What should I do once a reciprocal match is found?',
    answer: 'Once you spot a swap partner in the section grid or reciprocal matches board, click their WhatsApp or Facebook link to start a discussion. Verify that their academic courses and registration statuses align, then coordinate with your department advisor or access the EDU Portal together during the official drop/add or section changing week to complete the transaction.'
  }
];
