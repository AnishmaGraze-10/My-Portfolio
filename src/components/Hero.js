import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, ChevronDown, Github, Linkedin, Mail as Gmail } from 'lucide-react';
import analytics from '../services/analytics';

const Hero = () => {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    // Track resume download
    analytics.trackResumeDownload();
    
    // Create a temporary link to download resume
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Add your resume file to public folder
    link.download = 'Anishma_RS_Resume.pdf';
    link.click();
  };

  const handleContactClick = () => {
    analytics.trackEvent('cta_click', { action: 'hire_me' });
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSocialClick = (platform, url) => {
    analytics.trackSocialClick(platform, url);
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/anishma-rs/',
      color: '#0077b5'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/AnishmaGraze-10',
      color: '#0077b5'
    },
   
      {
        name: 'Gmail',
        icon: Gmail,
        url: 'mailto:anishmars.23it@kongu.edu',
        color: '#e4405f'
      }
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Background with Starfield Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800"></div>
      
      {/* Animated Starfield Background */}
      <div className="absolute inset-0">
        {/* Large gradient orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-400/5 rounded-full blur-3xl"
        />
        
        {/* Animated starfield */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-primary-400 text-lg md:text-xl font-medium mb-4"
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                👋
              </motion.span> Hello, I'm
            </motion.p>

            {/* Name with Role */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
            >
              <span className="gradient-text text-shadow">Anishma RS</span>
            </motion.h1>

            {/* Role */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6"
            >
              Full Stack Developer
            </motion.h2>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl leading-relaxed"
            >
              MERN full-stack developer with a focus on performant APIs, responsive UIs, and well-structured data models. I enjoy turning product ideas into reliable, scalable experiences and continuously refine solutions through profiling, testing, and iteration.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <motion.button
                onClick={handleContactClick}
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="button-primary flex items-center gap-2 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Mail size={20} className="relative z-10 group-hover:animate-bounce" />
                <span className="relative z-10">Get in Touch</span>
              </motion.button>

              <motion.button
                onClick={handleDownloadResume}
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                className="button-secondary flex items-center gap-2 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Download size={20} className="relative z-10 group-hover:animate-bounce" />
                <span className="relative z-10">Download CV</span>
              </motion.button>
            </motion.div>

            {/* Social Media Icons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex justify-center lg:justify-start gap-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick(social.name.toLowerCase(), social.url)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.2, 
                    y: -5,
                    rotate: 360
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-dark-800/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-primary-500/20 transition-all duration-300 group"
                  style={{ color: social.color }}
                >
                  <social.icon size={20} className="group-hover:scale-110 transition-transform duration-300" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Photo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Profile Photo with Glowing Border */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 100 }}
                className="relative w-80 h-80 lg:w-96 lg:h-96"
              >
                {/* Animated Glowing Ring */}
                <motion.div
                  animate={{ rotate: 0 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #10b981, #3b82f6)',
                    padding: '4px'
                  }}
                >
                    <div className="w-full h-full rounded-full bg-dark-800 p-2">
                      {/* public/profile.jpg */}
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center overflow-hidden">
                        {/* public/profile.jpg */}
                        <img 
                          src="/profile.jpg" 
                          alt="Anishma RS Profile" 
                          className="w-full h-full object-cover rounded-full"
                          onError={(e) => {
                            // Fallback to initials if image fails to load
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        {/* Fallback initials if image doesn't load */}
                        <div className="w-full h-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-6xl font-bold hidden">
                          AR
                        </div>
                      </div>
                  </div>
                </motion.div>

                {/* Status Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                >
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    Available for Work
                  </div>
                </motion.div>

                {/* Education Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                >
                  <div className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    Currently pursuing B.Tech IT
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-8 -right-8 w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                  <span className="text-2xl">💻</span>
                </motion.div>

                <motion.div
                  animate={{ 
                    y: [0, 10, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute -bottom-8 -left-8 w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                  <span className="text-2xl">🎨</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToAbout}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-primary-400 transition-colors duration-300 group"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="group-hover:animate-pulse"
            >
              <ChevronDown size={32} />
            </motion.div>
            <p className="text-sm mt-2 group-hover:text-primary-400 transition-colors duration-300">
              Scroll to explore
            </p>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 