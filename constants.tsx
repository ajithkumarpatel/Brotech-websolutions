import React from 'react';
import { NavLink, Service, Project, Testimonial, PricingPlan, ProjectCategory, FaqItem } from './types';
import { Briefcase, ShoppingCart, Bot, ShieldCheck, Cpu, Database, BarChart, Code } from 'lucide-react';

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export const SERVICES: Service[] = [
  {
    icon: <Briefcase className="w-12 h-12 text-primary" />,
    title: 'Business Websites',
    description: 'Professional, responsive websites tailored to represent your brand and attract customers.',
  },
  {
    icon: <ShoppingCart className="w-12 h-12 text-primary" />,
    title: 'E-Commerce Websites',
    description: 'Robust and scalable e-commerce solutions to sell your products online with ease.',
  },
  {
    icon: <Code className="w-12 h-12 text-primary" />,
    title: 'Portfolio Websites',
    description: 'Stunning portfolio websites to showcase your work and skills to potential clients or employers.',
  },
  {
    icon: <Bot className="w-12 h-12 text-primary" />,
    title: 'AI Chatbot Integration',
    description: 'Integrate intelligent AI chatbots to provide 24/7 customer support and generate leads.',
  },
  {
    icon: <BarChart className="w-12 h-12 text-primary" />,
    title: 'Data Dashboards',
    description: 'Custom data dashboards to visualize your key metrics and make data-driven decisions.',
  },
  {
    icon: <ShieldCheck className="w-12 h-12 text-primary" />,
    title: 'Cybersecurity Setup',
    description: 'Comprehensive security solutions to protect your website and data from modern threats.',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Innovate Corp Website',
    category: ProjectCategory.BUSINESS,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    description: 'A sleek and modern corporate website with a focus on user experience and brand storytelling.',
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Headless CMS'],
  },
  {
    id: 2,
    title: 'ShopSphere E-Commerce',
    category: ProjectCategory.ECOMMERCE,
    imageUrl: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    description: 'A feature-rich e-commerce platform with secure payments and inventory management.',
    techStack: ['React', 'Node.js', 'Stripe', 'PostgreSQL'],
  },
  {
    id: 3,
    title: 'SupportBot AI',
    category: ProjectCategory.AI,
    imageUrl: 'https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    description: 'An AI-powered customer support chatbot that reduced response times by 80%.',
    techStack: ['Python', 'Gemini API', 'React', 'WebSocket'],
  },
  {
    id: 4,
    title: 'SecureNet Firewall',
    category: ProjectCategory.CYBERSECURITY,
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    description: 'Implementation of a robust cybersecurity framework for a financial services client.',
    techStack: ['Firewall', 'IPS/IDS', 'SIEM', 'Penetration Testing'],
  },
  {
    id: 5,
    title: 'CreativeFolio',
    category: ProjectCategory.BUSINESS,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    description: 'A dynamic portfolio website for a leading design agency, featuring stunning animations.',
    techStack: ['React', 'Framer Motion', 'TypeScript'],
  },
  {
    id: 6,
    title: 'GadgetGalaxy Store',
    category: ProjectCategory.ECOMMERCE,
    imageUrl: 'https://images.unsplash.com/photo-1585160223126-12a3842b1263?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    description: 'An online store for electronics with advanced product filtering and comparison features.',
    techStack: ['Vue.js', 'Firebase', 'Algolia'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'BroTech Web Solutions transformed our online presence. Their team is professional, creative, and delivered beyond our expectations. Highly recommended!',
    author: 'Anjali Sharma',
    company: 'CEO of Innovate Corp',
  },
  {
    quote: 'The AI chatbot they integrated has been a game-changer for our customer support. It\'s efficient, smart, and our customers love it.',
    author: 'Rohan Verma',
    company: 'Head of Operations at ConnectAll',
  },
  {
    quote: 'Our e-commerce sales have doubled since launching the new website built by BroTech. The user experience is seamless and the design is top-notch.',
    author: 'Priya Mehta',
    company: 'Founder of StyleHub',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
    {
        question: "How long does it take to build a website?",
        answer: "The timeline for a website project varies depending on its complexity. A basic business website can take 4-6 weeks, while a complex e-commerce or AI-integrated site can take 2-4 months. We provide a detailed timeline after our initial consultation."
    },
    {
        question: "Do you provide website maintenance services?",
        answer: "Yes, we offer comprehensive maintenance plans that include regular backups, security monitoring, content updates, and performance optimization to ensure your website runs smoothly and securely."
    },
    {
        question: "Can you integrate an AI chatbot into my existing website?",
        answer: "Absolutely! We can integrate a custom-trained AI chatbot into your existing platform to enhance customer engagement and automate support, regardless of the technology it's built on."
    },
    {
        question: "What is your process for a new project?",
        answer: "Our process is collaborative and transparent. It starts with a discovery phase to understand your goals, followed by design, development, testing, and deployment. We maintain clear communication throughout the entire project lifecycle."
    },
    {
        question: "How do you ensure my website is secure?",
        answer: "Security is our top priority. We follow best practices, including implementing SSL, regular security audits, secure coding practices, and offering advanced cybersecurity packages to protect your site from vulnerabilities and attacks."
    }
];
