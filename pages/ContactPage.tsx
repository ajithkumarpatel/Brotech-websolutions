
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Section from '../components/Section';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { Mail, Phone, MapPin } from 'lucide-react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface SiteSettings {
  contactEmail?: string;
  phoneNumber?: string;
  address?: string;
}

const ContactPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<FormStatus>('idle');
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [settingsLoading, setSettingsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        // Pre-fill form from URL parameter
        const searchParams = new URLSearchParams(location.search);
        const plan = searchParams.get('plan');
        if (plan) {
            setSubject(`Inquiry about the "${plan}" plan`);
            setMessage(`Hello, I'm interested in learning more about the "${plan}" pricing plan.`);
        }
    }, [location.search]);

    useEffect(() => {
        // Fetch site settings
        const fetchSiteSettings = async () => {
            if (!db) {
                setSettingsLoading(false);
                return;
            }
            setSettingsLoading(true);
            try {
                const settingsDocRef = doc(db, 'settings', 'global');
                const docSnap = await getDoc(settingsDocRef);
                if (docSnap.exists()) {
                    setSettings(docSnap.data() as SiteSettings);
                }
            } catch (error) {
                if (error instanceof Error && error.message.includes("offline")) {
                     console.error("Error fetching site settings: Could not reach Firestore backend.", "Please check Firestore Security Rules for public read access to the 'settings' collection.");
                } else {
                    console.error("Error fetching site settings:", error);
                }
            } finally {
                setSettingsLoading(false);
            }
        };
        fetchSiteSettings();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!db) {
            console.error("Form submission failed: Firebase is not initialized.");
            setStatus('error');
            return;
        }
        setStatus('loading');
        try {
            await addDoc(collection(db, 'contacts'), {
                name,
                email,
                subject,
                message,
                createdAt: serverTimestamp(),
            });
            setStatus('success');
            // Clear form
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
        } catch (error) {
            console.error("Error adding document: ", error);
            setStatus('error');
        }
    };

    return (
        <div className="animate-fade-in-up">
            <section className="relative overflow-hidden text-white pt-48 pb-28 text-center">
                <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')` }}
                ></div>
                <div className="absolute inset-0 bg-dark-bg opacity-70"></div>
                <div className="relative z-10 container mx-auto px-4 md:px-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Get in Touch</h1>
                    <p className="text-lg text-light-text max-w-3xl mx-auto">
                        Have a project in mind or just want to say hello? We'd love to hear from you.
                    </p>
                </div>
            </section>
            
            <Section>
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white dark:bg-dark-card p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-2 border rounded-md dark:bg-dark-bg dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 border rounded-md dark:bg-dark-bg dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
                                <input type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)} required className="w-full px-4 py-2 border rounded-md dark:bg-dark-bg dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                                <textarea id="message" rows={5} value={message} onChange={e => setMessage(e.target.value)} required className="w-full px-4 py-2 border rounded-md dark:bg-dark-bg dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                            </div>
                            <button type="submit" disabled={status === 'loading'} className="w-full bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-hover transition-all duration-300 disabled:bg-primary/50 transform active:scale-95">
                                {status === 'loading' ? 'Sending...' : 'Send Message'}
                            </button>
                            {status === 'success' && <p className="text-green-500 mt-4">Message sent successfully! We'll get back to you soon.</p>}
                            {status === 'error' && <p className="text-red-500 mt-4">Something went wrong. Please try again later.</p>}
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <div className="space-y-8">
                             <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                             <div className="flex items-start gap-4">
                                <div className="bg-primary/10 text-primary p-3 rounded-full">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Our Office</h3>
                                    <p className="text-gray-600 dark:text-dark-text">{settingsLoading ? 'Loading...' : (settings?.address || 'Not available')}</p>
                                </div>
                             </div>
                             <div className="flex items-start gap-4">
                                 <div className="bg-primary/10 text-primary p-3 rounded-full">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Email Us</h3>
                                    {settingsLoading ? (
                                        <p className="text-gray-600 dark:text-dark-text">Loading...</p>
                                    ) : (
                                        settings?.contactEmail ? (
                                            <a href={`mailto:${settings.contactEmail}`} className="text-gray-600 dark:text-dark-text hover:text-primary">{settings.contactEmail}</a>
                                        ) : <p className="text-gray-600 dark:text-dark-text">Not available</p>
                                    )}
                                </div>
                             </div>
                             <div className="flex items-start gap-4">
                                 <div className="bg-primary/10 text-primary p-3 rounded-full">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Call Us</h3>
                                    <p className="text-gray-600 dark:text-dark-text">{settingsLoading ? 'Loading...' : (settings?.phoneNumber || 'Not available')}</p>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default ContactPage;