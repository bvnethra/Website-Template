const BASE_URL = 'http://localhost:8080/api';

const MOCK_CATEGORIES = [
  { id: 1, name: 'Admin', slug: 'admin' },
  { id: 2, name: 'Medical', slug: 'medical' },
  { id: 3, name: 'Block magazine', slug: 'block-magazine' },
  { id: 4, name: 'Comming soon', slug: 'comming-soon' },
  { id: 5, name: 'Travels', slug: 'travels' },
  { id: 6, name: 'Hotel', slug: 'hotel' },
  { id: 7, name: 'Events', slug: 'events' },
  { id: 8, name: 'Photography', slug: 'photography' },
  { id: 9, name: 'Construction', slug: 'construction' },
  { id: 10, name: 'Education', slug: 'education' },
  { id: 11, name: 'Restaurant', slug: 'restaurant' },
  { id: 12, name: 'Ecommerce', slug: 'ecommerce' },
  { id: 13, name: 'Buisness', slug: 'buisness' },
  { id: 14, name: 'onepage', slug: 'onepage' },
  { id: 15, name: 'landing page', slug: 'landing-page' },
  { id: 16, name: 'cooperate', slug: 'cooperate' },
  { id: 17, name: 'agency', slug: 'agency' },
  { id: 18, name: 'portfolio', slug: 'portfolio' },
  { id: 19, name: 'Real Estate', slug: 'real-estate' },
  { id: 20, name: 'Resume', slug: 'resume' },
  { id: 21, name: 'Transportation', slug: 'transportation' },
  { id: 22, name: 'Personal', slug: 'personal' }
];

const MOCK_TEMPLATES = [
  {
    id: 134,
    name: 'CoreVista — Enterprise PM & Resource Intelligence System',
    slug: 'admin-1',
    previewImage: '/templates/admin/admin-1-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 1, name: 'Admin', slug: 'admin' },
    pagesCount: 50,
    downloadsCount: 1980,
    description: 'A multi-functional enterprise project management and ERP panel. Features 10 main controller modules with 50 sub-pages total, custom client portfolios, and secure authorization screens.',
    bootstrapVersion: 'React / Tailwind / Vite / TS',
    version: '1.0.0',
    demoUrl: '/templates/admin/admin-1/index.html',
  },
  {
    id: 135,
    name: 'Elemental — Editorial Command Center',
    slug: 'admin-2',
    previewImage: '/templates/admin/admin-2-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 1, name: 'Admin', slug: 'admin' },
    pagesCount: 1,
    downloadsCount: 1890,
    description: 'A beautiful editorial command operating system and science archive built using custom React state views, featuring editorial pipeline, task manager, media library, and workspace options.',
    bootstrapVersion: 'React 19 / TypeScript / Tailwind CSS',
    version: '1.0.0',
    demoUrl: '/templates/admin/admin-2/index.html',
  },
  {
    id: 202,
    name: 'Arctic Frost — Editorial Command Center',
    slug: 'admin-3',
    previewImage: '/templates/admin/admin-3-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 1, name: 'Admin', slug: 'admin' },
    pagesCount: 1,
    downloadsCount: 1420,
    description: 'An intelligent science magazine super admin dashboard and editorial observatory with ice-and-paper aesthetics, live newsroom signals, story velocity analytics, and interactive publishing workflows.',
    bootstrapVersion: 'React 19 / TypeScript / Tailwind CSS',
    version: '1.0.0',
    demoUrl: '/templates/admin/admin-3/index.html',
  },
  {
    id: 9004,
    name: 'SprintAdmin — Agile Workspace & Sprint Command',
    slug: 'admin-4',
    previewImage: '/templates/admin/admin-4-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 1, name: 'Admin', slug: 'admin' },
    pagesCount: 16,
    downloadsCount: 1620,
    description: 'A clean and professional cloud infrastructure analytics dashboard. Features system telemetry, task queues, HR analytics, and messages views under a state-based layout shell.',
    bootstrapVersion: 'React / Tailwind / Vite / TS',
    version: '1.0.0',
    demoUrl: '/templates/admin/admin-4/index.html',
  },
  {
    id: 9005,
    name: 'ViteAdmin — Multipurpose Control System',
    slug: 'admin-5',
    previewImage: '/templates/admin/admin-5-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 1, name: 'Admin', slug: 'admin' },
    pagesCount: 25,
    downloadsCount: 1650,
    description: 'A comprehensive multipurpose administrative control system. Features 7 dashboard view presets, client message boxes, custom user/role directories, and dynamic utility modules.',
    bootstrapVersion: 'React / Vite / Tailwind CSS',
    version: '1.0.0',
    demoUrl: '/templates/admin/admin-5/index.html',
  },
  {
    id: 9006,
    name: 'ApexAdmin — Enterprise Operations Dashboard',
    slug: 'admin-6',
    previewImage: '/templates/admin/admin-6-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 1, name: 'Admin', slug: 'admin' },
    pagesCount: 12,
    downloadsCount: 1540,
    description: 'A premium operations command center dashboard. Features dark theme aesthetics, custom authentication routes, live search indices, and dynamic task scoping selectors.',
    bootstrapVersion: 'React / Tailwind / Vite / TS',
    version: '1.0.0',
    demoUrl: '/templates/admin/admin-6/index.html',
  },
  {
    id: 9007,
    name: 'NexusAdmin — Cloud Infrastructure Analytics',
    slug: 'admin-7',
    previewImage: '/templates/admin/admin-7-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 1, name: 'Admin', slug: 'admin' },
    pagesCount: 14,
    downloadsCount: 1480,
    description: 'An advanced cloud infrastructure analytics dashboard. Features system telemetry, task queues, HR analytics, and messages views under a state-based layout shell.',
    bootstrapVersion: 'React / Tailwind / Vite / TS',
    version: '1.0.0',
    demoUrl: '/templates/admin/admin-7/index.html',
  },
  {
    id: 9008,
    name: 'Ember Glow — Dark Analytics Dashboard',
    slug: 'admin-8',
    previewImage: '/templates/admin/admin-8-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 1, name: 'Admin', slug: 'admin' },
    pagesCount: 10,
    downloadsCount: 1460,
    description: 'An advanced financial ledger and inventory system. Features custom date range filters, transaction exports, dynamic KPIs, and product performance cards.',
    bootstrapVersion: 'React / Tailwind / Vite / TS',
    version: '1.0.0',
    demoUrl: '/templates/admin/admin-8/index.html',
  },
  {
    id: 9009,
    name: 'Vantage — Premium Admin & Dashboard Hub',
    slug: 'admin-9',
    previewImage: '/templates/admin/admin-9-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 1, name: 'Admin', slug: 'admin' },
    pagesCount: 18,
    downloadsCount: 1720,
    description: 'A modular and customizable administrative UI toolkit. Features drag-and-drop widget grid system, dark/light theme switching, and real-time data table filters.',
    bootstrapVersion: 'React / Tailwind / Vite / TS',
    version: '1.0.0',
    demoUrl: '/templates/admin/admin-9/index.html',
  },
  {
    id: 9010,
    name: 'Apex Portal — Animated Admin Portal',
    slug: 'admin-10',
    previewImage: '/templates/admin/admin-10-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 1, name: 'Admin', slug: 'admin' },
    pagesCount: 22,
    downloadsCount: 1810,
    description: 'An enterprise-grade admin portal with dynamic data visualization, user activity timeline, role-based access management, and automated export tools.',
    bootstrapVersion: 'React / Tailwind / Vite / TS',
    version: '1.0.0',
    demoUrl: '/templates/admin/admin-10/index.html',
  },
  {
    id: 4,
    name: 'PulseCare — Modern Healthcare Platform',
    slug: 'medical-1',
    previewImage: '/templates/medical/medical-1-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 2, name: 'Medical', slug: 'medical' },
    pagesCount: 12,
    downloadsCount: 12400,
    description: 'A modern healthcare and hospital management platform featuring multi-role portals for Patients, Doctors, and Admins, doctor directory, intelligent slot booking, and clinical workflows.',
    bootstrapVersion: 'React 19 / Tailwind CSS / Vite',
    demoUrl: '/templates/medical/medical-1/index.html',
  },
  {
    id: 9002,
    name: 'Medicio Healthcare — Advanced Medical Center Platform',
    slug: 'medicio-healthcare',
    previewImage: '/templates/medical/medical-2-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 2, name: 'Medical', slug: 'medical' },
    pagesCount: 1,
    downloadsCount: 1200,
    description: 'A customized, comprehensive healthcare web platform with interactive appointment booking, doctor directory, department catalog, service scopes, and patient portal.',
    bootstrapVersion: 'React / Tailwind CSS / Vite',
    demoUrl: '/templates/medical/medical-2/index.html',
    downloadFile: 'medicio-healthcare.zip',
    version: '1.0',
  },
  {
    id: 9003,
    name: 'Aurevia Health — Premium Healthcare Technology Platform',
    slug: 'aurevia-health',
    previewImage: '/templates/medical/medical-3-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 2, name: 'Medical', slug: 'medical' },
    pagesCount: 1,
    downloadsCount: 1850,
    description: 'Premium healthcare technology platform for discovering specialists, clinical departments, intelligent appointment booking, and comprehensive patient-doctor ecosystems.',
    bootstrapVersion: 'React / Tailwind CSS / Vite',
    demoUrl: '/templates/medical/medical-3/index.html',
    downloadFile: 'aurevia-health.zip',
    version: '1.0',
  },
  {
    id: 9004,
    name: 'Veylora Health — Multi-Speciality Hospital Platform',
    slug: 'veylora-health',
    previewImage: '/templates/medical/medical-4-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 2, name: 'Medical', slug: 'medical' },
    pagesCount: 1,
    downloadsCount: 2100,
    description: 'Comprehensive healthcare platform featuring specialized medical departments, verified doctor profiles, instant appointment booking, and patient health tools.',
    bootstrapVersion: 'React / Tailwind CSS / Vite',
    demoUrl: '/templates/medical/medical-4/index.html',
    downloadFile: 'veylora-health.zip',
    version: '1.0',
  },
  {
    id: 9005,
    name: 'PulseCare — Modern Healthcare Platform',
    slug: 'medical-5',
    previewImage: '/templates/medical/medical-5-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 2, name: 'Medical', slug: 'medical' },
    pagesCount: 12,
    downloadsCount: 1420,
    description: 'A premium, calm, and modern medical healthcare platform template with Lilac Frost aesthetic, specialist booking, patient portal, medical records, and clinical services.',
    bootstrapVersion: 'React / Tailwind CSS / Vite',
    demoUrl: '/templates/medical/medical-5/index.html',
    version: '1.0',
  },
  {
    id: 9007,
    name: 'PulseCare — Modern Healthcare Platform',
    slug: 'medical-6',
    previewImage: '/templates/medical/medical-6-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 2, name: 'Medical', slug: 'medical' },
    pagesCount: 1,
    downloadsCount: 1580,
    description: 'Modern Dynamic Medical Platform for Patients, Doctors, and Healthcare Administrators. Real-time slot booking, doctor discovery, and patient portals.',
    bootstrapVersion: 'React / Tailwind CSS / Vite',
    demoUrl: '/templates/medical/medical-6/index.html',
    version: '1.0',
  },
  {
    id: 9008,
    name: 'PulseCare — Modern Healthcare Platform',
    slug: 'medical-7',
    previewImage: '/templates/medical/medical-7-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 2, name: 'Medical', slug: 'medical' },
    pagesCount: 1,
    downloadsCount: 1750,
    description: 'Discover top doctors, compare availability, book instant appointments, and manage health records securely with PulseCare Healthcare Platform.',
    bootstrapVersion: 'HTML5 / CSS3 / Vanilla JS',
    demoUrl: '/templates/medical/medical-7/index.html',
    version: '1.0',
  },
  {
    id: 9608,
    name: 'PulseCare — Modern Healthcare Platform',
    slug: 'medical-8',
    previewImage: '/templates/medical/medical-8-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 2, name: 'Medical', slug: 'medical' },
    pagesCount: 1,
    downloadsCount: 1800,
    description: 'A comprehensive medical hub featuring doctor discovery lists, secure health vault portals, and instant booking engines.',
    bootstrapVersion: 'React / Next.js / CSS',
    version: '1.0.0',
    demoUrl: '/templates/medical/medical-8/index.html',
  },
  {
    id: 9009,
    name: 'PulseCare — Medical Specialist Hub',
    slug: 'medical-9',
    previewImage: '/templates/medical/medical-9-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 2, name: 'Medical', slug: 'medical' },
    pagesCount: 1,
    downloadsCount: 1920,
    description: 'An advanced clinical dashboard and patient care platform with appointment scheduling and telemedicine support.',
    bootstrapVersion: 'React / Vite / Tailwind CSS',
    version: '1.0.0',
    demoUrl: '/templates/medical/medical-9/index.html',
  },
  {
    id: 9010,
    name: 'PulseCare — Integrated Health Suite',
    slug: 'medical-10',
    previewImage: '/templates/medical/medical-1-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 2, name: 'Medical', slug: 'medical' },
    pagesCount: 1,
    downloadsCount: 2050,
    description: 'A modern medical clinic landing page with doctor directory, specialty services, and online consultation booking.',
    bootstrapVersion: 'React / Vite / Tailwind CSS',
    version: '1.0.0',
    demoUrl: '/templates/medical/medical-10/index.html',
  },
  {
    id: 9301,
    name: 'AURA — Creative Design Studio',
    slug: 'onepage-1',
    previewImage: '/templates/onepage/onepage-1-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 14, name: 'onepage', slug: 'onepage' },
    pagesCount: 1,
    downloadsCount: 1390,
    description: 'A calm, serene Zen meditation and health retreat single-page website. Features smooth scroll navigation, detailed program cards, and interactive schedule boards.',
    bootstrapVersion: 'React / Tailwind / Vite',
    demoUrl: '/templates/onepage/onepage-1/index.html',
    version: '1.0',
  },
  {
    id: 9302,
    name: 'Asme — Innovation, Research & Design Studio',
    slug: 'onepage-2',
    previewImage: '/templates/onepage/onepage-2-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 14, name: 'onepage', slug: 'onepage' },
    pagesCount: 1,
    downloadsCount: 1420,
    description: 'A minimalist horizontal scrolling storytelling landing page featuring high-definition custom video banners, bento grids, and responsive contact overlays.',
    bootstrapVersion: 'React / Tailwind / Vite / TS',
    demoUrl: '/templates/onepage/onepage-2/index.html',
    version: '1.0',
  },
  {
    id: 9401,
    name: 'INTENT — Creative Digital Agency',
    slug: 'onepage-3',
    previewImage: '/templates/onepage/onepage-3-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 14, name: 'onepage', slug: 'onepage' },
    pagesCount: 1,
    downloadsCount: 1510,
    description: 'A premium, high-impact Next.js one-page creative digital agency layout featuring dynamic motion animations, services lists, process grids, results counters, and contact booking panels.',
    bootstrapVersion: 'Next.js 15 / Tailwind CSS',
    version: '1.0.0',
    demoUrl: '/templates/onepage/onepage-3/index.html',
  },
  {
    id: 9402,
    name: 'AETHERIA — Next-Gen Digital Product & Brand Agency',
    slug: 'onepage-4',
    previewImage: '/templates/onepage/onepage-4-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 14, name: 'onepage', slug: 'onepage' },
    pagesCount: 1,
    downloadsCount: 1490,
    description: 'An elegant, futuristic digital product and brand showcase with ambient particle canvases, responsive service grids, team sliders, and custom project modals.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/onepage/onepage-4/index.html',
  },
  {
    id: 9403,
    name: 'Vertex — Business Solutions & Digital Transformation',
    slug: 'onepage-5',
    previewImage: '/templates/onepage/onepage-5-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 14, name: 'onepage', slug: 'onepage' },
    pagesCount: 1,
    downloadsCount: 1380,
    description: 'A sleek corporate business solutions layout featuring performance dashboards, interactive pricing matrices, logo clouds, FAQ accordions, and clean service grids.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/onepage/onepage-5/index.html',
  },
  {
    id: 9404,
    name: 'ELEVATE — Strategic Branding Agency',
    slug: 'onepage-6',
    previewImage: '/templates/onepage/onepage-6-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 14, name: 'onepage', slug: 'onepage' },
    pagesCount: 1,
    downloadsCount: 1400,
    description: 'A modern digital agency template with client-side portfolio grids, capabilities list, process maps, and custom client sections.',
    bootstrapVersion: 'Next.js 16 / Tailwind CSS',
    version: '1.0.0',
    demoUrl: '/templates/onepage/onepage-6/index.html',
  },
  {
    id: 9405,
    name: 'Fonix — Spatial Sound Synthesis & 3D Web Experience',
    slug: 'onepage-7',
    previewImage: '/templates/onepage/onepage-7-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 14, name: 'onepage', slug: 'onepage' },
    pagesCount: 1,
    downloadsCount: 1350,
    description: 'Comprehensive Product Requirements Document (PRD) and live interactive 3D WebGL showcase for the Fonix one-page brand experience.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/onepage/onepage-7/index.html',
  },
  {
    id: 9406,
    name: 'AI // HUMAN // MACHINE — AI & ML Engineer Portfolio',
    slug: 'onepage-8',
    previewImage: '/templates/onepage/onepage-8-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 14, name: 'onepage', slug: 'onepage' },
    pagesCount: 1,
    downloadsCount: 1450,
    description: 'An immersive 3D interactive portfolio and digital laboratory for an AI/ML Computer Science Engineer and Developer, featuring real-time WebGL experiences.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/onepage/onepage-8/index.html',
  },
  {
    id: 9407,
    name: 'Vertex — Business Solutions & Digital Transformation',
    slug: 'onepage-9',
    previewImage: '/templates/onepage/onepage-9-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 14, name: 'onepage', slug: 'onepage' },
    pagesCount: 1,
    downloadsCount: 1380,
    description: 'A modern strategy & advisory corporate showcase with pricing schedules, team grids, performance dashboards, and interactive process timelines.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/onepage/onepage-9/index.html',
  },
  {
    id: 9408,
    name: 'AETHERIA — Next-Gen Digital Product & Brand Agency',
    slug: 'onepage-10',
    previewImage: '/templates/onepage/onepage-1-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 14, name: 'onepage', slug: 'onepage' },
    pagesCount: 1,
    downloadsCount: 1420,
    description: 'A sleek interactive digital benchmark experiences platform featuring real-time metric counters, why us accordions, and custom client sections.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/onepage/onepage-10/index.html',
  },
  {
    id: 9501,
    name: 'JULIAN RIVIERA — Creative Technologist & AI Architect',
    slug: 'personal-1',
    previewImage: '/templates/personal/personal-1-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 22, name: 'Personal', slug: 'personal' },
    pagesCount: 1,
    downloadsCount: 1480,
    description: 'An ultra-premium, cinematic personal showcase with editorial layout columns, asymmetric case study explorers, custom cursor physics, and contact scheduling panels.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/personal/personal-1/index.html',
  },
  {
    id: 9502,
    name: 'Arjun Mehta — AI Engineer & Full-Stack Developer',
    slug: 'personal-2',
    previewImage: '/templates/personal/personal-2-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 22, name: 'Personal', slug: 'personal' },
    pagesCount: 1,
    downloadsCount: 1650,
    description: 'A cutting-edge personal portfolio for AI engineers featuring research showcases, interactive neural node graphs, and project timelines.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/personal/personal-2/index.html',
  },
  {
    id: 9503,
    name: 'THE STORYBOARD — Siddharth Mehta Creative Developer',
    slug: 'personal-3',
    previewImage: '/templates/personal/personal-3-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 22, name: 'Personal', slug: 'personal' },
    pagesCount: 1,
    downloadsCount: 1520,
    description: 'A premium interactive digital magazine personal showcase layout built with React and custom CSS animation panels.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/personal/personal-3/index.html',
  },
  {
    id: 9504,
    name: 'Soleil — Premium Animated Personal Portfolio',
    slug: 'personal-4',
    previewImage: '/templates/personal/personal-4-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 22, name: 'Personal', slug: 'personal' },
    pagesCount: 1,
    downloadsCount: 1780,
    description: 'An experimental interactive digital universe portfolio with ambient canvas shaders, laboratory projects, and audio engines.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/personal/personal-4/index.html',
  },
  {
    id: 9505,
    name: 'Aetherius — Experimental Digital Universe Portfolio',
    slug: 'personal-5',
    previewImage: '/templates/personal/personal-5-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 22, name: 'Personal', slug: 'personal' },
    pagesCount: 1,
    downloadsCount: 1490,
    description: 'A creative digital canvas personal portfolio showcasing work collections, philosophy walls, and interactive contact portals.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/personal/personal-5/index.html',
  },
  {
    id: 9506,
    name: 'Living Digital Canvas — Animated Portfolio',
    slug: 'personal-6',
    previewImage: '/templates/personal/personal-6-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 22, name: 'Personal', slug: 'personal' },
    pagesCount: 1,
    downloadsCount: 1390,
    description: 'A minimalist creative showcase template featuring smooth scroll animations, experience timelines, and skill matrices.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/personal/personal-6/index.html',
  },
  {
    id: 9507,
    name: 'Alex Vance — Interactive 3D Creative Studio Portfolio',
    slug: 'personal-7',
    previewImage: '/templates/personal/personal-7-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 22, name: 'Personal', slug: 'personal' },
    pagesCount: 1,
    downloadsCount: 1820,
    description: 'An interactive desk setup personal portfolio featuring vector workspace widgets, growth journey plants, and custom audio keycaps.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/personal/personal-7/index.html',
  },
  {
    id: 9508,
    name: 'Kaelen — Interactive Personal Showcase',
    slug: 'personal-8',
    previewImage: '/templates/personal/personal-8-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 22, name: 'Personal', slug: 'personal' },
    pagesCount: 1,
    downloadsCount: 1560,
    description: 'A modern developer portfolio featuring day/night theme toggles, project filter cards, and interactive milestone trackers.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/personal/personal-8/index.html',
  },
  {
    id: 9509,
    name: 'Arjun Mehta — AI Engineer & Full-Stack Developer',
    slug: 'personal-9',
    previewImage: '/templates/personal/personal-9-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 22, name: 'Personal', slug: 'personal' },
    pagesCount: 1,
    downloadsCount: 1410,
    description: 'A sleek developer portfolio with dark theme aesthetic, project grids, and downloadable CV modal integrations.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/personal/personal-9/index.html',
  },
  {
    id: 9510,
    name: 'Arjun Dev — Full Stack Developer & UI/UX Enthusiast',
    slug: 'personal-10',
    previewImage: '/templates/personal/personal-1-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 22, name: 'Personal', slug: 'personal' },
    pagesCount: 1,
    downloadsCount: 1680,
    description: 'A futuristic tech portfolio showcasing system engineering skills, project case studies, and interactive contact forms.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/personal/personal-10/index.html',
  },
  {
    id: 1,
    name: 'SnapFolio — Dark Minimalist Portfolio',
    slug: 'photography-1',
    previewImage: '/templates/photography/photography-1-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 8, name: 'Photography', slug: 'photography' },
    pagesCount: 1,
    downloadsCount: 15000,
    description: 'A dark-themed photography portfolio featuring a floating glass sidebar navigation, animated typewriter hero headlines, responsive masonry layouts, next/prev arrow keyboard navigation lightbox, and integrated booking validation feedback.',
    bootstrapVersion: 'HTML5 / Tailwind CSS',
    version: '1.0',
    demoUrl: '/templates/photography/photography-1/index.html',
  },
  {
    id: 2,
    name: 'Photo — Editorial Photography Studio',
    slug: 'photography-2',
    previewImage: '/templates/photography/photography-2-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 8, name: 'Photography', slug: 'photography' },
    pagesCount: 1,
    downloadsCount: 8400,
    description: 'A high-end, editorial landing page template for creative photography studios. Features Sphere-style scroll-linked canvas camera aperture and lens flare animations, split-layout typography, and interactive showcase grids.',
    bootstrapVersion: 'HTML5 / Vanilla CSS',
    version: '1.0',
    demoUrl: '/templates/photography/photography-2/index.html',
  },
  {
    id: 3,
    name: 'Lumière — High-End Wedding & Event Photography',
    slug: 'photography-3',
    previewImage: '/templates/photography/photography-3-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 8, name: 'Photography', slug: 'photography' },
    pagesCount: 1,
    downloadsCount: 1200,
    description: 'A responsive, high-end wedding and event photography portfolio web template with a warm ivory backdrop, center-split navigation, elegant serif headings, and sticky whatsapp/phone buttons.',
    bootstrapVersion: 'HTML5 / Tailwind CSS',
    version: '1.0',
    demoUrl: '/templates/photography/photography-3/index.html',
  },
  {
    id: 124,
    name: 'Eden Rose — Cinematic Luxury Wedding Portfolio',
    slug: 'photography-4',
    previewImage: '/templates/photography/photography-4-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 8, name: 'Photography', slug: 'photography' },
    pagesCount: 1,
    downloadsCount: 1320,
    description: 'A high-end cinematic wedding photography portfolio template with immersive slideshows, custom transitions, and smooth galleries.',
    bootstrapVersion: 'HTML5 / Vanilla CSS',
    version: '1.0.0',
    demoUrl: '/templates/photography/photography-4/index.html',
  },
  {
    id: 125,
    name: 'Aura — Premium Fine Art Studio',
    slug: 'photography-5',
    previewImage: '/templates/photography/photography-5-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 8, name: 'Photography', slug: 'photography' },
    pagesCount: 1,
    downloadsCount: 1430,
    description: 'A premium fine art and editorial studio portfolio featuring elegant dark-theme aesthetics, grid catalogs, and custom zoom-in lightboxes.',
    bootstrapVersion: 'HTML5 / Vanilla CSS',
    version: '1.0.0',
    demoUrl: '/templates/photography/photography-5/index.html',
  },
  {
    id: 127,
    name: 'Kairo — Modern 3D Photography Portfolio',
    slug: 'photography-6',
    previewImage: '/templates/photography/photography-6-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 8, name: 'Photography', slug: 'photography' },
    pagesCount: 1,
    downloadsCount: 1820,
    description: 'A modern, interactive photography portfolio featuring advanced 3D orbital interactions, custom cursor shaders, and horizontal scroll grids.',
    bootstrapVersion: 'HTML5 / Three.js / Vanilla JS',
    version: '1.0.0',
    demoUrl: '/templates/photography/photography-6/index.html',
  },
  {
    id: 145,
    name: 'Lume Studio — Fashion & Editorial Portfolio',
    slug: 'photography-7',
    previewImage: '/templates/photography/photography-7-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 8, name: 'Photography', slug: 'photography' },
    pagesCount: 1,
    downloadsCount: 1510,
    description: 'A fashion-focused editorial photography portfolio with clean minimalist grids, typography layouts, and interactive sliders.',
    bootstrapVersion: 'HTML5 / Vanilla CSS',
    version: '1.0.0',
    demoUrl: '/templates/photography/photography-7/index.html',
  },
  {
    id: 109,
    name: 'Sage & Shutter — Fine Art Wedding Photography',
    slug: 'sage-shutter-photography',
    previewImage: '/templates/photography/photography-8-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 8, name: 'Photography', slug: 'photography' },
    pagesCount: 1,
    downloadsCount: 2300,
    description: 'An elegant, high-end fine art wedding photography showcase template. Features delicate earthy desaturated filters, parallax image carousels, custom cursor indicators, and responsive testimonial sliders.',
    bootstrapVersion: 'React / Tailwind CSS / Motion',
    version: '1.0.0',
    demoUrl: '/templates/photography/photography-8/index.html',
  },
  {
    id: 110,
    name: 'Blush Lens — Fine Art Wedding Photography',
    slug: 'blush-lens-photography',
    previewImage: '/templates/photography/photography-9-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 8, name: 'Photography', slug: 'photography' },
    pagesCount: 1,
    downloadsCount: 1850,
    description: 'A premium React wedding photography template featuring romantic blush and warm ivory tones, editorial serif typography, interactive booking forms, and dynamic parallax portfolio galleries.',
    bootstrapVersion: 'React / Tailwind CSS / Motion',
    version: '1.0.0',
    demoUrl: '/templates/photography/photography-9/index.html',
  },
  {
    id: 111,
    name: 'Aether Studio — Fine Art Editorial Photography',
    slug: 'aether-studio-photography',
    previewImage: '/templates/photography/photography-1-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 8, name: 'Photography', slug: 'photography' },
    pagesCount: 1,
    downloadsCount: 1480,
    description: 'A high-end, editorial photography showcase template. Features custom slide overlays, parallax grid systems, desaturated earthy image styling, and elegant typewriter layout design.',
    bootstrapVersion: 'React / Tailwind CSS / Motion',
    version: '1.0.0',
    demoUrl: '/templates/photography/photography-10/index.html',
  },
  {
    id: 150,
    name: 'Aethelgard — Minimalist Architecture Portfolio',
    slug: 'portfolio-1',
    previewImage: '/templates/portfolio/portfolio-1-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 18, name: 'portfolio', slug: 'portfolio' },
    pagesCount: 1,
    downloadsCount: 1450,
    description: 'A minimalist architecture and luxury property design portfolio featuring custom horizontal slide entries, detailed structural specification tables, and interactive project image modal previews.',
    bootstrapVersion: 'React / Vite / Tailwind CSS',
    version: '1.0.0',
    demoUrl: '/templates/portfolio/portfolio-1/index.html',
  },
  {
    id: 151,
    name: 'Aiden Drake — Product Designer & Developer',
    slug: 'portfolio-2',
    previewImage: '/templates/portfolio/portfolio-2-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 18, name: 'portfolio', slug: 'portfolio' },
    pagesCount: 1,
    downloadsCount: 1580,
    description: 'A modern, high-contrast dark theme developer and visual designer personal bio page. Features animated skill progress bars, structured project tags, and custom card grids.',
    bootstrapVersion: 'React / Vite / Tailwind CSS',
    version: '1.0.0',
    demoUrl: '/templates/portfolio/portfolio-2/index.html',
  },
  {
    id: 152,
    name: 'Sasha Grey — Creative Visual Director',
    slug: 'portfolio-3',
    previewImage: '/templates/portfolio/portfolio-3-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 18, name: 'portfolio', slug: 'portfolio' },
    pagesCount: 1,
    downloadsCount: 1720,
    description: 'A bold, high-contrast modern portfolio built for designers and creators. Features responsive interactive masonry layout, detailed project image lightbox zooms, and structured work archive pages.',
    bootstrapVersion: 'React / Vite / Tailwind CSS',
    version: '1.0.0',
    demoUrl: '/templates/portfolio/portfolio-3/index.html',
  },
  {
    id: 153,
    name: 'Clara Oswald — Minimalist UI Designer',
    slug: 'portfolio-4',
    previewImage: '/templates/portfolio/portfolio-4-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 18, name: 'portfolio', slug: 'portfolio' },
    pagesCount: 1,
    downloadsCount: 1390,
    description: 'An airy, clean minimalist layout with spacious grids and light backgrounds. Perfect for copywriters, writers, and digital consultants.',
    bootstrapVersion: 'React / Vite / Tailwind CSS',
    version: '1.0.0',
    demoUrl: '/templates/portfolio/portfolio-4/index.html',
  },
  {
    id: 154,
    name: 'Evelyn Vance — Full-Stack Visual Architect',
    slug: 'portfolio-5',
    previewImage: '/templates/portfolio/portfolio-5-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 18, name: 'portfolio', slug: 'portfolio' },
    pagesCount: 4,
    downloadsCount: 1650,
    description: 'A fully routed multipage portfolio containing integrated Home, About, Projects, and Contact pages, custom transitions, and smooth global headers.',
    bootstrapVersion: 'React / Vite / Tailwind CSS / Router',
    version: '1.0.0',
    demoUrl: '/templates/portfolio/portfolio-5/index.html',
  },
  {
    id: 155,
    name: 'Synthetix — Tech-Forward SaaS & Software Agency',
    slug: 'portfolio-6',
    previewImage: '/templates/portfolio/portfolio-6-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 18, name: 'portfolio', slug: 'portfolio' },
    pagesCount: 4,
    downloadsCount: 1890,
    description: 'A tech-forward, modern multipage digital agency and portfolio template. Features interactive skill bars, animated company grids, custom project card showcases, and responsive newsletter forms.',
    bootstrapVersion: 'React / Vite / Tailwind CSS / Router',
    version: '1.0.0',
    demoUrl: '/templates/portfolio/portfolio-6/index.html',
  },
  {
    id: 156,
    name: 'Jared Vance — Creative Director & Visual Designer',
    slug: 'portfolio-7',
    previewImage: '/templates/portfolio/portfolio-7-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 18, name: 'portfolio', slug: 'portfolio' },
    pagesCount: 1,
    downloadsCount: 1520,
    description: 'A beautiful personal showcase featuring warm CSS mesh gradients, elegant editorial serif typography, interactive case study cards, and sleek contact links.',
    bootstrapVersion: 'React / Vite / Tailwind CSS',
    version: '1.0.0',
    demoUrl: '/templates/portfolio/portfolio-7/index.html',
  },
  {
    id: 157,
    name: 'Evelyn Oswald — Executive Assistant & Operations',
    slug: 'portfolio-8',
    previewImage: '/templates/portfolio/portfolio-8-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 18, name: 'portfolio', slug: 'portfolio' },
    pagesCount: 1,
    downloadsCount: 1410,
    description: 'A modern typography-first layout with high-end editorial grids and subtle hover interactions, perfect for project managers and operation leads.',
    bootstrapVersion: 'React / Vite / Tailwind CSS',
    version: '1.0.0',
    demoUrl: '/templates/portfolio/portfolio-8/index.html',
  },
  {
    id: 158,
    name: 'Sasha Grey — Minimalist Portrait Photographer',
    slug: 'portfolio-9',
    previewImage: '/templates/portfolio/portfolio-9-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 18, name: 'portfolio', slug: 'portfolio' },
    pagesCount: 3,
    downloadsCount: 1620,
    description: 'An elegant black-and-white theme photography portfolio template featuring structured photo galleries, horizontal slider interactions, and styled info pages.',
    bootstrapVersion: 'React / Vite / Tailwind CSS / Router',
    version: '1.0.0',
    demoUrl: '/templates/portfolio/portfolio-9/index.html',
  },
  {
    id: 159,
    name: 'Sasha Grey Studio — Creative Director & Photographer',
    slug: 'portfolio-10',
    previewImage: '/templates/portfolio/portfolio-1-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 18, name: 'portfolio', slug: 'portfolio' },
    pagesCount: 4,
    downloadsCount: 1750,
    description: 'An premium, clean-cut creative multipage digital agency and portfolio template. Features interactive work grids, detail modals, team showcases, and custom contact forms.',
    bootstrapVersion: 'React / Vite / Tailwind CSS / Router',
    version: '1.0.0',
    demoUrl: '/templates/portfolio/portfolio-10/index.html',
  },
  {
    id: 9501,
    name: 'Estate Prime — Signature Real Estate Branding',
    slug: 'estate-prime',
    previewImage: '/templates/real-estate/real-estate-1-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 19, name: 'Real Estate', slug: 'real-estate' },
    pagesCount: 1,
    downloadsCount: 1800,
    description: 'Confidential premium estate listing portal featuring luxury residential showcases, dynamic specifications, and booking tour capture.',
    bootstrapVersion: 'React 19 / Vite / Tailwind CSS',
    demoUrl: '/templates/real-estate/real-estate-1/index.html',
    version: '1.0',
  },
  {
    id: 9502,
    name: 'Urbanova — Cosmopolitan Property Collection',
    slug: 'urbanova',
    previewImage: '/templates/real-estate/real-estate-2-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 19, name: 'Real Estate', slug: 'real-estate' },
    pagesCount: 1,
    downloadsCount: 1800,
    description: 'A sophisticated urban residential and condominium directory featuring premium neighborhood stats, pricing calculators, and interactive slot bookings.',
    bootstrapVersion: 'React 19 / Vite / Tailwind CSS',
    demoUrl: '/templates/real-estate/real-estate-2/index.html',
    version: '1.0',
  },
  {
    id: 9503,
    name: 'Luxora Estates — Elite Architectural Portfolios',
    slug: 'luxora-estates',
    previewImage: '/templates/real-estate/real-estate-3-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 19, name: 'Real Estate', slug: 'real-estate' },
    pagesCount: 1,
    downloadsCount: 1800,
    description: 'Elite real estate showcase tailored for ultra-high-net-worth acquisitions, featuring full-screen immersive galleries, BIM integration, and private consultation forms.',
    bootstrapVersion: 'React 19 / Vite / Tailwind CSS',
    demoUrl: '/templates/real-estate/real-estate-3/index.html',
    version: '1.0',
  },
  {
    id: 9504,
    name: 'Skyline Collective — Metropolitan Penthouse Suites',
    slug: 'skyline-collective',
    previewImage: '/templates/real-estate/real-estate-4-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 19, name: 'Real Estate', slug: 'real-estate' },
    pagesCount: 1,
    downloadsCount: 1800,
    description: 'Premium property list curated for penthouses and sky-high luxury suites, featuring custom height inspectors, wind-load data, and private tour registries.',
    bootstrapVersion: 'React 19 / Vite / Tailwind CSS',
    demoUrl: '/templates/real-estate/real-estate-4/index.html',
    version: '1.0',
  },
  {
    id: 9505,
    name: 'Terra Living — Eco-Friendly Residential Designs',
    slug: 'terra-living',
    previewImage: '/templates/real-estate/real-estate-5-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 19, name: 'Real Estate', slug: 'real-estate' },
    pagesCount: 1,
    downloadsCount: 1800,
    description: 'Sustainably built family houses and residential community layouts, featuring carbon offset stats, solar energy calculators, and garden lot customizers.',
    bootstrapVersion: 'React 19 / Vite / Tailwind CSS',
    demoUrl: '/templates/real-estate/real-estate-5/index.html',
    version: '1.0',
  },
  {
    id: 9506,
    name: 'MetroHaus — Smart Urban Apartments & Lofts',
    slug: 'metrohaus',
    previewImage: '/templates/real-estate/real-estate-6-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 19, name: 'Real Estate', slug: 'real-estate' },
    pagesCount: 1,
    downloadsCount: 1800,
    description: 'A minimalist loft and modern downtown apartment guide, featuring smart home spec lists, interactive room planners, and neighborhood commute estimators.',
    bootstrapVersion: 'React 19 / Vite / Tailwind CSS',
    demoUrl: '/templates/real-estate/real-estate-6/index.html',
    version: '1.0',
  },
  {
    id: 9507,
    name: 'Heritage Homes — Restored Classic Estates',
    slug: 'heritage-homes',
    previewImage: '/templates/real-estate/real-estate-7-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 19, name: 'Real Estate', slug: 'real-estate' },
    pagesCount: 1,
    downloadsCount: 1800,
    description: 'Classic Tudor, Victorian, and mid-century modern historical restoration listings, featuring historical context timelines and materials registers.',
    bootstrapVersion: 'React 19 / Vite / Tailwind CSS',
    demoUrl: '/templates/real-estate/real-estate-7/index.html',
    version: '1.0',
  },
  {
    id: 9508,
    name: 'Vertex Properties — Industrial & Commercial Spaces',
    slug: 'vertex-properties',
    previewImage: '/templates/real-estate/real-estate-8-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 19, name: 'Real Estate', slug: 'real-estate' },
    pagesCount: 1,
    downloadsCount: 1800,
    description: 'Premium warehouse, office park, and co-working property listings, featuring custom floor space calculators and lease term customizers.',
    bootstrapVersion: 'React 19 / Vite / Tailwind CSS',
    demoUrl: '/templates/real-estate/real-estate-8/index.html',
    version: '1.0',
  },
  {
    id: 9509,
    name: 'Haven Realty — Coastal Vacation Homes & Villas',
    slug: 'haven-realty',
    previewImage: '/templates/real-estate/real-estate-9-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 19, name: 'Real Estate', slug: 'real-estate' },
    pagesCount: 1,
    downloadsCount: 1800,
    description: 'Elite waterfront property directory featuring sea-level stats, private beach indices, boat slip availability, and seasonal booking calculators.',
    bootstrapVersion: 'React 19 / Vite / Tailwind CSS',
    demoUrl: '/templates/real-estate/real-estate-9/index.html',
    version: '1.0',
  },
  {
    id: 9510,
    name: 'Monument Estates — Historic Castle & Manor Listings',
    slug: 'monument-estates',
    previewImage: '/templates/real-estate/real-estate-1-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 19, name: 'Real Estate', slug: 'real-estate' },
    pagesCount: 1,
    downloadsCount: 1800,
    description: 'Ultra-luxury castle, château, and private island listings, featuring gatehouse specs, helipad registries, and confidentiality agreements.',
    bootstrapVersion: 'React 19 / Vite / Tailwind CSS',
    demoUrl: '/templates/real-estate/real-estate-10/index.html',
    version: '1.0',
  },
  {
    id: 15,
    name: 'Ember House — Artisan Dining & Gathering Space',
    slug: 'ember-house',
    previewImage: '/templates/restaurant/restaurant-1-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 11, name: 'Restaurant', slug: 'restaurant' },
    pagesCount: 8,
    downloadsCount: 2950,
    description: 'An elegant, full-featured artisan restaurant and gathering venue template. Features fine dining menu displays, inline reservation requests, slideshow lookbooks, team/chef highlights, and clean typography.',
    demoUrl: '/templates/restaurant/restaurant-1/index.html',
  },
  {
    id: 16,
    name: 'Ember & Olive — Artisan Seasonal Restaurant',
    slug: 'ember-and-olive-react',
    previewImage: '/templates/restaurant/restaurant-2-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 11, name: 'Restaurant', slug: 'restaurant' },
    pagesCount: 6,
    downloadsCount: 9500,
    description: 'An elegant, premium React-refactored restaurant template featuring signature dish modals, scroll progress cursors, reservation sections, event highlights, and a gorgeous lightbox gallery.',
    demoUrl: '/templates/restaurant/restaurant-2/index.html',
  },
  {
    id: 17,
    name: 'Lumière — Modern Culinary Concept Store',
    slug: 'lumiere-restaurant',
    previewImage: '/templates/restaurant/restaurant-3-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 11, name: 'Restaurant', slug: 'restaurant' },
    pagesCount: 1,
    downloadsCount: 1840,
    description: 'An immersive and cinematic restaurant concept showcase template. Features custom dynamic cursors, interactive floating dish hover cards, smooth scroll reveals, custom reservation modals, and structured storytelling panels.',
    demoUrl: '/templates/restaurant/restaurant-3/index.html',
  },
  {
    id: 18,
    name: 'Ember House Noire — Contemporary Garden Restaurant',
    slug: 'ember-house-noire',
    previewImage: '/templates/restaurant/restaurant-4-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 11, name: 'Restaurant', slug: 'restaurant' },
    pagesCount: 1,
    downloadsCount: 1450,
    description: 'A contemporary garden restaurant template styled in dark editorial aesthetics. Features botanical garden themes, interactive curatorial grids, testimonial slide bars, custom cursors, and reservation capture forms.',
    demoUrl: '/templates/restaurant/restaurant-4/index.html',
  },
  {
    id: 19,
    name: 'NOIRE — Nocturnal Garden Bar & Grill',
    slug: 'noire-restaurant',
    previewImage: '/templates/restaurant/restaurant-5-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 11, name: 'Restaurant', slug: 'restaurant' },
    pagesCount: 1,
    downloadsCount: 1200,
    description: 'An premium, unconventional, and moody restaurant template featuring custom ambient audio lounge music, live fireplace hearth sections, dynamic parallax scroll effects, menu showcases, and reservation builders.',
    demoUrl: '/templates/restaurant/restaurant-5/index.html',
  },
  {
    id: 128,
    name: 'Konkan Coast — Coastal Cuisine & Modern Table',
    slug: 'konkan-coast',
    previewImage: '/templates/restaurant/restaurant-6-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 11, name: 'Restaurant', slug: 'restaurant' },
    pagesCount: 1,
    downloadsCount: 1650,
    description: 'An elegant, premium React-refactored restaurant template featuring custom ambient audio lounge music, live fireplace hearth sections, dynamic parallax scroll effects, menu showcases, and reservation builders.',
    demoUrl: '/templates/restaurant/restaurant-6/index.html',
  },
  {
    id: 129,
    name: 'Masala Atelier — Modern Indian Fusion',
    slug: 'masala-atelier',
    previewImage: '/templates/restaurant/restaurant-7-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 11, name: 'Restaurant', slug: 'restaurant' },
    pagesCount: 1,
    downloadsCount: 1950,
    description: 'A contemporary chic Indian fusion culinary studio in Mumbai. Asymmetric layouts, truffle paneer tikka, saffron cheesecake, and modern craft mocktails.',
    demoUrl: '/templates/restaurant/restaurant-7/index.html',
  },
  {
    id: 130,
    name: 'Rang Mahal — Traditional Rajasthani',
    slug: 'rang-mahal',
    previewImage: '/templates/restaurant/restaurant-8-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 11, name: 'Restaurant', slug: 'restaurant' },
    pagesCount: 1,
    downloadsCount: 2200,
    description: 'A luxury Rajasthani heritage restaurant from Jaipur. Maroon-gold archways, traditional Dal Baati Churma dishes, and premium royal dining layouts.',
    demoUrl: '/templates/restaurant/restaurant-8/index.html',
  },
  {
    id: 131,
    name: 'The Royal Tandoor — Luxury North Indian',
    slug: 'the-royal-tandoor',
    previewImage: '/templates/restaurant/restaurant-9-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 11, name: 'Restaurant', slug: 'restaurant' },
    pagesCount: 1,
    downloadsCount: 2800,
    description: 'A high-end regal Mughlai dining experience located in New Delhi. Sophisticated gold-burgundy color palettes, buttery rich dal makhani, and premium tandoor grills.',
    demoUrl: '/templates/restaurant/restaurant-9/index.html',
  },
  {
    id: 132,
    name: 'Southern Ember — Modern South Indian',
    slug: 'southern-ember',
    previewImage: '/templates/restaurant/restaurant-1-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 11, name: 'Restaurant', slug: 'restaurant' },
    pagesCount: 1,
    downloadsCount: 3100,
    description: 'A premium modern South Indian culinary experience from Chennai. Features a golden ghee roast Dosa showcase, claypot idlis, filter coffee, and warm terracotta design accents.',
    demoUrl: '/templates/restaurant/restaurant-10/index.html',
  },
  {
    id: 9201,
    name: 'Jordan Davis — Software Engineer & Full Stack Developer',
    slug: 'resume-1',
    previewImage: '/templates/resume/resume-1-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 20, name: 'Resume', slug: 'resume' },
    pagesCount: 1,
    downloadsCount: 1450,
    description: 'A clean, professional minimalist resume template with smooth scroll navigation, detailed experience timeline, skills visualization, and contact form.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/resume/resume-1/index.html',
  },
  {
    id: 9202,
    name: 'Dr. Maya Ellison — Consultant Cardiologist',
    slug: 'resume-2',
    previewImage: '/templates/resume/resume-2-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 20, name: 'Resume', slug: 'resume' },
    pagesCount: 1,
    downloadsCount: 1200,
    description: 'A self-contained professional medical CV template tailored for doctors and researchers featuring timeline accomplishments, certifications, and publications.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/resume/resume-2/index.html',
  },
  {
    id: 9203,
    name: 'Dr. Arin Solberg — Aerospace Systems Engineer',
    slug: 'resume-3',
    previewImage: '/templates/resume/resume-3-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 20, name: 'Resume', slug: 'resume' },
    pagesCount: 1,
    downloadsCount: 1650,
    description: 'A bold, high-contrast creative resume and portfolio template featuring asymmetrical sections, work lookbook, and contact overlays.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/resume/resume-3/index.html',
  },
  {
    id: 9204,
    name: 'Noah Everwood — Wildlife Photographer & Storyteller',
    slug: 'resume-4',
    previewImage: '/templates/resume/resume-4-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 20, name: 'Resume', slug: 'resume' },
    pagesCount: 1,
    downloadsCount: 1850,
    description: 'A sleek dark-theme software developer resume template featuring interactive tech stack badges, GitHub project showcases, and career progress lines.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/resume/resume-4/index.html',
  },
  {
    id: 9205,
    name: 'Adrian Vale — Architect & Spatial Designer',
    slug: 'resume-5',
    previewImage: '/templates/resume/resume-5-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 20, name: 'Resume', slug: 'resume' },
    pagesCount: 1,
    downloadsCount: 1540,
    description: 'An elegant, typography-focused CV template for product designers featuring portfolio showcases, service grids, and experience milestones.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/resume/resume-5/index.html',
  },
  {
    id: 9206,
    name: 'Elena Marlowe — Creative Director & Brand Strategist',
    slug: 'resume-6',
    previewImage: '/templates/resume/resume-6-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 20, name: 'Resume', slug: 'resume' },
    pagesCount: 1,
    downloadsCount: 1390,
    description: 'A corporate-ready executive profile template with a clean layout, highlights, professional overview, and structured career history.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/resume/resume-6/index.html',
  },
  {
    id: 9207,
    name: 'Lucien Moreau — Executive Chef & Culinary Director',
    slug: 'resume-7',
    previewImage: '/templates/resume/resume-7-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 20, name: 'Resume', slug: 'resume' },
    pagesCount: 1,
    downloadsCount: 1480,
    description: 'A unique, image-rich culinary portfolio and CV template for chefs and culinary artists featuring signature dishes, concept timelines, and collaborations.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/resume/resume-7/index.html',
  },
  {
    id: 9208,
    name: 'Elara Voss — Fashion Designer & Creative Director',
    slug: 'resume-8',
    previewImage: '/templates/resume/resume-8-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 20, name: 'Resume', slug: 'resume' },
    pagesCount: 1,
    downloadsCount: 1610,
    description: 'A premium portfolio and resume template for visual creatives and photographers featuring elegant image galleries, CV modals, and lookbooks.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/resume/resume-8/index.html',
  },
  {
    id: 9709,
    name: 'Dr. Mira Ellison — Behavioral Researcher',
    slug: 'resume-9',
    previewImage: '/templates/resume/resume-9-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 19, name: 'resume', slug: 'resume' },
    pagesCount: 1,
    downloadsCount: 1410,
    description: 'A sleek visual artist resume with interactive grids, filterable portfolios, and custom contact sections.',
    bootstrapVersion: 'React / Vite / CSS',
    version: '1.0.0',
    demoUrl: '/templates/resume/resume-9/index.html',
  },
  {
    id: 9601,
    name: 'Voltway — Smart EV Transit & Logistics',
    slug: 'voltway',
    previewImage: '/templates/transportation/transportation-1-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 21, name: 'Transportation', slug: 'transportation' },
    pagesCount: 1,
    downloadsCount: 1540,
    description: 'Next-generation electric vehicle fleet operator dashboard and logistics solution portal featuring live charger mapping, battery state tracking, and smart scheduling integrations.',
    bootstrapVersion: 'React 19 / Vite / Tailwind CSS',
    demoUrl: '/templates/transportation/transportation-1/index.html',
    version: '1.0',
  },
  {
    id: 9602,
    name: 'Roadline — Modern Freight Operations',
    slug: 'roadline',
    previewImage: '/templates/transportation/transportation-2-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 21, name: 'Transportation', slug: 'transportation' },
    pagesCount: 1,
    downloadsCount: 1540,
    description: 'Modern heavy-freight and national trucking operations interface featuring route optimizations, shipment telemetry, and real-time delivery status alerts.',
    bootstrapVersion: 'React 19 / Vite / Tailwind CSS',
    demoUrl: '/templates/transportation/transportation-2/index.html',
    version: '1.0',
  },
  {
    id: 9603,
    name: 'Fleetrise — Smart Fleet Intelligence & Analytics',
    slug: 'fleetrise',
    previewImage: '/templates/transportation/transportation-3-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 21, name: 'Transportation', slug: 'transportation' },
    pagesCount: 1,
    downloadsCount: 1540,
    description: 'Professional fleet tracking and diagnostic software layout featuring detailed driver safety telemetry, OBD metrics, and fuel consumption charts.',
    bootstrapVersion: 'React 19 / Vite / Tailwind CSS',
    demoUrl: '/templates/transportation/transportation-3/index.html',
    version: '1.0',
  },
  {
    id: 9604,
    name: 'Skyroute — Global Air Charter Systems',
    slug: 'skyroute',
    previewImage: '/templates/transportation/transportation-4-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 21, name: 'Transportation', slug: 'transportation' },
    pagesCount: 1,
    downloadsCount: 1540,
    description: 'Luxury air charter registry and flight scheduling portal featuring private terminal bookings, cargo capacity calculations, and custom route quote estimators.',
    bootstrapVersion: 'React 19 / Vite / Tailwind CSS',
    demoUrl: '/templates/transportation/transportation-4/index.html',
    version: '1.0',
  },
  {
    id: 9605,
    name: 'Citymove — Local Courier & Moving Solutions',
    slug: 'citymove',
    previewImage: '/templates/transportation/transportation-5-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 21, name: 'Transportation', slug: 'transportation' },
    pagesCount: 1,
    downloadsCount: 1540,
    description: 'Sleek on-demand package courier and moving agency portal featuring weight pricing matrices, live distance estimations, and drop-off time selectors.',
    bootstrapVersion: 'React 19 / Vite / Tailwind CSS',
    demoUrl: '/templates/transportation/transportation-5/index.html',
    version: '1.0',
  },
  {
    id: 9606,
    name: 'Transitflow — Regional Supply Chain Management',
    slug: 'transitflow',
    previewImage: '/templates/transportation/transportation-6-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 21, name: 'Transportation', slug: 'transportation' },
    pagesCount: 1,
    downloadsCount: 1540,
    description: 'Regional multi-modal hub distribution and sorting layout featuring custom transit timetables, warehouse capacity tracking, and carrier integration lists.',
    bootstrapVersion: 'React 19 / Vite / Tailwind CSS',
    demoUrl: '/templates/transportation/transportation-6/index.html',
    version: '1.0',
  },
  {
    id: 9607,
    name: 'Cargomax — Heavy Cargo & Shipping Enterprise',
    slug: 'cargomax',
    previewImage: '/templates/transportation/transportation-7-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 21, name: 'Transportation', slug: 'transportation' },
    pagesCount: 1,
    downloadsCount: 1540,
    description: 'Heavy cargo logistics and industrial distribution portal featuring customs form generators, dimensional weight calculators, and container lot registers.',
    bootstrapVersion: 'React 19 / Vite / Tailwind CSS',
    demoUrl: '/templates/transportation/transportation-7/index.html',
    version: '1.0',
  },
  {
    id: 9608,
    name: 'Rideora — Smart Urban Ride-Hailing Network',
    slug: 'rideora',
    previewImage: '/templates/transportation/transportation-8-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 21, name: 'Transportation', slug: 'transportation' },
    pagesCount: 1,
    downloadsCount: 1540,
    description: 'Interactive rideshare and taxi network portal featuring fare calculators, driver onboarding flows, regional service heatmaps, and ride booking previews.',
    bootstrapVersion: 'React 19 / Vite / Tailwind CSS',
    demoUrl: '/templates/transportation/transportation-8/index.html',
    version: '1.0',
  },
  {
    id: 9609,
    name: 'Railnova — Automated Rail Transit & Operations',
    slug: 'railnova',
    previewImage: '/templates/transportation/transportation-9-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 21, name: 'Transportation', slug: 'transportation' },
    pagesCount: 1,
    downloadsCount: 1540,
    description: 'Urban light rail and intercity rail operations platform featuring automated switchboard simulations, carriage occupancy metrics, and delay tracker alerts.',
    bootstrapVersion: 'React 19 / Vite / Tailwind CSS',
    demoUrl: '/templates/transportation/transportation-9/index.html',
    version: '1.0',
  },
  {
    id: 9610,
    name: 'Oceanlink — International Maritime Operations',
    slug: 'oceanlink',
    previewImage: '/templates/transportation/transportation-1-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 21, name: 'Transportation', slug: 'transportation' },
    pagesCount: 1,
    downloadsCount: 1540,
    description: 'Global maritime freight, vessel scheduling, and seaport coordination system featuring cargo draft calculators, shipping lane weather overlays, and port ETA registries.',
    bootstrapVersion: 'React 19 / Vite / Tailwind CSS',
    demoUrl: '/templates/transportation/transportation-10/index.html',
    version: '1.0',
  },
  {
    id: 133,
    name: 'Travelverse — Interactive Travel & Trip Planner',
    slug: 'travelverse',
    previewImage: '/templates/travels/travel-1-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 5, name: 'Travels', slug: 'travels' },
    pagesCount: 1,
    downloadsCount: 1850,
    description: 'A premium, interactive React travel platform featuring dynamic page transitions, an interactive cyber world map, a custom trip builder, hotel booking cards, and stunning visual layouts.',
    demoUrl: '/templates/travels/travel-1/index.html',
  },
  {
    id: 187,
    name: 'Roamify — Immersive Travel & Tour Agency Portal',
    slug: 'roamify-travels',
    previewImage: '/templates/travels/travel-2-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 5, name: 'Travels', slug: 'travels' },
    pagesCount: 15,
    downloadsCount: 3100,
    description: 'A beautiful and fully-featured travel booking and tour discovery platform. Features custom-themed cursors, favorite wishlist managers, package filters, and travel guides.',
    bootstrapVersion: 'React / Tailwind CSS / Motion',
    version: '1.0.0',
    demoUrl: '/templates/travels/travel-2/index.html',
  },
  {
    id: 188,
    name: 'Wayfarer — Immersive Parallax Adventure Guide',
    slug: 'wayfarer-adventure',
    previewImage: '/templates/travels/travel-3-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 5, name: 'Travels', slug: 'travels' },
    pagesCount: 10,
    downloadsCount: 2450,
    description: 'A stunning adventure and wild tourism showcase page. Features smooth scroll-driven parallax layouts, booking forms, testimonials, and category galleries.',
    bootstrapVersion: 'React / Tailwind CSS / Vite',
    version: '1.0.0',
    demoUrl: '/templates/travels/travel-3/index.html',
  },
  {
    id: 189,
    name: 'Exploria — Modern Destination & Trekking Agency Hub',
    slug: 'exploria-trekking',
    previewImage: '/templates/travels/travel-4-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 5, name: 'Travels', slug: 'travels' },
    pagesCount: 8,
    downloadsCount: 1980,
    description: 'An elegant destination directory and trekking agency web application. Features package overlays, custom sliders, contact forms, and a responsive booking widget.',
    bootstrapVersion: 'React / Tailwind CSS / Vite',
    version: '1.0.0',
    demoUrl: '/templates/travels/travel-4/index.html',
  },
  {
    id: 190,
    name: 'Wilderness — Animated Outdoor Tourism Portal',
    slug: 'wilderness-tourism',
    previewImage: '/templates/travels/travel-5-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 5, name: 'Travels', slug: 'travels' },
    pagesCount: 6,
    downloadsCount: 1650,
    description: 'A beautiful animated outdoor, national park, and wilderness tourism platform. Features rich SVG animations, stats bands, destination overlays, and testimonial rails.',
    bootstrapVersion: 'React / Framer Motion / Tailwind / Vite',
    version: '1.0.0',
    demoUrl: '/templates/travels/travel-5/index.html',
  },
  {
    id: 191,
    name: 'Nomad — Interactive Travel Planner & Booking Hub',
    slug: 'nomad-planner',
    previewImage: '/templates/travels/travel-6-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 5, name: 'Travels', slug: 'travels' },
    pagesCount: 12,
    downloadsCount: 3400,
    description: 'A premium interactive travel planning and itinerary creation platform. Features dynamic stats bands, reviews drawers, custom destination galleries, and newsletter CTAs.',
    bootstrapVersion: 'React / Tailwind CSS / Vite',
    version: '1.0.0',
    demoUrl: '/templates/travels/travel-6/index.html',
  },
  {
    id: 192,
    name: 'Wanderlust Tales — Elegant Travel & Hiking Blog Platform',
    slug: 'wanderlust-tales',
    previewImage: '/templates/travels/travel-7-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 5, name: 'Travels', slug: 'travels' },
    pagesCount: 9,
    downloadsCount: 2200,
    description: 'A beautiful destination blogging and hiking journal application. Features interactive maps, story lists, review grids, and pre-booking overlays.',
    bootstrapVersion: 'React / Tailwind CSS / Vite',
    version: '1.0.0',
    demoUrl: '/templates/travels/travel-7/index.html',
  },
  {
    id: 193,
    name: 'Aether — Minimalist Luxury Travel & Resort Agency',
    slug: 'aether-resort',
    previewImage: '/templates/travels/travel-8-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 5, name: 'Travels', slug: 'travels' },
    pagesCount: 11,
    downloadsCount: 2750,
    description: 'A premium luxury travel agency and high-end resort booking platform. Features minimalist layouts, destination galleries, pricing packages, and review carousels.',
    bootstrapVersion: 'React / Tailwind CSS / Vite',
    version: '1.0.0',
    demoUrl: '/templates/travels/travel-8/index.html',
  },
  {
    id: 194,
    name: 'Exploria Pro — Premium Hiking & Mountain Guide Showcase',
    slug: 'exploria-pro',
    previewImage: '/templates/travels/travel-9-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 5, name: 'Travels', slug: 'travels' },
    pagesCount: 10,
    downloadsCount: 2100,
    description: 'An advanced trekking, hiking, and mountain guide pre-booking platform. Features immersive background hero sections, interactive gear guides, and customer reviews.',
    bootstrapVersion: 'React / Tailwind CSS / Vite',
    version: '1.0.0',
    demoUrl: '/templates/travels/travel-9/index.html',
  },
  {
    id: 195,
    name: 'Adventure Parallax — Immersive Parallax Outdoor Journal',
    slug: 'adventure-parallax',
    previewImage: '/templates/travels/travel-1-preview.png',
    templateType: 'FREE',
    price: 0,
    category: { id: 5, name: 'Travels', slug: 'travels' },
    pagesCount: 7,
    downloadsCount: 1890,
    description: 'Next-generation adventure travel journal. Features dynamic scroll-driven parallax layouts, background environmental loops, booking widgets, and rich animations.',
    bootstrapVersion: 'React / Tailwind CSS / Framer Motion / Vite',
    version: '1.0.0',
    demoUrl: '/templates/travels/travel-10/index.html',
  },
];

export const extractTemplateNumber = (t) => {
  if (!t) return 999;
  const demo = t.demoUrl || '';
  const slug = t.slug || '';
  
  const demoMatch = demo.match(/[-_](\d+)(?:\/index\.html)?$/);
  if (demoMatch) return parseInt(demoMatch[1], 10);

  const slugMatch = slug.match(/[-_](\d+)$/);
  if (slugMatch) return parseInt(slugMatch[1], 10);

  const numMatch = slug.match(/(\d+)/);
  if (numMatch) return parseInt(numMatch[1], 10);

  return 999;
};

export const sortTemplatesNumerically = (arr) => {
  if (!Array.isArray(arr)) return arr;
  return [...arr].sort((a, b) => {
    const catA = (a.category?.slug || a.category?.name || '').toLowerCase();
    const catB = (b.category?.slug || b.category?.name || '').toLowerCase();
    if (catA !== catB) {
      return catA.localeCompare(catB);
    }
    const numA = extractTemplateNumber(a);
    const numB = extractTemplateNumber(b);
    return numA - numB;
  });
};

MOCK_TEMPLATES.sort((a, b) => {
  const catA = (a.category?.slug || a.category?.name || '').toLowerCase();
  const catB = (b.category?.slug || b.category?.name || '').toLowerCase();
  if (catA !== catB) {
    return catA.localeCompare(catB);
  }
  const numA = extractTemplateNumber(a);
  const numB = extractTemplateNumber(b);
  return numA - numB;
});

export const api = {
  // Auth
  async login(email, password) {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password }),
      });
      const data = await handleResponse(res);
      if (data.token) {
        localStorage.setItem('ts_token', data.token);
        localStorage.setItem('ts_user', JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role
        }));
      }
      return data;
    } catch (err) {
      console.warn("Auth failed, using mock auth:", err);
      if (email === 'admin@technosprint.com' && password === 'adminpassword') {
        const mockUser = { id: 99, name: 'Admin User', email: 'admin@technosprint.com', role: 'ROLE_ADMIN' };
        localStorage.setItem('ts_token', 'mock-jwt-token');
        localStorage.setItem('ts_user', JSON.stringify(mockUser));
        return mockUser;
      }
      if (email === 'admin@admin.com') {
        const dummyAdmin = { token: 'mock-token', id: 99, name: 'Admin User', email: 'admin@admin.com', role: 'ROLE_ADMIN' };
        localStorage.setItem('ts_token', dummyAdmin.token);
        localStorage.setItem('ts_user', JSON.stringify(dummyAdmin));
        return dummyAdmin;
      }
      const dummyUser = { token: 'mock-token', id: 100, name: 'Test User', email: email, role: 'ROLE_USER' };
      localStorage.setItem('ts_token', dummyUser.token);
      localStorage.setItem('ts_user', JSON.stringify(dummyUser));
      return dummyUser;
    }
  },

  async register(name, email, password) {
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ name, email, password }),
      });
      return await handleResponse(res);
    } catch (err) {
      console.warn("Register connection failed, bypassing for mock:", err);
      return { message: "User registered successfully!" };
    }
  },

  logout() {
    localStorage.removeItem('ts_token');
    localStorage.removeItem('ts_user');
    return Promise.resolve();
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('ts_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Templates
  async getTemplates(params = {}) {
    try {
      const query = new URLSearchParams();
      if (params.category) query.append('category', params.category);
      if (params.search) query.append('search', params.search);
      if (params.type) query.append('type', params.type);
      
      const res = await fetch(`${BASE_URL}/templates?${query.toString()}`, {
        headers: getHeaders(),
      });
      const data = await handleResponse(res);
      if (Array.isArray(data) && data.length > 0) {
        return sortTemplatesNumerically(data);
      }
      let filtered = [...MOCK_TEMPLATES];
      if (params.category && params.category !== 'all') {
        filtered = filtered.filter(t => t.category.slug === params.category);
      }
      if (params.type && params.type !== 'all') {
        filtered = filtered.filter(t => t.templateType === params.type);
      }
      if (params.search) {
        const queryStr = params.search.toLowerCase();
        filtered = filtered.filter(t => 
          t.name.toLowerCase().includes(queryStr) || 
          t.description.toLowerCase().includes(queryStr) ||
          t.category.name.toLowerCase().includes(queryStr)
        );
      }
      return sortTemplatesNumerically(filtered);
    } catch (err) {
      console.warn("API templates fetch failed, utilizing mock fallback:", err);
      let filtered = [...MOCK_TEMPLATES];
      if (params.category && params.category !== 'all') {
        filtered = filtered.filter(t => t.category.slug === params.category);
      }
      if (params.type && params.type !== 'all') {
        filtered = filtered.filter(t => t.templateType === params.type);
      }
      if (params.search) {
        const queryStr = params.search.toLowerCase();
        filtered = filtered.filter(t => 
          t.name.toLowerCase().includes(queryStr) || 
          t.description.toLowerCase().includes(queryStr) ||
          (t.category && t.category.name && t.category.name.toLowerCase().includes(queryStr))
        );
      }
      return sortTemplatesNumerically(filtered);
    }
  },

  async getTemplatesByCategory(category) {
    try {
      const res = await fetch(`${BASE_URL}/templates/category/${category}`, {
        headers: getHeaders(),
      });
      const data = await handleResponse(res);
      if (Array.isArray(data) && data.length > 0) {
        return sortTemplatesNumerically(data);
      }
      return MOCK_TEMPLATES.filter(t => t.category.slug === category);
    } catch (err) {
      console.warn("API templates by category fetch failed, utilizing mock fallback:", err);
      return MOCK_TEMPLATES.filter(t => t.category.slug === category);
    }
  },

  async getTemplateById(id) {
    try {
      const res = await fetch(`${BASE_URL}/templates/${id}`, {
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      console.warn("API templates fetch failed, utilizing mock fallback:", err);
      return MOCK_TEMPLATES.find(t => t.id === Number(id)) || MOCK_TEMPLATES[0];
    }
  },

  async getTemplateBySlug(slug) {
    try {
      const res = await fetch(`${BASE_URL}/templates/slug/${slug}`, {
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      console.warn("API templates fetch failed, utilizing mock fallback:", err);
      return MOCK_TEMPLATES.find(t => t.slug === slug) || MOCK_TEMPLATES[0];
    }
  },

  async createTemplate(dto) {
    try {
      const res = await fetch(`${BASE_URL}/templates`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(dto),
      });
      return await handleResponse(res);
    } catch (err) {
      console.error("Failed to create template:", err);
      throw err;
    }
  },

  async updateTemplate(id, dto) {
    try {
      const res = await fetch(`${BASE_URL}/templates/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(dto),
      });
      return await handleResponse(res);
    } catch (err) {
      console.error("Failed to update template:", err);
      throw err;
    }
  },

  async deleteTemplate(id) {
    try {
      const res = await fetch(`${BASE_URL}/templates/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      console.error("Failed to delete template:", err);
      throw err;
    }
  },

  // Categories
  async getCategories() {
    try {
      const res = await fetch(`${BASE_URL}/categories`, {
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      console.warn("API categories fetch failed, utilizing mock fallback:", err);
      return MOCK_CATEGORIES;
    }
  },

  // Orders
  async createOrder(templateIds) {
    try {
      const res = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ templateIds }),
      });
      return await handleResponse(res);
    } catch (err) {
      console.warn("API order failed, using mock:", err);
      return { id: 88, status: 'PENDING', templateIds };
    }
  },

  async confirmPayment(orderId) {
    try {
      const res = await fetch(`${BASE_URL}/orders/${orderId}/confirm`, {
        method: 'POST',
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      return { id: orderId, status: 'PAID' };
    }
  },

  async getMyOrders() {
    try {
      const res = await fetch(`${BASE_URL}/orders`, {
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      return [];
    }
  },

  async getAllOrders() {
    try {
      const res = await fetch(`${BASE_URL}/orders/all`, {
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      return [];
    }
  },

  // Licenses
  async getMyLicenses() {
    try {
      const res = await fetch(`${BASE_URL}/licenses`, {
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      return [];
    }
  },

  async validateLicense(key) {
    try {
      const res = await fetch(`${BASE_URL}/licenses/validate/${key}`, {
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      return { valid: true, licenseKey: key };
    }
  },

  // Downloads
  async getDownloadToken(templateId) {
    try {
      const res = await fetch(`${BASE_URL}/templates/${templateId}/download-token`, {
        method: 'POST',
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      return { token: 'mock-download-token' };
    }
  },

  async getMyDownloadsHistory() {
    try {
      const res = await fetch(`${BASE_URL}/templates/downloads-history`, {
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      return [];
    }
  },

  // Projects / Builder
  async getMyProjects() {
    try {
      const res = await fetch(`${BASE_URL}/projects`, {
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      return [];
    }
  },

  async saveProject(projectName, templateId, projectData) {
    try {
      const res = await fetch(`${BASE_URL}/projects`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ projectName, templateId, projectData }),
      });
      return await handleResponse(res);
    } catch (err) {
      return { id: 77, projectName, templateId, projectData };
    }
  },

  async updateProject(id, projectName, projectData) {
    try {
      const res = await fetch(`${BASE_URL}/projects/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ projectName, projectData }),
      });
      return await handleResponse(res);
    } catch (err) {
      return { id, projectName, projectData };
    }
  },

  async deleteProject(id) {
    try {
      const res = await fetch(`${BASE_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      return { success: true };
    }
  },

  async exportProject(id) {
    try {
      const res = await fetch(`${BASE_URL}/projects/${id}/export`, {
        method: 'POST',
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      return new Blob();
    }
  }
};