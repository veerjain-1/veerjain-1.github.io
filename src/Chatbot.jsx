import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane, FaMagic, FaBrain } from 'react-icons/fa';

const BOT_NAME = "VeerBot AI";

const funFacts = [
  "My favorite color is deep space navy blue.",
  "In my free time, I love hiking, reading sci-fi novels, and tinkering with Raspberry Pi clusters.",
  "I'm an absolute coffee fanatic—I need it to fuel my late-night coding sessions!",
];

const responses = [
  {
    keywords: ["experience", "work", "intern", "job", "amazon", "aws", "lockheed", "textron", "john deere"],
    reply: "I've had the privilege of interning at some amazing places!\n\n- **AWS (Summer 2026)**: Built a multi-agent AI Security Analyzer and orchestrated stateful security workflows.\n- **Lockheed Martin (Summer 2025)**: Architected a scalable ML-inference platform, reducing testing from 4 days to 3 hours.\n- **Textron Systems (Summer 2024)**: Developed ML-based threat detection algorithms.\n\nWhat specific role would you like to know more about?"
  },
  {
    keywords: ["project", "code", "github", "build", "portfolio", "slm", "cicd", "paysplit"],
    reply: "I've built a variety of robust projects:\n\n- **Agentic CI/CD Orchestrator**: Java (Spring Boot) and LangGraph platform to intercept high-frequency code commits.\n- **Finance SLM & RAG**: A domain-specific small language model pipeline trained with PyTorch.\n- **AI Code Review Platform**: A high-scale polyglot microservices backend.\n\nCheck out the Projects page for more!"
  },
  {
    keywords: ["skills", "language", "tech", "stack", "framework", "python", "java", "react", "infrastructure"],
    reply: "My core stack revolves around AI Infrastructure and Backend Engineering:\n\n- **Languages**: Python, Java, C++, TypeScript\n- **Cloud**: AWS, Docker, Kafka, CI/CD\n- **AI**: PyTorch, Agentic GenAI, RAG/SLMs"
  },
  {
    keywords: ["education", "school", "college", "purdue", "degree", "major", "graduate", "grad"],
    reply: "I am a Computer Science and Artificial Intelligence double major at Purdue University, and I'll be graduating in December 2026. Boiler Up!"
  },
  {
    keywords: ["contact", "email", "reach", "hire", "interview", "resume"],
    reply: "I'd love to connect! You can reach me through the contact form, via LinkedIn, or you can check out my full resume via the top navbar. I'm actively seeking 2027 New Grad Software Engineering roles!"
  },
  {
    keywords: ["fun fact", "color", "free time", "hobbies", "hobby", "fun", "facts", "about"],
    reply: `Here are some fun facts about Veer:\n\n- ${funFacts.join('\n- ')}`
  },
  {
    keywords: ["hello", "hi", "hey", "greetings", "sup"],
    reply: "Hello! I'm Veer's AI assistant. You can ask me about his experience, projects, education, or even some fun facts!"
  }
];

// Helper to render markdown-like lists simply
const renderMessage = (text) => {
  return text.split('\n').map((line, idx) => {
    if (line.startsWith('- **')) {
      const parts = line.replace('- **', '').split('**: ');
      return <li key={idx} className="ml-4 mt-1 list-disc"><strong>{parts[0]}</strong>: {parts[1]}</li>;
    } else if (line.startsWith('- ')) {
      return <li key={idx} className="ml-4 mt-1 list-disc">{line.replace('- ', '')}</li>;
    } else {
      return <p key={idx} className="mt-1">{line}</p>;
    }
  });
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm VeerBot. Ask me about Veer's security background, projects, or fun facts!", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (textInput) => {
    const userMsg = typeof textInput === 'string' ? textInput.trim() : input.trim();
    if (!userMsg) return;

    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setInput("");

    // Simulate thinking delay
    setTimeout(() => {
      const lowerInput = userMsg.toLowerCase();
      let foundReply = "That's an interesting question! I recommend checking out the Experience page or reaching out via the Contact form!";
      
      for (const res of responses) {
        if (res.keywords.some(kw => lowerInput.includes(kw))) {
          foundReply = res.reply;
          break;
        }
      }

      setMessages(prev => [...prev, { text: foundReply, isBot: true }]);
    }, 600);
  };

  const handlePromptClick = (promptText) => {
    handleSend(promptText);
  };

  // Listen for custom event to open chatbot from hero button
  useEffect(() => {
    const openChat = () => setIsOpen(true);
    document.addEventListener('openChatbot', openChat);
    return () => document.removeEventListener('openChatbot', openChat);
  }, []);

  const suggestedPrompts = [
    "AWS Experience",
    "Projects",
    "Fun Facts",
  ];

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-2xl bg-gradient-to-r from-sky-500 to-purple-600 text-white shadow-[0_0_30px_rgba(147,51,234,0.4)] z-50 ${isOpen ? 'hidden' : 'block'}`}
      >
        <FaBrain size={28} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            // Made significantly wider and taller (450x600 instead of 350x500)
            className="fixed bottom-6 right-6 w-[90vw] md:w-[450px] h-[80vh] md:h-[600px] bg-[#09090b]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-white/5 bg-gradient-to-r from-sky-500/10 to-purple-500/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                  <FaMagic size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-lg leading-tight">{BOT_NAME}</h3>
                  <p className="text-xs text-sky-400 font-medium">Online • Responds instantly</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                <FaTimes size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${
                    msg.isBot 
                      ? 'bg-slate-800/80 text-slate-300 rounded-tl-sm border border-white/5 shadow-md' 
                      : 'bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-tr-sm font-medium shadow-md shadow-sky-500/20'
                  }`}>
                    {msg.isBot ? renderMessage(msg.text) : msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Suggested Prompts */}
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto custom-scrollbar">
                {suggestedPrompts.map(prompt => (
                  <button 
                    key={prompt}
                    onClick={() => handlePromptClick(prompt)}
                    className="whitespace-nowrap px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-sky-300 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
            </div>

            {/* Input Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="p-4 border-t border-white/5 bg-white/5 flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-slate-900 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none focus:border-sky-500/50 shadow-inner"
              />
              <button 
                type="submit"
                className="p-3 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white rounded-2xl transition-colors shadow-lg shadow-sky-500/30 flex items-center justify-center w-12"
              >
                <FaPaperPlane size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
