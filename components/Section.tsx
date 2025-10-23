
import React, { ReactNode } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = '', id }) => {
  const sectionRef = useScrollAnimation<HTMLDivElement>();

  return (
    <section 
      id={id} 
      ref={sectionRef} 
      className={`py-16 md:py-24 fade-in-section ${className}`}
    >
      <div className="container mx-auto px-4 md:px-8">
        {children}
      </div>
    </section>
  );
};

export default Section;
