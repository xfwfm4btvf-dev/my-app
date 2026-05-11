"use client";

import { motion } from "framer-motion";
import { Post } from "../../../lib/posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React, { useState, useEffect, useMemo } from "react";
import TableOfContents from "../../../components/TableOfContents";
import { CodeBlock } from "../../../components/CodeBlock";

export default function PostContent({
  post,
  readingTime,
  prevPost,
  nextPost,
  relatedPosts,
}: {
  post: Post;
  readingTime: number;
  prevPost: Post | null;
  nextPost: Post | null;
  relatedPosts: Post[];
}) {
  const [readingProgress, setReadingProgress] = useState(0);

  // Strip the first H1 heading from content to avoid duplicate title rendering
  const contentWithoutH1 = useMemo(() => {
    const lines = post.content.split('\n');
    if (lines[0]?.match(/^#\s+/)) {
      return lines.slice(1).join('\n').trim();
    }
    return post.content;
  }, [post.content]);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      setReadingProgress(progress);
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60]">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-[width] duration-100 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Table of Contents Sidebar */}
      <TableOfContents content={contentWithoutH1} />

      <article className="relative py-20 px-6 z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <a href="/my-app/posts" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back to Posts
            </a>
            <div className="flex gap-2 mb-6">
              {post.tags.map((tag, i) => (
                <motion.span key={tag} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 * i }} className="text-sm px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30">{tag}</motion.span>
              ))}
            </div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">{post.title}</motion.h1>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-gray-500 mb-12 flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {readingTime} min read
              </span>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-12 overflow-hidden">
              <div className="relative prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-code:text-blue-300 prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-a:text-blue-400 prose-li:text-gray-300 prose-headings:scroll-mt-20">
                <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  pre: ({ children }) => <>{children}</>,
                  code: ({ className, children }) => (
                    <CodeBlock className={className}>{children}</CodeBlock>
                  ),
                }}
              >
                {contentWithoutH1}
              </ReactMarkdown>
              </div>
            </motion.div>
            {(prevPost || nextPost) && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                {prevPost ? (
                  <a href={`/my-app/posts/${prevPost.slug}`} className="group p-5 rounded-xl border border-white/10 bg-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all">
                    <span className="text-xs text-gray-500 flex items-center gap-1 mb-2"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>Previous</span>
                    <span className="text-white group-hover:text-blue-400 transition-colors font-medium">{prevPost.title}</span>
                  </a>
                ) : <div />}
                {nextPost ? (
                  <a href={`/my-app/posts/${nextPost.slug}`} className="group p-5 rounded-xl border border-white/10 bg-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all text-right">
                    <span className="text-xs text-gray-500 flex items-center gap-1 justify-end mb-2">Next<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></span>
                    <span className="text-white group-hover:text-blue-400 transition-colors font-medium">{nextPost.title}</span>
                  </a>
                ) : <div />}
              </motion.div>
            )}

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-16">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                  Related Posts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedPosts.map((related) => (
                    <a
                      key={related.slug}
                      href={`/my-app/posts/${related.slug}`}
                      className="group p-5 rounded-xl border border-white/10 bg-white/5 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all"
                    >
                      <div className="flex gap-2 mb-3">
                        {related.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">{tag}</span>
                        ))}
                      </div>
                      <h3 className="text-white group-hover:text-purple-400 transition-colors font-medium text-sm leading-snug">{related.title}</h3>
                      <p className="text-gray-500 text-xs mt-2">{related.date}</p>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </article>
    </div>
  );
}
