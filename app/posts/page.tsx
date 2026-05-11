"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { posts, getAllTags } from "../../lib/posts";

export default function PostsPage() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
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

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </motion.div>

        {/* Tag Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8 flex flex-wrap gap-2"
        >
          <button
            onClick={() => setSelectedTag(null)}
            className={`text-sm px-3 py-1.5 rounded-full transition-all ${
              !selectedTag
                ? "bg-blue-500 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`text-sm px-3 py-1.5 rounded-full transition-all ${
                selectedTag === tag
                  ? "bg-purple-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Results Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-sm mb-6"
        >
          {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}{" "}
          {search || selectedTag ? "found" : "total"}
        </motion.p>

        {/* Post List */}
        <AnimatePresence mode="popLayout">
          <div className="space-y-6">
            {filteredPosts.map((post, i) => (
              <motion.a
                key={post.slug}
                href={`/posts/${post.slug}`}
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
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-400">{post.excerpt}</p>
                  </div>
                  <span className="text-gray-500 text-sm whitespace-nowrap ml-4">
                    {post.date}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 text-lg mb-2">No posts found</p>
            <p className="text-gray-600">
              Try a different search term or tag filter
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
