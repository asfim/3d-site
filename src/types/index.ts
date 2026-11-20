export type BuildingId = 'about' | 'projects' | 'skills' | 'experience' | 'services' | 'contact';

export type CameraMode = 'city' | 'transitioning' | 'interior' | 'tour' | 'free';

export type GraphicsQuality = 'low' | 'medium' | 'high' | 'ultra';

export interface BuildingConfig {
  id: BuildingId;
  name: string;
  tagline: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  glowColor: string;
  icon: string;
  cameraFocus: [number, number, number];
  interiorCamera: [number, number, number];
}

export interface ProfileData {
  name: string;
  title: string;
  brand: string;
  identity: string;
  tagline: string;
  theme: string;
  bio: string[];
  education: Array<{
    degree: string;
    institution: string;
    period: string;
    details?: string;
  }>;
  journey: Array<{
    year: string;
    title: string;
    description: string;
  }>;
  achievements: string[];
  careerGoals: string[];
  cvUrl: string;
  avatarUrl: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    whatsapp: string;
    linkedin: string;
    github: string;
    facebook: string;
  };
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  mainFeatures: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface SkillItem {
  name: string;
  level: number; // 0 - 100 percentage or rating
  iconName?: string;
  category: 'Backend' | 'Frontend' | 'Database' | 'Tools';
  description?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  features: string[];
}
