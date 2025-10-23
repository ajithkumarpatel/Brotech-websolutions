import React, { useEffect } from 'react';
import { Project } from '../types';
import { X } from 'lucide-react';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4 animate-fade-in-up"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white dark:bg-dark-card rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white z-10"
          aria-label="Close project details"
        >
          <X size={24} />
        </button>
        
        <img src={project.imageUrl} alt={project.title} className="w-full h-64 object-cover rounded-t-lg" />
        
        <div className="p-8">
          <span className="text-sm font-semibold text-primary">{project.category}</span>
          <h2 className="text-3xl font-bold mt-2 mb-4 text-gray-800 dark:text-light-text">{project.title}</h2>
          <p className="text-gray-600 dark:text-dark-text mb-6">{project.description}</p>
          
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-light-text">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map(tech => (
              <span key={tech} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
