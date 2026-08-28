export const technologyItems = [
  {
    id: "bim",
    title: "Building Information Modeling (BIM)",
    subtitle: "5D Virtual Construction & Clash Detection",
    description: "Every millimeter of structural, MEP, and architectural elements is modeled in 3D prior to pouring concrete, eliminating costly on-site clashes.",
    icon: "Layers",
    metric: "0% Physical Clashes",
    tags: ["Revit", "Navisworks", "5D Cost Control"]
  },
  {
    id: "3d-visualization",
    title: "3D Spatial Visualization & VR",
    subtitle: "Photorealistic Digital Twin Simulations",
    description: "Immersive virtual reality walkthroughs allow stakeholders to experience lighting, acoustics, and interior materiality before groundbreak.",
    icon: "Eye",
    metric: "Real-time Raytracing",
    tags: ["Unreal Engine", "V-Ray", "VR Walkthroughs"]
  },
  {
    id: "drone-monitoring",
    title: "Autonomous Drone Topography",
    subtitle: "Weekly Aerial Scans & Volumetric Tracking",
    description: "High-precision LiDAR and photogrammetry drones survey earthwork volume, structural alignment, and site security every 48 hours.",
    icon: "Plane",
    metric: "±5mm Accuracy",
    tags: ["LiDAR", "Thermal Scan", "Volumetrics"]
  },
  {
    id: "digital-pm",
    title: "Digital Project Management",
    subtitle: "Cloud-Synchronized Field Intelligence",
    description: "Real-time mobile punch lists, automated submittals, and cloud drawing revisions connect on-site foreman with design engineers instantly.",
    icon: "Smartphone",
    metric: "100% Paperless Field",
    tags: ["Procore", "Primavera P6", "Live Dashboards"]
  },
  {
    id: "smart-building",
    title: "Smart Building Systems & IoT",
    subtitle: "AI-Optimized Climate & Energy Automation",
    description: "Integrated Building Management Systems (BMS) with environmental sensors automatically optimize chilled water loops and fresh air intake.",
    icon: "Cpu",
    metric: "34% Energy Reduction",
    tags: ["KNX", "BACnet", "AI HVAC Balancing"]
  },
  {
    id: "analytics",
    title: "Predictive Construction Analytics",
    subtitle: "Supply Chain & Weather Impact Forecasting",
    description: "Machine learning algorithms monitor weather patterns, supply lead times, and curing rates to dynamically optimize labor deployment.",
    icon: "BarChart3",
    metric: "14% Faster Turnaround",
    tags: ["Predictive AI", "Supply Forecasting", "Quality Index"]
  }
];

export const sustainabilityPillars = [
  {
    icon: "Leaf",
    title: "Energy Efficiency",
    desc: "Optimized thermal building envelopes and high-performance double glazing reducing HVAC loads by up to 35%."
  },
  {
    icon: "Droplets",
    title: "Water Management",
    desc: "100% rainwater harvesting, deep aquifer recharge pits, and zero-liquid-discharge (ZLD) greywater recycling plants."
  },
  {
    icon: "Sun",
    title: "Renewable Energy",
    desc: "Integrated rooftop solar photovoltaic panels and net-metering systems powering common areas and EV hubs."
  },
  {
    icon: "Recycle",
    title: "Sustainable Materials",
    desc: "Fly-ash blended concrete, responsibly harvested certified timber, low-VOC finishes, and locally quarried granite."
  },
  {
    icon: "Trees",
    title: "Green Landscapes",
    desc: "Over 40% open green footprint with native drought-tolerant trees, vertical gardens, and permeable paving."
  },
  {
    icon: "Building2",
    title: "Smart Building Systems",
    desc: "Intelligent lighting sensors, CO2-demand controlled ventilation, and automated sub-metering for every floor."
  }
];

export const progressProjects = [
  {
    id: "nova-business-district",
    name: "NOVA BUSINESS DISTRICT",
    type: "Commercial Campus (18 Floors)",
    location: "Guindy, Chennai",
    overallProgress: 68,
    completionDate: "December 2027",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
    workforceOnSite: "320 Specialists",
    safetyHours: "480,000 Safe Hours",
    phases: [
      { name: "Foundation & Piling", progress: 100, status: "Complete" },
      { name: "Structural RCC Frame", progress: 82, status: "In Progress (Floor 16)" },
      { name: "Glass Curtain Facade", progress: 61, status: "In Progress" },
      { name: "MEP & Fire Systems", progress: 48, status: "In Progress" },
      { name: "Interior Fit-out & Lobby", progress: 30, status: "Underway" }
    ]
  },
  {
    id: "auren-heights",
    name: "AUREN HEIGHTS",
    type: "Luxury Residential (24 Floors)",
    location: "OMR, Chennai",
    overallProgress: 100,
    completionDate: "Delivered Q1 2025",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
    workforceOnSite: "Handover Team",
    safetyHours: "1,400,000 Safe Hours",
    phases: [
      { name: "Foundation & Basement", progress: 100, status: "Complete" },
      { name: "Tower Superstructure", progress: 100, status: "Complete" },
      { name: "Architectural Facade", progress: 100, status: "Complete" },
      { name: "MEP & Elevator Testing", progress: 100, status: "Complete" },
      { name: "Interiors & Final Handover", progress: 100, status: "Handed Over" }
    ]
  },
  {
    id: "adyar-urban-viaduct",
    name: "ADYAR URBAN VIADUCT",
    type: "Civil Infrastructure (3.2 km)",
    location: "Adyar, Chennai",
    overallProgress: 74,
    completionDate: "November 2026",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1000&q=80",
    workforceOnSite: "185 Engineers",
    safetyHours: "620,000 Safe Hours",
    phases: [
      { name: "Sub-surface Caissons", progress: 100, status: "Complete" },
      { name: "Piers & Pier Caps", progress: 95, status: "Complete" },
      { name: "Precast Segment Launching", progress: 74, status: "In Progress" },
      { name: "Bridge Deck Post-Tensioning", progress: 58, status: "In Progress" },
      { name: "Wearing Coat & Lighting", progress: 20, status: "Upcoming" }
    ]
  }
];
