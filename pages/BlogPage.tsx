
import React from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { BlogPost } from '../types';
import Section from '../components/Section';
import BlogPostCard from '../components/BlogPostCard';
import { Info } from 'lucide-react';
import FirestoreIndexError from '../components/FirestoreIndexError';

const BlogPage: React.FC = () => {
    const [posts, setPosts] = React.useState<BlogPost[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchPosts = async () => {
            if (!db) {
                setError("Could not connect to the database to fetch blog posts. Please ensure the API key is configured correctly.");
                setLoading(false);
                return;
            }
            try {
                const postsCollectionRef = collection(db, 'blogPosts');
                // Query without server-side ordering to avoid needing a composite index.
                const q = query(
                    postsCollectionRef, 
                    where('status', '==', 'published')
                );
                const querySnapshot = await getDocs(q);
                let fetchedPosts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as BlogPost));

                // Sort posts on the client-side by creation date, newest first.
                fetchedPosts.sort((a, b) => {
                    const dateA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
                    const dateB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
                    return dateB - dateA;
                });

                setPosts(fetchedPosts);
            } catch (err: any) {
                console.error("Error fetching blog posts:", err);
                if (err.message && err.message.includes("offline")) {
                    setError("Could not connect to the database. This may be due to a configuration issue. (Admin: Please check your Firestore security rules).");
                } else {
                    setError(err.message || 'An unknown error occurred while fetching posts.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const BlogSkeletonCard = () => (
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-lg overflow-hidden animate-pulse">
            <div className="w-full h-56 bg-gray-300 dark:bg-gray-600"></div>
            <div className="p-6">
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-4"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
            </div>
        </div>
    );

    const NoPostsMessage = () => (
        <div className="text-center text-gray-600 dark:text-dark-text col-span-full">
            <p className="mb-8">No blog posts found. Check back soon!</p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 rounded-lg p-6 max-w-2xl mx-auto text-left">
                <div className="flex items-start">
                    <Info className="w-6 h-6 text-blue-500 mr-4 flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Note for Site Admin</h4>
                        <p className="text-sm text-blue-700 dark:text-blue-400">
                            If you've recently added a post and don't see it here, please ensure its <strong className="font-semibold">status</strong> is set to <code className="bg-blue-200 dark:bg-blue-800/50 px-1 py-0.5 rounded text-xs">'published'</code> in your admin panel or Firestore database. Only published posts are visible on the website.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        if (loading) {
            return [...Array(3)].map((_, i) => <BlogSkeletonCard key={i} />);
        }

        if (error) {
            if (error.includes("index")) {
                return <FirestoreIndexError errorMessage={error} />;
            }
            return <p className="text-center text-red-500 col-span-full">{`Error: ${error}`}</p>;
        }

        if (posts.length === 0) {
            return <NoPostsMessage />;
        }

        return posts.map(post => <BlogPostCard key={post.id} post={post} />);
    };

    return (
        <div className="animate-fade-in-up">
            <section className="relative overflow-hidden text-white pt-48 pb-28 text-center">
                <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')` }}
                ></div>
                <div className="absolute inset-0 bg-dark-bg opacity-70"></div>
                <div className="relative z-10 container mx-auto px-4 md:px-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">BroTech Insights</h1>
                    <p className="text-lg text-light-text max-w-3xl mx-auto">
                        Stay updated with the latest in web development, AI, and cybersecurity from our team of experts.
                    </p>
                </div>
            </section>

            <Section>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {renderContent()}
                </div>
            </Section>
        </div>
    );
};

export default BlogPage;