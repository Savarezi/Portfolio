export interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  chatbotUrl?: string;
  tags: string[];
  category: 'ia' | 'fullstack' | 'data' | 'cloud';
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  bullets: string[];
}

export interface EducationCertification {
  title: string;
  institution: string;
  year: string;
  type: 'academic' | 'certification';
  credentialUrl?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: string[];
}
