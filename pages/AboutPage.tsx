import React, { useState } from 'react';
import Section from '../components/Section';
import { FAQ_ITEMS } from '../constants';
import { FaqItem } from '../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FaqAccordionItem: React.FC<{ item: FaqItem }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 dark:border-gray-700 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left"
            >
                <h4 className="font-semibold text-lg">{item.question}</h4>
                {isOpen ? <ChevronUp /> : <ChevronDown />}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                <p className="text-gray-600 dark:text-dark-text">{item.answer}</p>
            </div>
        </div>
    );
};


const AboutPage: React.FC = () => {
    return (
        <div className="animate-fade-in-up">
            <section className="relative overflow-hidden text-white pt-48 pb-28 text-center">
                <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')` }}
                ></div>
                <div className="absolute inset-0 bg-dark-bg opacity-70"></div>
                <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About BroTech Web Solutions</h1>
                    <p className="text-lg text-light-text">
                        We are a passionate team of developers, designers, and strategists based in Telangana, India, dedicated to building the future of the web.
                    </p>
                </div>
            </section>

            <Section className="bg-gray-50 dark:bg-dark-card">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                        <p className="text-gray-600 dark:text-dark-text mb-4">
                            Our mission is to empower businesses by creating exceptional digital experiences. We combine innovative technology with user-centric design to deliver solutions that are not only visually stunning but also highly functional, secure, and scalable.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                        <p className="text-gray-600 dark:text-dark-text">
                            We envision a digital world where technology is accessible and works for everyone. We strive to be at the forefront of web development, AI, and cybersecurity, helping our clients navigate the complexities of the digital landscape and achieve sustainable growth.
                        </p>
                    </div>
                </div>
            </Section>
            
            <Section id="faq" className="bg-gray-50 dark:bg-dark-card">
                 <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                 <div className="max-w-3xl mx-auto">
                    {FAQ_ITEMS.map((item, index) => (
                        <FaqAccordionItem key={index} item={item} />
                    ))}
                 </div>
            </Section>

        </div>
    );
};

export default AboutPage;