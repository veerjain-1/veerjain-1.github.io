import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain } from 'react-icons/fa';

const Card = ({ title, subtitle, children }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-400/30 hover:shadow-[0_0_30px_rgba(147,51,234,0.15)] transition-all duration-300 mb-8"
  >
    <h3 className="text-2xl font-bold text-slate-100 mb-1">
      {title}
    </h3>
    <p className="text-purple-400/90 font-medium mb-6 text-lg">{subtitle}</p>
    <div className="text-slate-300 space-y-3 text-base leading-relaxed">
      {children}
    </div>
  </motion.div>
);

export default function Experience() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-white mb-12 text-center"
      >
        Professional Experience
      </motion.h2>

      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300/20 before:to-transparent">
        
        <Card 
          title="Software Development Engineer Intern" 
          subtitle="Amazon Web Services (AWS) · Summer 2026"
        >
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-white">AI Security & Agent Evals:</strong> Shipped a multi-agent AI Security Analyzer using AWS Bedrock (AgentCore) and Anthropic models, automating vulnerability detection across complex codebases and IaC, reducing security review time by ~8 hours/deployment.</li>
            <li><strong className="text-white">Adversarial Red-Teaming:</strong> Integrated adversarial red-teaming agents to cross-validate LLM findings, uncovering Sev-1 vulnerabilities in core infrastructure and reducing false-positive IAM alerts by over 40% through deterministic evaluation tools.</li>
            <li>Built an orchestration layer developed for parallelized analysis, utilizing AWS Fargate, API Gateway, AWS CDK, and DynamoDB to manage stateful, multi-step security workflows at enterprise scale with low latency.</li>
            <li>Engineered a closed-loop remediation pipeline integrating ReAct-based reasoning with an automated PR/ticketing system; implemented an agent evaluation framework with a 90% Precision/Recall threshold to gate production-ready findings.</li>
            <li>Designed versioned internal RESTful APIs with request validation and structured error handling through API Gateway, enabling seamless integration of automated security findings into existing developer review workflows.</li>
          </ul>
        </Card>

        <Card 
          title="Software Engineer Intern" 
          subtitle="Lockheed Martin · Summer 2025"
        >
          <ul className="list-disc pl-5 space-y-2">
            <li>Architected a scalable ML-inference platform for an AI-driven missile prototype, automating validation pipelines and optimizing backend microservices to reduce latency in defense-grade applications.</li>
            <li>Designed a data processing pipeline in Python and Spark for real-time streaming, integrating ML inference modules to detect distant small targets and feed a multi-object tracker over Kafka and SQL, cutting missed detections by 25%.</li>
            <li>Supported end-to-end ML infrastructure on Azure Machine Learning, training and validating on real-world flight datasets, and automating testing to cut testing from 4 days to 3 hours, utilizing Gitlab CI/CD pipelines.</li>
            <li>Built RESTful microservice endpoints in Python (Flask) to serve model inference results to downstream consumers, with structured JSON response contracts and automated deployment through GitLab CI/CD pipelines.</li>
          </ul>
        </Card>

        <Card 
          title="Software Engineer Intern" 
          subtitle="Textron Systems · Summer 2024"
        >
          <ul className="list-disc pl-5 space-y-2">
            <li>Developed ML-based threat detection algorithms using causal inference and unsupervised learning for a Warfare Simulator; leveraged TensorFlow, PyTorch, and MySQL to resolve critical bugs and reduce false positive alerts by 35%.</li>
            <li>Collaborated with cross-functional stakeholders to deploy an AI-powered NLP tool, automating data intake processes to save 100+ hours monthly and establish it as a key company asset.</li>
            <li>Designed and optimized normalized MySQL table schemas and indexing strategies for high-frequency sensor telemetry ingestion, reducing analytical query latency on threat-detection dashboards by 30%.</li>
          </ul>
        </Card>

        <Card 
          title="ML Research Engineer Intern" 
          subtitle="John Deere · Fall 2023 – Spring 2024"
        >
          <ul className="list-disc pl-5 space-y-2">
            <li>Implemented a Parts Demand Forecasting Tool leveraging Python, Pytorch, and machine learning models to predict demand for part-location combinations, resulting in a 15% reduction in excess inventory.</li>
            <li>Researched supply chain optimization, predictive analysis, time series forecasting methods, and data cleansing.</li>
            <li>Developed a REST API layer using Flask to serve demand forecast outputs to internal supply chain dashboards, integrating with PostgreSQL for historical parts inventory lookups and scheduled batch data refreshes.</li>
          </ul>
        </Card>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 flex flex-col items-center justify-center text-center space-y-6"
      >
        <h3 className="text-2xl font-bold text-slate-200">Want to learn more about my experience?</h3>
        <div className="relative">
          {/* Pulsing glow ring behind the button */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.15, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-400 via-purple-500 to-pink-500 blur-xl"
          />
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(147,51,234,0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.dispatchEvent(new CustomEvent('openChatbot'))}
            className="relative flex items-center gap-3 px-8 py-4 rounded-xl text-white overflow-hidden shadow-lg"
            style={{ background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6, #ec4899)' }}
          >
            {/* Animated shimmer overlay */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
              className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
            />
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaBrain size={20} />
            </motion.div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-lg font-bold tracking-tight relative">Chat with Veer.ai</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
