import { Course, EventItem, ClubItem, ApplicationSubmission, RegisteredCourse, TimetableSlot, TuitionInvoice, NoticeItem, FacultyMember } from '../types';

export const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: 'fac-1',
    name: 'Dr. Evelyn Vance',
    role: 'Professor & Dean of Computing',
    department: 'Computer Science & AI',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    email: 'e.vance@eduvora.edu',
    qualifications: 'Ph.D. Stanford University, M.S. MIT',
    bio: 'Pioneer in deep reinforcement learning and large language model architectures with over 45 international research papers.',
    publicationsCount: 52,
  },
  {
    id: 'fac-2',
    name: 'Dr. Marcus Holloway',
    role: 'Associate Professor of Behavioral Science',
    department: 'Humanities & Social Sciences',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    email: 'm.holloway@eduvora.edu',
    qualifications: 'Ph.D. Oxford University',
    bio: 'Specialist in cognitive neuropsychology and behavioral decision frameworks in organizational leadership.',
    publicationsCount: 38,
  },
  {
    id: 'fac-3',
    name: 'Prof. Alistair Sterling',
    role: 'Chair of Global Strategy & Economics',
    department: 'Business & Management',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    email: 'a.sterling@eduvora.edu',
    qualifications: 'Ph.D. Harvard Business School',
    bio: 'Former senior advisor to the World Economic Forum and author of "Algorithmic Market Equilibria".',
    publicationsCount: 44,
  },
  {
    id: 'fac-4',
    name: 'Dr. Soraya Lin',
    role: 'Head of Genomic Bioengineering',
    department: 'BioTech & Health Sciences',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    email: 's.lin@eduvora.edu',
    qualifications: 'Ph.D. UC Berkeley, Postdoc Caltech',
    bio: 'Leads CRISPR synthetic biology synthesis lab with $8.4M in NIH and NSF innovation grants.',
    publicationsCount: 61,
  },
  {
    id: 'fac-5',
    name: 'Prof. Liam O\'Connor',
    role: 'Director of Autonomous Systems',
    department: 'Engineering & Robotics',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    email: 'l.oconnor@eduvora.edu',
    qualifications: 'Ph.D. Carnegie Mellon University',
    bio: 'Specialized in computer vision for multi-agent autonomous drone swarms and haptic surgical robotics.',
    publicationsCount: 49,
  }
];

export const COURSES_DATA: Course[] = [
  {
    id: 'ms-data-science',
    title: 'M.S. in Data Science & Machine Learning',
    degreeLevel: 'Postgraduate',
    department: 'Computer Science & AI',
    mode: 'Hybrid',
    tagline: 'Master predictive modeling, neural architectures, and enterprise big data pipelines.',
    description: 'A cutting-edge postgraduate program engineered in partnership with top tech leaders. Students build production-scale ML systems, distributed cloud pipelines, and generative AI applications with direct industry capstones.',
    tuitionPerSemester: 14500,
    durationYears: 2,
    totalCredits: 64,
    accreditation: ['ABET Accredited', 'IEEE Compliant', 'NAAC A++'],
    rating: 4.9,
    reviewsCount: 184,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    facultyLead: FACULTY_MEMBERS[0],
    prerequisites: ['Bachelor degree in STEM / Quantitative field', 'Proficiency in Python and Calculus', 'Minimum 3.0 GPA or equivalent'],
    careerOutcomes: ['Principal Data Scientist', 'AI/ML Systems Engineer', 'Quantitative Algorithmic Researcher', 'Chief Analytics Officer'],
    applicationDeadline: 'October 30, 2026',
    featured: true,
    syllabus: [
      {
        semester: 1,
        title: 'Foundations of Modern Data Science',
        modules: [
          { code: 'DS-501', name: 'Advanced Statistical Inference & Matrix Theory', credits: 4, description: 'Bayesian statistics, stochastic calculus, and dimensionality reduction techniques.', type: 'Core' },
          { code: 'DS-502', name: 'Scalable Distributed Computing & PySpark', credits: 4, description: 'Hadoop, Spark cluster computing, and streaming analytics pipelines.', type: 'Core' },
          { code: 'DS-503', name: 'Deep Learning & Neural Architectures Lab', credits: 4, description: 'PyTorch implementation of CNNs, RNNs, and attention mechanisms.', type: 'Lab' },
          { code: 'DS-504', name: 'Ethics, Bias, and Governance in AI', credits: 4, description: 'Regulatory frameworks, fairness constraints, and model explainability.', type: 'Elective' },
        ]
      },
      {
        semester: 2,
        title: 'Advanced Machine Learning & Natural Language',
        modules: [
          { code: 'DS-601', name: 'Transformer Architectures & LLM Engineering', credits: 4, description: 'Fine-tuning, LoRA, RLHF, and vector retrieval database integration.', type: 'Core' },
          { code: 'DS-602', name: 'Computer Vision & Multimodal Embeddings', credits: 4, description: 'Diffusion models, object detection, and visual-spatial reasoning.', type: 'Core' },
          { code: 'DS-603', name: 'MLOps: Cloud Deployment & Monitoring', credits: 4, description: 'Docker, Kubernetes, MLflow, and low-latency API serving.', type: 'Lab' },
          { code: 'DS-604', name: 'Reinforcement Learning in Robotics & Finance', credits: 4, description: 'Markov decision processes, Q-learning, and policy gradients.', type: 'Elective' },
        ]
      },
      {
        semester: 3,
        title: 'Specialized Electives & Industry Practicum',
        modules: [
          { code: 'DS-701', name: 'Graph Neural Networks & Knowledge Graphs', credits: 4, description: 'Social network analysis, molecule modeling, and graph algorithms.', type: 'Elective' },
          { code: 'DS-702', name: 'Enterprise Data Architecture & Warehousing', credits: 4, description: 'Snowflake, dbt pipelines, and event-driven data streaming.', type: 'Elective' },
          { code: 'DS-703', name: 'Industry Immersion & Applied Research Lab', credits: 8, description: 'Collaborative projects with corporate partners solving real-world challenges.', type: 'Lab' },
        ]
      },
      {
        semester: 4,
        title: 'Master Thesis & Capstone Defense',
        modules: [
          { code: 'DS-800', name: 'Master Capstone Innovation Project', credits: 10, description: 'Complete independent end-to-end production AI deployment or thesis.', type: 'Capstone' },
          { code: 'DS-801', name: 'Graduate Colloquium & Portfolio Defense', credits: 6, description: 'Oral defense before a panel of academic and industry scholars.', type: 'Capstone' },
        ]
      }
    ]
  },
  {
    id: 'ba-psychology',
    title: 'B.A. in Psychology & Human Behavior',
    degreeLevel: 'Undergraduate',
    department: 'Humanities & Social Sciences',
    mode: 'On-Campus',
    tagline: 'Understand the mechanisms of human cognition, emotion, and societal behavior.',
    description: 'An empirically grounded program combining clinical psychology, cognitive neuroscience, and social behavior analysis with clinical practicums and behavioral laboratory research.',
    tuitionPerSemester: 11200,
    durationYears: 4,
    totalCredits: 120,
    accreditation: ['APA Recognized', 'BPS Aligned', 'NAAC A++'],
    rating: 4.8,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    facultyLead: FACULTY_MEMBERS[1],
    prerequisites: ['High School Diploma or equivalent', 'Recommended background in Biology or Social Sciences', 'Minimum 2.8 GPA'],
    careerOutcomes: ['Clinical Research Associate', 'Organizational Psychologist', 'Human Factors UX Researcher', 'Mental Health Counselor'],
    applicationDeadline: 'November 15, 2026',
    featured: true,
    syllabus: [
      {
        semester: 1,
        title: 'Introduction to Psychological Science',
        modules: [
          { code: 'PSY-101', name: 'Principles of General Psychology', credits: 4, description: 'Introduction to theories of perception, learning, memory, and personality.', type: 'Core' },
          { code: 'PSY-102', name: 'Biological Bases of Human Behavior', credits: 4, description: 'Neuroanatomy, neurotransmitter pathways, and physiological psychology.', type: 'Core' },
          { code: 'PSY-103', name: 'Behavioral Observation & Experimental Design', credits: 4, description: 'Methodologies for empirical behavioral observation.', type: 'Lab' },
        ]
      },
      {
        semester: 2,
        title: 'Developmental & Cognitive Processes',
        modules: [
          { code: 'PSY-201', name: 'Lifespan Developmental Psychology', credits: 4, description: 'Physical, cognitive, and social development from infancy to old age.', type: 'Core' },
          { code: 'PSY-202', name: 'Cognitive Psychology & Attention Mechanics', credits: 4, description: 'Memory retention, language processing, and executive functions.', type: 'Core' },
          { code: 'PSY-203', name: 'Quantitative Methods & Statistical SPSS', credits: 4, description: 'Hypothesis testing, ANOVA, regression, and psychometric measurement.', type: 'Lab' },
        ]
      }
    ]
  },
  {
    id: 'mba-executive',
    title: 'M.B.A. in Strategic Management & Innovation',
    degreeLevel: 'Postgraduate',
    department: 'Business & Management',
    mode: 'Hybrid',
    tagline: 'Transform into a transformative visionary executive for the AI-driven economy.',
    description: 'Designed for ambitious business leaders, this AACSB-accredited program equips executives with global venture strategy, algorithmic finance, digital transformation, and sustainable corporate governance.',
    tuitionPerSemester: 16800,
    durationYears: 2,
    totalCredits: 60,
    accreditation: ['AACSB Accredited', 'AMBA Certified', 'EQUIS Benchmark'],
    rating: 4.95,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    facultyLead: FACULTY_MEMBERS[2],
    prerequisites: ['Undergraduate Degree', '2+ Years of Professional Experience', 'GMAT/GRE score or Eduvora Business Assessment'],
    careerOutcomes: ['Management Consultant', 'Chief Operating Officer', 'Venture Capital Partner', 'Director of Strategy'],
    applicationDeadline: 'October 15, 2026',
    featured: true,
    syllabus: [
      {
        semester: 1,
        title: 'Executive Core & Financial Architecture',
        modules: [
          { code: 'MBA-601', name: 'Global Corporate Strategy & Competitive Advantage', credits: 4, description: 'Industry structure analysis, game theory, and multinational expansion.', type: 'Core' },
          { code: 'MBA-602', name: 'Managerial Economics & Algorithmic Markets', credits: 4, description: 'Pricing strategies, macro trends, and digital platform economics.', type: 'Core' },
          { code: 'MBA-603', name: 'Corporate Financial Modeling & Valuation', credits: 4, description: 'Discounted cash flows, M&A structuring, and venture term sheets.', type: 'Core' },
        ]
      },
      {
        semester: 2,
        title: 'Digital Leadership & Innovation',
        modules: [
          { code: 'MBA-701', name: 'AI Disruption & Enterprise Transformation', credits: 4, description: 'Integrating automated cognitive workflows across enterprise silos.', type: 'Core' },
          { code: 'MBA-702', name: 'Negotiation Strategy & Executive Communications', credits: 4, description: 'High-stakes deal negotiation and organizational storytelling.', type: 'Elective' },
        ]
      }
    ]
  },
  {
    id: 'bs-computer-science',
    title: 'B.S. in Computer Science & Artificial Intelligence',
    degreeLevel: 'Undergraduate',
    department: 'Computer Science & AI',
    mode: 'On-Campus',
    tagline: 'Build the foundational software, algorithms, and computing hardware of tomorrow.',
    description: 'A comprehensive undergraduate curriculum spanning algorithm design, distributed computing, operating systems, cloud architecture, cybersecurity, and full-stack software development.',
    tuitionPerSemester: 13200,
    durationYears: 4,
    totalCredits: 128,
    accreditation: ['ABET Accredited', 'ACM Curriculum Aligned', 'NAAC A++'],
    rating: 4.9,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    facultyLead: FACULTY_MEMBERS[0],
    prerequisites: ['High School Diploma with Math and Physics', 'Minimum 3.2 GPA', 'SAT/ACT or Eduvora Entrance Test'],
    careerOutcomes: ['Senior Software Engineer', 'Cloud Solutions Architect', 'Full Stack Developer', 'Cybersecurity Specialist'],
    applicationDeadline: 'December 1, 2026',
    featured: true,
    syllabus: [
      {
        semester: 1,
        title: 'Computational Foundations',
        modules: [
          { code: 'CS-101', name: 'Introduction to Algorithms & Data Structures in C++', credits: 4, description: 'Time complexity, trees, graphs, dynamic programming.', type: 'Core' },
          { code: 'CS-102', name: 'Discrete Mathematics & Logic Proofs', credits: 4, description: 'Set theory, combinatorics, graph theory, propositional logic.', type: 'Core' },
          { code: 'CS-103', name: 'Computer Architecture & Assembly Programming', credits: 4, description: 'Instruction sets, memory hierarchy, cache optimization.', type: 'Lab' },
        ]
      }
    ]
  },
  {
    id: 'ms-biotech-genomics',
    title: 'M.S. in Biotechnology & Genomic Engineering',
    degreeLevel: 'Postgraduate',
    department: 'BioTech & Health Sciences',
    mode: 'On-Campus',
    tagline: 'Pioneer breakthroughs in CRISPR gene editing, personalized medicine, and bioinformatics.',
    description: 'An advanced science degree utilizing state-of-the-art biological cleanrooms, computational genomics clusters, and cell culture facilities to engineer therapeutic interventions.',
    tuitionPerSemester: 15200,
    durationYears: 2,
    totalCredits: 64,
    accreditation: ['NAAC A++', 'ISO 17025 Certified Labs', 'BioTech Guild Member'],
    rating: 4.85,
    reviewsCount: 96,
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800',
    facultyLead: FACULTY_MEMBERS[3],
    prerequisites: ['B.S. in Biology, Chemistry, Bioengineering, or related field', 'Minimum 3.0 GPA', 'Lab safety certification'],
    careerOutcomes: ['Genomic Bioinformatician', 'Clinical Trial Scientist', 'Bioprocess Engineer', 'CRISPR Research Specialist'],
    applicationDeadline: 'November 1, 2026',
    featured: false,
    syllabus: [
      {
        semester: 1,
        title: 'Molecular Genetics & Bioinformatics',
        modules: [
          { code: 'BIO-501', name: 'Advanced Molecular Genetics & Epigenetics', credits: 4, description: 'Gene regulation, chromatin dynamics, and epigenetic modification.', type: 'Core' },
          { code: 'BIO-502', name: 'Next-Generation Sequencing & Python Bio-tools', credits: 4, description: 'Sequence alignment, RNA-seq analysis, variant calling.', type: 'Lab' },
        ]
      }
    ]
  },
  {
    id: 'bs-robotics-engineering',
    title: 'B.S. in Robotics & Autonomous Systems',
    degreeLevel: 'Undergraduate',
    department: 'Engineering & Robotics',
    mode: 'On-Campus',
    tagline: 'Design, fabricate, and program autonomous rovers, robotic arms, and smart drones.',
    description: 'An interdisciplinary fusion of mechanical dynamics, embedded electronics, real-time ROS2 programming, and computer vision that prepares students for the automation era.',
    tuitionPerSemester: 13800,
    durationYears: 4,
    totalCredits: 130,
    accreditation: ['ABET Accredited', 'IEEE Robotics Society', 'NAAC A++'],
    rating: 4.92,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    facultyLead: FACULTY_MEMBERS[4],
    prerequisites: ['High School Diploma with Advanced Mathematics and Physics', 'Minimum 3.0 GPA'],
    careerOutcomes: ['Robotics Hardware Engineer', 'Autonomous Vehicles Engineer', 'Control Systems Developer', 'Industrial Automation Lead'],
    applicationDeadline: 'November 30, 2026',
    featured: false,
    syllabus: [
      {
        semester: 1,
        title: 'Robotics Engineering Foundations',
        modules: [
          { code: 'ROB-101', name: 'Kinematics & Dynamics of Rigid Bodies', credits: 4, description: 'Forward/inverse kinematics, Euler angles, Jacobian matrices.', type: 'Core' },
          { code: 'ROB-102', name: 'Microcontroller Circuitry & Embedded C', credits: 4, description: 'Sensors, actuators, PWM motor control, SPI/I2C communication.', type: 'Lab' },
        ]
      }
    ]
  },
  {
    id: 'bdes-human-centered-design',
    title: 'B.Des in Human-Centered Design & Interactive Media',
    degreeLevel: 'Undergraduate',
    department: 'Design & Media',
    mode: 'Hybrid',
    tagline: 'Craft intuitive digital experiences, spatial UI, and impactful visual storytelling.',
    description: 'A studio-based design degree fostering empathy-driven design thinking, design systems, immersive 3D spatial experiences (AR/VR), and user research methodologies.',
    tuitionPerSemester: 11900,
    durationYears: 4,
    totalCredits: 120,
    accreditation: ['AIGA Certified', 'World Design Organization', 'NAAC A++'],
    rating: 4.88,
    reviewsCount: 130,
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800',
    facultyLead: FACULTY_MEMBERS[1],
    prerequisites: ['Creative Portfolio submission', 'High School Diploma', 'Minimum 2.8 GPA'],
    careerOutcomes: ['Principal Product Designer', 'Design Systems Architect', 'XR Spatial Experience Designer', 'Creative Brand Director'],
    applicationDeadline: 'December 15, 2026',
    featured: false,
    syllabus: [
      {
        semester: 1,
        title: 'Design Thinking & Visual Communication',
        modules: [
          { code: 'DES-101', name: 'Design Systems, Typography & Color Theory', credits: 4, description: 'Visual hierarchy, grid systems, and micro-interactions.', type: 'Core' },
          { code: 'DES-102', name: 'UX Research Methods & Qualitative User Testing', credits: 4, description: 'User interviews, journey mapping, heuristic evaluation.', type: 'Lab' },
        ]
      }
    ]
  },
  {
    id: 'phd-machine-learning',
    title: 'Ph.D. in Machine Intelligence & Computational Systems',
    degreeLevel: 'Doctorate',
    department: 'Computer Science & AI',
    mode: 'On-Campus',
    tagline: 'Conduct groundbreaking doctoral research in foundation models, alignment, and quantum computing.',
    description: 'Fully funded 4-5 year doctoral fellowship with dedicated GPU clusters, competitive monthly stipends ($3,800/mo), and advisory mentorship from top global scholars.',
    tuitionPerSemester: 0, // Fully funded
    durationYears: 4,
    totalCredits: 72,
    accreditation: ['National Science Foundation Partner', 'NAAC A++'],
    rating: 5.0,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    facultyLead: FACULTY_MEMBERS[0],
    prerequisites: ['M.S. or high-honor B.S. in Computer Science/Math', '3 Letters of Recommendation', 'Research Proposal draft'],
    careerOutcomes: ['Tenure-Track University Professor', 'Research Scientist (OpenAI, DeepMind, Google)', 'AI Lab Director'],
    applicationDeadline: 'December 1, 2026',
    featured: false,
    syllabus: [
      {
        semester: 1,
        title: 'Doctoral Seminar & Research Methodology',
        modules: [
          { code: 'PHD-901', name: 'Advanced Statistical Learning Theory', credits: 4, description: 'PAC learnability, VC dimension, Rademacher complexity.', type: 'Core' },
          { code: 'PHD-902', name: 'Original Research Proposal Development', credits: 8, description: 'Literature review, novel hypothesis formulation, and mentor defense.', type: 'Lab' },
        ]
      }
    ]
  },
  {
    id: 'ms-sustainable-energy',
    title: 'M.S. in Sustainable Energy & Climate Engineering',
    degreeLevel: 'Postgraduate',
    department: 'Engineering & Robotics',
    mode: 'Online',
    tagline: 'Architect the green transition with smart grids, battery chemistry, and carbon capture.',
    description: 'A flexible online and hybrid master degree equipping engineers to deploy zero-carbon energy grids, hydrogen fuel systems, and industrial decarbonization tech.',
    tuitionPerSemester: 12400,
    durationYears: 2,
    totalCredits: 60,
    accreditation: ['Clean Energy Council', 'ABET Aligned', 'NAAC A++'],
    rating: 4.79,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800',
    facultyLead: FACULTY_MEMBERS[4],
    prerequisites: ['B.S. in Engineering, Environmental Science, or Physics', 'Minimum 3.0 GPA'],
    careerOutcomes: ['Renewable Energy Grid Architect', 'Sustainability Director', 'Energy Storage Systems Lead', 'Carbon Policy Analyst'],
    applicationDeadline: 'January 15, 2027',
    featured: false,
    syllabus: [
      {
        semester: 1,
        title: 'Energy Transition Systems',
        modules: [
          { code: 'ENG-601', name: 'Renewable Generation: Solar, Wind & Geothermal', credits: 4, description: 'Thermodynamics, photovoltaic efficiency, wind turbine aerodynamics.', type: 'Core' },
        ]
      }
    ]
  }
];

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Eduvora AI & Quantum Hackathon 2026',
    category: 'Hackathons',
    date: 'Nov 03, 2026',
    time: '09:00 AM - 08:00 PM EST',
    location: 'Innovation Hub & Turing Auditorium',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
    description: 'Join 500+ student developers, AI researchers, and designers in building high-impact generative AI and quantum algorithmic solutions with $35,000 in grand cash prizes.',
    speakerOrHost: 'Organized with Google AI & NVIDIA',
    totalSeats: 350,
    reservedSeats: 312,
    price: 'Free',
    tags: ['AI/ML', 'Prizes', 'Networking', 'Free Food'],
    featured: true,
  },
  {
    id: 'evt-2',
    title: 'Cognitive Science & Human Flourishing Summit',
    category: 'Guest Lectures',
    date: 'Jun 10, 2026',
    time: '02:00 PM - 05:30 PM EST',
    location: 'Great Hall of Humanities & Live Stream',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800',
    description: 'Keynote address by world-renowned cognitive psychologists on neuroplasticity, mental resilience in high-stress careers, and digital wellbeing.',
    speakerOrHost: 'Dr. Evelyn Vance & Dr. Marcus Holloway',
    totalSeats: 250,
    reservedSeats: 198,
    price: 'Free',
    tags: ['Psychology', 'Keynote', 'Catering'],
    featured: true,
  },
  {
    id: 'evt-3',
    title: 'Eduvora Fall Inter-Collegiate Athletics Championship',
    category: 'Sports',
    date: 'Oct 27, 2026',
    time: '10:00 AM - 06:00 PM EST',
    location: 'Eduvora Olympic Stadium & Aquatic Complex',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800',
    description: 'Cheer on the Eduvora Titans across soccer, track & field, basketball, and rowing as we host 14 regional university varsity teams.',
    speakerOrHost: 'Eduvora Athletics Department',
    totalSeats: 1200,
    reservedSeats: 890,
    price: 'Free for Students ($10 Public)',
    tags: ['Athletics', 'Live Mascot', 'Varsity', 'Spirit Day'],
    featured: true,
  },
  {
    id: 'evt-4',
    title: 'Annual Cultural Festival "Vibrance 2026"',
    category: 'Cultural',
    date: 'Sep 30, 2026',
    time: '04:00 PM - 11:00 PM EST',
    location: 'University Green & Lakeside Amphitheatre',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    description: 'A spectacular showcase of international student culinary delights, world music concerts, theatrical showcases, and contemporary art installations.',
    speakerOrHost: 'Eduvora Student Union & Arts Council',
    totalSeats: 2000,
    reservedSeats: 1640,
    price: 'Free',
    tags: ['Music', 'Food Fest', 'Art', 'Dance'],
    featured: true,
  },
  {
    id: 'evt-5',
    title: 'Global Tech & Finance Career Fair 2026',
    category: 'Career Fairs',
    date: 'Nov 18, 2026',
    time: '10:00 AM - 04:00 PM EST',
    location: 'Eduvora Center for Career Strategy',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
    description: 'Direct on-campus interviews and recruiter networking with 90+ fortune 500 tech companies, venture firms, and research institutions.',
    speakerOrHost: 'Career Advancement Office',
    totalSeats: 800,
    reservedSeats: 720,
    price: 'Free',
    tags: ['Jobs', 'Internships', 'Networking', 'Resume Reviews'],
    featured: false,
  },
  {
    id: 'evt-6',
    title: 'CRISPR & Synthetic Biology Hands-On Workshop',
    category: 'Workshops',
    date: 'Dec 05, 2026',
    time: '01:00 PM - 05:00 PM EST',
    location: 'Genomics Wet Lab B302',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800',
    description: 'Hands-on training for molecular biology and bioinformatics students in guide RNA design, target sequencing, and wet lab safety protocols.',
    speakerOrHost: 'Dr. Soraya Lin',
    totalSeats: 30,
    reservedSeats: 26,
    price: 'Free (Registration Required)',
    tags: ['BioTech', 'Hands-on', 'Certificate'],
    featured: false,
  }
];

export const CLUBS_DATA: ClubItem[] = [
  {
    id: 'club-robotics',
    name: 'Eduvora Robotics & Autonomous Guild',
    category: 'Technology',
    description: 'Building competitive battle-bots, autonomous mars rovers, and open-source humanoid prosthetics. Competes in international VEX and RoboCup tournaments.',
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&q=80&w=600',
    memberCount: 148,
    meetingSchedule: 'Wednesdays & Fridays @ 6:00 PM (Makerspace Lab 4)',
    leadName: 'Jordan Chen',
    leadEmail: 'j.chen@student.eduvora.edu',
    tags: ['Robotics', 'Hardware', 'Competitions'],
    achievements: ['1st Place Regional NASA Rover Challenge 2025', 'Published 3 IEEE student papers']
  },
  {
    id: 'club-fintech',
    name: 'FinTech & Algorithmic Trading Society',
    category: 'Business & Finance',
    description: 'Manages a $50,000 real student-run quantitative investment portfolio, conducts weekly financial modeling workshops, and hosts mock trading challenges.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=600',
    memberCount: 210,
    meetingSchedule: 'Tuesdays @ 5:30 PM (Business Hall Room 102)',
    leadName: 'Sarah Jenkins',
    leadEmail: 's.jenkins@student.eduvora.edu',
    tags: ['Finance', 'Quantitative', 'Portfolio'],
    achievements: ['Generated 19.4% annual alpha on student endowment fund']
  },
  {
    id: 'club-design',
    name: 'Eduvora Design Collective & XR Studio',
    category: 'Arts & Culture',
    description: 'A vibrant community of UI/UX designers, 3D spatial artists, brand storytellers, and creative coders crafting digital products for campus organizations.',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600',
    memberCount: 135,
    meetingSchedule: 'Thursdays @ 6:30 PM (Media Studio 2)',
    leadName: 'Maya Patel',
    leadEmail: 'm.patel@student.eduvora.edu',
    tags: ['UX/UI', 'Spatial XR', 'Branding'],
    achievements: ['Redesigned 8 university community applications']
  },
  {
    id: 'club-social',
    name: 'GreenCampus Sustainability Coalition',
    category: 'Social Impact',
    description: 'Dedicated to achieving net-zero campus carbon emissions, organizing solar installations, urban organic gardens, and zero-waste food drives.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600',
    memberCount: 180,
    meetingSchedule: 'Mondays @ 5:00 PM (Lakeside Student Pavilion)',
    leadName: 'Lucas Morales',
    leadEmail: 'l.morales@student.eduvora.edu',
    tags: ['Ecology', 'Zero-Waste', 'Community'],
    achievements: ['Diverted 14,000 lbs of plastic from landfill in 2025']
  }
];

export const INITIAL_APPLICATIONS: ApplicationSubmission[] = [
  {
    referenceId: 'EDV-2026-8942',
    submittedAt: '2026-07-14',
    term: 'Fall 2026',
    programId: 'ms-data-science',
    programTitle: 'M.S. in Data Science & Machine Learning',
    degreeLevel: 'Postgraduate',
    mode: 'Hybrid',
    applicantName: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    phone: '+1 (555) 349-2810',
    dob: '2001-04-12',
    nationality: 'United States',
    previousInstitution: 'University of Michigan (B.S. Mathematics)',
    gpa: 3.88,
    testScoreType: 'GRE',
    testScore: '332 (Q: 168, V: 164)',
    scholarshipTier: 'Presidential Merit Fellowship',
    estimatedAid: 15000,
    currentStage: 'Interview Scheduled',
    documentsCount: 4,
    interviewDate: 'August 28, 2026 at 10:30 AM EST via Zoom',
    reviewerNotes: 'Strong mathematical foundation and outstanding SOP on graph transformers. Recommended for department scholarship interview.',
    stageHistory: [
      { stage: 'Submitted', date: '2026-07-14', completed: true, note: 'Application dossier and official transcripts received.' },
      { stage: 'Under Faculty Review', date: '2026-07-22', completed: true, note: 'Academic committee verified prerequisites and research profile.' },
      { stage: 'Interview Scheduled', date: '2026-08-05', completed: true, note: 'Interview with Dr. Evelyn Vance scheduled for Aug 28, 2026.' },
      { stage: 'Admitted', date: 'Pending', completed: false, note: 'Final decision letter following interview evaluation.' },
    ]
  },
  {
    referenceId: 'EDV-2026-4190',
    submittedAt: '2026-06-02',
    term: 'Fall 2026',
    programId: 'ba-psychology',
    programTitle: 'B.A. in Psychology & Human Behavior',
    degreeLevel: 'Undergraduate',
    mode: 'On-Campus',
    applicantName: 'David K. Osei',
    email: 'david.osei@example.com',
    phone: '+1 (555) 890-4122',
    dob: '2005-09-18',
    nationality: 'Canada',
    previousInstitution: 'Oakridge Collegiate Academy',
    gpa: 3.92,
    scholarshipTier: 'Dean\'s Academic Distinction',
    estimatedAid: 12000,
    currentStage: 'Admitted',
    documentsCount: 5,
    reviewerNotes: 'Accepted with Honors. Welcome to Eduvora University! Official admission pack and visa documents dispatched.',
    stageHistory: [
      { stage: 'Submitted', date: '2026-06-02', completed: true, note: 'Complete application submitted with honors portfolio.' },
      { stage: 'Under Faculty Review', date: '2026-06-11', completed: true, note: 'Faculty board completed evaluation with distinction rating.' },
      { stage: 'Interview Scheduled', date: '2026-06-25', completed: true, note: 'Admissions interview completed successfully.' },
      { stage: 'Admitted', date: '2026-07-08', completed: true, note: 'Official Letter of Admission issued. Seat reservation confirmed.' },
    ]
  },
  {
    referenceId: 'EDV-2026-1033',
    submittedAt: '2026-08-10',
    term: 'Spring 2027',
    programId: 'mba-executive',
    programTitle: 'M.B.A. in Strategic Management & Innovation',
    degreeLevel: 'Postgraduate',
    mode: 'Hybrid',
    applicantName: 'Amara Nwosu',
    email: 'amara.nwosu@example.com',
    phone: '+1 (555) 431-7729',
    dob: '1996-11-23',
    nationality: 'Nigeria',
    previousInstitution: 'University of Lagos (B.Sc. Economics)',
    gpa: 3.65,
    scholarshipTier: 'Global Leadership Grant',
    estimatedAid: 8000,
    currentStage: 'Under Faculty Review',
    documentsCount: 4,
    reviewerNotes: 'Application is under active evaluation by the Graduate Business Committee.',
    stageHistory: [
      { stage: 'Submitted', date: '2026-08-10', completed: true, note: 'Application submitted with 4 years corporate managerial experience.' },
      { stage: 'Under Faculty Review', date: '2026-08-16', completed: true, note: 'Dossier in review with Chair Prof. Alistair Sterling.' },
      { stage: 'Interview Scheduled', date: 'Pending', completed: false, note: 'Awaiting scheduling notification.' },
      { stage: 'Admitted', date: 'Pending', completed: false, note: 'Awaiting committee decision.' },
    ]
  }
];

export const MOCK_STUDENT_PROFILE = {
  studentId: 'EDV-2024-7719',
  name: 'Alex Morgan',
  email: 'a.morgan@student.eduvora.edu',
  program: 'B.S. in Computer Science & Artificial Intelligence',
  degreeLevel: 'Undergraduate',
  term: 'Year 3, Fall Semester',
  cgpa: 3.86,
  creditsCompleted: 74,
  totalCreditsRequired: 128,
  advisor: 'Dr. Evelyn Vance',
  academicStanding: 'Dean\'s Honors List',
  tuitionStatus: 'Paid in Full',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
  registeredCourses: [
    {
      code: 'CS-401',
      name: 'Advanced Distributed Systems & Microservices',
      credits: 4,
      professor: 'Dr. Evelyn Vance',
      grade: 'A',
      attendancePercent: 96,
      schedule: 'Mon / Wed 10:00 AM - 11:30 AM',
      room: 'Turing Hall 301',
      progressPercent: 78,
    },
    {
      code: 'CS-442',
      name: 'Deep Learning & Neural Network Frameworks',
      credits: 4,
      professor: 'Prof. Liam O\'Connor',
      grade: 'A-',
      attendancePercent: 92,
      schedule: 'Tue / Thu 01:30 PM - 03:00 PM',
      room: 'AI Computing Lab B',
      progressPercent: 82,
    },
    {
      code: 'CS-380',
      name: 'Cybersecurity Principles & Cryptography',
      credits: 4,
      professor: 'Dr. Sarah Mitchell',
      grade: 'A',
      attendancePercent: 95,
      schedule: 'Mon / Wed 02:00 PM - 03:30 PM',
      room: 'Cyber Lab 104',
      progressPercent: 70,
    },
    {
      code: 'MGT-201',
      name: 'Technology Entrepreneurship & Venture Strategy',
      credits: 3,
      professor: 'Prof. Alistair Sterling',
      grade: 'A',
      attendancePercent: 100,
      schedule: 'Fri 09:00 AM - 12:00 PM',
      room: 'Business Pavilion 201',
      progressPercent: 85,
    }
  ] as RegisteredCourse[],
  timetable: [
    { day: 'Monday', time: '10:00 AM - 11:30 AM', courseCode: 'CS-401', courseName: 'Distributed Systems', room: 'Turing Hall 301', type: 'Lecture', color: 'bg-emerald-50 border-emerald-500 text-emerald-900' },
    { day: 'Monday', time: '02:00 PM - 03:30 PM', courseCode: 'CS-380', courseName: 'Cybersecurity', room: 'Cyber Lab 104', type: 'Lecture', color: 'bg-teal-50 border-teal-500 text-teal-900' },
    { day: 'Tuesday', time: '01:30 PM - 03:00 PM', courseCode: 'CS-442', courseName: 'Deep Learning', room: 'AI Lab B', type: 'Lab', color: 'bg-amber-50 border-amber-500 text-amber-900' },
    { day: 'Wednesday', time: '10:00 AM - 11:30 AM', courseCode: 'CS-401', courseName: 'Distributed Systems', room: 'Turing Hall 301', type: 'Lecture', color: 'bg-emerald-50 border-emerald-500 text-emerald-900' },
    { day: 'Wednesday', time: '02:00 PM - 03:30 PM', courseCode: 'CS-380', courseName: 'Cybersecurity', room: 'Cyber Lab 104', type: 'Lab', color: 'bg-teal-50 border-teal-500 text-teal-900' },
    { day: 'Thursday', time: '01:30 PM - 03:00 PM', courseCode: 'CS-442', courseName: 'Deep Learning', room: 'AI Lab B', type: 'Lecture', color: 'bg-amber-50 border-amber-500 text-amber-900' },
    { day: 'Friday', time: '09:00 AM - 12:00 PM', courseCode: 'MGT-201', courseName: 'Tech Entrepreneurship', room: 'Pavilion 201', type: 'Tutorial', color: 'bg-rose-50 border-rose-500 text-rose-900' },
  ] as TimetableSlot[],
  invoices: [
    {
      id: 'INV-2026-FALL-01',
      term: 'Fall 2026 Semester',
      amount: 13200,
      dueDate: 'September 01, 2026',
      status: 'Paid',
      paidDate: 'August 14, 2026 via Card (•••• 8412)',
      breakdown: [
        { item: 'Tuition (15 Academic Credits)', amount: 11500 },
        { item: 'High-Performance Computing & Lab Access Fee', amount: 950 },
        { item: 'Campus Health & Recreation Services', amount: 450 },
        { item: 'Student Union & Activity Levy', amount: 300 }
      ]
    },
    {
      id: 'INV-2026-SPR-02',
      term: 'Spring 2026 Semester',
      amount: 13200,
      dueDate: 'January 15, 2026',
      status: 'Paid',
      paidDate: 'January 08, 2026',
      breakdown: [
        { item: 'Tuition (16 Academic Credits)', amount: 11500 },
        { item: 'Lab & Computational Facilities', amount: 950 },
        { item: 'Health & Recreation', amount: 750 }
      ]
    }
  ] as TuitionInvoice[],
  notices: [
    {
      id: 'not-1',
      title: 'Spring 2027 Course Pre-Registration Window',
      date: 'Aug 18, 2026',
      category: 'Academic',
      priority: 'High',
      content: 'Early-bird course selections for the upcoming Spring 2027 semester open next Monday at 09:00 AM. Please review your degree audit with your faculty advisor.'
    },
    {
      id: 'not-2',
      title: 'Eduvora Annual Career Fair Passes Available',
      date: 'Aug 15, 2026',
      category: 'Career',
      priority: 'Normal',
      content: 'Reserve your fast-track interview appointment slots for the Tech & Finance Fair. 90+ participating recruiters will be on-campus.'
    },
    {
      id: 'not-3',
      title: 'Dean’s Honors List Commendation Awarded',
      date: 'Aug 02, 2026',
      category: 'Academic',
      priority: 'Normal',
      content: 'Congratulations on achieving a semester GPA of 3.86. Your certificate of distinction is available in your digital transcript vault.'
    }
  ] as NoticeItem[]
};
