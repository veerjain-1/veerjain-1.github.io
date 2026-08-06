import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFileAlt, FaUser, FaBriefcase, FaCode, FaEnvelope } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';
import Chatbot from './Chatbot';

const Section = ({ id, title, children }) => (
  <motion.section 
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
    className="mb-24 pt-24 -mt-24" // pt-24 -mt-24 handles scroll offset nicely
  >
    <h2 className="text-3xl font-bold mb-8 text-slate-100 border-b border-white/10 pb-4">{title}</h2>
    {children}
  </motion.section>
);

const Card = ({ title, subtitle, children, link }) => {
  const content = (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-sky-400/30 hover:shadow-[0_0_30px_rgba(56,189,248,0.1)] transition-all duration-300 mb-6"
    >
      <h3 className="text-xl font-bold text-slate-100 mb-1 group-hover:text-sky-400 transition-colors">
        {title}
      </h3>
      <p className="text-sky-400/90 font-medium mb-4 text-sm md:text-base">{subtitle}</p>
      <div className="text-slate-300 space-y-2 text-sm md:text-base">
        {children}
      </div>
    </motion.div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block group">
        {content}
      </a>
    );
  }

  return <div className="group">{content}</div>;
};

const navItems = [
  { id: 'about', label: 'About Me', icon: <FaUser className="mr-3" /> },
  { id: 'experience', label: 'Experience', icon: <FaBriefcase className="mr-3" /> },
  { id: 'projects', label: 'Projects', icon: <FaCode className="mr-3" /> },
  { id: 'contact', label: 'Contact', icon: <FaEnvelope className="mr-3" /> },
];

function App() {
  return (
    <div className="min-h-screen">
      <div className="mesh-bg"></div>
      <Chatbot />
      
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-24 flex flex-col md:flex-row gap-12 md:gap-24">
        
        {/* Sidebar */}
        <header className="md:w-1/3 flex flex-col md:sticky md:top-24 h-fit">
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            src="/veerpfp.jpeg" 
            alt="Veer Jain" 
            className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-white/10 shadow-2xl mb-6"
          />
          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-slate-100 tracking-tight mb-3"
          >
            Veer Jain
          </motion.h1>
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-sky-400 font-medium mb-8 h-8"
          >
            <TypeAnimation
              sequence={[
                'Software Engineer',
                2000,
                'AI Researcher',
                2000,
                'Machine Learning Engineer',
                2000,
                'Agentic AI Architect',
                2000,
                'ML Infrastructure',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>
          
          <nav className="hidden md:block mb-12">
            <ul className="space-y-4">
              {navItems.map((item, i) => (
                <motion.li 
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                >
                  <Link 
                    activeClass="!text-sky-400 [&>span]:w-16 [&>span]:bg-sky-400"
                    to={item.id}
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    className="text-slate-400 hover:text-sky-400 text-sm font-semibold tracking-widest uppercase flex items-center cursor-pointer group transition-colors"
                  >
                    <span className="w-8 h-px bg-slate-600 mr-4 group-hover:w-16 group-hover:bg-sky-400 transition-all duration-300"></span>
                    {item.icon}
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-6 mt-auto"
          >
            <a href="https://www.linkedin.com/in/veerjain1" className="text-slate-400 hover:text-white transition-colors"><FaLinkedin size={24} /></a>
            <a href="https://github.com/veerjain-1" className="text-slate-400 hover:text-white transition-colors"><FaGithub size={24} /></a>
            <a href="/Main_Resume.pdf" className="text-slate-400 hover:text-white transition-colors"><FaFileAlt size={24} /></a>
          </motion.div>
        </header>

        {/* Main Content */}
        <main className="md:w-2/3 pt-12 md:pt-0">
          
          {/* Attention-Grabbing Hero Hook before About Me */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-24 bg-gradient-to-r from-sky-500/10 to-purple-500/10 p-8 rounded-3xl border border-sky-500/20 backdrop-blur-sm"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400">Veer Jain</span>
            </h2>
            <p className="text-xl text-slate-300 font-medium leading-relaxed">
              I architect intelligent systems, build autonomous Agentic AI, and orchestrate scalable machine learning infrastructure to solve complex, mission-critical problems.
            </p>
          </motion.div>

          <Section id="about" title="About Me">
            <div className="space-y-4 text-slate-300/90 leading-relaxed text-lg">
              <p>
                I am a Computer Science and Artificial Intelligence double major at <strong className="text-white">Purdue University</strong> (graduating December 2026) with a focus on AI Infrastructure and Agentic Orchestration.
              </p>
              <p>
                Most recently, I joined <strong className="text-white">Amazon Web Services (AWS)</strong> as a Software Development Engineer Intern, where I shipped a multi-agent AI Security Analyzer using AWS Bedrock and AWS CDK. I integrated adversarial red-teaming agents and built an orchestration layer using Fargate, API Gateway, and DynamoDB to manage stateful security workflows at enterprise scale.
              </p>
              <p>
                Prior to AWS, I was at <strong className="text-white">Lockheed Martin</strong>, where I architected a scalable ML-inference platform to process large-scale datasets and designed real-time streaming data pipelines in Python and Spark with Kafka. My work reduced inference latency and automated testing cycles on Azure Machine Learning from four days to just three hours.
              </p>
              <p>
                My background also spans mission-critical ML threat detection at <strong className="text-white">Textron Systems</strong>, where I developed algorithms using causal inference and unsupervised learning, along with deploying AI-powered NLP tools. I thrive on bridging the gap between complex AI research and scalable, production-ready software engineering.
              </p>
            </div>
          </Section>

          {/* Reordered: Experience comes first now */}
          <Section id="experience" title="Experience">
            <Card 
              title="Software Development Engineer Intern" 
              subtitle="Amazon Web Services (AWS) · Summer 2026"
            >
              <ul className="list-disc pl-5 space-y-2">
                <li>Shipped a multi-agent AI Security Analyzer using AWS Bedrock (AgentCore) and AWS CDK, automating vulnerability detection across complex codebases and IaC, reducing security review time by ~8 hours/deployment.</li>
                <li>Integrated adversarial red-teaming agents to cross-validate against LLM findings, effectively reducing false-positive alerts in complex IAM permission analysis by over 40% using deterministic evaluation tools.</li>
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
          </Section>

          <Section id="projects" title="Projects">
            <Card 
              title="Agentic CI/CD Orchestrator" 
              subtitle="Lead Developer | Java (Spring Boot), LangGraph, Kafka, PostgreSQL"
              link="https://github.com/veerjain-1/agentic-cicd-orchestrator"
            >
              <ul className="list-disc pl-5 space-y-2">
                <li>Designed and deployed an autonomous agentic platform using Java (Spring Boot) and LangGraph to intercept high-frequency code commits; automated the orchestration of multi-stage CI/CD build workflows and real-time dependency validation, saving ~15 engineering hours per month.</li>
                <li>Engineered an event-driven feedback loop via Apache Kafka to trigger recursive testing agents and automated PR comment summaries, reducing human code review latency by 60% within a distributed microservices environment.</li>
                <li>Built a scalable agent controller that manages stateful workflows across multiple environments; implemented comprehensive observability using Prometheus/Grafana to monitor agent performance.</li>
              </ul>
            </Card>

            <Card 
              title="AI Code Review CLI" 
              subtitle="Lead Developer | Node.js, Java, LangChain, MongoDB"
              link="https://github.com/veerjain-1/ai-code-review-platform"
            >
              <ul className="list-disc pl-5 space-y-2">
                <li>Built a high-scale polyglot microservices backend using Node.js and Java to provide automated AI code reviews for developer clubs, utilizing secure RESTful APIs and LangChain for intelligent feedback loops integrated via Git hooks.</li>
                <li>Optimized developer SDLC by implementing an asynchronous event-driven architecture with Kafka for real-time processing of pull requests and large-scale metadata extraction, reducing deployment friction through automated gate checks.</li>
                <li>Engineered robust persistence with MongoDB to store highly nested, dynamic LLM review payloads efficiently without strict relational constraints.</li>
              </ul>
            </Card>

            <Card 
              title="Finance SLM & RAG" 
              subtitle="Lead Developer | Python, PyTorch, Hugging Face, MPS"
              link="https://github.com/veerjain-1/finance-slm-rag"
            >
              <ul className="list-disc pl-5 space-y-2">
                <li>Built a domain-specific small language model (SLM) pipeline utilizing the finance-alpaca dataset to power a chatbot capable of answering complex finance queries through supervised fine-tuning (SFT).</li>
                <li>Designed a custom pipeline for tokenization and parameter-efficient training with PyTorch-based transformers, leveraging Apple's Metal Performance Shaders (MPS) for a 7x-10x training speedup over standard CPU operations.</li>
              </ul>
            </Card>

            <Card 
              title="PaySplit App" 
              subtitle="Lead Developer | Node.js, Express, MongoDB, Jest"
              link="https://github.com/veerjain-1/PaySplitApp"
            >
              <ul className="list-disc pl-5 space-y-2">
                <li>Built a robust expense-sharing RESTful API backed by a flexible MongoDB document architecture capable of handling highly nested, polymorphic split types (even, exact, percentages) for dynamic user groups.</li>
                <li>Engineered a fully isolated TDD testing environment utilizing mongodb-memory-server and Jest, achieving 100% logic coverage on core API flows with sub-2.5s suite execution velocity.</li>
                <li>Secured API endpoints with stateless JWT verification middleware powered by Firebase Authentication, ensuring horizontal scalability.</li>
              </ul>
            </Card>
          </Section>

          <Section id="contact" title="Get In Touch">
            <form action="https://formspree.io/f/xwpeoarq" method="POST" className="space-y-6 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                  <input type="text" name="name" id="name" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <input type="email" name="email" id="email" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <textarea name="message" id="message" rows="4" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all resize-none"></textarea>
              </div>
              <button type="submit" className="bg-sky-500 hover:bg-sky-400 text-slate-900 font-bold py-3 px-8 rounded-lg transition-colors w-full md:w-auto">
                Send Message
              </button>
            </form>
          </Section>

          <footer className="text-center text-slate-500 text-sm pb-12">
            <p>&copy; 2026 Veer Jain. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
