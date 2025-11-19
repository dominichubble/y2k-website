import { motion } from 'framer-motion';
import 'highlight.js/styles/github-dark.css';
import { ArrowRight, BookOpen, Calendar, Clock, Tag } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { COLORS } from '../constants';
import blogData from '../data/blog.json';
import type { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
  onReadMore: (post: BlogPost) => void;
  index: number;
}

function BlogCard({ post, onReadMore, index }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-black/40 border transition-all hover:bg-black/60 group"
      style={{ borderColor: `${COLORS.primary}40` }}
    >
      {/* Category Badge */}
      <div className="p-4 border-b" style={{ borderColor: `${COLORS.primary}20` }}>
        <span 
          className="inline-block px-3 py-1 text-xs font-mono font-bold uppercase border"
          style={{ 
            borderColor: COLORS.accent,
            color: COLORS.accent,
            backgroundColor: `${COLORS.accent}10`
          }}
        >
          {post.category}
        </span>
      </div>

      <div className="p-6">
        {/* Title */}
        <h2 
          className="text-xl md:text-2xl font-bold mb-3 group-hover:text-white transition-colors"
          style={{ color: COLORS.primary }}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
          {post.excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {post.readTime}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs font-mono border"
              style={{ 
                borderColor: `${COLORS.primary}40`,
                color: COLORS.primary,
                backgroundColor: `${COLORS.primary}05`
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Read More Button */}
        <button
          onClick={() => onReadMore(post)}
          className="flex items-center gap-2 text-sm font-mono font-bold transition-all group/btn"
          style={{ color: COLORS.accent }}
        >
          <span>READ MORE</span>
          <ArrowRight 
            size={16} 
            className="transition-transform group-hover/btn:translate-x-1"
          />
        </button>
      </div>
    </motion.article>
  );
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const posts = blogData.posts.filter(post => post.published);
  const categories = ['All', ...new Set(posts.map(post => post.category))];

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
  };

  const handleBack = () => {
    setSelectedPost(null);
  };

  if (selectedPost) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="p-6 md:p-12 max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleBack}
            className="flex items-center gap-2 mb-6 text-sm font-mono font-bold hover:translate-x-[-4px] transition-transform"
            style={{ color: COLORS.primary }}
          >
            <ArrowRight size={16} className="rotate-180" />
            BACK TO ARTICLES
          </motion.button>

          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <div className="mb-8">
              <span 
                className="inline-block px-3 py-1 text-xs font-mono font-bold uppercase border mb-4"
                style={{ 
                  borderColor: COLORS.accent,
                  color: COLORS.accent,
                  backgroundColor: `${COLORS.accent}10`
                }}
              >
                {selectedPost.category}
              </span>

              <h1 
                className="text-3xl md:text-5xl font-black mb-4 y2k-chrome-text"
              >
                {selectedPost.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {new Date(selectedPost.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {selectedPost.readTime}
                </span>
                <span className="flex items-center gap-2">
                  <Tag size={16} />
                  {selectedPost.tags.join(', ')}
                </span>
              </div>

              <div 
                className="h-px mb-8"
                style={{ backgroundColor: `${COLORS.primary}30` }}
              />
            </div>

            {/* Article Content */}
            <div className="markdown-content text-gray-300 leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({ children }) => (
                    <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4" style={{ color: COLORS.primary }}>
                      {children}
                    </h2>
                  ),
                  h2: ({ children }) => (
                    <h3 className="text-xl md:text-2xl font-bold mt-6 mb-3" style={{ color: COLORS.primary }}>
                      {children}
                    </h3>
                  ),
                  h3: ({ children }) => (
                    <h4 className="text-lg md:text-xl font-bold mt-4 mb-2" style={{ color: COLORS.secondary }}>
                      {children}
                    </h4>
                  ),
                  p: ({ children }) => (
                    <p className="my-4">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 my-4">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 my-4">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-300">{children}</li>
                  ),
                  code: ({ inline, children }: { inline?: boolean; children?: React.ReactNode }) => 
                    inline ? (
                      <code 
                        className="px-2 py-1 font-mono text-sm border"
                        style={{ 
                          borderColor: `${COLORS.accent}40`,
                          color: COLORS.accent,
                          backgroundColor: `${COLORS.accent}10`
                        }}
                      >
                        {children}
                      </code>
                    ) : (
                      <code>{children}</code>
                    ),
                  pre: ({ children }) => (
                    <pre 
                      className="bg-black/60 border p-4 overflow-x-auto my-4 rounded"
                      style={{ borderColor: `${COLORS.primary}40` }}
                    >
                      {children}
                    </pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote 
                      className="border-l-4 pl-4 my-4 italic"
                      style={{ borderColor: COLORS.accent }}
                    >
                      {children}
                    </blockquote>
                  ),
                  a: ({ href, children }) => (
                    <a 
                      href={href}
                      className="underline hover:no-underline transition-all"
                      style={{ color: COLORS.accent }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold" style={{ color: COLORS.primary }}>
                      {children}
                    </strong>
                  ),
                }}
              >
                {selectedPost.content}
              </ReactMarkdown>
            </div>
          </motion.article>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 md:p-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <BookOpen 
              size={48} 
              style={{ color: COLORS.primary }}
              className="animate-pulse"
            />
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-black y2k-chrome-text mb-4">
            BLOG & ARTICLES
          </h1>
          <p className="text-gray-400 font-mono text-sm md:text-base">
            ✩｡⋆ Thoughts on Development, Career & Tech ⋆｡✩
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-2 mb-8 flex-wrap"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 font-mono text-xs md:text-sm font-bold transition-all border ${
                selectedCategory === category
                  ? 'text-black'
                  : 'bg-black/40 hover:bg-black/60'
              }`}
              style={selectedCategory === category ? {
                backgroundColor: COLORS.primary,
                borderColor: COLORS.primary,
              } : {
                borderColor: `${COLORS.primary}40`,
                color: COLORS.primary,
              }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post, index) => (
            <BlogCard 
              key={post.id} 
              post={post} 
              onReadMore={handleReadMore}
              index={index}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 font-mono">
              No articles found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
