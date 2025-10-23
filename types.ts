import { ReactElement } from 'react';

export interface NavLink {
  name: string;
  path: string;
}

export interface Service {
  icon: ReactElement;
  title: string;
  description: string;
}

export enum ProjectCategory {
  BUSINESS = 'Business',
  ECOMMERCE = 'E-Commerce',
  AI = 'AI Integration',
  CYBERSECURITY = 'Cybersecurity',
}

export interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  imageUrl: string;
  description: string;
  techStack: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

export interface PricingPlan {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export interface FaqItem {
    question: string;
    answer: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string; // Stored as HTML
  author: string;
  createdAt: any; // Firestore Timestamp
  imageUrl: string;
  status: 'published' | 'draft';
  excerpt: string;
}
