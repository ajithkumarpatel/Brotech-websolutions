import React from 'react';
import Section from '../components/Section';
import { SERVICES } from '../constants';
import { Link } from 'react-router-dom';

const ServiceCard: React.FC<{ service: typeof SERVICES[0] }> = ({ service }) => (
    <div className="bg-white dark:bg-dark-card p-8 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
        <div className="mb-6">{service.icon}</div>
        <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-light-text">{service.title}</h3>
        <p className="text-gray-600 dark:text-dark-text flex-grow mb-6">{service.description}</p>
        <Link to="/contact" className="mt-auto bg-primary text-white text-center px-6 py-2 rounded-md font-semibold hover:bg-primary-hover transition-all duration-300 self-start transform active:scale-95">
            Request a Quote
        </Link>
    </div>
);

const ServicesPage: React.FC = () => {
    return (
        <div className="animate-fade-in-up">
            <section className="relative overflow-hidden text-white pt-48 pb-28 text-center">
                <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')` }}
                ></div>
                <div className="absolute inset-0 bg-dark-bg opacity-70"></div>
                <div className="relative z-10 container mx-auto px-4 md:px-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Expertise</h1>
                    <p className="text-lg text-light-text max-w-3xl mx-auto">
                        We provide a wide range of services to empower your business in the digital landscape. From foundational web development to advanced AI and robust security, we've got you covered.
                    </p>
                </div>
            </section>
            
            <Section className="bg-gray-50 dark:bg-dark-bg">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SERVICES.map((service, index) => (
                        <ServiceCard key={index} service={service} />
                    ))}
                </div>
            </Section>
        </div>
    );
};

export default ServicesPage;