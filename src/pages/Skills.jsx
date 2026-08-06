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
    { name: 'Python', icon: <FaPython className="text-blue-400" /> },
    { name: 'Java', icon: <FaJava className="text-orange-500" /> },
    { name: 'C++', icon: <SiCplusplus className="text-blue-500" /> },
    { name: 'JavaScript', icon: <FaNodeJs className="text-yellow-400" /> },
    { name: 'TypeScript', icon: <FaNodeJs className="text-blue-500" /> },
    { name: 'SQL', icon: <FaDatabase className="text-blue-300" /> },
  ];

  const agenticAI = [
    { name: 'Agent Evals', icon: <FaCogs className="text-purple-400" /> },
    { name: 'Red Teaming', icon: <FaCogs className="text-red-500" /> },
    { name: 'Agent Orchestration', icon: <FaCogs className="text-sky-400" /> },
    { name: 'LangChain', icon: <FaCogs className="text-green-500" /> },
    { name: 'Threat Modeling', icon: <FaCogs className="text-orange-400" /> },
    { name: 'AgentCore', icon: <FaAws className="text-orange-500" /> },
  ];

  const machineLearning = [
    { name: 'PyTorch', icon: <SiPytorch className="text-orange-500" /> },
    { name: 'HuggingFace', icon: <FaCogs className="text-yellow-500" /> },
    { name: 'RAG Pipelines', icon: <FaDatabase className="text-blue-400" /> },
    { name: 'Vector DBs', icon: <FaDatabase className="text-purple-500" /> },
    { name: 'Scikit-Learn', icon: <FaCogs className="text-orange-400" /> },
    { name: 'Data Eng', icon: <FaDatabase className="text-sky-300" /> },
  ];

  const cloudDevOps = [
    { name: 'AWS', icon: <FaAws className="text-orange-500" /> },
    { name: 'Azure', icon: <FaAws className="text-blue-500" /> },
    { name: 'Docker', icon: <FaDocker className="text-blue-400" /> },
    { name: 'Kafka', icon: <SiApachekafka className="text-gray-300" /> },
    { name: 'CI/CD Pipelines', icon: <FaCogs className="text-sky-500" /> },
    { name: 'Kubernetes', icon: <FaDocker className="text-blue-500" /> },
  ];
  
  const webTech = [
    { name: 'React', icon: <FaReact className="text-cyan-400" /> },
    { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
    { name: 'Express', icon: <FaNodeJs className="text-gray-400" /> },
    { name: 'MongoDB', icon: <SiMongodb className="text-green-500" /> },
    { name: 'PostgreSQL', icon: <FaDatabase className="text-blue-400" /> },
    { name: 'Firebase', icon: <SiFirebase className="text-yellow-500" /> },
  ];

  const mobileTech = [
    { name: 'Swift (iOS)', icon: <FaReact className="text-orange-500" /> },
    { name: 'Kotlin', icon: <FaReact className="text-purple-500" /> },
    { name: 'Flutter', icon: <FaReact className="text-cyan-400" /> },
    { name: 'React Native', icon: <FaReact className="text-cyan-400" /> },
    { name: 'Mobile UI/UX', icon: <FaCogs className="text-pink-400" /> },
    { name: 'App Deployment', icon: <FaCogs className="text-blue-500" /> },
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
        <SkillCategory title="Agentic AI & Security" skills={agenticAI} delay={0.1} />
        <SkillCategory title="Machine Learning & Data" skills={machineLearning} delay={0.2} />
        <SkillCategory title="Cloud & DevOps" skills={cloudDevOps} delay={0.3} />
        <SkillCategory title="Languages" skills={languages} delay={0.4} />
        <SkillCategory title="Web Technologies" skills={webTech} delay={0.5} />
        <SkillCategory title="Mobile Development" skills={mobileTech} delay={0.6} />
      </div>
    </div>
  );
}
