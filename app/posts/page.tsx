"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { posts, getAllTags } from "../../lib/posts";

const POSTS_PER_PAGE = 8;

export default function PostsPage() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const allTags = useMemo(() => getAllTags(), []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        search === "" ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase());
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [search, selectedTag]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };
  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }, [currentPage, totalPages]);

  const tagButtonClass = (isActive: boolean) =>
    `text-sm px-3 py-1.5 rounded-full transition-all ${
      isActive
        ? "bg-blue-500 text-white"
        : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
    }`;

  const pageButtonClass = (isActive: boolean) =>
    `w-10 h-10 rounded-lg transition-all ${
      isActive
        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold"
        : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          All Posts
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
            />
            {search && (
              <button onClick={() => handleSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">{"✕"}</button>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8 flex flex-wrap gap-2"
        >
          <button onClick={() => handleTagSelect(null)} className={tagButtonClass(!selectedTag)}>All</button>
          {allTags.map((tag) => (
            <button key={tag} onClick={() => handleTagSelect(selectedTag === tag ? null : tag)} className={tagButtonClass(selectedTag === tag)}>{tag}</button>
          ))}
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gray-500 text-sm mb-6">
          {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"} {search || selectedTag ? "found" : "total"}
          {totalPages > 1 && ` · Page ${currentPage} of ${totalPages}`}
        </motion.p>

        <AnimatePresence mode="popLayout">
          <div className="space-y-6">
            {paginatedPosts.map((post, i) => (
              <motion.a
                key={post.slug}
                href={`/my-app/posts/${post.slug}`}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: 0.05 * i, duration: 0.3 }}
                className="block group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 hover:border-blue-500/50 transition-all"
                whileHover={{ x: 10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex justify-between items-start">
                  <div>
                    <div className="flex gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">{tag}</span>
                      ))}
                    </div>
                    <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">{post.title}</h2>
                    <p className="text-gray-400">{post.excerpt}</p>
                  </div>
                  <span className="text-gray-500 text-sm whitespace-nowrap ml-4">{post.date}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </AnimatePresence>

        {totalPages > 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-12 flex items-center justify-center gap-2">
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed">{"← Prev"}</button>
            {pageNumbers.map((page, i) =>
              typeof page === "string" ? (
                <span key={`e-${i}`} className="px-2 text-gray-600">...</span>
              ) : (
                <button key={page} onClick={() => setCurrentPage(page)} className={pageButtonClass(currentPage === page)}>{page}</button>
              )
            )}
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed">{"Next →"}</button>
          </motion.div>
        )}

        {filteredPosts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="text-gray-500 text-lg mb-2">No posts found</p>
            <p className="text-gray-600">Try a different search term or tag filter</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
