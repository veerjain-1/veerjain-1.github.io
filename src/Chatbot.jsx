import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

const BOT_NAME = "VeerBot";

const responses = [
  {
    keywords: ["experience", "work", "intern", "job", "amazon", "aws", "lockheed", "textron", "john deere"],
    reply: "I've had the privilege of interning at some amazing places! Most recently at AWS (Summer 2026) building an AI Security Analyzer, Lockheed Martin (Summer 2025) optimizing ML-inference platforms, and Textron Systems (Summer 2024) developing threat detection algorithms. What specific role would you like to know more about?"
  },
  {
    keywords: ["project", "code", "github", "build", "portfolio", "slm", "cicd", "paysplit"],
    reply: "I've built a variety of robust projects, from an Agentic CI/CD Orchestrator using Spring Boot and LangGraph, to a custom Finance SLM & RAG pipeline trained with PyTorch. Check out the Projects section for GitHub links!"
  },
  {
    keywords: ["skills", "language", "tech", "stack", "framework", "python", "java", "react"],
    reply: "My core stack revolves around AI Infrastructure and Backend Engineering. I'm highly proficient in Python, Java, and C++, and I regularly use PyTorch, AWS, Docker, Kafka, and LangChain for orchestration. (And I built this site using React + Vite!)"
  },
  {
    keywords: ["education", "school", "college", "purdue", "degree", "major", "graduate", "grad"],
    reply: "I am a Computer Science and Artificial Intelligence double major at Purdue University, and I'll be graduating in December 2026."
  },
  {
    keywords: ["contact", "email", "reach", "hire", "interview", "resume"],
    reply: "I'd love to connect! You can reach me through the contact form at the bottom of the page, via LinkedIn, or you can check out my full resume via the sidebar link. I'm actively seeking 2027 New Grad Software Engineering roles!"
  },
  {
    keywords: ["hello", "hi", "hey", "greetings", "sup"],
    reply: "Hello! I'm Veer's AI assistant. You can ask me about his experience, projects, education, or skills!"
  }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm an AI assistant trained on Veer's resume. Ask me anything about his experience, projects, or skills!", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setInput("");

    // Simple Rule-Based matching
    setTimeout(() => {
      const lowerInput = userMsg.toLowerCase();
      let foundReply = "That's an interesting question! I am a simple rule-based bot, so I might not have all the answers. I recommend checking out Veer's resume or reaching out via the contact form!";
      
      for (const res of responses) {
        if (res.keywords.some(kw => lowerInput.includes(kw))) {
          foundReply = res.reply;
          break;
        }
      }

      setMessages(prev => [...prev, { text: foundReply, isBot: true }]);
    }, 600); // simulate thinking delay
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-sky-500 text-slate-900 shadow-[0_0_20px_rgba(56,189,248,0.4)] z-50 ${isOpen ? 'hidden' : 'block'}`}
      >
        <FaRobot size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <FaRobot className="text-sky-400" />
                <span className="font-bold text-slate-100">{BOT_NAME}</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.isBot 
                      ? 'bg-slate-800 text-slate-300 rounded-tl-none border border-white/5' 
                      : 'bg-sky-500 text-slate-900 rounded-tr-none font-medium'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-white/5 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my experience..."
                className="flex-1 bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-sky-500/50"
              />
              <button 
                type="submit"
                className="p-3 bg-sky-500 hover:bg-sky-400 text-slate-900 rounded-xl transition-colors"
              >
                <FaPaperPlane size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
