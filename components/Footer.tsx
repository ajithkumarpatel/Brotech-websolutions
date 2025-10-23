
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { Code2, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface SiteSettings {
  contactEmail?: string;
  address?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
}

const Footer: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      if (!db) {
        setLoading(false);
        return;
      }
      try {
        const settingsDocRef = doc(db, 'settings', 'global');
        const docSnap = await getDoc(settingsDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Make the component more robust to handle potential inconsistencies from the admin panel
          const normalizedSettings: SiteSettings = {
            contactEmail: data.contactEmail,
            address: data.address,
            githubUrl: data.githubUrl || data.github,
            linkedinUrl: data.linkedinUrl || data.linkedin,
            twitterUrl: data.twitterUrl || data.twitter,
            instagramUrl: data.instagramUrl || data.instagram,
          };
          setSettings(normalizedSettings);
        }
      } catch (error) {
        if (error instanceof Error && error.message.includes("offline")) {
            console.error("Error fetching site settings: Could not reach Firestore backend.", "This is a common deployment issue. Please check your Firebase project's Firestore Security Rules to ensure public read access is allowed for the 'settings' collection. Also, confirm that the Firestore database is created and active.");
        } else {
            console.error("Error fetching site settings:", error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSiteSettings();
  }, []);

  return (
    <footer className="bg-dark-bg text-dark-text border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white mb-4">
              <Code2 size={24} className="text-primary" />
              <span>BroTech</span>
            </Link>
            <p className="max-w-xs">
              Building powerful, secure, and intelligent web solutions to drive growth for your business.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg">Connect With Us</h4>
            {loading ? (
              <div className="space-y-3 animate-pulse">
                <div className="flex space-x-4">
                  <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                  <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                  <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                  <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                </div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              </div>
            ) : (
              <>
                <div className="flex space-x-4 mb-4">
                  {settings?.githubUrl && <a href={settings.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-primary transition-colors"><Github /></a>}
                  {settings?.linkedinUrl && <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary transition-colors"><Linkedin /></a>}
                  {settings?.twitterUrl && <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-primary transition-colors"><Twitter /></a>}
                  {settings?.instagramUrl && <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors"><Instagram /></a>}
                </div>
                {settings?.address && <p>{settings.address}</p>}
                {settings?.contactEmail && <a href={`mailto:${settings.contactEmail}`} className="hover:text-primary transition-colors">{settings.contactEmail}</a>}
              </>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} BroTech Web Solutions. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;