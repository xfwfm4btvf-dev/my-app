"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  const skills = ["Next.js", "TypeScript", "Python", "Solana", "AI", "Blockchain", "Security"];

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            About
          </h1>
          
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4">Henry Nitrogen</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Hello! I&apos;m Henry Nitrogen, a web developer and student based in Hong Kong and Zhuhai.
              I&apos;m passionate about coding, AI, blockchain, and cybersecurity.
            </p>
            
            <h3 className="text-xl font-semibold mb-4 text-gray-200">Skills & Interests</h3>
            <div className="flex flex-wrap gap-3 mb-8">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 * i }}
                  whileHover={{ scale: 1.1 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
            
            <h3 className="text-xl font-semibold mb-4 text-gray-200">Contact</h3>
            <div className="space-y-2 text-gray-400">
              <p>📧 henryni710@gmail.com</p>
              <p>
                🐙 GitHub:{" "}
                <a href="https://github.com/HenryNitrogen" className="text-blue-400 hover:text-blue-300 transition-colors">
                  @HenryNitrogen
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}