import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import analytics from '../services/analytics';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  const handleToggle = () => {
    analytics.trackThemeToggle(!isDark);
    toggleTheme();
  };

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative w-12 h-12 rounded-full bg-dark-800/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-dark-700/50 transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative"
      >
        {isDark ? (
          <Moon 
            size={20} 
            className="text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" 
          />
        ) : (
          <Sun 
            size={20} 
            className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300" 
          />
        )}
      </motion.div>
      
      {/* Glow effect */}
      <motion.div
        initial={false}
        animate={{ 
          opacity: isDark ? 0.3 : 0.2,
          scale: isDark ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-full blur-md"
        style={{
          background: isDark 
            ? 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)'
        }}
      />
    </motion.button>
  );
};

export default ThemeToggle; 