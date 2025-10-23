import React, { useState, useMemo } from 'react';
import Section from '../components/Section';
import { PROJECTS } from '../constants';
import { Project, ProjectCategory } from '../types';
import ProjectModal from '../components/ProjectModal';

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => (
    <div onClick={onClick} className="cursor-pointer bg-white dark:bg-dark-card rounded-lg shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        <img loading="lazy" src={project.imageUrl} alt={project.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="p-6">
            <span className="text-sm font-semibold text-primary">{project.category}</span>
            <h3 className="text-xl font-bold mt-2 mb-3 text-gray-800 dark:text-light-text">{project.title}</h3>
            <p className="text-gray-600 dark:text-dark-text mb-4 text-sm line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-2">
                {project.techStack.slice(0, 3).map(tech => (
                    <span key={tech} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium">{tech}</span>
                ))}
            </div>
        </div>
    </div>
);

const PortfolioPage: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'All'>('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filters: (ProjectCategory | 'All')[] = ['All', ...Object.values(ProjectCategory)];

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'All') return PROJECTS;
        return PROJECTS.filter(project => project.category === activeFilter);
    }, [activeFilter]);

    const openModal = (project: Project) => setSelectedProject(project);
    const closeModal = () => setSelectedProject(null);

    return (
        <div className="animate-fade-in-up">
            <section className="relative overflow-hidden text-white pt-48 pb-28 text-center">
                <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')` }}
                ></div>
                <div className="absolute inset-0 bg-dark-bg opacity-70"></div>
                <div className="relative z-10 container mx-auto px-4 md:px-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Work</h1>
                    <p className="text-lg text-light-text max-w-3xl mx-auto">
                        We take pride in our work. Explore a selection of our projects that showcase our commitment to quality, innovation, and client success.
                    </p>
                </div>
            </section>

            <Section>
                <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
                    {filters.map(filter => (
                        <button 
                            key={filter} 
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 transform active:scale-95 ${activeFilter === filter ? 'bg-primary text-white shadow-md' : 'bg-gray-200 dark:bg-dark-card text-gray-700 dark:text-gray-300 hover:bg-primary/80 dark:hover:text-white hover:text-white'}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map(project => (
                        <ProjectCard key={project.id} project={project} onClick={() => openModal(project)} />
                    ))}
                </div>
            </Section>

            {selectedProject && <ProjectModal project={selectedProject} onClose={closeModal} />}
        </div>
    );
};

export default PortfolioPage;
