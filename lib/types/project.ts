export interface Project {
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  image: string;
  github?: string;
  demo?: string;
  featured?: boolean;
  category?: string;
}
