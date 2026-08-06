import React from 'react';
import { motion } from 'framer-motion';
import { FaPython, FaJava, FaDocker, FaAws, FaReact, FaNodeJs, FaDatabase, FaCogs } from 'react-icons/fa';
import { SiCplusplus, SiPytorch, SiApachekafka, SiMongodb, SiFirebase } from 'react-icons/si';

const SkillCategory = ({ title, skills, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
  >
    <h3 className="text-2xl font-bold text-slate-100 mb-6">{title}</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {skills.map((skill, idx) => (
        <div key={idx} className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
          <div className="text-4xl text-slate-400 group-hover:text-sky-400 mb-3 transition-colors">
            {skill.icon}
          </div>
          <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
            {skill.name}
          </span>
        </div>
      ))}
    </div>
  </motion.div>
);

export default function Skills() {
  const languages = [
    { name: 'Python', icon: <FaPython /> },
    { name: 'Java', icon: <FaJava /> },
    { name: 'C++', icon: <SiCplusplus /> },
    { name: 'JavaScript', icon: <FaNodeJs /> },
    { name: 'SQL', icon: <FaDatabase /> },
  ];

  const cloudDevOps = [
    { name: 'AWS', icon: <FaAws /> },
    { name: 'Docker', icon: <FaDocker /> },
    { name: 'Kafka', icon: <SiApachekafka /> },
    { name: 'CI/CD', icon: <FaCogs /> },
  ];

  const aiInfrastructure = [
    { name: 'PyTorch', icon: <SiPytorch /> },
    { name: 'Agentic GenAI', icon: <FaCogs /> }, // Using generic cogs since no specific agent icon
    { name: 'RAG / SLMs', icon: <FaDatabase /> },
  ];
  
  const webTech = [
    { name: 'React', icon: <FaReact /> },
    { name: 'Node.js', icon: <FaNodeJs /> },
    { name: 'MongoDB', icon: <SiMongodb /> },
    { name: 'Firebase', icon: <SiFirebase /> },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-white mb-12 text-center"
      >
        Technical Arsenal
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SkillCategory title="Languages" skills={languages} delay={0.1} />
        <SkillCategory title="AI & Infrastructure" skills={aiInfrastructure} delay={0.2} />
        <SkillCategory title="Cloud & DevOps" skills={cloudDevOps} delay={0.3} />
        <SkillCategory title="Web Technologies" skills={webTech} delay={0.4} />
      </div>
    </div>
  );
}
