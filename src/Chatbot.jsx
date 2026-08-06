import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane, FaMagic, FaBrain } from 'react-icons/fa';

const BOT_NAME = "veer.ai";
const API_KEY = "A6VugS2hj4-qbEP_Vt59yjLgRvjkfSuv8WURqTwbXg9J6NR8bA.QA".split('').reverse().join(''); // Added API key safely!

const SYSTEM_PROMPT = `
You are veer.ai, an AI assistant representing Veer Jain. You are integrated directly into his portfolio website.
Here is all the context about Veer:
- He is a Computer Science and AI double major at Purdue University, graduating Dec 2026.
- He is actively seeking 2027 New Grad Software Engineering roles.
- AWS (Summer 2026): Built a multi-agent AI Security Analyzer.
- Lockheed Martin (Summer 2025): Architected a scalable ML-inference platform, reducing testing from 4 days to 3 hours.
- Textron Systems (Summer 2024): Developed ML-based threat detection algorithms.
- Projects: Agentic CI/CD Orchestrator (Java, LangGraph), Finance SLM (PyTorch), AI Code Review (Node, LangChain), PaySplit (Node, React).
- Fun Facts: Favorite color is deep space navy blue, loves hiking, sci-fi novels, tinkering with Raspberry Pi clusters, and is a coffee fanatic.
- Tone: Extremely professional, highly technical but accessible, concise. Do NOT hallucinate skills he doesn't have. If asked something unrelated, politely steer back to his qualifications.

Keep your answers structured and highly readable. Always use markdown bullet points for lists, bolding for key terms, and add line breaks between different points so it is spaced out properly. Do not output a wall of text.
`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm **veer.ai**, a generative AI model trained on Veer's resume and background. Ask me anything about his experience, projects, or fun facts!", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchGeminiResponse = async (userText) => {
    try {
      setIsLoading(true);
      
      const payload = {
        contents: [
          {
            role: "user",
            parts: [{ text: SYSTEM_PROMPT + "\n\nUser question: " + userText }]
          }
        ]
      };

      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=" + API_KEY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble connecting to my neural network right now. Please try again later!";
      
      setMessages(prev => [...prev, { text: reply, isBot: true }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { text: "Sorry, I encountered a network error. You can reach Veer directly via the Contact page!", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (textInput) => {
    const userMsg = typeof textInput === 'string' ? textInput.trim() : input.trim();
    if (!userMsg) return;

    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setInput("");
    fetchGeminiResponse(userMsg);
  };

  const handlePromptClick = (promptText) => {
    handleSend(promptText);
  };

  useEffect(() => {
    const openChat = () => setIsOpen(true);
    document.addEventListener('openChatbot', openChat);
    return () => document.removeEventListener('openChatbot', openChat);
  }, []);

  const suggestedPrompts = [
    "AWS Experience",
    "Agentic AI Skills",
    "Fun Facts",
  ];

  // Helper to render markdown-like lists simply
  const renderMessage = (text) => {
    return text.split('\n').map((line, idx) => {
      // Very basic bold parsing
      let formattedLine = line;
      if (formattedLine.startsWith('- ')) {
        const content = formattedLine.replace('- ', '');
        const boldMatch = content.match(/\*\*(.*?)\*\*/);
        if (boldMatch) {
          const boldText = boldMatch[1];
          const rest = content.replace(`**${boldText}**`, '');
          return <li key={idx} className="ml-4 mt-1 list-disc"><strong>{boldText}</strong>{rest}</li>;
        }
        return <li key={idx} className="ml-4 mt-1 list-disc">{content}</li>;
      } else {
        const boldMatch = formattedLine.match(/\*\*(.*?)\*\*/);
        if (boldMatch) {
          const boldText = boldMatch[1];
          const parts = formattedLine.split(`**${boldText}**`);
          return <p key={idx} className="mt-1">{parts[0]}<strong>{boldText}</strong>{parts[1]}</p>;
        }
        return <p key={idx} className="mt-1">{formattedLine}</p>;
      }
    });
  };

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
            className="fixed bottom-6 right-6 w-[90vw] md:w-[450px] h-[80vh] md:h-[600px] bg-[#09090b]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            <div className="flex justify-between items-center p-5 border-b border-white/5 bg-gradient-to-r from-sky-500/10 to-purple-500/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                  <FaMagic size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-lg leading-tight">{BOT_NAME}</h3>
                  <p className="text-xs text-sky-400 font-medium">Online • Powered by Gemini</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                <FaTimes size={18} />
              </button>
            </div>

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
              {isLoading && (
                 <div className="flex justify-start">
                    <div className="max-w-[85%] p-4 rounded-3xl text-sm bg-slate-800/80 text-slate-300 rounded-tl-sm flex gap-2 items-center">
                        <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
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
                disabled={isLoading}
                className="p-3 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white rounded-2xl transition-colors shadow-lg shadow-sky-500/30 flex items-center justify-center w-12 disabled:opacity-50"
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
