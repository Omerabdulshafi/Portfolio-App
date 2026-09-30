import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../api';
import ReactMarkdown from 'react-markdown';
import legacyBlogs from '../data/blogs';

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const localBlog = legacyBlogs.find(blog => blog._id === id);
      if (localBlog) {
        setBlog(localBlog);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`/api/blogs/${id}`);
        setBlog(response.data);
      } catch (err) {
        setError('Failed to load blog post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  if (!blog) return <div className="flex items-center justify-center min-h-screen text-gray-400">Blog post not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link to="/blog" className="text-purple-400 hover:text-purple-300 mb-8 block">
          ← Back to Blog
        </Link>
        
        <article>
          <h1 className="text-5xl font-bold mb-4">{blog.title}</h1>
          
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
