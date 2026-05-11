"use client";

import { motion } from "framer-motion";
import { Post } from "@/lib/posts";

export default function PostContent({ post }: { post: Post }) {
  return (
    <div className="min-h-screen py-20 px-6">
      <article className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex gap-2 mb-6">
            {post.tags.map((tag) => (
              <span key={tag} className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {post.title}
          </h1>
          
          <p className="text-gray-500 mb-12">{post.date}</p>
          
          <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </motion.div>
      </article>
    </div>
  );
}