import { ExperienceItem } from '@/types';

export const experienceData: ExperienceItem[] = [
  {
    id: 'h-tech-provision-it',
    role: 'Founder & Lead Full Stack Architect',
    company: 'H Tech Provision IT',
    period: '2023 - Present',
    location: 'Dhaka, Bangladesh',
    responsibilities: [
      'Leading overall technology roadmap, software architecture, and delivery of client enterprise solutions.',
      'Architecting custom Laravel applications, ERP systems, and cloud databases for commercial clients.',
      'Conducting code reviews, establishing CI/CD quality pipelines, and enforcing security best practices.',
      'Managing client relationships, technical scoping, and translating business goals into scalable software solutions.'
    ],
    achievements: [
      'Successfully architected and deployed over 25 client systems with high reliability.',
      'Engineered an educational ERP serving more than 10,000 active students and faculty.',
      'Built a dedicated team culture committed to clean code, test-driven development, and timely deliveries.'
    ],
    technologies: ['Laravel', 'PHP', 'MySQL', 'Next.js', 'React', 'Tailwind CSS', 'Docker', 'REST API']
  },
  {
    id: 'senior-laravel-developer',
    role: 'Senior Laravel Developer',
    company: 'Tech Solutions Global',
    period: '2022 - 2023',
    location: 'Dhaka, Bangladesh',
    responsibilities: [
      'Developed core backend services and micro-modules for multi-vendor e-commerce and real estate platforms.',
      'Optimized slow database queries, indexing schemes, and Redis caching strategies, improving response speeds by 45%.',
      'Integrated payment gateways including Stripe, PayPal, and local merchant gateways with webhook resilience.',
      'Collaborated closely with UI/UX engineers to implement reactive frontend interfaces.'
    ],
    achievements: [
      'Refactored legacy monolith codebase into streamlined modular Laravel architecture.',
      'Implemented automated invoice and voucher dispatch pipelines handling tens of thousands of monthly transactions.'
    ],
    technologies: ['Laravel', 'PHP', 'MySQL', 'Redis', 'JavaScript', 'Bootstrap', 'Git']
  },
  {
    id: 'full-stack-developer',
    role: 'Full Stack Web Developer',
    company: 'Innovate IT Solutions',
    period: '2020 - 2022',
    location: 'Dhaka, Bangladesh',
    responsibilities: [
      'Built responsive web interfaces and dynamic database-driven applications using PHP, MySQL, and JavaScript.',
      'Designed relational database schemas and implemented robust REST API endpoints for web and mobile apps.',
      'Maintained legacy client websites, resolved critical security vulnerabilities, and upgraded frameworks.',
      'Collaborated with cross-functional development teams in agile sprint cycles.'
    ],
    achievements: [
      'Maintained a 99.8% bug-free delivery record during client staging phases.',
      'Created reusable Blade components and UI utility libraries accelerating new feature deployments.'
    ],
    technologies: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'REST API']
  }
];
