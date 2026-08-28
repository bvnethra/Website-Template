export interface FAQItem {
  id: string;
  category: 'Appointments' | 'Insurance & Billing' | 'Services' | 'Virtual Care' | 'Emergency Care';
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Appointments',
    question: 'How do I book an appointment with a specialist?',
    answer: 'You can book an appointment online using our 5-step interactive scheduler, call our 24/7 patient services line at (555) 019-2831, or use the CareNova patient dashboard.'
  },
  {
    id: 'faq-2',
    category: 'Appointments',
    question: 'What is your cancellation and rescheduling policy?',
    answer: 'We kindly request at least 24 hours advance notice for cancellations or rescheduling. You can modify your appointment directly through the Patient Dashboard or confirmation link.'
  },
  {
    id: 'faq-3',
    category: 'Insurance & Billing',
    question: 'What insurance plans do you accept?',
    answer: 'CareNova Health accepts all major commercial insurance carriers, Medicare, and regional health maintenance networks. Self-pay transparent pricing options are also available for uninsured patients.'
  },
  {
    id: 'faq-4',
    category: 'Insurance & Billing',
    question: 'Can I pay my medical bill online?',
    answer: 'Yes! Patient billing statements can be paid securely online via debit card, credit card, or health savings account (HSA/FSA) through your patient portal.'
  },
  {
    id: 'faq-5',
    category: 'Virtual Care',
    question: 'How do 24/7 telemedicine video consults work?',
    answer: 'Select Virtual Telemedicine during appointment booking. At your scheduled time, launch your secure video link from your smartphone or computer browser—no app download required.'
  },
  {
    id: 'faq-6',
    category: 'Emergency Care',
    question: 'What should I do if I am having a medical emergency?',
    answer: 'If you are experiencing severe chest pain, extreme difficulty breathing, major head trauma, or stroke symptoms, call emergency services (911) immediately or visit our 24/7 Central Flagship ER location.'
  },
  {
    id: 'faq-7',
    category: 'Services',
    question: 'What documents should I bring to my first appointment?',
    answer: 'Please bring a valid government photo ID, your active insurance membership card, a list of current medications and supplements, and any recent lab results or imaging scans.'
  }
];
