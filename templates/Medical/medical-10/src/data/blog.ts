export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  publishedDate: string;
  readTime: string;
  heroImage: string;
  tableOfContents: string[];
  tags: string[];
  isFeatured?: boolean;
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'post-1',
    slug: '10-essential-habits-for-long-term-heart-health',
    title: '10 Evidence-Based Habits for Long-Term Cardiovascular Health',
    category: 'Heart Health',
    excerpt: 'Simple daily choices in diet, sleep, and physical activity can reduce your risk of cardiovascular disease by up to 80%. Here is what top cardiologists recommend.',
    content: `
### Understanding Your Cardiovascular Risk
Cardiovascular disease remains the leading health challenge worldwide, yet up to 80% of premature heart attacks and strokes are preventable through targeted lifestyle modifications. In this comprehensive guide, Dr. Sarah Jenkins breaks down actionable steps you can start taking today.

#### 1. Prioritize Aerobic & Resistance Exercise
Aim for at least 150 minutes of moderate-intensity aerobic physical activity every week. Brisk walking, cycling, and swimming strengthen the myocardium, lower resting heart rate, and enhance vascular elasticity.

#### 2. Embrace the Mediterranean Dietary Pattern
Rich in extra virgin olive oil, nuts, leafy greens, wild salmon, and whole grains, the Mediterranean diet is clinically proven to lower low-density lipoprotein (LDL) cholesterol and reduce systemic inflammation.

#### 3. Monitor Blood Pressure Regularly
Hypertension is often called a "silent killer" because it produces no outward symptoms until arterial damage has occurred. Keep home logs and aim for readings under 120/80 mmHg.

#### 4. Sleep Hygiene Matters
Consistent 7-9 hours of restorative sleep is critical. Chronic sleep deprivation elevates cortisol levels and sympathetic nervous system activation, placing stress on blood vessels.
    `,
    authorName: 'Dr. Sarah Jenkins',
    authorRole: 'Senior Cardiologist, MD FACC',
    authorAvatar: '/images/doctors/dr-sarah-jenkins.jpg',
    publishedDate: 'August 18, 2026',
    readTime: '6 min read',
    heroImage: '/images/blog/heart-health.jpg',
    tableOfContents: [
      'Understanding Your Cardiovascular Risk',
      '1. Prioritize Aerobic & Resistance Exercise',
      '2. Embrace the Mediterranean Dietary Pattern',
      '3. Monitor Blood Pressure Regularly',
      '4. Sleep Hygiene Matters'
    ],
    tags: ['Cardiology', 'Prevention', 'Diet', 'Fitness'],
    isFeatured: true
  },
  {
    id: 'post-2',
    slug: 'managing-chronic-migraines-modern-treatments',
    title: 'Managing Chronic Migraines: From Breakthrough Therapies to Lifestyle Triggers',
    category: 'Neurology',
    excerpt: 'Migraines are far more than severe headaches. Discover how CGRP inhibitors, dietary changes, and stress management are transforming migraine care.',
    content: `
### The Neurological Mechanism of Migraines
A migraine is a complex neurovascular event characterized by throbbing pain, sensory hypersensitivity, and brainstem hyperactivity.

#### Identifying Common Triggers
Keeping a detailed headache journal helps isolate personal triggers, such as weathered barometric shifts, aged cheeses, nitrate preservatives, or hormonal fluctuations.

#### Modern Preventive Therapies
Targeted CGRP monoclonal antibodies and specialized neuro-stimulation devices now offer relief for patients who previously failed conventional treatments.
    `,
    authorName: 'Dr. Marcus Vance',
    authorRole: 'Neurologist, MD PhD',
    authorAvatar: '/images/doctors/dr-marcus-vance.jpg',
    publishedDate: 'August 12, 2026',
    readTime: '8 min read',
    heroImage: '/images/blog/neurology.jpg',
    tableOfContents: [
      'The Neurological Mechanism of Migraines',
      'Identifying Common Triggers',
      'Modern Preventive Therapies'
    ],
    tags: ['Neurology', 'Migraine', 'Pain Care', 'Headache']
  },
  {
    id: 'post-3',
    slug: 'pediatric-nutrition-building-strong-immune-systems',
    title: 'Pediatric Nutrition: How to Fuel Your Child’s Immune System',
    category: 'Children\'s Health',
    excerpt: 'A child’s immune resilience starts in the gut microbiome. Learn key nutrients, meal planning tips, and how to navigate picky eating.',
    content: `
### The Gut-Immune Connection in Growing Children
Over 70% of immune tissue resides in the gastrointestinal tract. Providing diverse fiber, fermented foods, and essential vitamins builds robust natural defense mechanisms against seasonal school illnesses.

#### Essential Micro-Nutrients
- **Vitamin D3**: Supports T-cell regulation and bone mineralization.
- **Zinc**: Crucial for cellular immunity and wound healing.
- **Probiotics**: Helps cultivate healthy bacterial flora.
    `,
    authorName: 'Dr. Amara Chen',
    authorRole: 'Chief of Pediatrics, MD FAAP',
    authorAvatar: '/images/doctors/dr-amara-chen.jpg',
    publishedDate: 'August 05, 2026',
    readTime: '5 min read',
    heroImage: '/images/blog/pediatrics.jpg',
    tableOfContents: [
      'The Gut-Immune Connection in Growing Children',
      'Essential Micro-Nutrients'
    ],
    tags: ['Pediatrics', 'Nutrition', 'Immunity', 'Kids Wellness']
  },
  {
    id: 'post-4',
    slug: 'the-science-of-skin-barrier-repair',
    title: 'Dermatologist’s Guide: Restoring Your Skin Barrier & Hydration',
    category: 'Dermatology',
    excerpt: 'Over-exfoliation and environmental stress can compromise your stratum corneum. Here is how ceramides and hyaluronic acid protect skin integrity.',
    content: `
### What is the Skin Moisture Barrier?
Your skin barrier is a lipid-rich matrix that retains intracellular hydration while keeping out pathogens and irritants.

#### 3 Signs Your Barrier is Compromised
1. Stinging sensation upon applying mild moisturizers.
2. Chronic redness and localized flaky patches.
3. Sudden breakout spikes paired with surface tightness.
    `,
    authorName: 'Dr. Robert Sterling',
    authorRole: 'Consultant Dermatologist, MD FAAD',
    authorAvatar: '/images/doctors/dr-robert-sterling.jpg',
    publishedDate: 'July 28, 2026',
    readTime: '4 min read',
    heroImage: '/images/blog/dermatology.jpg',
    tableOfContents: [
      'What is the Skin Moisture Barrier?',
      '3 Signs Your Barrier is Compromised'
    ],
    tags: ['Dermatology', 'Skin Care', 'Hydration', 'Wellness']
  },
  {
    id: 'post-5',
    slug: 'posture-ergonomics-for-remote-workers',
    title: 'Desk Ergonomics & Spinal Health: Preventing Back Pain in the Remote Work Era',
    category: 'Fitness',
    excerpt: 'Sitting for 8+ hours a day can strain the lumbar spine. Learn micro-stretch routines and monitor setup rules to protect your back.',
    content: `
### The Mechanics of Lumbar Pressure
When seated with forward head posture, effective neck strain triples, increasing spinal disc compression dramatically.

#### Quick Desk Setup Rules
- Keep monitor top aligned with eye height.
- Feet should rest flat on the floor with knees at a 90-degree angle.
- Take a 2-minute movement break every 45 minutes.
    `,
    authorName: 'Dr. Olivia Taylor',
    authorRole: 'Lead Physical Therapist, DPT OCS',
    authorAvatar: '/images/doctors/dr-olivia-taylor.jpg',
    publishedDate: 'July 20, 2026',
    readTime: '7 min read',
    heroImage: '/images/blog/dental-care.jpg',
    tableOfContents: [
      'The Mechanics of Lumbar Pressure',
      'Quick Desk Setup Rules'
    ],
    tags: ['Physiotherapy', 'Posture', 'Ergonomics', 'Back Care']
  },
  {
    id: 'post-6',
    slug: 'understanding-anxiety-and-mindfulness-practices',
    title: 'Navigating Stress & Anxiety: Evidence-Based Psychological Strategies',
    category: 'Mental Wellness',
    excerpt: 'How cognitive behavioral techniques and physiological sigh breathing regulate autonomic nervous system arousal during stress.',
    content: `
### De-escalating Nervous System Overload
When stress triggers a sympathetic fight-or-flight cascade, targeted breathwork and cognitive reframing can rapidly restore homeostasis.

#### The Double Physiological Sigh Technique
Take two quick inhales through the nose, followed by a long, slow exhale through open lips. Repeat 3 times to immediately slow heart rate.
    `,
    authorName: 'Dr. Nathaniel Cross',
    authorRole: 'Psychiatrist, MD DFAPA',
    authorAvatar: '/images/doctors/dr-nathaniel-cross.jpg',
    publishedDate: 'July 14, 2026',
    readTime: '6 min read',
    heroImage: '/images/blog/psychiatry.jpg',
    tableOfContents: [
      'De-escalating Nervous System Overload',
      'The Double Physiological Sigh Technique'
    ],
    tags: ['Mental Health', 'Anxiety', 'Mindfulness', 'Stress Relief']
  }
];
