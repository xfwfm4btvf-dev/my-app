"use client";

import { motion } from "framer-motion";
import { Particles } from "@/components/magicui/particles";
import { BorderBeam } from "@/components/magicui/border-beam";

export default function AboutPage() {
  const skills = [
    { name: "Next.js", color: "from-gray-400 to-gray-600" },
    { name: "TypeScript", color: "from-blue-400 to-blue-600" },
    { name: "Python", color: "from-yellow-400 to-yellow-600" },
    { name: "Solana", color: "from-purple-400 to-purple-600" },
    { name: "AI", color: "from-pink-400 to-pink-600" },
    { name: "Blockchain", color: "from-green-400 to-green-600" },
    { name: "Security", color: "from-red-400 to-red-600" },
  ];

  return (
    <div className="min-h-screen relative">
      <Particles className="absolute inset-0" quantity={50} color="#ffffff" />
      
      <div className="relative py-20 px-6 z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Avatar Section */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="inline-block"
              >
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin" style={{ animationDuration: "3s" }} />
                  <div className="absolute inset-1 rounded-full bg-black flex items-center justify-center">
                    <span className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      N
                    </span>
                  </div>
                </div>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl font-bold mb-2"
              >
                Henry Nitrogen
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 text-lg"
              >
                Web Developer & Student
              </motion.p>
            </div>

            {/* Bio Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 mb-8 overflow-hidden"
            >
              <BorderBeam size={300} duration={10} colorFrom="#3b82f6" colorTo="#8b5cf6" />
              
              <div className="relative">
                <h2 className="text-xl font-semibold mb-4 text-white">About Me</h2>
                <p className="text-gray-300 leading-relaxed">
                  Hello! I&apos;m <span className="text-blue-400 font-semibold">Henry Nitrogen</span>, 
                  a web developer and student based in Hong Kong and Zhuhai. 
                  I&apos;m passionate about coding, AI, blockchain, and cybersecurity.
                </p>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 mb-8 overflow-hidden"
            >
              <h2 className="text-xl font-semibold mb-6 text-white">Skills & Interests</h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + 0.05 * i }}
                    className={`px-4 py-2 rounded-full bg-gradient-to-r ${skill.color} text-white font-medium`}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 overflow-hidden"
            >
              <BorderBeam size={200} duration={8} colorFrom="#ec4899" colorTo="#f97316" />
              
              <div className="relative">
                <h2 className="text-xl font-semibold mb-6 text-white">Get In Touch</h2>
                <div className="space-y-4">
                  <a
                    href="mailto:henryni710@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white">henryni710@gmail.com</p>
                    </div>
                  </a>
                  
                  <a
                    href="https://github.com/HenryNitrogen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">GitHub</p>
                      <p className="text-white">@HenryNitrogen</p>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}