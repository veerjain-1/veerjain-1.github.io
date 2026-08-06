import React from 'react';
import { motion } from 'framer-motion';

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
            <li><strong className="text-white">AI Security & Agent Evals:</strong> Shipped a multi-agent AI Security Analyzer using AWS Bedrock (AgentCore) and AWS CDK, automating vulnerability detection across complex codebases and IaC, reducing security review time by ~8 hours/deployment.</li>
            <li><strong className="text-white">Adversarial Red-Teaming:</strong> Integrated adversarial red-teaming agents to cross-validate against LLM findings, effectively reducing false-positive alerts in complex IAM permission analysis by over 40% using deterministic evaluation tools.</li>
            <li>Built an orchestration layer developed for parallelized analysis, utilizing AWS Fargate, API Gateway, and DynamoDB to manage stateful, multi-step security workflows at enterprise scale with low latency.</li>
            <li>Engineered a closed-loop remediation pipeline integrating ReAct reasoning with an automated PR/ticketing system; implemented an agent evaluation framework with a 90% Precision/Recall threshold to gate production-ready findings.</li>
          </ul>
        </Card>

        <Card 
          title="Software Engineer Intern" 
          subtitle="Lockheed Martin · Summer 2025"
        >
          <ul className="list-disc pl-5 space-y-2">
            <li>Architected a scalable ML-inference platform to process large-scale datasets, reducing inference latency and automating model validation pipelines; optimized backend infrastructure to support high-throughput microservices.</li>
            <li>Designed a data processing pipeline in Python and Spark for real-time streaming, integrating ML inference modules to detect small targets and feed a multi-object tracker over Kafka and SQL, cutting missed detections by 25%.</li>
            <li>Supported end-to-end ML infrastructure on Azure Machine Learning, training and validating on real-world flight datasets, and automating testing to cut testing from 4 days to 3 hours, utilizing Gitlab CI/CD pipelines.</li>
          </ul>
        </Card>

        <Card 
          title="Software Engineer Intern" 
          subtitle="Textron Systems · Summer 2024"
        >
          <ul className="list-disc pl-5 space-y-2">
            <li>Developed ML-based threat detection algorithms utilizing causal inference and unsupervised learning methods. Resolved critical bugs in a Warfare Simulator, leveraging TensorFlow, PyTorch, and MySQL, reduced false positive alerts by 35%.</li>
            <li>Single-handedly built and deployed an AI-powered NLP tool to automate PDF-to-Excel data extraction, saving 100+ hours monthly and becoming a key company asset.</li>
          </ul>
        </Card>

        <Card 
          title="ML Research Engineer Intern" 
          subtitle="John Deere · Fall 2023 – Spring 2024"
        >
          <ul className="list-disc pl-5 space-y-2">
            <li>Implemented a Parts Demand Forecasting Tool leveraging Python, Pytorch, and machine learning models to predict demand for part-location combinations, resulting in a 15% reduction in excess inventory.</li>
            <li>Researched supply chain optimization, predictive analysis, time series forecasting methods, and data cleansing.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
