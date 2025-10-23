
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { BlogPost } from '../types';
import Section from '../components/Section';
import LoadingSpinner from '../components/LoadingSpinner';
import FirestoreIndexError from '../components/FirestoreIndexError';
import AdminSetupError from '../components/AdminSetupError';

const proseStyles = `
.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  color: inherit;
  font-weight: 700;
  margin-top: 2em;
  margin-bottom: 1em;
}
.prose p {
  line-height: 1.75;
  margin-bottom: 1.25em;
}
.prose a {
  color: #4f46e5;
  text-decoration: underline;
}
.prose blockquote {
  border-left: 4px solid #c7d2fe;
  padding-left: 1rem;
  font-style: italic;
  color: #6b7280;
}
.dark .prose blockquote {
    border-left-color: #4f46e5;
    color: #9ca3af;
}
.prose ul, .prose ol {
  margin-left: 1.5rem;
  margin-bottom: 1.25em;
}
.prose li {
  margin-bottom: 0.5em;
}
.prose code {
    background-color: #e5e7eb;
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-size: 0.9em;
}
.dark .prose code {
    background-color: #374151;
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = proseStyles;
document.head.appendChild(styleSheet);

const DEFAULT_BLOG_IMAGE_URL = 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80';


const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isConfigError, setIsConfigError] = useState(false);
    const [diagnosticInfo, setDiagnosticInfo] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) {
                setError("Post slug not found in URL.");
                setLoading(false);
                return;
            }

            if (!db) {
                setIsConfigError(true);
                setLoading(false);
                return;
            }

            try {
                const postsCollectionRef = collection(db, 'blogPosts');
                const q = query(
                    postsCollectionRef,
                    where('slug', '==', slug),
                    where('status', '==', 'published'),
                    limit(1)
                );
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    // ** Diagnostic Check **
                    // If the published post is not found, let's see if a post with that slug exists at all.
                    const diagnosticQuery = query(postsCollectionRef, where('slug', '==', slug), limit(1));
                    const diagnosticSnapshot = await getDocs(diagnosticQuery);

                    if (!diagnosticSnapshot.empty) {
                        const draftPost = diagnosticSnapshot.docs[0].data();
                        // Provide a specific, actionable error message to the admin.
                        setDiagnosticInfo(`A post with this slug was found, but it is not published. Its current status in the database is: "${draftPost.status}". Please change it to the lowercase string "published".`);
                    }
                    setPost(null);
                } else {
                    const doc = querySnapshot.docs[0];
                    const postData = { id: doc.id, ...doc.data() } as BlogPost;
                    setPost(postData);
                }
            } catch (err: any) {
                console.error("Error fetching post:", err);
                if (err.message && err.message.includes("offline")) {
                    setError("Could not connect to the database. This may be due to a configuration issue. (Admin: Please check your Firestore security rules).");
                } else {
                    setError(err.message || 'Failed to load the post. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (loading) {
        return <div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>;
    }
    
    if (isConfigError) {
        return (
            <div className="container mx-auto px-4 md:px-8 py-20 pt-32">
                <AdminSetupError />
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center p-4">
                {error.includes("index") ? (
                    <FirestoreIndexError errorMessage={error} />
                ) : (
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-red-500 mb-4">Error</h1>
                        <p className="text-lg text-gray-600 dark:text-dark-text">{error}</p>
                    </div>
                )}
            </div>
        );
    }

    if (!post) {
        return (
             <div className="h-screen flex items-center justify-center text-center p-4">
                <div>
                    <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
                    <p className="text-lg text-gray-600 dark:text-dark-text max-w-2xl mx-auto">
                        {diagnosticInfo ? 'We found a problem with this post:' : 'The post you are looking for does not exist or has not been published yet.'}
                    </p>
                    
                    {diagnosticInfo && (
                        <div className="mt-6 text-lg font-semibold bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 p-4 rounded-md max-w-3xl mx-auto">
                           {diagnosticInfo}
                        </div>
                    )}
                    
                    <div className="mt-8 bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-lg p-6 max-w-3xl mx-auto text-left">
                        <h4 className="font-bold text-gray-800 dark:text-light-text mb-2">Troubleshooting Guide</h4>
                         <div className="grid md:grid-cols-2 gap-x-6 gap-y-4 mt-4 text-sm">
                            <div>
                                <h5 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">1. Check the `slug` field:</h5>
                                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-dark-text">
                                    <li>Must <strong>exactly</strong> match the URL.</li>
                                    <li>No leading/trailing spaces.</li>
                                    <li>Should be all lowercase.</li>
                                    <li><strong>Example:</strong> `my-first-post`</li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">2. Check the `status` field:</h5>
                                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-dark-text">
                                    <li>Must be the lowercase string <code className="bg-gray-200 dark:bg-gray-600 px-1 py-0.5 rounded text-xs">'published'</code>.</li>
                                    <li className="text-red-600 dark:text-red-400">Incorrect: <code className="bg-red-100 dark:bg-red-900/50 px-1 py-0.5 rounded text-xs">'Published'</code></li>
                                </ul>
                            </div>
                        </div>
                         <div className="mt-4 pt-4 border-t dark:border-gray-600">
                             <h5 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">3. Check the `imageUrl` field:</h5>
                             <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-dark-text text-sm">
                                 <li>The field must exist and contain a valid, publicly accessible URL to an image.</li>
                                 <li>If the field is missing, a default placeholder image will be used.</li>
                             </ul>
                         </div>
                    </div>
                </div>
            </div>
        );
    }

    const postDate = post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }) : 'Date not available';

    return (
        <div className="animate-fade-in-up pt-20">
            <div className="relative w-full h-64 md:h-96">
                <img src={post.imageUrl || DEFAULT_BLOG_IMAGE_URL} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60"></div>
            </div>
            <Section>
                <article className="max-w-3xl mx-auto">
                    <header className="mb-8 text-center border-b pb-8 dark:border-gray-700">
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-800 dark:text-light-text">{post.title}</h1>
                        <div className="text-md text-gray-500 dark:text-gray-400">
                            <span>By {post.author}</span> &bull; <span>{postDate}</span>
                        </div>
                    </header>
                    <div
                        className="prose dark:prose-invert lg:prose-xl max-w-none text-gray-700 dark:text-gray-300"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>
            </Section>
        </div>
    );
};

export default BlogPostPage;
