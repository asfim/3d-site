import { ServiceItem } from '@/types';

export const servicesData: ServiceItem[] = [
  {
    id: 'laravel-web-app',
    title: 'Laravel Web Application Development',
    icon: 'Layers',
    description: 'Bespoke, high-throughput web applications architected on modern Laravel, featuring secure authentication, multi-tenant databases, and resilient APIs.',
    features: [
      'Tailored business logic and clean MVC architecture',
      'Robust queue processing and scheduled cron automations',
      'Role-based permissions and high security standards',
      'Seamless database migrations and relational data models'
    ]
  },
  {
    id: 'custom-website',
    title: 'Custom Website Development',
    icon: 'Globe',
    description: 'High-speed, SEO-friendly websites delivering captivating user experiences, responsive layouts, and modern frontends.',
    features: [
      '100% responsive design across all devices',
      'Search engine optimized structures and metadata',
      'Ultra-fast load times and performance optimization',
      'Interactive micro-animations and intuitive navigation'
    ]
  },
  {
    id: 'ecommerce-dev',
    title: 'E-Commerce Development',
    icon: 'ShoppingCart',
    description: 'Scalable e-commerce stores with multi-currency checkout, dynamic inventories, coupon codes, and automated invoice delivery.',
    features: [
      'Secure payment gateway integrations (Stripe, SSLCommerz, PayPal)',
      'Real-time inventory and stock threshold alerts',
      'Customer order tracking portal and instant notifications',
      'Admin sales analytics and reporting dashboards'
    ]
  },
  {
    id: 'school-management',
    title: 'School Management Software',
    icon: 'GraduationCap',
    description: 'Complete educational ERP covering student admissions, grading calculations, fee billing, timetables, and teacher/parent communication.',
    features: [
      'Multi-campus student record lifecycle management',
      'Automated terminal exam grade cards and tabulation sheets',
      'SMS alerts for attendance and fee collection reminders',
      'Dedicated role-based portals for students and teachers'
    ]
  },
  {
    id: 'erp-development',
    title: 'ERP Development',
    icon: 'Building2',
    description: 'Modular enterprise resource planning systems streamlining procurement, finance, warehouse stock, and workforce operations.',
    features: [
      'Cross-departmental integrated workflows',
      'Real-time supply chain and inventory visibility',
      'Comprehensive accounting and financial ledgers',
      'Audit log tracking and strict data governance'
    ]
  },
  {
    id: 'real-estate-software',
    title: 'Real Estate Software',
    icon: 'Home',
    description: 'End-to-end management systems for builders and realtors with unit bookings, installment schedules, and lead pipelines.',
    features: [
      'Visual unit allocation and availability tracking',
      'Automated customer installment reminders and receipts',
      'Agent commission calculations and performance charts',
      'Digital deed documentation and agreement prints'
    ]
  },
  {
    id: 'hospital-management',
    title: 'Hospital Management Software',
    icon: 'Activity',
    description: 'Comprehensive healthcare information system covering patient records, appointment scheduling, billing, and lab diagnostics.',
    features: [
      'Outpatient (OPD) and Inpatient (IPD) management',
      'Doctor digital prescription creation with dosage templates',
      'Diagnostic pathology report generation and delivery',
      'Integrated pharmacy POS and bed allocation manager'
    ]
  },
  {
    id: 'attendance-management',
    title: 'Attendance Management Software',
    icon: 'CheckSquare',
    description: 'Real-time corporate attendance system supporting biometric hardware, QR codes, shift rotations, and payroll syncing.',
    features: [
      'Biometric fingerprint & facial recognition machine sync',
      'Geo-fenced mobile QR check-ins for field teams',
      'Automated late penalty, overtime, and leave calculations',
      'Instant export to corporate payroll systems'
    ]
  },
  {
    id: 'api-integration',
    title: 'API Integration & Backend Services',
    icon: 'Cpu',
    description: 'Clean RESTful API engineering, third-party payment/SMS webhook integrations, and high-performance microservices.',
    features: [
      'Secure OAuth2, JWT and Laravel Sanctum auth systems',
      'Third-party payment gateways, courier, and SMS APIs',
      'Swagger / Postman API documentation and test suites',
      'Rate limiting, payload validation, and data encryption'
    ]
  },
  {
    id: 'business-automation',
    title: 'Business Automation',
    icon: 'Zap',
    description: 'Transforming manual repetitive business operations into automated, efficient, error-free digital workflows.',
    features: [
      'Spreadsheet-to-cloud automated migrations',
      'Scheduled email reports and customer follow-up triggers',
      'Custom invoice, receipt, and certificate PDF generators',
      'Actionable executive KPI dashboards and alerts'
    ]
  }
];
