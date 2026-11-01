export interface ProgramModule {
  moduleNumber: string;
  title: string;
  duration: string;
  topics: string[];
  handsOn: string;
}

export interface ProgramProject {
  title: string;
  description: string;
  skillsLearned: string[];
}

export interface ProgramDetail {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  hoursPerWeek: string;
  format: string;
  level: string;
  tags: string[];
  tools: { name: string; category: string }[];
  highlights: string[];
  syllabus: ProgramModule[];
  projects: ProgramProject[];
  careerRoles: string[];
  prerequisites: string;
}

export const ALL_PROGRAMS: ProgramDetail[] = [
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    badge: 'High Demand',
    tagline: 'Master SEO, Performance Ads, Web Analytics & Growth Strategies',
    shortDescription:
      'End-to-end digital growth: Search optimization, Meta/Google paid campaigns, GA4 analytics, and conversion copywriting.',
    fullDescription:
      'The Digital Marketing & Growth track equips you with practical, analytical marketing capabilities. Move beyond theoretical posts to execute real data-backed paid ad campaigns, build search engine authority with technical SEO, track user attribution via Google Analytics 4, and construct automated email conversion funnels.',
    duration: '14 Weeks (3.5 Months)',
    hoursPerWeek: '10–12 Hours / week',
    format: 'Live Online & In-Person Labs',
    level: 'Beginner to Professional',
    tags: ['SEO', 'Google Ads', 'Meta Ads', 'GA4 Analytics', 'Email Marketing', 'Content Strategy'],
    tools: [
      { name: 'Google Ads', category: 'PPC Advertising' },
      { name: 'Meta Ads Manager', category: 'Social Media Advertising' },
      { name: 'Google Analytics 4', category: 'Web Analytics' },
      { name: 'Google Search Console', category: 'Organic Search' },
      { name: 'SEMrush / Ahrefs', category: 'Competitive Intelligence' },
      { name: 'Mailchimp / Klaviyo', category: 'Email Automation' },
      { name: 'Canva & Figma', category: 'Ad Creatives' },
      { name: 'Hotjar', category: 'User Behavior & CRO' },
    ],
    highlights: [
      'Live budget ad campaign execution with verifiable ROI targets',
      'Hands-on keyword research & technical SEO site auditing',
      'Event-based tracking & funnel conversion reporting in GA4',
      'High-converting landing page copywriting and A/B test setup',
      'Direct mentor review on your capstone marketing strategy deck',
    ],
    syllabus: [
      {
        moduleNumber: '01',
        title: 'Digital Marketing Fundamentals & Audience Persona',
        duration: '2 Weeks',
        topics: [
          'Inbound vs Outbound marketing ecosystems',
          'Customer journey mapping and acquisition funnels',
          'Market research, competitor benchmarking, and positioning',
          'Brand voice and high-conversion landing page essentials',
        ],
        handsOn: 'Create a comprehensive Customer Persona & Go-to-Market Strategy Document.',
      },
      {
        moduleNumber: '02',
        title: 'Search Engine Optimization (SEO)',
        duration: '3 Weeks',
        topics: [
          'How search crawlers, indexing, and ranking algorithms operate',
          'Keyword research, search intent mapping, and content gaps',
          'On-page SEO: Meta tags, headings, URL hierarchy, internal linking',
          'Technical SEO: Core Web Vitals, sitemaps, robots.txt, schema markup',
          'Off-page SEO: Link earning, digital PR, and directory signals',
        ],
        handsOn: 'Perform a full-scope Technical & Content SEO Audit on a live business website.',
      },
      {
        moduleNumber: '03',
        title: 'Performance Marketing: Google Ads & Paid Search',
        duration: '3 Weeks',
        topics: [
          'Search campaign setup, match types, negative keywords, quality score',
          'Display advertising, responsive search ads, and bidding models (tCPA, ROAS)',
          'YouTube video advertising and Performance Max (PMax) campaigns',
          'Remarketing lists and conversion tracking implementation',
        ],
        handsOn: 'Set up, structure, and budget an active Google Search & Performance Max Campaign.',
      },
      {
        moduleNumber: '04',
        title: 'Social Media Advertising: Meta, LinkedIn & Instagram',
        duration: '3 Weeks',
        topics: [
          'Meta Ads Manager architecture: Campaign, Ad Set, Ad Creative',
          'Targeting methodologies: Lookalikes, custom audiences, retargeting',
          'Ad creative formats: Carousel, Reels, UGC video frameworks',
          'B2B demand generation via LinkedIn Campaign Manager',
        ],
        handsOn: 'Build a multi-tiered Meta Ads funnel with dedicated retargeting hooks.',
      },
      {
        moduleNumber: '05',
        title: 'Analytics, CRO & Growth Capstone',
        duration: '3 Weeks',
        topics: [
          'Google Analytics 4 setup, event tracking, custom dimensions, and audiences',
          'Google Tag Manager (GTM) container deployment',
          'Conversion Rate Optimization (CRO): Heatmaps, form friction, A/B testing',
          'Marketing budget allocation and executive reporting presentation',
        ],
        handsOn: 'Deliver an executive Growth Audit Capstone with live attribution dashboards.',
      },
    ],
    projects: [
      {
        title: 'E-Commerce Growth & ROAS Campaign',
        description:
          'Constructed a full paid-acquisition funnel on Meta and Google Ads, optimizing for sub-$20 cost per customer acquisition.',
        skillsLearned: ['Meta Ads Manager', 'Google Search Ads', 'Pixel Tracking', 'A/B Creative Testing'],
      },
      {
        title: 'Full Technical SEO Site Turnaround',
        description:
          'Audited an underperforming site, resolved 45+ technical crawl errors, implemented rich snippet schema, and optimized keyword density.',
        skillsLearned: ['SEMrush', 'Google Search Console', 'Schema.org', 'Core Web Vitals'],
      },
      {
        title: 'GA4 Attribution Dashboard & CRO Plan',
        description:
          'Set up custom event triggers in Google Tag Manager, mapped checkout abandonment drop-offs, and created a Looker Studio KPI dashboard.',
        skillsLearned: ['Google Analytics 4', 'GTM', 'Looker Studio', 'Funnel Analysis'],
      },
    ],
    careerRoles: [
      'Digital Marketing Specialist',
      'Performance Marketing Manager',
      'SEO & Content Strategist',
      'Growth & Conversion Analyst',
      'Paid Media Executive',
    ],
    prerequisites:
      'Basic computer literacy, familiarity with web browsing and social media, and an analytical curiosity for consumer behavior. No coding required.',
  },
  {
    id: 'java-full-stack',
    name: 'Java Full Stack',
    badge: 'Enterprise Standard',
    tagline: 'Enterprise Backends with Spring Boot & Modern React Frontends',
    shortDescription: 'Core Java, Spring Boot, REST APIs, SQL databases, and modern React user interfaces.',
    fullDescription:
      'Master industry-standard enterprise software engineering. You will build resilient, distributed backend microservices in Java and Spring Boot, design relational schemas in MySQL/PostgreSQL, and connect them with reactive, high-performance interfaces built in React and TypeScript.',
    duration: '18 Weeks (4.5 Months)',
    hoursPerWeek: '12–15 Hours / week',
    format: 'Live Online & In-Person Labs',
    level: 'Beginner to Advanced',
    tags: ['Java', 'Spring Boot', 'React', 'MySQL', 'REST APIs', 'Docker'],
    tools: [
      { name: 'Core Java (v17/21)', category: 'Backend Language' },
      { name: 'Spring Boot 3', category: 'Framework' },
      { name: 'Spring Data JPA & Hibernate', category: 'ORM' },
      { name: 'React 19 & TypeScript', category: 'Frontend' },
      { name: 'MySQL & PostgreSQL', category: 'Databases' },
      { name: 'Maven & Gradle', category: 'Build Tools' },
      { name: 'Docker', category: 'Containerization' },
      { name: 'JUnit 5 & Mockito', category: 'Testing' },
    ],
    highlights: [
      'Architect enterprise RESTful APIs following domain-driven design',
      'Relational database normalization, indexing, and complex SQL joins',
      'Secure user authentication with Spring Security and JWT tokens',
      'Component-based responsive web apps with React and state management',
      'CI/CD pipelines and Docker containerization for production deployment',
    ],
    syllabus: [
      {
        moduleNumber: '01',
        title: 'Core Java & Object-Oriented Principles',
        duration: '4 Weeks',
        topics: [
          'Java syntax, memory management, JVM internals',
          'OOP: Inheritance, Polymorphism, Encapsulation, Abstraction',
          'Java Collections Framework: Lists, Sets, Maps, Streams API',
          'Exception handling, multithreading basics, and file I/O',
        ],
        handsOn: 'Build a command-line Banking & Transaction Management simulation.',
      },
      {
        moduleNumber: '02',
        title: 'Database Design & Relational SQL',
        duration: '3 Weeks',
        topics: [
          'Relational modeling: 1:1, 1:N, N:M associations',
          'DDL, DML, subqueries, analytical window functions',
          'Indexes, transactions (ACID properties), query optimization',
          'JDBC drivers and connection pooling basics',
        ],
        handsOn: 'Design and benchmark a high-throughput relational database schema.',
      },
      {
        moduleNumber: '03',
        title: 'Spring Boot Microservices & Security',
        duration: '5 Weeks',
        topics: [
          'Spring IoC container, Dependency Injection, component scanning',
          'Building RESTful APIs with Spring MVC annotations',
          'Spring Data JPA, Hibernate ORM, and database migrations',
          'Spring Security 6, JWT stateless authentication, role-based access',
        ],
        handsOn: 'Construct a secure multi-role E-Commerce backend service with JWT authentication.',
      },
      {
        moduleNumber: '04',
        title: 'Modern Frontend with React & TypeScript',
        duration: '4 Weeks',
        topics: [
          'TypeScript essentials: Interfaces, types, generics',
          'React functional components, hooks (useState, useEffect, useMemo)',
          'Consuming REST APIs, caching, and optimistic UI updates',
          'Form validation, error boundaries, and Tailwind CSS styling',
        ],
        handsOn: 'Build an admin portal for order tracking and inventory management.',
      },
      {
        moduleNumber: '05',
        title: 'Capstone & Cloud Deployment',
        duration: '2 Weeks',
        topics: [
          'Docker containerization: Dockerfile & docker-compose',
          'Integration testing with JUnit & Testcontainers',
          'GitHub Actions continuous integration pipelines',
          'Cloud deployment on AWS / GCP',
        ],
        handsOn: 'Ship your production capstone to cloud with automated deployment.',
      },
    ],
    projects: [
      {
        title: 'Cloud Logistics & Warehouse Dispatch Platform',
        description:
          'Distributed backend in Spring Boot with JWT authentication, relational MySQL schema, and a modern React management console.',
        skillsLearned: ['Spring Boot', 'MySQL', 'JWT Auth', 'React', 'Docker'],
      },
      {
        title: 'Healthcare Patient Booking & Tele-consult System',
        description:
          'Role-based access control for doctors, patients, and staff with automated schedule conflict detection and PDF invoice generation.',
        skillsLearned: ['Spring Data JPA', 'PostgreSQL', 'Role-Based Access', 'REST APIs'],
      },
    ],
    careerRoles: [
      'Java Full Stack Developer',
      'Backend Engineer (Spring Boot)',
      'Software Development Engineer (SDE-1)',
      'Application Developer',
    ],
    prerequisites:
      'Basic familiarity with programming logic (loops, conditionals) in any language. Undergraduate degree or self-taught dedication.',
  },
  {
    id: 'python-full-stack',
    name: 'Python Full Stack',
    badge: 'Popular',
    tagline: 'Rapid Development with Django, FastAPI, PostgreSQL & React',
    shortDescription:
      'Python fundamentals, Django, REST APIs, PostgreSQL databases, and responsive web interfaces.',
    fullDescription:
      'Learn the versatile Python software stack. Build scalable backends using Django and high-speed asynchronous microservices using FastAPI, write efficient database queries in PostgreSQL, and wire them to interactive React interfaces.',
    duration: '16 Weeks (4 Months)',
    hoursPerWeek: '12–15 Hours / week',
    format: 'Live Online & In-Person Labs',
    level: 'Beginner to Intermediate',
    tags: ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'REST', 'React'],
    tools: [
      { name: 'Python 3.12', category: 'Programming Language' },
      { name: 'Django & Django REST Framework', category: 'Framework' },
      { name: 'FastAPI', category: 'Async Framework' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'React & Tailwind', category: 'Frontend' },
      { name: 'Celery & Redis', category: 'Task Queues' },
      { name: 'Pytest', category: 'Automated Testing' },
    ],
    highlights: [
      'Clean, pythonic coding standards and object-oriented design',
      'Django ORM, database migrations, and built-in administrative tools',
      'Asynchronous background tasks and caching with Celery and Redis',
      'Modern OpenAPI-documented REST APIs with FastAPI',
      'Full frontend client integration with React hooks',
    ],
    syllabus: [
      {
        moduleNumber: '01',
        title: 'Python Language Mastery',
        duration: '3 Weeks',
        topics: [
          'Python data structures: lists, tuples, dictionaries, sets',
          'Comprehensions, generators, decorators, and context managers',
          'Object-oriented programming: Classes, inheritance, magic methods',
          'Virtual environments, pip, and packaging best practices',
        ],
        handsOn: 'Write an asynchronous web scraper and data parser CLI tool.',
      },
      {
        moduleNumber: '02',
        title: 'Databases & PostgreSQL Modeling',
        duration: '3 Weeks',
        topics: [
          'SQL fundamentals and relational design principles',
          'Query optimization, indexing strategies, and JSONB columns',
          'Python database connectivity with psycopg and SQLAlchemy basics',
        ],
        handsOn: 'Model and seed a multi-tenant relational schema in PostgreSQL.',
      },
      {
        moduleNumber: '03',
        title: 'Django Web Architecture & DRF',
        duration: '5 Weeks',
        topics: [
          'MVT architecture, URL routing, views, templates',
          'Django ORM, querysets, foreign keys, reverse relationships',
          'Django REST Framework: Serializers, ViewSets, permissions, token auth',
          'Celery worker integration with Redis for asynchronous email tasks',
        ],
        handsOn: 'Construct a multi-vendor marketplace API with asynchronous worker queues.',
      },
      {
        moduleNumber: '04',
        title: 'Frontend with React & Capstone Delivery',
        duration: '5 Weeks',
        topics: [
          'React component tree, routing, global state management',
          'Authentication flows: Token refresh, protected routes',
          'Comprehensive test automation with Pytest',
          'Production deployment with Gunicorn, Nginx, and cloud hosting',
        ],
        handsOn: 'Deploy a full-stack SaaS application with complete test coverage.',
      },
    ],
    projects: [
      {
        title: 'FinTech Subscription & Billing SaaS',
        description:
          'Backend in Django REST Framework with Celery background billing cycles, PostgreSQL database, and React user billing dashboard.',
        skillsLearned: ['Django', 'DRF', 'PostgreSQL', 'Celery', 'React'],
      },
      {
        title: 'Real-Time Notification & Content Hub',
        description:
          'FastAPI microservice handling WebSocket feeds with Redis pub/sub and high-speed data ingestion.',
        skillsLearned: ['FastAPI', 'WebSockets', 'Redis', 'Python Asyncio'],
      },
    ],
    careerRoles: [
      'Python Full Stack Engineer',
      'Django / Backend Developer',
      'Software Engineer',
      'API Platform Engineer',
    ],
    prerequisites:
      'No prior programming prerequisites. Logical reasoning and dedication to coding practice required.',
  },
  {
    id: 'mern-stack',
    name: 'MERN Stack',
    badge: 'High Velocity',
    tagline: 'Modern JavaScript from Database to Frontend UI',
    shortDescription:
      'Build complete JavaScript applications with MongoDB, Express, React, and Node.js.',
    fullDescription:
      'Immerse yourself in modern full-stack JavaScript. Develop full-fledged single-page applications with React and Tailwind, design document data models in MongoDB, and write robust REST/GraphQL server APIs in Node.js and Express.',
    duration: '16 Weeks (4 Months)',
    hoursPerWeek: '12–15 Hours / week',
    format: 'Live Online & In-Person Labs',
    level: 'Beginner to Intermediate',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'TypeScript', 'Tailwind'],
    tools: [
      { name: 'Node.js & Express', category: 'Backend Engine' },
      { name: 'React 19', category: 'Frontend Library' },
      { name: 'MongoDB & Mongoose', category: 'NoSQL Database' },
      { name: 'TypeScript', category: 'Type Safety' },
      { name: 'Tailwind CSS', category: 'Styling' },
      { name: 'JWT & Bcrypt', category: 'Authentication' },
      { name: 'Postman & Jest', category: 'Testing' },
    ],
    highlights: [
      'Unified JavaScript/TypeScript ecosystem across server and client',
      'Document modeling with schema validation and aggregation pipelines in MongoDB',
      'Modern React hooks, context, custom hooks, and state management',
      'Clean middleware architecture and error handling in Express',
      'Complete production deployment on Vercel and Cloud platforms',
    ],
    syllabus: [
      {
        moduleNumber: '01',
        title: 'Advanced JavaScript (ES6+) & TypeScript',
        duration: '3 Weeks',
        topics: [
          'Async/Await, Promises, Event Loop, closures',
          'TypeScript interfaces, type unions, generics, and compilation',
          'DOM APIs, modular code patterns, and npm ecosystem',
        ],
        handsOn: 'Build a modular TypeScript interactive web component toolkit.',
      },
      {
        moduleNumber: '02',
        title: 'Backend with Node.js & Express',
        duration: '4 Weeks',
        topics: [
          'Node runtime, HTTP module, event emitter, filesystem',
          'Express routing, custom middleware, request lifecycle',
          'RESTful design conventions, status codes, query parameters',
          'Authentication using JWT, bcrypt password hashing, and cookies',
        ],
        handsOn: 'Create a secured REST API with middleware validation and role guards.',
      },
      {
        moduleNumber: '03',
        title: 'MongoDB & Data Architecture',
        duration: '3 Weeks',
        topics: [
          'NoSQL document store concepts and BSON data types',
          'Mongoose schemas, pre/post hooks, validation rules',
          'Aggregation pipelines: $match, $group, $lookup, $project',
          'Indexing, schema normalization vs denormalization tradeoffs',
        ],
        handsOn: 'Build an analytics data store with complex aggregation pipelines.',
      },
      {
        moduleNumber: '04',
        title: 'React Frontend & Production Capstone',
        duration: '6 Weeks',
        topics: [
          'Component architecture, props, state, effect lifecycles',
          'Client-side routing, protected routes, layout wrappers',
          'State management, API integration, and optimistic updates',
          'End-to-end full stack deployment and performance auditing',
        ],
        handsOn: 'Build and ship an end-to-end collaborative workspace platform.',
      },
    ],
    projects: [
      {
        title: 'Team Collaboration & Kanban Workspace',
        description:
          'Full-featured project management platform with drag-and-drop boards, activity audit trails, and role-based workspace permissions.',
        skillsLearned: ['React', 'Express', 'MongoDB', 'JWT Auth', 'Tailwind'],
      },
      {
        title: 'Digital Learning & Quiz Engine',
        description:
          'Real-time quiz assessment app with dynamic question builders, automated grading, and instant score summaries.',
        skillsLearned: ['Node.js', 'Mongoose Aggregations', 'React State'],
      },
    ],
    careerRoles: [
      'Full Stack JavaScript Developer',
      'Frontend React Engineer',
      'Node.js Backend Developer',
      'MERN Stack Engineer',
    ],
    prerequisites:
      'Basic knowledge of HTML and CSS. A commitment to daily coding and hands-on laboratory exercises.',
  },
  {
    id: 'software-testing-qa',
    name: 'Software Testing & QA',
    badge: 'High Reliability',
    tagline: 'Manual Testing, Selenium Automation, API Testing & Bug Reporting',
    shortDescription:
      'Manual testing, test design, automation basics, API verification, and bug tracking.',
    fullDescription:
      'Become a reliable Quality Assurance Engineer. Learn comprehensive test life cycle management (STLC), design rigorous test suites, automate cross-browser test flows using Selenium and Java/Python, and execute rigorous API test collections using Postman and Newman.',
    duration: '14 Weeks (3.5 Months)',
    hoursPerWeek: '10–12 Hours / week',
    format: 'Live Online & In-Person Labs',
    level: 'Beginner to Job-Ready',
    tags: ['Manual', 'Selenium', 'API testing', 'Agile', 'Jira', 'Postman'],
    tools: [
      { name: 'Selenium WebDriver', category: 'Automation Engine' },
      { name: 'Postman & Newman', category: 'API Testing' },
      { name: 'Jira & Confluence', category: 'Test Management' },
      { name: 'TestNG & JUnit', category: 'Test Runners' },
      { name: 'Git & GitHub', category: 'Version Control' },
      { name: 'SQL Workbench', category: 'Database Validation' },
    ],
    highlights: [
      'Master the Software Testing Life Cycle (STLC) and Agile methodologies',
      'Write exhaustive test scenarios, test cases, and defect reports in Jira',
      'Automate web testing with Selenium WebDriver and Page Object Model (POM)',
      'API test automation with Postman collections and environment assertions',
      'Database backend testing: Verifying data consistency with SQL queries',
    ],
    syllabus: [
      {
        moduleNumber: '01',
        title: 'Software Testing Principles & Manual Testing',
        duration: '3 Weeks',
        topics: [
          'SDLC vs STLC, V-Model, and Agile Scrum framework',
          'Black box test design: Boundary Value Analysis, Equivalence Partitioning',
          'Creating test plans, test cases, and traceability matrices (RTM)',
          'Defect reporting lifecycle, severity vs priority triage in Jira',
        ],
        handsOn: 'Draft an exhaustive Test Plan and execute 50+ manual test cases on a live web portal.',
      },
      {
        moduleNumber: '02',
        title: 'Database Verification with SQL',
        duration: '2 Weeks',
        topics: [
          'Backend validation: Verifying UI transactions inside the database',
          'Writing SELECT queries, aggregate functions, and multi-table joins for QA',
          'Data integrity, constraint validation, and rollback tests',
        ],
        handsOn: 'Write database test scripts to identify schema mismatches and data anomalies.',
      },
      {
        moduleNumber: '03',
        title: 'API Testing & Automation with Postman',
        duration: '3 Weeks',
        topics: [
          'HTTP methods (GET, POST, PUT, DELETE), headers, payload formats',
          'Writing JavaScript assertions in Postman test tabs',
          'Environment variables, dynamic tokens, and chaining requests',
          'Automated collection execution with Newman CLI',
        ],
        handsOn: 'Build and run an automated API test suite covering 30+ endpoints.',
      },
      {
        moduleNumber: '04',
        title: 'Selenium Automation & Framework Architecture',
        duration: '6 Weeks',
        topics: [
          'WebDriver architecture, locators (XPath, CSS selectors, ID)',
          'Handling dynamic alerts, iframes, multiple windows, and dropdowns',
          'Implicit vs Explicit waits, FluentWait patterns',
          'Page Object Model (POM) design pattern with TestNG',
          'Generating automated HTML execution reports',
        ],
        handsOn: 'Architect a modular Page Object Model automation framework from scratch.',
      },
    ],
    projects: [
      {
        title: 'End-to-End Banking Portal Automation Framework',
        description:
          'Constructed a robust hybrid automation framework using Selenium WebDriver, TestNG, and Page Object Model with data-driven Excel inputs.',
        skillsLearned: ['Selenium WebDriver', 'TestNG', 'Page Object Model', 'Data-Driven Testing'],
      },
      {
        title: 'Cloud SaaS API Test Suite & Newman CI Run',
        description:
          'Engineered a suite of 45 automated API verification scripts with token generation, response schema checks, and status validation.',
        skillsLearned: ['Postman', 'API Testing', 'Newman', 'JSON Schema Validation'],
      },
    ],
    careerRoles: [
      'QA Test Engineer',
      'Automation Test Engineer (Selenium)',
      'Software Development Engineer in Test (SDET - Entry)',
      'Manual Test Analyst',
    ],
    prerequisites:
      'Basic computer literacy. No previous programming experience required; foundational coding is taught from the ground up.',
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    badge: 'Business Essential',
    tagline: 'Clean, Analyze and Visualize Real-World Data for Decision-Making',
    shortDescription:
      'Clean, analyse, and visualise datasets to answer key business questions using Excel, SQL, Python, and Power BI.',
    fullDescription:
      'Translate raw data into actionable business intelligence. Learn data wrangling and statistical analysis in Python, write complex analytical SQL queries, build dynamic interactive dashboards in Power BI, and present executive business summaries.',
    duration: '16 Weeks (4 Months)',
    hoursPerWeek: '10–12 Hours / week',
    format: 'Live Online & In-Person Labs',
    level: 'Beginner to Intermediate',
    tags: ['Excel', 'SQL', 'Python', 'Power BI', 'Statistics', 'Tableau'],
    tools: [
      { name: 'Advanced Excel', category: 'Spreadsheets' },
      { name: 'SQL (PostgreSQL/MySQL)', category: 'Database Querying' },
      { name: 'Python (Pandas, NumPy)', category: 'Data Wrangling' },
      { name: 'Power BI & DAX', category: 'Business Intelligence' },
      { name: 'Matplotlib & Seaborn', category: 'Data Visualization' },
      { name: 'Jupyter Notebooks', category: 'Analysis Environment' },
    ],
    highlights: [
      'Advanced Excel modeling, Pivot tables, XLOOKUP, and dashboard macros',
      'Complex SQL: Window functions, Common Table Expressions (CTEs), and aggregation',
      'Python data manipulation with Pandas, NumPy, and statistical exploration',
      'Interactive Power BI report design with custom DAX measures and filters',
      'Real-world business case studies spanning Retail, FinTech, and Healthcare',
    ],
    syllabus: [
      {
        moduleNumber: '01',
        title: 'Business Statistics & Advanced Excel',
        duration: '3 Weeks',
        topics: [
          'Measures of central tendency, variance, standard deviation, correlation',
          'Data cleaning, text formulas, XLOOKUP, INDEX-MATCH, nested IFs',
          'Pivot Tables, calculated fields, slicers, and conditional formatting',
          'Creating executive summary dashboards in Excel',
        ],
        handsOn: 'Clean and model a messy retail sales dataset into an executive dashboard.',
      },
      {
        moduleNumber: '02',
        title: 'SQL for Data Analysis',
        duration: '4 Weeks',
        topics: [
          'Relational database concepts and querying fundamentals',
          'Aggregations with GROUP BY, HAVING, and multi-table INNER/LEFT joins',
          'Subqueries, CTEs (WITH queries), and UNION operations',
          'Window functions: ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG',
        ],
        handsOn: 'Write advanced analytical queries to calculate Monthly Recurring Revenue (MRR) and customer churn.',
      },
      {
        moduleNumber: '03',
        title: 'Python for Data Analysis (Pandas & NumPy)',
        duration: '5 Weeks',
        topics: [
          'Python syntax for analysts: Data types, loops, functions',
          'NumPy arrays, vectorization, and mathematical operations',
          'Pandas Series and DataFrames: Filtering, merging, grouping, reshaping',
          'Data cleaning: Handling missing values, duplicates, outliers',
          'Exploratory Data Analysis (EDA) with Seaborn and Matplotlib',
        ],
        handsOn: 'Execute an end-to-end Exploratory Data Analysis notebook on customer attrition data.',
      },
      {
        moduleNumber: '04',
        title: 'Power BI Dashboarding & Executive Capstone',
        duration: '4 Weeks',
        topics: [
          'Power BI architecture: Power Query, Data Modeling (Star Schema)',
          'DAX formulas: CALCULATE, RELATED, time intelligence functions (YTD, MTD)',
          'Visual selection best practices, custom drill-throughs, and bookmarks',
          'Presenting insights and recommendations to non-technical stakeholders',
        ],
        handsOn: 'Deliver an interactive, enterprise-grade business performance dashboard.',
      },
    ],
    projects: [
      {
        title: 'E-Commerce Customer Lifetime Value & Churn Dashboard',
        description:
          'Constructed an interactive Power BI dashboard tracking cohort retention, average order value, and customer acquisition costs with automated DAX measures.',
        skillsLearned: ['Power BI', 'DAX', 'Data Modeling', 'Cohort Analysis'],
      },
      {
        title: 'Healthcare Patient Admission Analysis with Python & SQL',
        description:
          'Cleaned and queried 100,000+ patient records to identify readmission risk factors and bed utilization trends.',
        skillsLearned: ['Python', 'Pandas', 'SQL CTEs', 'Seaborn Visualization'],
      },
    ],
    careerRoles: [
      'Data Analyst',
      'Business Intelligence (BI) Developer',
      'Product Analyst',
      'Operations & Reporting Analyst',
    ],
    prerequisites:
      'Basic familiarity with numbers and spreadsheets. Strong analytical curiosity. No prior programming background necessary.',
  },
];
