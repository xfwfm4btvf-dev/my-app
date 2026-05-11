"use client";

import { motion } from "framer-motion";
import { getAllTags, getPostsByTag } from "../../lib/posts";
import { Particles } from "@/components/magicui/particles";
import { BorderBeam } from "@/components/magicui/border-beam";

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="min-h-screen relative">
      <Particles className="absolute inset-0" quantity={50} color="#ffffff" />
      
      <div className="relative py-20 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Tags
            </h1>
            <p className="text-gray-400">Browse posts by topic</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tags.map((tag, i) => {
              const tagPosts = getPostsByTag(tag);
              return (
                <motion.div
                  key={tag}
                  className="relative group rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm p-6 hover:border-purple-500/50 transition-all duration-300 overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <BorderBeam size={200} duration={8} colorFrom="#a855f7" colorTo="#ec4899" />
                  </div>
                  
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">#</span>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {tag}
                      </h2>
                    </div>
                    
                    <p className="text-gray-400 mb-4">
                      {tagPosts.length} post{tagPosts.length !== 1 ? "s" : ""}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {tagPosts.map((post) => (
                        <a
                          key={post.slug}
                          href={`/my-app/posts/${post.slug}`}
                          className="text-sm px-3 py-1.5 rounded-full bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5 hover:border-white/10 transition-all"
                        >
                          {post.title}
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}