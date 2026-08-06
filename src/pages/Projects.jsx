import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ title, subtitle, link, gifUrl, children, reverse }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 md:gap-12 items-center mb-24`}
  >
    {/* Project Image/GIF */}
    <div className="w-full lg:w-1/2 relative group">
      <div className="absolute inset-0 bg-sky-500/20 rounded-2xl transform translate-x-3 translate-y-3 -z-10 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform duration-300"></div>
      <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-slate-900">
        <img 
          src={gifUrl} 
          alt={title} 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
      </div>
    </div>

    {/* Project Details */}
    <div className={`w-full lg:w-1/2 ${reverse ? 'lg:text-right' : ''}`}>
      <h3 className="text-3xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sky-400 font-medium mb-6 text-lg">{subtitle}</p>
      
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 text-slate-300 shadow-xl mb-6">
        <div className="space-y-4 text-base leading-relaxed">
          {children}
        </div>
      </div>

      <div className={`flex gap-4 ${reverse ? 'lg:justify-end' : ''}`}>
        <a 
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <FaGithub size={24} /> <span className="font-medium">View Source</span>
        </a>
      </div>
    </div>
  </motion.div>
);

export default function Projects() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-white mb-20 text-center"
      >
        Featured Projects
      </motion.h2>

      <ProjectCard
        title="Agentic CI/CD Orchestrator"
        subtitle="Java (Spring Boot), LangGraph, Kafka, PostgreSQL"
        link="https://github.com/veerjain-1/agentic-cicd-orchestrator"
        gifUrl="/cicd_recording_1785982993857.webp"
      >
        <ul className="list-disc pl-5 space-y-2 text-left">
          <li>Designed and deployed an autonomous agentic platform using Java (Spring Boot) and LangGraph to intercept high-frequency code commits; automated the orchestration of multi-stage CI/CD build workflows and real-time dependency validation, saving ~15 engineering hours per month.</li>
          <li>Engineered an event-driven feedback loop via Apache Kafka to trigger recursive testing agents and automated PR comment summaries, reducing human code review latency by 60% within a distributed microservices environment.</li>
          <li>Built a scalable agent controller that manages stateful workflows across multiple environments; implemented comprehensive observability using Prometheus/Grafana to monitor agent performance.</li>
        </ul>
      </ProjectCard>

      <ProjectCard
        title="AI Code Review Platform"
        subtitle="Node.js, Java, LangChain, MongoDB"
        link="https://github.com/veerjain-1/ai-code-review-platform"
        gifUrl="/codereview_recording_1785983020542.webp"
        reverse={true}
      >
        <ul className="list-disc pl-5 space-y-2 text-left">
          <li>Built a high-scale polyglot microservices backend using Node.js and Java to provide automated AI code reviews for developer clubs, utilizing secure RESTful APIs and LangChain for intelligent feedback loops integrated via Git hooks.</li>
          <li>Optimized developer SDLC by implementing an asynchronous event-driven architecture with Kafka for real-time processing of pull requests and large-scale metadata extraction, reducing deployment friction through automated gate checks.</li>
          <li>Engineered robust persistence with MongoDB to store highly nested, dynamic LLM review payloads efficiently without strict relational constraints.</li>
        </ul>
      </ProjectCard>

      <ProjectCard
        title="Finance SLM & RAG"
        subtitle="Python, PyTorch, Hugging Face, MPS"
        link="https://github.com/veerjain-1/finance-slm-rag"
        gifUrl="/finance_recording_1785983037372.webp"
      >
        <ul className="list-disc pl-5 space-y-2 text-left">
          <li>Built a domain-specific small language model (SLM) pipeline utilizing the finance-alpaca dataset to power a chatbot capable of answering complex finance queries through supervised fine-tuning (SFT).</li>
          <li>Designed a custom pipeline for tokenization and parameter-efficient training with PyTorch-based transformers, leveraging Apple's Metal Performance Shaders (MPS) for a 7x-10x training speedup over standard CPU operations.</li>
        </ul>
      </ProjectCard>

      <ProjectCard
        title="PaySplit App"
        subtitle="Node.js, Express, MongoDB, Jest"
        link="https://github.com/veerjain-1/PaySplitApp"
        gifUrl="/paysplit_recording_1785983054876.webp"
        reverse={true}
      >
        <ul className="list-disc pl-5 space-y-2 text-left">
          <li>Built a robust expense-sharing RESTful API backed by a flexible MongoDB document architecture capable of handling highly nested, polymorphic split types (even, exact, percentages) for dynamic user groups.</li>
          <li>Engineered a fully isolated TDD testing environment utilizing mongodb-memory-server and Jest, achieving 100% logic coverage on core API flows with sub-2.5s suite execution velocity.</li>
          <li>Secured API endpoints with stateless JWT verification middleware powered by Firebase Authentication, ensuring horizontal scalability.</li>
        </ul>
      </ProjectCard>
    </div>
  );
}
