import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';

interface BlogPostCardProps {
  post: BlogPost;
}

const DEFAULT_BLOG_IMAGE_URL = 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80';


const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  const postDate = post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : 'Date not available';

  return (
    <Link to={`/blog/${post.slug}`} className="block bg-white dark:bg-dark-card rounded-lg shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <img loading="lazy" src={post.imageUrl || DEFAULT_BLOG_IMAGE_URL} alt={post.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
      <div className="p-6">
        <h3 className="text-xl font-bold mt-2 mb-3 text-gray-800 dark:text-light-text line-clamp-2">{post.title}</h3>
        <p className="text-gray-600 dark:text-dark-text mb-4 text-sm line-clamp-3">{post.excerpt}</p>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <span>By {post.author}</span> &bull; <span>{postDate}</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostCard;