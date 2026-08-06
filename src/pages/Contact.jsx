import React from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-white mb-6 text-center"
      >
        Get In Touch
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-slate-400 text-center mb-12 text-lg"
      >
        I'm currently seeking 2027 New Grad Software Engineering roles. Whether you have a question or just want to say hi, I'll try my best to get back to you!
      </motion.p>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        action="https://formspree.io/f/xwpeoarq" 
        method="POST" 
        className="space-y-6 bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
            <input type="text" name="name" id="name" required className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <input type="email" name="email" id="email" required className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
          <textarea name="message" id="message" rows="5" required className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all resize-none"></textarea>
        </div>
        <button type="submit" className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-900 font-bold py-4 px-8 rounded-xl transition-all w-full hover:scale-[1.02] shadow-[0_0_20px_rgba(56,189,248,0.2)]">
          <FaPaperPlane /> Send Message
        </button>
      </motion.form>
    </div>
  );
}
