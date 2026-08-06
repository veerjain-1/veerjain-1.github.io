import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const ProjectCard = ({ title, subtitle, link, gifUrl, children, reverse = false, onImageClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 md:gap-12 items-center mb-24`}
    >
      <div className="lg:w-1/2 w-full cursor-pointer hover:opacity-90 transition-opacity" onClick={() => onImageClick(gifUrl)}>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 group">
          <img 
            src={gifUrl} 
            alt={`${title} demo`} 
            className="w-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <span className="text-white bg-slate-800/80 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">View Fullscreen</span>
          </div>
        </div>
      </div>
      
      <div className="lg:w-1/2 w-full space-y-6">
        <div>
          <h3 className="text-3xl font-bold text-white mb-2">{title}</h3>
          <p className="text-sky-400 font-medium text-lg">{subtitle}</p>
        </div>
        
        <div className="text-slate-300 text-lg leading-relaxed">
          {children}
        </div>

        <div className="pt-4 flex gap-4">
          <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-xl">
            <FaGithub className="text-xl" />
            <span>View Source</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle ESC key to close Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 relative">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-white mb-16 text-center"
      >
        Featured Projects
      </motion.h2>

      <ProjectCard
        title="Agentic CI/CD Orchestrator"
        subtitle="Java (Spring Boot), LangGraph, Kafka, PostgreSQL"
        link="https://github.com/veerjain-1/agentic-cicd-orchestrator"
        gifUrl="/cicd.webp"
        onImageClick={setSelectedImage}
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
        gifUrl="/codereview_static.png"
        reverse={true}
        onImageClick={setSelectedImage}
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
        gifUrl="/finance.webp"
        onImageClick={setSelectedImage}
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
        gifUrl="/paysplit_true_static.png"
        reverse={true}
        onImageClick={setSelectedImage}
      >
        <ul className="list-disc pl-5 space-y-2 text-left">
          <li>Built a robust expense-sharing RESTful API backed by a flexible MongoDB document architecture capable of handling highly nested, polymorphic split types (even, exact, percentages) for dynamic user groups.</li>
          <li>Engineered a fully isolated TDD testing environment utilizing mongodb-memory-server and Jest, achieving 100% logic coverage on core API flows with sub-2.5s suite execution velocity.</li>
          <li>Secured API endpoints with stateless JWT verification middleware powered by Firebase Authentication, ensuring horizontal scalability.</li>
        </ul>
      </ProjectCard>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md cursor-pointer"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-8 right-8 text-white bg-slate-800 hover:bg-slate-700 hover:scale-110 p-3 rounded-full transition-all shadow-xl border border-slate-600 z-50 flex items-center gap-2 font-bold"
            >
              <FaTimes size={24} /> <span className="hidden md:inline">Close (Esc)</span>
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage} 
              alt="Fullscreen Demo"
              className="w-full max-w-5xl max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-slate-700/50"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
