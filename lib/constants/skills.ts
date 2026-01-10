import { Skill, SkillCategory } from '../types/skill';

export const skills: Skill[] = [
  // Languages
  { name: 'TypeScript', category: 'Languages' },
  { name: 'JavaScript', category: 'Languages' },
  { name: 'Python', category: 'Languages' },
  { name: 'Java', category: 'Languages' },
  { name: 'SQL', category: 'Languages' },
  { name: 'C', category: 'Languages' },

  // Frontend
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Redux', category: 'Frontend' },
  { name: 'Zustand', category: 'Frontend' },
  { name: 'HTML', category: 'Frontend' },
  { name: 'CSS', category: 'Frontend' },

  // Backend
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express.js', category: 'Backend' },
  { name: 'Drizzle ORM', category: 'Backend' },
  { name: 'REST API', category: 'Backend' },

  // Database
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'Firebase', category: 'Database' },
  { name: 'Firestore', category: 'Database' },
  { name: 'Quickbase', category: 'Database' },

  // DevOps/Tools
  { name: 'Docker', category: 'DevOps/Tools' },
  { name: 'Git', category: 'DevOps/Tools' },
  { name: 'GitHub', category: 'DevOps/Tools' },
  { name: 'Vercel', category: 'DevOps/Tools' },
  { name: 'Auth0', category: 'DevOps/Tools' },
  { name: 'Google Cloud', category: 'DevOps/Tools' },
  { name: 'Zod', category: 'DevOps/Tools' },
  { name: 'Stripe', category: 'DevOps/Tools' },
];

export const skillsByCategory: SkillCategory[] = [
  {
    category: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL', 'C'],
  },
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Redux', 'Zustand', 'HTML', 'CSS'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express.js', 'Drizzle ORM', 'REST API'],
  },
  {
    category: 'Database',
    skills: ['PostgreSQL', 'MongoDB', 'Firebase', 'Firestore', 'Quickbase'],
  },
  {
    category: 'DevOps/Tools',
    skills: ['Docker', 'Git', 'GitHub', 'Vercel', 'Auth0', 'Google Cloud', 'Zod', 'Stripe'],
  },
];

export const getSkillsByCategory = (category: string): string[] => {
  const categoryData = skillsByCategory.find(sc => sc.category === category);
  return categoryData ? categoryData.skills : [];
};

export const getAllSkills = (): Skill[] => {
  return skills;
};

export const getCategorizedSkills = (): SkillCategory[] => {
  return skillsByCategory;
};
