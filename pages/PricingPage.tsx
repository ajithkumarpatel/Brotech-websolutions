
import React, { useState, useEffect } from 'react';
import Section from '../components/Section';
import { PricingPlan } from '../types';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import AdminSetupError from '../components/AdminSetupError';

const PricingCard: React.FC<{ plan: PricingPlan }> = ({ plan }) => (
    <div className={`relative bg-white dark:bg-dark-card p-8 rounded-lg shadow-lg border-2 transition-all duration-300 flex flex-col ${plan.isPopular ? 'border-primary md:scale-105' : 'border-transparent'}`}>
        {plan.isPopular && (
            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
            </div>
        )}
        <h3 className="text-2xl font-bold text-center mb-2 text-gray-800 dark:text-light-text">{plan.title}</h3>
        <p className="text-center text-gray-600 dark:text-dark-text mb-6 font-semibold">{plan.price}</p>
        
        <ul className="space-y-4 mb-8 flex-grow">
            {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-600 dark:text-dark-text">{feature}</span>
                </li>
            ))}
        </ul>

        <Link to={`/contact?plan=${encodeURIComponent(plan.title)}`} className="mt-auto w-full block bg-primary text-white text-center px-6 py-3 rounded-md font-semibold hover:bg-primary-hover transition-all duration-300 transform active:scale-95">
            Choose Plan
        </Link>
    </div>
);

const PricingSkeletonCard: React.FC = () => (
    <div className="bg-white dark:bg-dark-card p-8 rounded-lg shadow-lg animate-pulse">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mx-auto mb-8"></div>
        <div className="space-y-4 mb-8">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start">
                    <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 flex-shrink-0 mt-1"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                </div>
            ))}
        </div>
        <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded w-full mt-auto"></div>
    </div>
);


const PricingPage: React.FC = () => {
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isConfigError, setIsConfigError] = useState(false);

    useEffect(() => {
        const fetchPlans = async () => {
            if (!db) {
                setIsConfigError(true);
                setLoading(false);
                return;
            }
            try {
                const plansCollectionRef = collection(db, 'pricingPlans');
                const querySnapshot = await getDocs(plansCollectionRef);
                const fetchedPlans = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    // Ensure features is an array of strings
                    const features = Array.isArray(data.features) ? data.features : (typeof data.features === 'string' ? data.features.split('\n') : []);
                    return {
                        ...data,
                        features
                    } as PricingPlan;
                });
                setPlans(fetchedPlans);
            } catch (err: any) {
                console.error("Error fetching pricing plans: ", err);
                if (err.message && err.message.includes("offline")) {
                    setError('Could not connect to the database. This may be due to a configuration issue. (Admin: Please check your Firestore security rules).');
                } else {
                    setError('Failed to load pricing plans. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    return (
        <div className="animate-fade-in-up">
            <section className="relative overflow-hidden text-white pt-48 pb-28 text-center">
                <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')` }}
                ></div>
                <div className="absolute inset-0 bg-dark-bg opacity-70"></div>
                <div className="relative z-10 container mx-auto px-4 md:px-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Transparent Pricing</h1>
                    <p className="text-lg text-light-text max-w-3xl mx-auto">
                        Choose a plan that fits your needs. No hidden fees, just pure value and exceptional service.
                    </p>
                </div>
            </section>
            
            <Section className="bg-gray-50 dark:bg-dark-bg">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    {loading ? (
                        [...Array(3)].map((_, i) => <PricingSkeletonCard key={i} />)
                    ) : isConfigError ? (
                        <AdminSetupError />
                    ) : error ? (
                        <p className="text-center text-red-500 col-span-full">{error}</p>
                    ) : plans.length === 0 ? (
                        <p className="text-center text-gray-600 dark:text-dark-text col-span-full">No pricing plans available at the moment. Please check back later.</p>
                    ) : (
                        plans.map((plan, index) => (
                            <PricingCard key={index} plan={plan} />
                        ))
                    )}
                </div>
            </Section>
        </div>
    );
};

export default PricingPage;
