import { BuildingConfig } from '@/types';

export const buildingsData: BuildingConfig[] = [
  {
    id: 'about',
    name: 'About Me Tower',
    tagline: 'Identity & Professional Journey',
    position: [-16, 0, -12],
    rotation: [0, Math.PI / 4, 0],
    color: '#00d2ff',
    glowColor: '#3a7bd5',
    icon: 'User',
    cameraFocus: [-16, 8, -12],
    interiorCamera: [-16, 4, -4]
  },
  {
    id: 'projects',
    name: 'Project Showcase Expo',
    tagline: 'Enterprise Systems & Web Apps',
    position: [0, 0, -20],
    rotation: [0, 0, 0],
    color: '#7928ca',
    glowColor: '#ff0080',
    icon: 'FolderGit2',
    cameraFocus: [0, 9, -20],
    interiorCamera: [0, 4, -12]
  },
  {
    id: 'skills',
    name: 'Technology Center',
    tagline: 'Backend, Frontend & Tools',
    position: [18, 0, -10],
    rotation: [0, -Math.PI / 4, 0],
    color: '#00f2fe',
    glowColor: '#4facfe',
    icon: 'Cpu',
    cameraFocus: [18, 8, -10],
    interiorCamera: [18, 4, -2]
  },
  {
    id: 'experience',
    name: 'Career & Experience Plaza',
    tagline: 'Milestones & History',
    position: [-18, 0, 10],
    rotation: [0, Math.PI / 3, 0],
    color: '#38ef7d',
    glowColor: '#11998e',
    icon: 'Briefcase',
    cameraFocus: [-18, 7, 10],
    interiorCamera: [-18, 4, 18]
  },
  {
    id: 'services',
    name: 'Enterprise Service Hub',
    tagline: 'Custom Software & ERPs',
    position: [16, 0, 12],
    rotation: [0, -Math.PI / 3, 0],
    color: '#f857a6',
    glowColor: '#ff5858',
    icon: 'Layers',
    cameraFocus: [16, 7, 12],
    interiorCamera: [16, 4, 20]
  },
  {
    id: 'contact',
    name: 'Communication HQ',
    tagline: 'Connect & Inquire',
    position: [0, 0, 16],
    rotation: [0, Math.PI, 0],
    color: '#43e97b',
    glowColor: '#38f9d7',
    icon: 'Send',
    cameraFocus: [0, 7, 16],
    interiorCamera: [0, 4, 24]
  }
];
