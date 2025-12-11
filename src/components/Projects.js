import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Filter, Grid, List, Search, X } from 'lucide-react';
import analytics from '../services/analytics';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleProjectClick = (type, url) => {
    analytics.trackProjectClick(project.title, url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ 
        scale: 1.02, 
        y: -15,
        rotateY: 8,
        rotateX: 3
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="glass-effect rounded-2xl overflow-hidden group cursor-pointer transform-gpu transition-all duration-700"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1200px'
      }}
    >
      {/* Enhanced Project Image */}
      <div className="relative h-48 overflow-hidden">
        {/* Animated Background */}
        <motion.div 
          animate={{ 
            background: isHovered 
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))'
              : 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.2))'
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        />
        
        {/* Project Icon */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-6xl filter drop-shadow-lg">{project.icon}</span>
        </motion.div>
        
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/40 to-transparent"></div>
        
        {/* Enhanced Hover Overlay */}
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            backdropFilter: isHovered ? 'blur(8px)' : 'blur(0px)'
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-primary-500/30 flex items-center justify-center gap-6"
        >
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleProjectClick('github', project.github)}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-all duration-300 border border-white/30"
            >
              <Github size={24} className="text-white" />
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleProjectClick('demo', project.demo)}
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.2, rotate: -360 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-all duration-300 border border-white/30"
            >
              <ExternalLink size={24} className="text-white" />
            </motion.a>
          )}
        </motion.div>

        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-4 right-4"
        >
          <span className="px-3 py-1 bg-primary-500/90 text-white text-xs font-bold rounded-full backdrop-blur-sm">
            {project.category}
          </span>
        </motion.div>
      </div>

      {/* Enhanced Project Content */}
      <div className="p-6">
        <motion.h3 
          className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300"
          animate={{ color: isHovered ? '#3b82f6' : '#ffffff' }}
        >
          {project.title}
        </motion.h3>
        <p className="text-gray-400 mb-4 leading-relaxed">
          {project.description}
        </p>
        
        {/* Enhanced Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, techIndex) => (
            <motion.span
              key={techIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: techIndex * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1 bg-primary-500/20 text-primary-400 text-xs font-medium rounded-full border border-primary-500/30 hover:bg-primary-500/30 transition-all duration-300"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Enhanced Project Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <motion.span
            whileHover={{ color: '#3b82f6' }}
            className="transition-colors duration-300"
          >
            {project.category}
          </motion.span>
          <motion.span
            whileHover={{ color: '#3b82f6' }}
            className="transition-colors duration-300"
          >
            {project.year}
          </motion.span>
        </div>
      </div>

      {/* Glow Effect on Hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/20 to-primary-600/20 blur-xl -z-10"
        />
      )}
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce platform with real-time inventory management, payment processing, and admin dashboard.",
      icon: "🛒",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "Socket.io"],
      category: "Full Stack",
      year: "2024",
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      title: "Task Management System",
      description: "Collaborative task management system with real-time updates, file sharing, and team collaboration features.",
      icon: "📋",
      tech: ["Vue.js", "Express.js", "MongoDB", "JWT", "Multer"],
      category: "Web App",
      year: "2023",
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      title: "Portfolio Website",
      description: "Interactive portfolio website with 3D animations, particle effects, and modern design principles.",
      icon: "🎨",
      tech: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
      category: "Frontend",
      year: "2024",
      github: "https://github.com",
      demo: "https://demo.com"
    },
   
  ];

  const categories = ["All", "Full Stack", "Frontend", "Backend", "AI/ML", "Mobile", "Data Viz", "Analytics"];

  // Filter projects based on category and search query
  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Track search queries
  useEffect(() => {
    if (searchQuery) {
      const timeoutId = setTimeout(() => {
        analytics.trackSearchQuery(searchQuery, filteredProjects.length);
      }, 1000); // Debounce search tracking

      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, filteredProjects.length]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    analytics.trackEvent('project_filter', { category });
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    analytics.trackEvent('view_mode_change', { mode });
  };

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A showcase of my recent work, featuring full-stack applications, 
            innovative solutions, and creative designs.
          </p>
        </motion.div>

        {/* Enhanced Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 mb-12"
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-dark-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
              />
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <X size={20} />
                </motion.button>
              )}
            </div>
          </div>

          {/* Category Filter and View Mode */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-primary-400" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                        : 'bg-dark-800 text-gray-400 hover:bg-dark-700 hover:text-white'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-dark-800 rounded-lg p-1">
              <motion.button
                onClick={() => handleViewModeChange('grid')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid size={18} />
              </motion.button>
              <motion.button
                onClick={() => handleViewModeChange('list')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-md transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <List size={18} />
              </motion.button>
            </div>
          </div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 text-sm"
          >
            Showing {filteredProjects.length} of {projects.length} projects
            {searchQuery && ` matching "${searchQuery}"`}
          </motion.div>
        </motion.div>

        {/* Projects Grid with Animated Filtering */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchQuery}-${viewMode}`}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No projects found</h3>
            <p className="text-gray-400">
              Try adjusting your search criteria or category filter.
            </p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.trackSocialClick('github', 'https://github.com')}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="button-primary inline-flex items-center gap-2"
          >
            <Github size={20} />
            View More Projects
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 