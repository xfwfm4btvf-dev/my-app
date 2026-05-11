"use client";

import { motion } from "framer-motion";
import { getAllTags, getPostsByTag } from "@/lib/posts";

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="text-5xl font-bold mb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Tags
        </motion.h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tags.map((tag, i) => {
            const tagPosts = getPostsByTag(tag);
            return (
              <motion.div
                key={tag}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-purple-500/50 transition-all"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ scale: 1.02 }}
              >
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {tag}
                </h2>
                <p className="text-gray-400 mb-4">{tagPosts.length} posts</p>
                <div className="flex flex-wrap gap-2">
                  {tagPosts.map((post) => (
                    <a
                      key={post.slug}
                      href={`/posts/${post.slug}`}
                      className="text-sm px-3 py-1 rounded-full bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white transition-all"
                    >
                      {post.title}
                    </a>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}