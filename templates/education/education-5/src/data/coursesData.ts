import { Course, Instructor, LearningPath, Testimonial, UserProgress } from '../types';

export const CATEGORIES = [
  'All',
  'Data Science',
  'AI & Machine Learning',
  'Digital Marketing',
  'Frontend Engineering',
  'Cloud & DevOps',
  'UI/UX Design'
];

export const INSTRUCTORS: Instructor[] = [
  {
    id: 'inst-evelyn',
    name: 'Dr. Evelyn Reed',
    role: 'Lead Data Scientist & AI Fellow',
    company: 'MIT & OpenAI Research Partner',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    rating: 4.8,
    studentsCount: 148000,
    bio: 'PhD in Data Systems with 12+ years building statistical analytics and production machine learning models.',
    coursesCount: 8,
  },
  {
    id: 'inst-ben',
    name: 'Ben Chen',
    role: 'Growth Marketing Director',
    company: 'Global Brand Strategy Labs',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    rating: 4.9,
    studentsCount: 112000,
    bio: 'Pioneered omnichannel growth loops for 30+ enterprise campaigns and performance marketing funnels.',
    coursesCount: 6,
  },
  {
    id: 'inst-mia',
    name: 'Mia Dubois',
    role: 'Senior AI Engineer & Author',
    company: 'DeepMind Research Partner',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
    rating: 4.7,
    studentsCount: 95000,
    bio: 'Specialist in Python applied neural networks, PyTorch model deployment, and natural language processing.',
    coursesCount: 5,
  },
  {
    id: 'inst-marcus',
    name: 'Marcus Vance',
    role: 'Principal Systems Architect',
    company: 'Stripe & Netflix Alumni',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    rating: 4.95,
    studentsCount: 120000,
    bio: 'Full-stack distributed systems engineer and creator of popular open-source React & TypeScript development frameworks.',
    coursesCount: 7,
  }
];

export const COURSES: Course[] = [
  {
    id: 'course-data-science-masterclass',
    title: 'Data Science Masterclass',
    subtitle: 'Comprehensive mastery of statistical learning, big data pipelines, machine learning algorithms, and real-time visualization.',
    category: 'Data Science',
    difficulty: 'All Levels',
    rating: 4.8,
    reviewsCount: 4120,
    studentsCount: 36400,
    duration: '45 Hours',
    lessonsCount: 56,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    badge: 'Featured',
    instructor: INSTRUCTORS[0],
    price: 89,
    originalPrice: 189,
    progress: 35,
    tags: ['Data Science', 'Python', 'Machine Learning', 'Pandas', 'SQL', 'Analytics'],
    outcomes: [
      'Master data wrangling, feature engineering, and statistical analysis with Pandas and NumPy',
      'Deploy production-ready machine learning models using Scikit-Learn and XGBoost',
      'Design interactive analytical dashboards with Streamlit and Plotly',
      'Execute high-volume SQL queries and architect analytical warehouse pipelines'
    ],
    prerequisites: ['Basic math intuition', 'Curiosity about exploratory data analysis'],
    chapters: [
      {
        id: 'c1',
        title: 'Module 1: Foundations of Exploratory Data Analysis & Statistics',
        lessons: [
          {
            id: 'l1-1',
            title: 'Welcome to the Data Science Masterclass',
            duration: '07:15',
            type: 'video',
            completed: true,
            summary: 'Course overview, setup of Python data science notebook environments, and roadmap.'
          },
          {
            id: 'l1-2',
            title: 'Statistical Distributions & Hypothesis Testing',
            duration: '18:40',
            type: 'video',
            completed: true,
            summary: 'Understanding variance, standard deviation, Z-scores, and p-value statistical significance.'
          },
          {
            id: 'l1-3',
            title: 'Interactive Code: Vectorized Pandas Dataframe Analytics',
            duration: '20:10',
            type: 'code',
            completed: true,
            language: 'python',
            codeSnippet: `# Vectorized Feature Engineering in Python
import numpy as np

def compute_z_scores(data):
    """
    Standardize continuous feature arrays to zero mean and unit variance.
    """
    mean = np.mean(data)
    std = np.std(data)
    z_scores = (data - mean) / (std if std != 0 else 1.0)
    return np.round(z_scores, 2)

# Sample transaction amounts
transactions = np.array([120.5, 45.0, 310.2, 89.9, 1500.0, 64.3])
normalized = compute_z_scores(transactions)
print(f"Original series length: {len(transactions)}")
print(f"Normalized Z-scores: {normalized}")
print(f"Detected outlier index: {np.argmax(normalized)} (value: {transactions[np.argmax(normalized)]})")`,
            expectedOutput: 'Original series length: 6\nNormalized Z-scores: [-0.49 -0.63 -0.13 -0.55  2.16 -0.6 ]\nDetected outlier index: 4 (value: 1500.0)'
          },
          {
            id: 'l1-4',
            title: 'Knowledge Check: Supervised vs Unsupervised Paradigms',
            duration: '10:00',
            type: 'quiz',
            completed: false,
            quizQuestion: {
              question: 'Which of the following scenarios is an example of Unsupervised Learning?',
              options: [
                'Predicting house prices based on square footage and location labels',
                'Classifying customer segments based on purchasing behavior without prior labels',
                'Detecting spam emails based on a labeled dataset of 10,000 spam/not-spam examples',
                'Forecasting next month stock values with regression equations'
              ],
              correctIndex: 1,
              explanation: 'Unsupervised learning discovers hidden patterns or groupings in datasets without explicit target labels.'
            }
          }
        ]
      },
      {
        id: 'c2',
        title: 'Module 2: Advanced Machine Learning & Predictive Modeling',
        lessons: [
          {
            id: 'l2-1',
            title: 'Gradient Boosting & Ensemble Decision Trees',
            duration: '24:30',
            type: 'video',
            completed: false,
            summary: 'Deep dive into XGBoost, LightGBM, and hyperparameter tuning with Bayesian optimization.'
          },
          {
            id: 'l2-2',
            title: 'Hands-on: Model Evaluation & ROC-AUC Metrics',
            duration: '25:00',
            type: 'code',
            completed: false,
            language: 'python',
            codeSnippet: `# Confusion Matrix & Classification Precision
def calculate_metrics(tp, fp, fn, tn):
    precision = tp / (tp + fp) if (tp + fp) > 0 else 0
    recall = tp / (tp + fn) if (tp + fn) > 0 else 0
    f1 = 2 * (precision * recall) / (precision + recall) if (precision + recall) > 0 else 0
    return round(precision, 3), round(recall, 3), round(f1, 3)

p, r, f1 = calculate_metrics(tp=94, fp=8, fn=6, tn=192)
print(f"Precision: {p} | Recall: {r} | F1-Score: {f1}")`,
            expectedOutput: 'Precision: 0.922 | Recall: 0.94 | F1-Score: 0.931'
          }
        ]
      }
    ]
  },
  {
    id: 'course-digital-marketing',
    title: 'Digital Marketing Strategy',
    subtitle: 'From brand positioning and multi-channel SEO to programmatic ad buying, retention funnels, and viral growth loops.',
    category: 'Digital Marketing',
    difficulty: 'Beginner',
    rating: 4.9,
    reviewsCount: 3290,
    studentsCount: 29800,
    duration: '40 Hours',
    lessonsCount: 48,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    badge: 'Popular',
    instructor: INSTRUCTORS[1],
    price: 79,
    originalPrice: 159,
    progress: 20,
    tags: ['Marketing', 'SEO', 'Content Strategy', 'Social Media', 'Analytics', 'Growth'],
    outcomes: [
      'Architect high-converting landing pages and retention email workflows',
      'Execute profitable PPC campaigns across Google, Meta, and LinkedIn Ads',
      'Implement data-driven attribution modeling and customer acquisition cost (CAC) optimization',
      'Leverage AI copywriting tools to scale content production 10x'
    ],
    prerequisites: ['No prior experience required'],
    chapters: [
      {
        id: 'cm1',
        title: 'Module 1: Foundations of Modern Growth Marketing',
        lessons: [
          {
            id: 'lm1-1',
            title: 'Modern Consumer Psychology & Persona Mapping',
            duration: '12:00',
            type: 'video',
            completed: true,
            summary: 'How to map ICP pain points, value propositions, and messaging matrices.'
          },
          {
            id: 'lm1-2',
            title: 'Interactive Exercise: Calculating LTV / CAC Ratio',
            duration: '15:00',
            type: 'code',
            completed: false,
            language: 'typescript',
            codeSnippet: `// Growth Metric Calculator
interface CampaignMetrics {
  adSpend: number;
  newCustomers: number;
  averageOrderValue: number;
  purchaseFrequency: number;
  retentionYears: number;
}

function analyzeUnitEconomics(data: CampaignMetrics) {
  const cac = data.adSpend / data.newCustomers;
  const ltv = data.averageOrderValue * data.purchaseFrequency * data.retentionYears;
  const ltvToCac = Number((ltv / cac).toFixed(2));
  
  return {
    cac: \`$\${cac.toFixed(2)}\`,
    ltv: \`$\${ltv.toFixed(2)}\`,
    ratio: ltvToCac,
    health: ltvToCac >= 3.0 ? 'Strong Growth Health' : 'Optimize Acquisition Cost'
  };
}

const campaign = analyzeUnitEconomics({
  adSpend: 5000,
  newCustomers: 125,
  averageOrderValue: 85,
  purchaseFrequency: 4,
  retentionYears: 2
});

console.log('Unit Economics Analysis:', campaign);`,
            expectedOutput: "Unit Economics Analysis: { cac: '$40.00', ltv: '$680.00', ratio: 17, health: 'Strong Growth Health' }"
          },
          {
            id: 'lm1-3',
            title: 'Knowledge Check: Conversion Rate Optimization',
            duration: '08:00',
            type: 'quiz',
            completed: false,
            quizQuestion: {
              question: 'What is the primary objective of A/B testing on a marketing landing page?',
              options: [
                'To change as many elements as possible simultaneously',
                'To isolate a single variable and measure statistically significant conversion improvements',
                'To increase server latency for tracking scripts',
                'To replace all copy with generic marketing buzzwords'
              ],
              correctIndex: 1,
              explanation: 'Valid A/B testing isolates individual changes (such as CTA text or headline) to accurately measure causal impact on conversions.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-python-ai-apps',
    title: 'Python for AI Applications',
    subtitle: 'Build intelligent applications with Python, OpenAI APIs, LangChain, vector search, and autonomous agent frameworks.',
    category: 'AI & ML',
    difficulty: 'Intermediate',
    rating: 4.7,
    reviewsCount: 2870,
    studentsCount: 24500,
    duration: '30 Hours',
    lessonsCount: 38,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    badge: 'Trending',
    instructor: INSTRUCTORS[2],
    price: 95,
    originalPrice: 199,
    progress: 50,
    tags: ['Python', 'AI', 'NLP', 'FastAPI', 'PyTorch', 'Agents'],
    outcomes: [
      'Build end-to-end AI applications using modern Python 3.12 and FastAPI',
      'Integrate LLM tool calling, structured outputs, and streaming responses',
      'Create custom agents with memory systems and autonomous execution capabilities',
      'Deploy AI web services securely to cloud infrastructure'
    ],
    prerequisites: ['Basic Python programming syntax'],
    chapters: [
      {
        id: 'py1',
        title: 'Module 1: Building Modern AI Pipelines with Python',
        lessons: [
          {
            id: 'py-1',
            title: 'Setting Up Modern Python Async AI Tooling',
            duration: '11:20',
            type: 'video',
            completed: true,
            summary: 'Installing uv, virtual environments, async HTTP clients, and environment variables.'
          },
          {
            id: 'py-2',
            title: 'Interactive Code: Scaled Attention in Python',
            duration: '22:00',
            type: 'code',
            completed: true,
            language: 'python',
            codeSnippet: `# Scaled Dot-Product Attention Implementation
import numpy as np

def scaled_dot_product_attention(Q, K, V):
    dk = float(K.shape[-1])
    matmul_qk = np.matmul(Q, K.swapaxes(-2, -1))
    scaled_attention_logits = matmul_qk / np.sqrt(dk)
    attention_weights = np.exp(scaled_attention_logits) / np.sum(np.exp(scaled_attention_logits), axis=-1, keepdims=True)
    output = np.matmul(attention_weights, V)
    return output, attention_weights

Q = np.random.randn(1, 4, 32)
K = np.random.randn(1, 4, 32)
V = np.random.randn(1, 4, 32)
out, weights = scaled_dot_product_attention(Q, K, V)
print(f"Generated Attention Tensor: {out.shape}")
print(f"Attention Weights Shape: {weights.shape}")`,
            expectedOutput: 'Generated Attention Tensor: (1, 4, 32)\nAttention Weights Shape: (1, 4, 4)'
          },
          {
            id: 'py-3',
            title: 'Knowledge Check: Python Async AI Execution',
            duration: '06:00',
            type: 'quiz',
            completed: false,
            quizQuestion: {
              question: 'Why is async I/O (asyncio) crucial when communicating with AI LLM APIs?',
              options: [
                'It allows concurrent handling of multiple external API calls without blocking the main event loop',
                'It automatically trains the AI model faster',
                'It disables SSL encryption for faster speeds',
                'It converts Python code directly to C++'
              ],
              correctIndex: 0,
              explanation: 'LLM responses take hundreds of milliseconds to stream; async I/O ensures the server handles hundreds of concurrent requests efficiently.'
            }
          }
        ]
      }
    ]
  },
  {
    id: 'course-react-fullstack',
    title: 'Full-Stack React & High-Performance TypeScript Systems',
    subtitle: 'Master React 19, Server Actions, SSR streaming, Tailwind CSS, WebSockets, and cloud architecture.',
    category: 'Frontend Engineering',
    difficulty: 'Intermediate',
    rating: 4.95,
    reviewsCount: 3120,
    studentsCount: 22100,
    duration: '38 Hours',
    lessonsCount: 44,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    badge: 'Popular',
    instructor: INSTRUCTORS[3],
    price: 99,
    originalPrice: 199,
    progress: 10,
    tags: ['React 19', 'TypeScript', 'Next.js', 'Tailwind CSS', 'WebSockets', 'GraphQL'],
    outcomes: [
      'Construct enterprise design systems with React, TypeScript, and accessible components',
      'Optimize Web Vitals with Server Components, optimistic mutations, and asset caching',
      'Build real-time multi-user applications with WebSockets and CRDT sync',
      'Deploy globally distributed full-stack apps with edge computing'
    ],
    prerequisites: ['Basic JavaScript understanding'],
    chapters: []
  }
];

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'path-data-science',
    title: 'Data Science & Machine Learning Lead',
    role: 'Lead Data Scientist',
    description: 'Master end-to-end data pipelines, predictive statistical modeling, deep learning architectures, and scalable analytics.',
    coursesCount: 5,
    estimatedMonths: 4,
    avgSalary: '$162,000 / yr',
    color: 'from-teal-500 to-emerald-600',
    skills: ['Python', 'Pandas', 'XGBoost', 'PyTorch', 'SQL', 'Data Pipelines'],
    steps: [
      { title: 'Phase 1: Exploratory Data Analysis & Statistics', description: 'Hypothesis testing, probability, and exploratory wrangling.', duration: '3 Weeks' },
      { title: 'Phase 2: Supervised & Unsupervised Machine Learning', description: 'Classification, regression, clustering, and cross-validation.', duration: '4 Weeks' },
      { title: 'Phase 3: Deep Neural Networks & Computer Vision / NLP', description: 'Transformers, embeddings, and high-performance inference.', duration: '5 Weeks' },
      { title: 'Phase 4: Production MLOps & Real-Time Dashboards', description: 'Deploying APIs, monitoring data drift, and Capstone Project.', duration: '4 Weeks' }
    ]
  },
  {
    id: 'path-digital-marketing',
    title: 'Digital Marketing & Growth Strategist',
    role: 'Director of Growth Marketing',
    description: 'Transform customer acquisition funnels, master multi-channel paid ads, SEO domination, and data-driven attribution.',
    coursesCount: 4,
    estimatedMonths: 3,
    avgSalary: '$135,000 / yr',
    color: 'from-orange-500 to-amber-600',
    skills: ['Growth Loops', 'PPC Ads', 'SEO Strategy', 'Content Engines', 'Analytics'],
    steps: [
      { title: 'Phase 1: Brand Strategy & Consumer Psychology', description: 'Positioning, value matrices, and customer journey mapping.', duration: '2 Weeks' },
      { title: 'Phase 2: Performance Media & Paid Acquisition', description: 'Google, Meta, and LinkedIn ad campaigns with high ROAS.', duration: '4 Weeks' },
      { title: 'Phase 3: Retention, Email Flows & CRO', description: 'Lifecycle nurturing, A/B testing, and funnel optimization.', duration: '3 Weeks' },
      { title: 'Phase 4: Executive Growth Reporting', description: 'LTV/CAC modeling and scaling marketing teams.', duration: '3 Weeks' }
    ]
  },
  {
    id: 'path-ai-engineer',
    title: 'Applied AI & LLM Systems Architect',
    role: 'Staff AI Engineer',
    description: 'From attention foundations to training fine-tuned transformer weights, vector indexing, and autonomous agent swarms.',
    coursesCount: 6,
    estimatedMonths: 5,
    avgSalary: '$185,000 / yr',
    color: 'from-indigo-500 to-purple-600',
    skills: ['Transformers', 'LangChain', 'FastAPI', 'vLLM', 'RAG Pipelines'],
    steps: [
      { title: 'Phase 1: Advanced Python & PyTorch Foundations', description: 'Tensors, backprop, GPU memory optimizations, and async engines.', duration: '4 Weeks' },
      { title: 'Phase 2: Transformer Architectures & Multi-Head Attention', description: 'Building attention mechanisms and positional encodings.', duration: '4 Weeks' },
      { title: 'Phase 3: Vector Databases & Enterprise RAG', description: 'Hybrid search, re-ranking, chunking strategies, and evaluation.', duration: '4 Weeks' },
      { title: 'Phase 4: Autonomous Multi-Agent Swarms', description: 'Tool calling, sandboxing, and production observability.', duration: '5 Weeks' }
    ]
  },
  {
    id: 'path-frontend-arch',
    title: 'Principal Frontend & Systems Architect',
    role: 'Principal Frontend Engineer',
    description: 'Build enterprise-grade design systems, state engines, micro-frontends, and high-concurrency client-side architectures.',
    coursesCount: 5,
    estimatedMonths: 4,
    avgSalary: '$170,000 / yr',
    color: 'from-blue-500 to-cyan-600',
    skills: ['React 19', 'TypeScript', 'Next.js', 'Design Systems', 'Performance'],
    steps: [
      { title: 'Phase 1: Deep TypeScript & Reactive State', description: 'Type-level programming, generics, and concurrent state.', duration: '3 Weeks' },
      { title: 'Phase 2: Enterprise Component Architectures', description: 'Design tokens, accessibility (a11y), and compound components.', duration: '4 Weeks' },
      { title: 'Phase 3: Web Performance & Streaming SSR', description: 'Bundle splitting, edge rendering, and Core Web Vitals.', duration: '4 Weeks' },
      { title: 'Phase 4: Real-time Multi-User & Offline Sync', description: 'WebSockets, CRDTs, and local-first architecture.', duration: '4 Weeks' }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Sarah Chen',
    role: 'Data Scientist at Microsoft',
    company: 'Microsoft',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    courseCompleted: 'Data Science Masterclass',
    rating: 5,
    quote: 'The hands-on coding sandbox and clear mathematical breakdowns helped me land my dream data science role. The clarity of the curriculum is unmatched.',
    salaryIncrease: '+68% Comp Increase'
  },
  {
    id: 't-2',
    name: 'James Morales',
    role: 'Growth Marketing Lead',
    company: 'Fintech Hub',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    courseCompleted: 'Digital Marketing Strategy',
    rating: 5,
    quote: 'The unit economics and campaign simulation exercises directly scaled our company revenue. Learnora is the most practical platform available.',
    salaryIncrease: '+85% Salary Jump'
  },
  {
    id: 't-3',
    name: 'Mia Zhao',
    role: 'AI Engineer at Autonomous Labs',
    company: 'Autonomous Labs',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    courseCompleted: 'Python for AI Applications',
    rating: 5,
    quote: 'From zero PyTorch knowledge to building multi-agent systems with live terminal testing. Learnora transformed my career trajectory.',
    salaryIncrease: 'Fast-Tracked to Senior'
  },
  {
    id: 't-4',
    name: 'David Okafor',
    role: 'Full-Stack Developer',
    company: 'Stripe Ecosystem',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    courseCompleted: 'Full-Stack React & High-Performance TypeScript',
    rating: 5,
    quote: 'The real-time code sandbox and active mentor guidance made mastering complex architecture feel natural and exciting.',
    salaryIncrease: 'Certified Engineer'
  }
];

export const INITIAL_USER_PROGRESS: UserProgress = {
  name: 'Alex Rivera',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  level: 4,
  currentXP: 3450,
  nextLevelXP: 5000,
  streakDays: 14,
  totalHours: 42.5,
  completedLessonsCount: 26,
  enrolledCoursesCount: 4,
  certificatesEarned: 2,
  weeklyActivity: [
    { day: 'Monday', shortDay: 'Mon', hours: 2.5, lessonsCompleted: 3, xpEarned: 350 },
    { day: 'Tuesday', shortDay: 'Tue', hours: 3.8, lessonsCompleted: 5, xpEarned: 520 },
    { day: 'Wednesday', shortDay: 'Wed', hours: 1.5, lessonsCompleted: 2, xpEarned: 200 },
    { day: 'Thursday', shortDay: 'Thu', hours: 4.2, lessonsCompleted: 6, xpEarned: 640 },
    { day: 'Friday', shortDay: 'Fri', hours: 3.0, lessonsCompleted: 4, xpEarned: 420 },
    { day: 'Saturday', shortDay: 'Sat', hours: 5.5, lessonsCompleted: 7, xpEarned: 850 },
    { day: 'Sunday', shortDay: 'Sun', hours: 2.0, lessonsCompleted: 3, xpEarned: 300 }
  ],
  badges: [
    {
      id: 'badge-streak-14',
      title: 'Consistency Titan',
      description: 'Maintained a consecutive 14-day study streak with zero missed sessions.',
      icon: 'Flame',
      unlocked: true,
      unlockedAt: 'August 14, 2026',
      rarity: 'Epic',
      xp: 500
    },
    {
      id: 'badge-ai-architect',
      title: 'Attention Master',
      description: 'Implemented scaled dot-product attention in Python with 100% test accuracy.',
      icon: 'Cpu',
      unlocked: true,
      unlockedAt: 'August 10, 2026',
      rarity: 'Legendary',
      xp: 750
    },
    {
      id: 'badge-code-sand',
      title: 'Sandbox Explorer',
      description: 'Successfully executed 50+ real-time code runs in the browser terminal.',
      icon: 'Code2',
      unlocked: true,
      unlockedAt: 'August 05, 2026',
      rarity: 'Rare',
      xp: 300
    },
    {
      id: 'badge-quiz-wizard',
      title: 'Perfectionist',
      description: 'Scored 100% on 5 consecutive technical assessment quizzes.',
      icon: 'Award',
      unlocked: false,
      rarity: 'Epic',
      xp: 400
    }
  ],
  notes: [
    {
      id: 'note-1',
      courseId: 'course-data-science-masterclass',
      lessonTitle: 'Foundations of Exploratory Data Analysis & Statistics',
      timestamp: 'Yesterday at 4:15 PM',
      content: 'Standardizing features with Z-scores ensures outliers do not unduly distort distance-based classifiers!'
    },
    {
      id: 'note-2',
      courseId: 'course-digital-marketing',
      lessonTitle: 'Modern Consumer Psychology & Persona Mapping',
      timestamp: '3 days ago',
      content: 'LTV to CAC ratio greater than 3.0 represents a healthy, scalable unit economic model.'
    }
  ]
};
