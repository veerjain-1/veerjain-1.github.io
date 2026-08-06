import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileAlt, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: '/experience', label: 'Experience' },
    { id: '/skills', label: 'Skills' },
    { id: '/projects', label: 'Projects' },
    { id: '/contact', label: 'Contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 w-full bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <NavLink to="/" className="text-2xl font-bold text-slate-100 tracking-tight hover:text-sky-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
          Veer Jain
        </NavLink>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.id}
              className={({ isActive }) => 
                `text-sm font-semibold tracking-wide transition-colors ${
                  isActive ? 'text-sky-400' : 'text-slate-400 hover:text-slate-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a 
            href="/Main_Resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-sm border border-white/10 transition-all hover:border-sky-400/30 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)]"
          >
            <FaFileAlt /> Resume
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="md:hidden text-slate-400 hover:text-white transition-colors"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-[#09090b]/95 backdrop-blur-xl border-b border-white/5 absolute w-full"
          >
            <div className="flex flex-col items-center py-6 gap-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.id}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => 
                    `text-lg font-semibold tracking-wide transition-colors ${
                      isActive ? 'text-sky-400' : 'text-slate-400 hover:text-slate-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <a 
                href="/Main_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-base border border-white/10 transition-all"
              >
                <FaFileAlt /> Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
