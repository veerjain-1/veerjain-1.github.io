import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaRobot } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-80px)] gap-12 lg:gap-16 px-4">
      
      {/* Left side text */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="lg:w-[55%]"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
          Hi, I'm <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400">
            Veer Jain
          </span>
        </h1>
        
        <div className="text-2xl md:text-3xl font-semibold text-sky-400 mb-6 h-10">
          <TypeAnimation
            sequence={[
              'Software Engineer |',
              2000,
              'AI Researcher |',
              2000,
              'Backend Developer |',
              2000,
              'Agentic AI Architect |',
              2000,
              'Full-Stack Developer |',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>

        <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed mb-10 max-w-lg">
          I build scalable cloud infrastructure, orchestrate Agentic AI, and architect mission-critical backend systems. From robust security evaluations at AWS to high-throughput data pipelines.
        </p>

        <div className="flex flex-wrap gap-4 mb-12">
          <button 
            onClick={() => document.dispatchEvent(new CustomEvent('openChatbot'))}
            className="flex items-center gap-3 px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-900 font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
          >
            <FaRobot size={20} /> Chat with AI
          </button>
          <Link 
            to="/experience"
            className="flex items-center gap-3 px-8 py-4 rounded-xl bg-purple-600/80 hover:bg-purple-500 text-white font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(147,51,234,0.3)]"
          >
            View Experience
          </Link>
        </div>
        
        <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/veerjain1" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"><FaLinkedin size={22} /></a>
            <a href="https://github.com/veerjain-1" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"><FaGithub size={22} /></a>
        </div>
      </motion.div>

      {/* Right side image */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="lg:w-[45%] flex justify-center relative"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 to-purple-500/20 blur-3xl rounded-full z-0 transform scale-150"></div>
        <img 
          src="/veerpfp.jpeg" 
          alt="Veer Jain" 
          className="relative z-10 w-[300px] h-[300px] md:w-[450px] md:h-[450px] object-cover rounded-3xl border border-white/10 shadow-2xl shadow-purple-500/20"
        />
      </motion.div>
    </div>
  );
}
