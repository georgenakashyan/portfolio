export interface Skill {
  name: string;
  category: 'Languages' | 'Frontend' | 'Backend' | 'Database' | 'DevOps/Tools';
  icon?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}
