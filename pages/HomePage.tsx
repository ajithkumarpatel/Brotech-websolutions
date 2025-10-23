
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import { SERVICES, TESTIMONIALS } from '../constants';
import { ArrowRight, ChevronLeft, ChevronRight, Users, Zap, Award } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Defines the data structure for the impact numbers
interface ImpactNumbers {
    projectsCompleted: number;
    happyClients: number;
    yearsOfExperience: number;
}

// Default values to display if Firestore data is unavailable
const DEFAULT_IMPACT_NUMBERS: ImpactNumbers = {
    projectsCompleted: 2,
    happyClients: 10,
    yearsOfExperience: 2,
};


const HomePage: React.FC = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    
    // State to hold the dynamic impact numbers fetched from the database, starts as null for loading state
    const [impactNumbers, setImpactNumbers] = useState<ImpactNumbers | null>(null);

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    };

    useEffect(() => {
        const timer = setTimeout(nextTestimonial, 5000);
        return () => clearTimeout(timer);
    }, [currentTestimonial]);

    // Fetches the impact numbers from Firestore when the component mounts
    useEffect(() => {
        const fetchImpactNumbers = async () => {
            // If Firebase isn't set up or fails, use default values.
            if (!db) {
                console.warn("Firebase not initialized. Using default impact numbers.");
                setImpactNumbers(DEFAULT_IMPACT_NUMBERS);
                return;
            }
            try {
                const settingsDocRef = doc(db, 'settings', 'global');
                const docSnap = await getDoc(settingsDocRef);
                if (docSnap.exists() && docSnap.data().impactNumbers) {
                    setImpactNumbers(docSnap.data().impactNumbers as ImpactNumbers);
                } else {
                    // If the document or field doesn't exist, fall back to defaults.
                    console.warn("Impact numbers document not found in Firestore. Using default values.");
                    setImpactNumbers(DEFAULT_IMPACT_NUMBERS);
                }
            } catch (error) {
                if (error instanceof Error && error.message.includes("offline")) {
                    console.error("Error fetching impact numbers: Could not reach Firestore backend.", "This is a common deployment issue. Please check your Firebase project's Firestore Security Rules to ensure public read access is allowed for the 'settings' collection. Also, confirm that the Firestore database is created and active.", "Falling back to default values.");
                } else {
                    console.error("Error fetching impact numbers, using default values:", error);
                }
                // In case of any error, fall back to defaults.
                setImpactNumbers(DEFAULT_IMPACT_NUMBERS);
            }
        };

        fetchImpactNumbers();
    }, []);

    // Helper to render skeleton loaders while data is being fetched.
    const renderImpactCounters = () => {
        if (!impactNumbers) {
            return (
                <>
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="text-center p-4 animate-pulse">
                            <div className="mb-2 h-10 w-10 bg-gray-700 rounded-full mx-auto"></div>
                            <div className="h-12 bg-gray-700 rounded w-1/4 mx-auto mt-2"></div>
                            <div className="h-6 bg-gray-700 rounded w-1/2 mx-auto mt-3"></div>
                        </div>
                    ))}
                </>
            );
        }

        return (
            <>
                <AnimatedCounter icon={<Zap size={40} className="mx-auto text-primary" />} target={impactNumbers.projectsCompleted} label="Projects Completed" />
                <AnimatedCounter icon={<Users size={40} className="mx-auto text-primary" />} target={impactNumbers.happyClients} label="Happy Clients" />
                <AnimatedCounter icon={<Award size={40} className="mx-auto text-primary" />} target={impactNumbers.yearsOfExperience} label="Years of Experience" />
            </>
        );
    };

    return (
        <div className="animate-fade-in-up">
            {/* Hero Section */}
            <div className="relative h-screen flex items-center justify-center text-center overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full bg-dark-bg/70 z-10"></div>
                 <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center animate-kenburns" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')` }}></div>
                 <div className="relative z-20 px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">Your Vision, Our Code</h1>
                    <p className="text-lg md:text-xl text-light-text max-w-3xl mx-auto mb-8">
                        We build powerful, secure, and intelligent web solutions that drive growth. From stunning websites to advanced AI integrations, we bring your ideas to life.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact" className="bg-primary text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-primary-hover transition-all duration-200 transform hover:-translate-y-1 active:scale-95">
                            Get Started
                        </Link>
                        <Link to="/portfolio" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-white hover:text-primary transition-all duration-200 transform hover:-translate-y-1 active:scale-95">
                            View Portfolio
                        </Link>
                    </div>
                </div>
            </div>

            {/* Services Overview */}
            <Section id="services">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">Our Services</h2>
                <p className="text-center text-gray-600 dark:text-dark-text max-w-2xl mx-auto mb-12">We offer a comprehensive suite of services to meet all your digital needs.</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SERVICES.slice(0, 6).map((service, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-dark-card p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                            <div className="mb-4">{service.icon}</div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-light-text">{service.title}</h3>
                            <p className="text-gray-600 dark:text-dark-text">{service.description}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link to="/services" className="text-primary font-semibold hover:underline flex items-center justify-center gap-2">
                        View All Services <ArrowRight size={20} />
                    </Link>
                </div>
            </Section>

            {/* Our Impact Section - Now with dynamic data */}
            <Section id="impact" className="bg-dark-bg text-white">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-light-text">Our Impact in Numbers</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
                    {renderImpactCounters()}
                </div>
            </Section>

            {/* Testimonials */}
            <Section id="testimonials" className="bg-gray-50 dark:bg-dark-card">
                 <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
                 <div className="relative max-w-3xl mx-auto">
                    <div className="overflow-hidden relative h-48">
                        {TESTIMONIALS.map((testimonial, index) => (
                            <div key={index} className={`absolute w-full text-center transition-opacity duration-500 ease-in-out ${index === currentTestimonial ? 'opacity-100' : 'opacity-0'}`}>
                                <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">"{testimonial.quote}"</p>
                                <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.author}</h4>
                                <p className="text-sm text-primary">{testimonial.company}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={prevTestimonial} className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition" aria-label="Previous testimonial">
                        <ChevronLeft />
                    </button>
                    <button onClick={nextTestimonial} className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition" aria-label="Next testimonial">
                        <ChevronRight />
                    </button>
                 </div>
            </Section>
        </div>
    );
};

export default HomePage;