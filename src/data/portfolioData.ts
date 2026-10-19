export interface SkillItem {
  name: string;
  category:
    | 'Programming Languages'
    | 'Frontend Development'
    | 'Backend and APIs'
    | 'AI/ML and Data Science'
    | 'Databases'
    | 'Developer Tools'
    | 'Other Technical Skills';
  status: 'Core / Proficient' | 'Currently Learning';
  description: string;
  badgeColor: string;
  shortIcon: string;
  featuredInSummary?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  problemStatement: string;
  solutionOverview: string;
  keyHighlights: string[];
  technologies: string[];
  category: 'AI & Machine Learning' | 'Full-Stack Web' | 'Frontend & Brand UI' | 'Systems & Academic Labs';
  image: string;
  realScreenshots?: string[];
  screenshotLabels?: string[];
  isFlagshipSpotlight?: boolean;
  reportPdfUrl?: string;
  academicContext?: string;
  pipelineStages?: string[];
  architectureHighlights?: { label: string; value: string; detail: string }[];
  featuredInBento: boolean;
  githubUrl: string;
  liveUrl?: string;
  repoStatusNote: string;
}

export interface SemesterRecord {
  semester: string;
  yearLabel: string;
  sgpa: string;
  focusSubjects: string[];
  isPlaceholder: boolean;
}

export interface PriorEducationItem {
  institution: string;
  qualification: string;
  period: string;
  location: string;
  highlights: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  category:
    | 'Industry Internship'
    | 'AI/ML & Cloud Certifications'
    | 'Programming & Web Certifications'
    | 'Academic & Research';
  dateLabel: string;
  credentialId?: string;
  description: string;
  previewImage: string;
  isPlaceholder: boolean;
  documentUrl?: string;
}

export interface ParticipationItem {
  id: string;
  title: string;
  category:
    | 'Industry Internship'
    | 'Academic Research'
    | 'Technical Events & Hackathons'
    | 'Web & Systems Engineering Labs';
  organization: string;
  period: string;
  description: string;
  status: 'Verified Milestone' | 'Ongoing / Active';
  linkUrl?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Live Project Screenshots' | 'Certificates & Seminars' | 'Portrait & Campus' | 'Anime World Art';
  caption: string;
  image: string;
  isSampleVisual: boolean;
  aspect: 'wide' | 'square' | 'tall';
  objectPosition?: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Salim Ansari',
    greeting: "Hey, I'm",
    eyebrow: 'COMPUTER SCIENCE • AI/ML',
    title: 'Computer Science Engineering Student | AI/ML Enthusiast',
    heroBio:
      'Building thoughtful software, exploring intelligent technologies, and turning ideas into practical projects.',
    shortAboutCard:
      "I'm Salim Ansari, a third-year Computer Science Engineering (AI & ML) student at Symbiosis Institute of Technology, Nagpur. I build autonomous AI workflows, full-stack web platforms, and practical software systems that create real-world impact.",
    walkingMottoTop: 'Small Steps',
    walkingMottoBottom: 'Big Dreams',
    institution: 'Symbiosis Institute of Technology, Nagpur',
    university: 'Symbiosis International (Deemed University) • NAAC A++',
    degree: 'B.Tech in Computer Science & Engineering',
    specialization: 'Artificial Intelligence & Machine Learning (AI & ML)',
    currentYear: 'Third Year (Batch 2024 – 2028)',
    prn: '24070521005 (Section A)',
    batchLabel: 'Third Year • B.Tech CSE (AI/ML)',
    location: 'Nagpur, Maharashtra, India',
    email: 'shamimversion0.1@gmail.com',
    secondaryEmail: 'salimansari369@users.noreply.github.com',
    phone: '+91 9730635697',
    emailNote: 'Verified email & phone from Salim Ansari’s official portfolio records',
    githubUrl: 'https://github.com/Salimansari369',
    linkedinUrl: 'https://www.linkedin.com/in/salim-ansari-3195b33a8/',
    instagramUrl: 'https://instagram.com/x.shehzada369.xvii',
    wixPortfolioUrl: 'https://shamimversion01.wixsite.com/my-site-3',
    resumePdfUrl: '/Salim_Ansari_Resume.pdf',
    avatarImage: '/assets/anime/avatar-portrait.jpg',
    realPhotoImage: '/assets/salim-real-face.jpg?v=face',
    introVideoUrl: '/assets/video/salim-wix-video.mp4',
    introRemoteVideoUrl: 'https://video.wixstatic.com/video/e1f28f_ac4741fac1334501b77891b0b8259ae9/480p/mp4/file.mp4',
    introVideoPoster: '/assets/video/salim-wix-poster.jpg',
    heroSceneryImage: '/assets/anime/hero-scenery.jpg',
    sunsetContactImage: '/assets/anime/sunset-contact.jpg',
    philosophyQuote:
      'I started coding seriously because I wanted to build intelligent systems I wished existed.',
    spokenLanguages: ['Hindi (Native)', 'English (Advanced)', 'Arabic (Basic)'],
  },

  aboutJournal: {
    storyParagraphs: [
      "Hi, I'm Salim Ansari! I am a Third-Year B.Tech Computer Science & Engineering student specializing in Artificial Intelligence & Machine Learning at Symbiosis Institute of Technology (SIT), Nagpur under Symbiosis International (Deemed University) (PRN: 24070521005, Batch 2024–2028).",
      'I build software at the intersection of autonomous artificial intelligence, machine learning, and full-stack web systems. My work includes developing an Agentic AI Automated Research Review Assistant (LiteratureAI), completing a Full-Stack Web Developer Internship at Maincrafts Technology (Intern ID: MT4008), and publishing academic research with Springer.',
      'Whether architecting multi-agent literature synthesis pipelines in Python & Gradio, building patient appointment engines in MediLinks, or creating campus ticket microservices in CampusCare, my philosophy is simple: Learn → Architect → Build → Scale.',
    ],
    quickFacts: [
      { label: 'Institution', value: 'Symbiosis Institute of Technology (SIT), Nagpur' },
      { label: 'University', value: 'Symbiosis International (Deemed University)' },
      { label: 'Degree & Branch', value: 'B.Tech CSE (AI & ML) • Batch 2024–2028' },
      { label: 'PRN & Section', value: '24070521005 • Section A (Third Year)' },
      { label: 'Industry Experience', value: 'Full-Stack Web Developer Intern @ Maincrafts Technology' },
      { label: 'Academic Research', value: 'Published Research Copy (Springer)' },
      { label: 'Spoken Languages', value: 'Hindi (Native), English (Advanced), Arabic' },
    ],
    learningGoals: [
      'Deploying scaled multi-agent LLM orchestration and RAG (Retrieval-Augmented Generation) pipelines with 0% hallucination.',
      'Deepening Transformer architectures, LLM fine-tuning, and unsupervised/supervised ML benchmarking in Python & PyTorch.',
      'Architecting high-throughput RESTful microservices and full-stack web applications using Flask, Node.js, Express.js, and React.',
      'Publishing follow-up applied AI research and competing in national and global engineering hackathons.',
    ],
    careerInterests: [
      {
        role: 'AI / Machine Learning Systems Intern & Engineer',
        summary:
          'Building autonomous multi-agent workflows, NLP document intelligence, speech-to-insight pipelines (OpenAI Whisper), and applied ML models.',
      },
      {
        role: 'Full-Stack Software Developer',
        summary:
          'Proven internship experience at Maincrafts Technology delivering responsive frontends and Node.js / Express.js / Flask backends.',
      },
      {
        role: 'Applied AI Research & Product Innovation',
        summary:
          'Authoring academic research (Springer) and building open-source tools like LiteratureAI that accelerate scholarly discovery.',
      },
    ],
  },

  education: {
    institution: 'Symbiosis Institute of Technology, Nagpur',
    university: 'Symbiosis International (Deemed University) • NAAC A++ Grade',
    degree: 'Bachelor of Technology (B.Tech) — Computer Science & Engineering',
    specialization: 'Specialization in Artificial Intelligence & Machine Learning (AI & ML)',
    currentStatus: 'Third Year (Batch 2024 – 2028 • PRN: 24070521005)',
    location: 'Nagpur, Maharashtra, India',
    campusImage: '/assets/anime/sit-campus-anime.jpg',
    campusVideoUrl: '/assets/video/sit-campus.mp4',
    campusRemoteVideoUrl: 'https://sitnagpur.edu.in/assets/video/sit-campus.mp4',
    officialWebsiteUrl: 'https://sitnagpur.edu.in/',
    coreCoursework: [
      'Artificial Intelligence & Machine Learning',
      'Data Structures & Algorithms (C / C++)',
      'Design & Analysis of Algorithms (DAA)',
      'Compiler Construction (Lex / Flex & Yacc)',
      'Database Management Systems (SQL / PLSQL)',
      'Full-Stack Web Development & REST APIs',
      'Linear Algebra, PCA, t-SNE & Clustering',
      'Microprocessors & Embedded Systems',
    ],
    priorEducation: [
      {
        institution: 'Symbiosis Institute of Technology (SIT), Nagpur',
        qualification: 'B.Tech in Computer Science & Engineering (AI & ML)',
        period: '2024 – 2028 (Third Year Ongoing)',
        location: 'Nagpur, Maharashtra',
        highlights:
          'PRN: 24070521005 (Sec A). Focused on Agentic AI, Machine Learning Labs, Compiler Design, DBMS, and Full-Stack Development.',
      },
      {
        institution: 'Dr. Bower Apostolic Jr. College, Ajni',
        qualification: 'Higher Secondary Education (Class XI – XII • Science)',
        period: '2022 – 2024',
        location: 'Ajni, Nagpur, Maharashtra',
        highlights:
          'Completed senior secondary education in Physics, Chemistry, Mathematics, and Computer Science.',
      },
      {
        institution: 'Rocky Memorial High School',
        qualification: 'Secondary School Certificate (High School)',
        period: '2020 – 2022',
        location: 'Mumbai, Maharashtra',
        highlights:
          'Built strong foundational academic skills in mathematics, science, and computing.',
      },
    ] as PriorEducationItem[],
    semesters: [
      {
        semester: 'Semester I',
        yearLabel: 'First Year • Programming Foundations',
        sgpa: 'Completed (Click Customize to add SGPA)',
        focusSubjects: ['Programming & Problem Solving (Python)', 'Engineering Calculus', 'CS Fundamentals'],
        isPlaceholder: true,
      },
      {
        semester: 'Semester II',
        yearLabel: 'First Year • Data Structures',
        sgpa: 'Completed (Click Customize to add SGPA)',
        focusSubjects: ['Data Structures Laboratory (C)', 'Object-Oriented Programming (C++ / Java)', 'Discrete Math'],
        isPlaceholder: true,
      },
      {
        semester: 'Semester III',
        yearLabel: 'Second Year • Databases & Systems',
        sgpa: 'Completed (Click Customize to add SGPA)',
        focusSubjects: ['DBMS Lab (SQL / PLSQL)', 'Advanced Data Structures', 'Microprocessors & Assembly'],
        isPlaceholder: true,
      },
      {
        semester: 'Semester IV',
        yearLabel: 'Second Year • Algorithms & AI',
        sgpa: 'Completed (Click Customize to add SGPA)',
        focusSubjects: ['Design & Analysis of Algorithms (DAA)', 'Artificial Intelligence', 'Java Programming'],
        isPlaceholder: true,
      },
      {
        semester: 'Semester V',
        yearLabel: 'Third Year • AI/ML & Full-Stack (Current)',
        sgpa: 'Active • 2026–2027 Session',
        focusSubjects: ['Hack-o-Week ML & Flask APIs', 'Compiler Construction (Lex/Yacc)', 'JavaScript Lab Suite'],
        isPlaceholder: true,
      },
      {
        semester: 'Semester VI',
        yearLabel: 'Third Year • Agentic AI & Deep Learning',
        sgpa: 'Upcoming',
        focusSubjects: ['Multi-Agent LLM Systems', 'Deep Learning & PyTorch', 'Production MLOps'],
        isPlaceholder: true,
      },
    ] as SemesterRecord[],
  },

  skills: [
    // Programming Languages
    {
      name: 'Python (3.10+)',
      category: 'Programming Languages',
      status: 'Core / Proficient',
      description: 'Primary language for Agentic AI, LiteratureAI, Flask microservices, Scikit-Learn, and PyMuPDF.',
      badgeColor: 'from-amber-50 to-yellow-100/80 text-amber-900 border-amber-200/80',
      shortIcon: '🐍',
      featuredInSummary: true,
    },
    {
      name: 'C & C++',
      category: 'Programming Languages',
      status: 'Core / Proficient',
      description: 'Used across Data Structures Labs, Design & Analysis of Algorithms, and Compiler Construction.',
      badgeColor: 'from-blue-50 to-indigo-100/80 text-blue-900 border-blue-200/80',
      shortIcon: 'C++',
      featuredInSummary: true,
    },
    {
      name: 'JavaScript (ES6+)',
      category: 'Programming Languages',
      status: 'Core / Proficient',
      description: 'DOM manipulation, async/await, client-side validation, LocalStorage persistence, and Node.js apps.',
      badgeColor: 'from-yellow-50 to-amber-100/80 text-yellow-900 border-yellow-200/80',
      shortIcon: 'JS',
      featuredInSummary: true,
    },
    {
      name: 'Java',
      category: 'Programming Languages',
      status: 'Core / Proficient',
      description: 'Object-oriented application design, collections framework, and university coursework labs.',
      badgeColor: 'from-orange-50 to-amber-100/80 text-orange-900 border-orange-200/80',
      shortIcon: '☕',
    },
    {
      name: 'SQL & PL/SQL',
      category: 'Programming Languages',
      status: 'Core / Proficient',
      description: 'Relational database querying, stored procedures, triggers, and SQLite/MySQL data modeling.',
      badgeColor: 'from-slate-50 to-indigo-50 text-slate-800 border-slate-200',
      shortIcon: 'SQL',
    },

    // AI/ML and Data Science
    {
      name: 'Agentic AI & Multi-Agent Workflows',
      category: 'AI/ML and Data Science',
      status: 'Core / Proficient',
      description: 'Autonomous research pipelines, multi-repository academic retrieval, and zero-hallucination scoring.',
      badgeColor: 'from-purple-50 to-fuchsia-100/80 text-purple-900 border-purple-200/80',
      shortIcon: '🤖',
      featuredInSummary: true,
    },
    {
      name: 'Machine Learning (Scikit-Learn)',
      category: 'AI/ML and Data Science',
      status: 'Core / Proficient',
      description: 'Linear/Ridge/Lasso regression, SVM, Decision Trees, Random Forests, K-Means clustering, PCA & t-SNE.',
      badgeColor: 'from-indigo-50 to-violet-100/80 text-indigo-900 border-indigo-200/80',
      shortIcon: '🧠',
    },
    {
      name: 'NLP, LLMs & OpenAI Whisper',
      category: 'AI/ML and Data Science',
      status: 'Core / Proficient',
      description: '6-dimension paper synthesis, research gap detection, PyMuPDF parsing, and speech-to-text voice chat.',
      badgeColor: 'from-violet-50 to-purple-100/80 text-violet-900 border-violet-200/80',
      shortIcon: '✨',
    },
    {
      name: 'NumPy, Pandas & Exploratory Data Analysis',
      category: 'AI/ML and Data Science',
      status: 'Core / Proficient',
      description: 'Feature engineering, matrix decompositions, eigenvalue computation, and HostelWise data analytics.',
      badgeColor: 'from-sky-50 to-indigo-100/80 text-sky-900 border-sky-200/80',
      shortIcon: '📊',
    },
    {
      name: 'PyTorch & Deep Learning',
      category: 'AI/ML and Data Science',
      status: 'Currently Learning',
      description: 'Neural network architectures, Transformer fine-tuning, and applied deep learning research.',
      badgeColor: 'from-rose-50 to-orange-100/80 text-rose-900 border-rose-200/80',
      shortIcon: '🔥',
    },

    // Frontend Development
    {
      name: 'React & Modern Frontend UI',
      category: 'Frontend Development',
      status: 'Core / Proficient',
      description: 'Component-driven single-page applications, interactive dashboards, and responsive layouts.',
      badgeColor: 'from-cyan-50 to-sky-100/80 text-cyan-900 border-cyan-200/80',
      shortIcon: '⚛️',
      featuredInSummary: true,
    },
    {
      name: 'HTML5, CSS3 & CSS Grid',
      category: 'Frontend Development',
      status: 'Core / Proficient',
      description: 'Semantic markup, responsive multi-page layouts (MediLinks, CampusCare), and luxury brand UI (NOIRÉ).',
      badgeColor: 'from-rose-50 to-pink-100/80 text-rose-900 border-rose-200/80',
      shortIcon: '🌐',
    },
    {
      name: 'Tailwind CSS',
      category: 'Frontend Development',
      status: 'Core / Proficient',
      description: 'Utility-first responsive design systems, glassmorphism components, and modern micro-interactions.',
      badgeColor: 'from-teal-50 to-cyan-100/80 text-teal-900 border-teal-200/80',
      shortIcon: '🎨',
    },
    {
      name: 'Gradio 6.0 & Streamlit SPAs',
      category: 'Frontend Development',
      status: 'Core / Proficient',
      description: 'Custom-styled interactive AI dashboards with Light/Dark academic modes in LiteratureAI.',
      badgeColor: 'from-orange-50 to-amber-100/80 text-orange-900 border-orange-200/80',
      shortIcon: '⚡',
    },

    // Backend and APIs
    {
      name: 'Node.js & Express.js',
      category: 'Backend and APIs',
      status: 'Core / Proficient',
      description: 'Server-side routing, RESTful API handlers, and healthcare appointment backend in MediLinks.',
      badgeColor: 'from-emerald-50 to-green-100/80 text-emerald-900 border-emerald-200/80',
      shortIcon: '🟢',
    },
    {
      name: 'Flask & RESTful Microservices',
      category: 'Backend and APIs',
      status: 'Core / Proficient',
      description: 'Built CampusCare ticket management REST API with Jinja2 templating, authentication, and SQLite.',
      badgeColor: 'from-slate-100 to-indigo-100/80 text-slate-900 border-slate-300',
      shortIcon: '🌶️',
    },
    {
      name: 'Academic & Scholarly APIs',
      category: 'Backend and APIs',
      status: 'Core / Proficient',
      description: 'Multi-source integration with Semantic Scholar, OpenAlex, Crossref, and arXiv REST APIs.',
      badgeColor: 'from-blue-50 to-indigo-100/80 text-blue-900 border-blue-200/80',
      shortIcon: '🔗',
    },

    // Databases
    {
      name: 'MongoDB',
      category: 'Databases',
      status: 'Core / Proficient',
      description: 'NoSQL document storage integrated during full-stack internship development.',
      badgeColor: 'from-green-50 to-emerald-100/80 text-green-900 border-green-200/80',
      shortIcon: '🍃',
    },
    {
      name: 'SQLite & Relational SQL',
      category: 'Databases',
      status: 'Core / Proficient',
      description: 'Persistent relational storage for CampusCare complaint lifecycles and DBMS laboratory coursework.',
      badgeColor: 'from-sky-50 to-blue-100/80 text-sky-900 border-sky-200/80',
      shortIcon: '🗄️',
    },
    {
      name: 'Browser LocalStorage Persistence',
      category: 'Databases',
      status: 'Core / Proficient',
      description: 'Client-side state management and validated form persistence in MediLinks and JavaScript Lab Suite.',
      badgeColor: 'from-purple-50 to-indigo-100/80 text-purple-900 border-purple-200/80',
      shortIcon: '💾',
    },

    // Developer Tools
    {
      name: 'Git & GitHub',
      category: 'Developer Tools',
      status: 'Core / Proficient',
      description: 'Version control across 19+ public repositories, automated GitHub Actions, and collaborative workflows.',
      badgeColor: 'from-orange-50 to-red-100/80 text-orange-900 border-orange-200/80',
      shortIcon: '🌿',
      featuredInSummary: true,
    },
    {
      name: 'VS Code, Jupyter & Chrome DevTools',
      category: 'Developer Tools',
      status: 'Core / Proficient',
      description: 'Daily IDE, interactive ML notebook environment, and cross-browser inspection/debugging.',
      badgeColor: 'from-sky-50 to-blue-100/80 text-sky-900 border-sky-200/80',
      shortIcon: '💻',
    },
    {
      name: 'AWS with AI & Cloud Fundamentals',
      category: 'Developer Tools',
      status: 'Core / Proficient',
      description: 'Certified in AWS with AI (Unstop) for cloud deployment, AI services integration, and scalable hosting.',
      badgeColor: 'from-amber-50 to-orange-100/80 text-amber-900 border-amber-200/80',
      shortIcon: '☁️',
    },

    // Other Technical Skills
    {
      name: 'Compiler Design (Flex / Lex & Bison / Yacc)',
      category: 'Other Technical Skills',
      status: 'Core / Proficient',
      description: 'Lexical analyzers, token counters, context-free grammar parsing, and syntax validation.',
      badgeColor: 'from-indigo-50 to-purple-100/80 text-indigo-900 border-indigo-200/80',
      shortIcon: '⚙️',
    },
    {
      name: 'Agile Workflow & Technical Documentation',
      category: 'Other Technical Skills',
      status: 'Core / Proficient',
      description: 'Requirement analysis, system methodology, automated .docx report generation, and research writing.',
      badgeColor: 'from-pink-50 to-rose-100/80 text-pink-900 border-pink-200/80',
      shortIcon: '📑',
    },
  ] as SkillItem[],

  projects: [
    {
      id: 'literature-ai',
      title: 'LiteratureAI',
      subtitle: 'Automated Research Review Assistant • Agentic AI & Gap Intelligence System',
      shortDescription:
        'AI-powered literature review assistant that helps with research, paper summarization and knowledge discovery across 4 scholarly repositories with 0% hallucination.',
      problemStatement:
        'Researchers and students spend days manually searching across fragmented academic databases, deduplicating papers, parsing dense PDFs, and compiling comparative literature review matrices.',
      solutionOverview:
        'Automated Literature Review Assistant (LiteratureAI) is a full-stack, agentic research exploration platform engineered in Python 3.10+, Gradio 6.0 SPA, PyMuPDF, OpenAI Whisper, and Groq Llama-3.3-70B. From a single query or uploaded PDF/DOCX paper, it queries Semantic Scholar, OpenAlex, Crossref, and arXiv in parallel, deduplicates records, computes deterministic relevance scores (0% hallucination), extracts 6-dimension analytical summaries, detects cross-paper research voids, and generates publication-ready 7-section Microsoft Word (.docx) reviews with IEEE citations and CSV comparison matrices.',
      keyHighlights: [
        'Multi-Source Academic Query Federation: Parallelized search across Semantic Scholar Graph API, OpenAlex REST API, Crossref API, and arXiv XML feeds with automatic deduplication.',
        '6-Stage Autonomous Pipeline & 6-Dimension Extraction: Extracts Research Problem, Methodology, Dataset/Setup, Key Findings, Limitations, and Future Directions with 0% hallucination.',
        'Salim Conversational Voice & Text RAG Agent: Real-time microphone dictation powered by OpenAI Whisper STT with strictly grounded citation-backed answers.',
        'Publication-Grade Exporters & Dual-Theme UI: Exports formatted 7-section IEEE-referenced .docx literature reviews, .csv comparison matrices, Plotly analytics, and Light Academic / Dark Cyber themes.',
      ],
      technologies: [
        'Python 3.10+',
        'Agentic AI',
        'Gradio 6.0 SPA',
        'PyMuPDF (fitz)',
        'OpenAI Whisper STT',
        'Groq Llama-3.3-70B',
        'Plotly',
        'Semantic Scholar & arXiv APIs',
      ],
      category: 'AI & Machine Learning',
      image: '/assets/real/literatureai-dashboard-light.png',
      realScreenshots: [
        '/assets/real/literatureai-dashboard-light.png',
        '/assets/real/literatureai-voice-chat.png',
        '/assets/real/literatureai-document-upload.png',
        '/assets/real/literatureai-intelligence-cards.png',
        '/assets/real/literatureai-dashboard-dark.png',
        '/assets/real/literatureai-layered-architecture.png',
        '/assets/real/literatureai-agent-loop.png',
      ],
      screenshotLabels: [
        'Light Academic Dashboard',
        'Salim Voice RAG (Whisper STT)',
        'PyMuPDF Document Ingestion',
        'Gap Intelligence & Synthesis',
        'Dark Cyber Theme (#060814)',
        '5-Tier Layered Architecture',
        'Autonomous Agentic Loop',
      ],
      isFlagshipSpotlight: true,
      reportPdfUrl: '/assets/real/LiteratureAI_Official_Report.pdf',
      academicContext:
        'Flexi Credit Course: Agentic AI & Automation (AY 2026–27) • Guided by Dr. Parag Naik & Dr. Shreyas Rajendra Hole • SIT Nagpur (PRN: 24070521005)',
      pipelineStages: [
        '1. Federated Query (4 APIs)',
        '2. PyMuPDF PDF/DOCX Ingestion',
        '3. Deduplication Engine',
        '4. 0% Hallucination Scoring',
        '5. 6-Dimension & Gap Synthesis',
        '6. IEEE .DOCX / .CSV & Voice RAG',
      ],
      architectureHighlights: [
        {
          label: 'Scholarly Federation',
          value: '4 Live APIs',
          detail: 'Semantic Scholar, OpenAlex, Crossref & arXiv XML',
        },
        {
          label: 'Relevance Scoring',
          value: '0% Hallucination',
          detail: 'Deterministic NLP + Offline Grounded Heuristic Mode',
        },
        {
          label: 'Deep Extraction',
          value: '6 Dimensions',
          detail: 'Problem, Methodology, Dataset, Findings, Limits, Future',
        },
        {
          label: 'Voice & Export Engine',
          value: 'Whisper + .DOCX',
          detail: 'OpenAI Whisper STT, Plotly Charts, IEEE Word & CSV',
        },
      ],
      featuredInBento: true,
      githubUrl: 'https://github.com/Salimansari369/Automated-Research-Review-Assistant',
      repoStatusNote: 'Flagship Public Repository on GitHub (Salimansari369/Automated-Research-Review-Assistant)',
    },
    {
      id: 'medilink',
      title: 'Medilink',
      subtitle: 'MediLinks / HealthLink — Healthcare & Appointment Platform',
      shortDescription:
        'Healthcare information and appointment website to make access to medical services, doctor discovery, and booking easier.',
      problemStatement:
        'Patients often struggle with fragmented clinic information and complex appointment booking flows when seeking trusted doctors or emergency support.',
      solutionOverview:
        'Developed during the Maincrafts Technology Internship (Task 2), MediLinks (HealthLink) is a multi-page healthcare platform featuring Home, About, Services, Doctors, Appointments, and Contact modules with validated appointment reservation, dynamic LocalStorage submission management, and a Node.js / Express.js server runtime.',
      keyHighlights: [
        'Multi-page architecture covering Doctor Discovery, Specialty Services, Emergency Support, and Appointment Management.',
        'Interactive appointment booking engine with client-side validation and real-time submission cards.',
        'Backed by Node.js & Express.js server scripts (serve.js) alongside persistent browser storage.',
        'Clean, reassuring medical UI designed for fast accessibility across desktop and mobile devices.',
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express.js', 'LocalStorage'],
      category: 'Full-Stack Web',
      image: '/assets/real/medilink-showcase.png',
      realScreenshots: [
        '/assets/real/medilink-showcase.png',
        '/assets/real/medilinks-ui-showcase.png',
        '/assets/real/medilink-preview.jpg',
      ],
      featuredInBento: true,
      githubUrl: 'https://github.com/Salimansari369/medilink',
      repoStatusNote: 'Verified Public Repository on GitHub (Salimansari369/medilink)',
    },
    {
      id: 'campus-complaints',
      title: 'Campus Complaints',
      subtitle: 'CampusCare — Smart Campus Issue Reporting & ML Suite',
      shortDescription:
        'Campus complaint reporting and tracking system to raise, track and resolve issues efficiently, paired with 5th-Sem ML benchmarks.',
      problemStatement:
        'Manual emails and paper registers for hostel, Wi-Fi, lab, and classroom maintenance lead to lost tickets and zero transparency for students.',
      solutionOverview:
        'CampusCare (Campus Complaints) replaces scattered maintenance requests with an automated ticket queue where students submit issues in 60 seconds, filter by building/priority, and track real-time resolution stages, while administrators manage tickets via a dedicated portal. Built with Python, Flask REST API, SQLite, HTML/CSS/JS, and paired with Hack-o-Week ML notebooks.',
      keyHighlights: [
        'Full complaint lifecycle tracking (Submitted → Under Review → In Progress → Resolved) with priority and building filters.',
        'Dedicated Admin Portal for staff to update ticket statuses, assign technicians, and monitor resolution metrics.',
        'Paired in the Hack-o-Week repository with HostelWise EDA and supervised/unsupervised Machine Learning benchmarks (Scikit-Learn, PCA, t-SNE, K-Means).',
        'Developed as part of both the Maincrafts Technology Internship (Task 3) and SIT Nagpur 5th-Semester Hack-o-Week.',
      ],
      technologies: ['Python', 'Flask REST API', 'SQLite', 'JavaScript', 'Scikit-Learn', 'Pandas'],
      category: 'Full-Stack Web',
      image: '/assets/real/campuscare-showcase.png',
      realScreenshots: [
        '/assets/real/campuscare-showcase.png',
        '/assets/real/campuscare-ui-showcase.png',
        '/assets/real/campuscare-complaints.jpeg',
        '/assets/real/campuscare-console.jpeg',
        '/assets/real/hostelwise-eda.jpeg',
      ],
      featuredInBento: true,
      githubUrl: 'https://github.com/Salimansari369/Hack-o-Week-odd-5sem-2026-2027',
      repoStatusNote: 'Verified Public Repository on GitHub (Salimansari369/Hack-o-Week-odd-5sem-2026-2027)',
    },
    {
      id: 'noire',
      title: 'NOIRÉ',
      subtitle: 'Luxury Extrait de Parfum Brand Landing Experience',
      shortDescription:
        'A premium perfume landing-page project crafted around nocturnal brand elegance, scent storytelling, and editorial UI/UX.',
      problemStatement:
        'High-fashion fragrance houses need an atmospheric, cinema-lit web presence that conveys scent character and bottle craftsmanship rather than a standard catalog template.',
      solutionOverview:
        'Built as Task 1 of the Maincrafts Technology Full-Stack Internship, NOIRÉ is a luxury fragrance landing page showcasing signature scents (NOIRÉ AMBRÉE and OUD NOIR), olfactory note pyramids (Saffron glow, Amber smoke, Velvet oud), and editorial campaign storytelling.',
      keyHighlights: [
        'Bespoke luxury dark-gold editorial aesthetic with high-contrast serif typography and ambient glow effects.',
        'Signature collection showcase featuring NOIRÉ AMBRÉE and OUD NOIR with top, heart, and base scent note breakdowns.',
        'Responsive CSS Grid and Flexbox layout engineered with clean semantic HTML5 and custom CSS3.',
        'Featured in the official SIT Nagpur One-Month Industry Internship Seminar Report.',
      ],
      technologies: ['Semantic HTML5', 'CSS3 Grid', 'Responsive UI/UX', 'Brand Storytelling'],
      category: 'Frontend & Brand UI',
      image: '/assets/real/noire-preview.png',
      realScreenshots: [
        '/assets/real/noire-preview.png',
        '/assets/real/noire-ui-showcase.png',
        '/assets/real/internship-project-overview.png',
      ],
      featuredInBento: false,
      githubUrl: 'https://github.com/Salimansari369/NOIRE--Full-stack-Task-1-',
      repoStatusNote: 'Verified Public Repository on GitHub (Salimansari369/NOIRE--Full-stack-Task-1-)',
    },
    {
      id: 'javascript-suite',
      title: 'JavaScript Practical Suite',
      subtitle: '9 End-to-End Interactive Web Engineering Applications',
      shortDescription:
        'Comprehensive suite of 9 interactive JavaScript web applications spanning DOM manipulation, regex validation, shopping carts, and theme planners.',
      problemStatement:
        'Mastering frontend engineering requires building real interactive modules with state persistence, input validation, and dynamic DOM rendering without relying solely on heavy libraries.',
      solutionOverview:
        'A complete collection of 9 modular web applications: (1) College Student Form, (2) Shopping Cart Calculator, (3) Grading & Login Validation, (4) Palindrome & Vehicle Registration, (5) Array Analyzer, (6) Regex & String Methods, (7) To-Do List & Account Creator, (8) Gym Admission Registration, and (9) Theme Preferences & Schedule Planner.',
      keyHighlights: [
        '9 self-contained web applications demonstrating vanilla JavaScript (ES6+), DOM APIs, and event-driven architecture.',
        'Custom regular expression validators for vehicle registration, user authentication, and form sanitization.',
        'Persistent theme preference and schedule management using browser storage APIs.',
      ],
      technologies: ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'DOM APIs', 'Regex', 'LocalStorage'],
      category: 'Systems & Academic Labs',
      image: '/assets/real/internship-project-overview.png',
      realScreenshots: ['/assets/real/internship-project-overview.png'],
      featuredInBento: false,
      githubUrl: 'https://github.com/Salimansari369/javascript',
      repoStatusNote: 'Verified Public Repository on GitHub (Salimansari369/javascript)',
    },
  ] as ProjectItem[],

  certificates: [
    {
      id: 'cert-maincrafts-internship',
      title: 'Certificate of Internship — Full Stack Web Developer',
      issuer: 'Maincrafts Technology (MSME Reg: UDYAM-UP-75-0096043)',
      category: 'Industry Internship',
      dateLabel: '20 May 2026 – 05 July 2026',
      credentialId: 'INTERN ID: MT4008',
      description:
        'Official Internship Completion Certificate awarded to Salim Ansari for successfully completing the Full Stack Web Developer Internship at Maincrafts Technology, delivering NOIRÉ, MediLinks, and CampusCare.',
      previewImage: '/assets/certificates/maincrafts-internship.png',
      isPlaceholder: false,
      documentUrl: '/assets/certificates/maincrafts-internship.pdf',
    },
    {
      id: 'cert-unstop-aws-ai',
      title: 'Certificate of Completion — AWS with AI',
      issuer: 'Unstop (Signed by Ankit Aggarwal, CEO)',
      category: 'AI/ML & Cloud Certifications',
      dateLabel: 'Verified Unstop Course',
      credentialId: 'UNSTOP • AWS WITH AI',
      description:
        'Awarded to Salim Ansari for successfully completing the course "AWS with AI" provided by Unstop, covering cloud architecture and AI service integration.',
      previewImage: '/assets/certificates/aws-certificate.png',
      isPlaceholder: false,
      documentUrl: '/assets/certificates/aws-certificate.pdf',
    },
    {
      id: 'cert-unstop-css-ai',
      title: 'Certificate of Completion — CSS with AI',
      issuer: 'Unstop (Signed by Ankit Aggarwal, CEO)',
      category: 'AI/ML & Cloud Certifications',
      dateLabel: 'Verified Unstop Course',
      credentialId: 'UNSTOP • CSS WITH AI',
      description:
        'Awarded to Salim Ansari for successfully completing the course "CSS with AI" provided by Unstop, focusing on modern responsive UI styling and AI-assisted frontend workflows.',
      previewImage: '/assets/certificates/css-with-ai.png',
      isPlaceholder: false,
      documentUrl: '/assets/certificates/css-with-ai.pdf',
    },
    {
      id: 'cert-unstop-nodejs',
      title: 'Certificate of Completion — Node JS',
      issuer: 'Unstop (Signed by Ankit Aggarwal, CEO)',
      category: 'Programming & Web Certifications',
      dateLabel: 'Verified Unstop Course',
      credentialId: 'UNSTOP • NODE JS',
      description:
        'Awarded to Salim Ansari for successfully completing the course "Node JS" provided by Unstop, covering asynchronous server-side JavaScript and REST API backends.',
      previewImage: '/assets/certificates/nodejs-certificate.png',
      isPlaceholder: false,
      documentUrl: '/assets/certificates/nodejs-certificate.pdf',
    },
    {
      id: 'cert-unstop-cpp',
      title: 'Certificate of Completion — C++ Programming',
      issuer: 'Unstop (Signed by Ankit Aggarwal, CEO)',
      category: 'Programming & Web Certifications',
      dateLabel: 'Verified Unstop Course',
      credentialId: 'UNSTOP • C++ PROGRAMMING',
      description:
        'Awarded to Salim Ansari for successfully completing the course "C++ Programming" provided by Unstop, strengthening object-oriented programming and algorithmic problem solving.',
      previewImage: '/assets/certificates/cpp-unstop.png',
      isPlaceholder: false,
      documentUrl: '/assets/certificates/cpp-unstop.pdf',
    },
  ] as CertificateItem[],

  participation: [
    {
      id: 'part-maincrafts',
      title: 'Full Stack Web Developer Intern — Maincrafts Technology',
      category: 'Industry Internship',
      organization: 'Maincrafts Technology (Mentor: Mr. Ujjwal, Founder)',
      period: '20 May 2026 – 05 July 2026 (Intern ID: MT4008)',
      description:
        'Completed an intensive industry internship building three progressive web systems: Task 1 (NOIRÉ Luxury Brand Landing Page), Task 2 (MediLinks Multi-Page Healthcare & Appointment Website), and Task 3 (CampusCare Complaint Management System) using HTML5, CSS3, JavaScript, LocalStorage, Node.js, Express.js, and MongoDB.',
      status: 'Verified Milestone',
      linkUrl: '/assets/certificates/maincrafts-internship.pdf',
    },
    {
      id: 'part-literatureai-agentic',
      title: 'Flagship Agentic AI Project — Automated Literature Review Assistant (LiteratureAI)',
      category: 'Academic Research',
      organization: 'SIT Nagpur • Guided by Dr. Parag Naik & Dr. Shreyas Rajendra Hole',
      period: 'AY 2026–2027 (PRN: 24070521005)',
      description:
        'Architected an autonomous 6-stage scholarly research discovery, 0% hallucination relevance scoring, 6-dimension paper synthesis, and OpenAI Whisper voice RAG assistant across Semantic Scholar, OpenAlex, Crossref, and arXiv.',
      status: 'Verified Milestone',
      linkUrl: 'https://github.com/Salimansari369/Automated-Research-Review-Assistant',
    },
    {
      id: 'part-springer',
      title: 'Published Academic Research Copy (Springer)',
      category: 'Academic Research',
      organization: 'Springer • Symbiosis Institute of Technology, Nagpur',
      period: 'B.Tech CSE (AI & ML)',
      description:
        'Authored and published academic research focusing on Deep Learning, Machine Learning, and Applied Computing.',
      status: 'Verified Milestone',
      linkUrl: 'https://github.com/Salimansari369',
    },
    {
      id: 'part-icsit-conference',
      title: 'ICSIT Conference Session — Towards Trustworthy & Sustainable Agentic AI',
      category: 'Technical Events & Hackathons',
      organization: 'ICSIT @ SIT Nagpur (Keynote: Dr. Malka N. Halgamuge, RMIT University Australia)',
      period: 'September 2026 • Semester V',
      description:
        'Participated in the ICSIT Day 2 Keynote Session on building energy-efficient, trustworthy, and sustainable Agentic AI systems and authored a technical analysis report.',
      status: 'Verified Milestone',
      linkUrl: '/assets/real/LiteratureAI_Official_Report.pdf',
    },
    {
      id: 'part-hack-o-week',
      title: 'Hack-o-Week (5th Semester) — Full-Stack & Applied ML Suite',
      category: 'Technical Events & Hackathons',
      organization: 'Symbiosis Institute of Technology (SIT), Nagpur',
      period: 'Odd Semester 2026–2027',
      description:
        'Completed 6 intensive engineering challenges: CampusCare Flask REST API, HostelWise Exploratory Data Analysis, Linear Algebra & Calculus for ML, Supervised Regression/Classification Benchmarking, Feature Engineering, K-Means Clustering, and PCA/t-SNE dimensionality reduction.',
      status: 'Verified Milestone',
      linkUrl: 'https://github.com/Salimansari369/Hack-o-Week-odd-5sem-2026-2027',
    },
    {
      id: 'part-lab-repositories',
      title: 'Open-Source Academic & Systems Engineering Repositories (19+ Repos)',
      category: 'Web & Systems Engineering Labs',
      organization: 'GitHub (@Salimansari369)',
      period: '2024 – Present',
      description:
        'Maintains 19 public repositories covering LiteratureAI, JavaScript 9-Practical Suite, Compiler Construction (Lex/Yacc), DBMS Lab (PL/SQL), Design & Analysis of Algorithms, Data Structures in C, Java, and Assembly (MES).',
      status: 'Ongoing / Active',
      linkUrl: 'https://github.com/Salimansari369?tab=repositories',
    },
  ] as ParticipationItem[],

  gallery: [
    {
      id: 'gal-enthusia-stage',
      title: 'SIT Nagpur • ENTHUSIA 5.0 Stage Felicitation',
      category: 'Certificates & Seminars',
      caption:
        'Receiving official Certificate of Achievement on stage at Symbiosis Institute of Technology (SIT), Nagpur during ENTHUSIA 5.0 (Powered by Unstop) alongside faculty and college leadership.',
      image: '/assets/gallery/gallery-07.jpg',
      isSampleVisual: false,
      aspect: 'wide',
      objectPosition: 'center center',
    },
    {
      id: 'gal-grand-entrance-suit',
      title: 'Academic Conclave & Formal Suit Delegation',
      category: 'Portrait & Campus',
      caption:
        'Representing SIT Nagpur in navy formal suit with keynote speaker and colleague at the university grand entrance portico during academic celebrations.',
      image: '/assets/gallery/gallery-05.png',
      isSampleVisual: false,
      aspect: 'tall',
      objectPosition: 'center 0%',
    },
    {
      id: 'gal-iiit-nagpur-visit',
      title: 'IIIT Nagpur Campus Visit & Team Delegation',
      category: 'Portrait & Campus',
      caption:
        'Visiting Indian Institute of Information Technology (IIIT), Nagpur (Borkhedi Campus) for inter-college technical events, hackathons, and academic exchange.',
      image: '/assets/gallery/gallery-01.jpg',
      isSampleVisual: false,
      aspect: 'wide',
      objectPosition: 'center center',
    },
    {
      id: 'gal-hackathon-war-room',
      title: 'Hackathon War Room & Sprint Development',
      category: 'Live Project Screenshots',
      caption:
        'Intensive collaborative coding and development sprint with the engineering team, architecting full-stack web solutions and machine learning pipelines.',
      image: '/assets/gallery/gallery-02.jpg',
      isSampleVisual: false,
      aspect: 'wide',
      objectPosition: 'center center',
    },
    {
      id: 'gal-iim-nagpur-mentorship',
      title: 'IIM Nagpur Leadership Summit & Mentorship',
      category: 'Certificates & Seminars',
      caption:
        'Participating in delegate sessions and engaging with distinguished industry leaders and academic mentors at Indian Institute of Management (IIM) Nagpur.',
      image: '/assets/gallery/gallery-04.jpg',
      isSampleVisual: false,
      aspect: 'tall',
      objectPosition: 'center 20%',
    },
    {
      id: 'gal-iim-nagpur-networking',
      title: 'Industry Interaction & Executive Conclave',
      category: 'Certificates & Seminars',
      caption:
        'Networking with senior dignitaries, speakers, and industry executives during leadership seminars and management conclaves at IIM Nagpur.',
      image: '/assets/gallery/gallery-06.jpg',
      isSampleVisual: false,
      aspect: 'tall',
      objectPosition: 'center 3%',
    },
  ] as GalleryItem[],
};
