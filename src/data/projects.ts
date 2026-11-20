import { Project } from '@/types';

export const projectCategories = [
  'All',
  'Management Systems',
  'Enterprise ERP',
  'Healthcare',
  'E-commerce & Web',
  'Custom Software'
];

export const projectsData: Project[] = [
  {
    id: 'school-management-system',
    title: 'Comprehensive School Management ERP',
    category: 'Management Systems',
    image: '/images/projects/school-erp.jpg',
    shortDescription: 'All-in-one institutional ERP managing student lifecycles, grading, finance, exams, and parent portals.',
    fullDescription: 'A multi-tier educational ERP built with Laravel and MySQL. Features role-based access control for superadmins, teachers, students, and guardians. Handles automated grade calculation, fee voucher generation with SMS/Email notifications, and live timetable management.',
    technologies: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'REST API', 'TCPDF'],
    mainFeatures: [
      'Multi-campus student enrollment & identity card generation',
      'Fee invoice automation & payment gateway integration',
      'Automated grading engine supporting custom grading scales',
      'Guardian portal with attendance alerts and academic reports'
    ],
    liveDemoUrl: 'https://demo-school.htechprovision.com',
    githubUrl: 'https://github.com/hasanparvez/school-management-system',
    featured: true
  },
  {
    id: 'attendance-management-system',
    title: 'Biometric & QR Attendance Management System',
    category: 'Management Systems',
    image: '/images/projects/attendance-system.jpg',
    shortDescription: 'Enterprise attendance tracking integrating biometric devices, QR check-in, and automated payroll calculations.',
    fullDescription: 'Designed for corporate environments and universities. Includes biometric device sync over REST APIs, geo-fenced QR check-ins for field workers, shift management, leave request approval workflows, and auto-computed monthly attendance logs.',
    technologies: ['PHP', 'Laravel', 'REST API', 'MySQL', 'Tailwind CSS', 'Alpine.js'],
    mainFeatures: [
      'ZKTeco biometric hardware synchronization over API',
      'Dynamic shift scheduling and overtime calculation',
      'Leave management lifecycle with multi-level approval',
      'Exportable monthly payroll-ready attendance reports'
    ],
    liveDemoUrl: 'https://demo-attendance.htechprovision.com',
    githubUrl: 'https://github.com/hasanparvez/attendance-management-system',
    featured: true
  },
  {
    id: 'real-estate-management-system',
    title: 'Smart Real Estate & Property Portfolio Platform',
    category: 'Enterprise ERP',
    image: '/images/projects/real-estate.jpg',
    shortDescription: 'Interactive property listing, booking management, installment schedules, and legal document generator.',
    fullDescription: 'A full-scale real estate software allowing property developers to manage plot allocations, commercial spaces, customer installment collections, commission tracking for agents, and lead pipeline conversion.',
    technologies: ['Laravel', 'MySQL', 'Vue.js', 'Bootstrap', 'REST API'],
    mainFeatures: [
      'Interactive 2D plot and unit layout visualizer',
      'Installment tracking with automated late fee calculation',
      'Agent commission ledger and sales pipeline analytics',
      'Automated deed generation and digital receipt issuance'
    ],
    liveDemoUrl: 'https://demo-realestate.htechprovision.com',
    githubUrl: 'https://github.com/hasanparvez/real-estate-crm',
    featured: false
  },
  {
    id: 'ecommerce-platform',
    title: 'Multi-Vendor E-Commerce Platform',
    category: 'E-commerce & Web',
    image: '/images/projects/ecommerce.jpg',
    shortDescription: 'High-performance multi-vendor marketplace with real-time inventory, flash sales, and multi-currency checkout.',
    fullDescription: 'Architected to sustain high-traffic sale events with Redis caching and optimized database queries. Features vendor sub-stores, commission payouts, dynamic variant pricing, coupon management, and multi-step secure checkout.',
    technologies: ['Laravel', 'MySQL', 'Redis', 'Tailwind CSS', 'JavaScript', 'Stripe / SSLCommerz API'],
    mainFeatures: [
      'Vendor dashboard with sales charts and product inventory',
      'Flash sale engine with queue-backed order processing',
      'Order tracking lifecycle with automated email notifications',
      'Instant coupon and promotional code calculation'
    ],
    liveDemoUrl: 'https://demo-shop.htechprovision.com',
    githubUrl: 'https://github.com/hasanparvez/laravel-multivendor-ecommerce',
    featured: true
  },
  {
    id: 'hospital-management-system',
    title: 'Clinical Care & Hospital Management System',
    category: 'Healthcare',
    image: '/images/projects/hospital.jpg',
    shortDescription: 'Integrated electronic health records (EHR), outpatient/inpatient billing, and doctor appointment scheduling.',
    fullDescription: 'A hospital information system designed for clinics and multi-bed hospitals. Connects reception, doctors, diagnostic labs, pharmacy, and accounts into a seamless real-time data workflow.',
    technologies: ['PHP', 'Laravel', 'MySQL', 'Bootstrap', 'REST API'],
    mainFeatures: [
      'Doctor appointment booking and schedule management',
      'Digital prescription creator with integrated medicine database',
      'Pathology test report generation and billing',
      'Bed allocation, ward occupancy tracking, and discharge summary'
    ],
    liveDemoUrl: 'https://demo-hospital.htechprovision.com',
    githubUrl: 'https://github.com/hasanparvez/hospital-ehr-system',
    featured: true
  },
  {
    id: 'pharmacy-management-system',
    title: 'Smart Pharmacy POS & Inventory System',
    category: 'Healthcare',
    image: '/images/projects/pharmacy.jpg',
    shortDescription: 'Barcode POS, batch expiry tracking, supplier purchase order management, and profit analytics.',
    fullDescription: 'High-speed point-of-sale software customized for retail pharmacies. Automatically warns about drug expiry dates, low stock thresholds, and batch reconciliations.',
    technologies: ['Laravel', 'MySQL', 'jQuery', 'Bootstrap', 'Thermal Receipt Printing'],
    mainFeatures: [
      'Fast barcode scanning and keyboard-only cashier POS checkout',
      'Batch tracking with early expiry warning alerts',
      'Supplier purchase ledger and return item management',
      'Daily profit and loss ledger with sales analytics'
    ],
    liveDemoUrl: 'https://demo-pharmacy.htechprovision.com',
    githubUrl: 'https://github.com/hasanparvez/pharmacy-pos-system',
    featured: false
  },
  {
    id: 'travel-agency-website',
    title: 'Travel Agency & Tour Booking Portal',
    category: 'E-commerce & Web',
    image: '/images/projects/travel.jpg',
    shortDescription: 'Dynamic package bookings, customized itineraries, flight inquiry, and customer travel dashboard.',
    fullDescription: 'A dynamic travel agency platform with rich destination showcases, visa assistance forms, seasonal vacation packages, and automated booking confirmation vouchers.',
    technologies: ['Laravel', 'Next.js', 'Tailwind CSS', 'MySQL', 'REST API'],
    mainFeatures: [
      'Dynamic tour itinerary builder with price tiers',
      'Online booking deposit and inquiry management system',
      'Customer portal for itinerary and voucher downloads',
      'SEO-optimized destination blogs and reviews engine'
    ],
    liveDemoUrl: 'https://demo-travel.htechprovision.com',
    githubUrl: 'https://github.com/hasanparvez/travel-booking-portal',
    featured: false
  },
  {
    id: 'news-portal',
    title: 'Digital News Publishing & Editorial CMS',
    category: 'E-commerce & Web',
    image: '/images/projects/news-portal.jpg',
    shortDescription: 'High-throughput news publishing engine with reporter workflows, breaking news ticker, and ad space manager.',
    fullDescription: 'Built to handle large reader concurrency. Includes an editorial workflow with reporter submission, editor review, scheduled publishing, media library, and ad banner placement management.',
    technologies: ['PHP', 'Laravel', 'MySQL', 'Tailwind CSS', 'JavaScript'],
    mainFeatures: [
      'Role-based newsroom publishing workflow (Reporter, Sub-editor, Editor)',
      'Breaking news ticker and trending article algorithmic feed',
      'Banner advertising management with click and view analytics',
      'Clean typography and instant mobile responsive reader mode'
    ],
    liveDemoUrl: 'https://demo-news.htechprovision.com',
    githubUrl: 'https://github.com/hasanparvez/news-editorial-cms',
    featured: false
  },
  {
    id: 'construction-erp',
    title: 'Construction & Material Management ERP',
    category: 'Enterprise ERP',
    image: '/images/projects/construction-erp.jpg',
    shortDescription: 'Site procurement, raw material stock tracking, contractor payroll, and project milestone budgeting.',
    fullDescription: 'Custom ERP built for civil engineering and real estate builders to monitor site inventory, cement/steel consumption, contractor billings, and budget vs actual cost variance.',
    technologies: ['Laravel', 'MySQL', 'Bootstrap', 'Chart.js', 'REST API'],
    mainFeatures: [
      'Multi-site raw material requisitions and transfer tracking',
      'Subcontractor measurement books and bill verification',
      'Milestone expense tracking against projected budget',
      'Equipment maintenance logs and fuel consumption records'
    ],
    liveDemoUrl: 'https://demo-construction.htechprovision.com',
    githubUrl: 'https://github.com/hasanparvez/construction-erp-system',
    featured: false
  },
  {
    id: 'custom-business-software',
    title: 'Tailored Enterprise Business Automation Suite',
    category: 'Custom Software',
    image: '/images/projects/business-automation.jpg',
    shortDescription: 'Bespoke automation software resolving client-specific operational bottlenecks, CRM, and custom workflows.',
    fullDescription: 'Modular architecture custom-developed for businesses transitioning away from spreadsheets to automated cloud workflows. Includes custom reporting, role security, audit trails, and automated email alerts.',
    technologies: ['Laravel', 'PHP', 'MySQL', 'Next.js', 'Tailwind CSS', 'REST API'],
    mainFeatures: [
      'Custom form builders and dynamic data collection workflows',
      'Granular audit logging tracking every record change',
      'Automated scheduled report dispatch to management',
      'Seamless integration with third-party payment and SMS gateways'
    ],
    liveDemoUrl: 'https://demo-customsuite.htechprovision.com',
    githubUrl: 'https://github.com/hasanparvez/custom-business-automation',
    featured: true
  }
];
