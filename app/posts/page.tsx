"use client";

import { motion } from "framer-motion";
import { posts } from "../../lib/posts";

export default function PostsPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-5xl font-bold mb-12 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          All Posts
        </motion.h1>
        
        <div className="space-y-6">
          {posts.map((post, i) => (
            <motion.a
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="block group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 hover:border-blue-500/50 transition-all"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ x: 10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex justify-between items-start">
                <div>
                  <div className="flex gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400">{post.excerpt}</p>
                </div>
                <span className="text-gray-500 text-sm">{post.date}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}