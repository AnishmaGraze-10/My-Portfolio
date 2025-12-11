import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Palette, Zap, Users } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    { name: 'Frontend Development', icon: Code, description: 'React, Vue, Angular, TypeScript' },
    { name: 'UI/UX Design', icon: Palette, description: 'Figma, Adobe XD, Sketch, Prototyping' },
    { name: 'Backend Development', icon: Zap, description: 'Node.js, Python, Java, Databases' },
    { name: 'Team Collaboration', icon: Users, description: 'Git, CI/CD, Code Review' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - Text Content */}
          <motion.div variants={itemVariants}>
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              About <span className="gradient-text">Me</span>
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-300 mb-6 leading-relaxed"
            >
              Detail-oriented MERN full-stack developer focused on building scalable web apps with responsive UIs and efficient backends. Experienced across MongoDB, Express.js, React.js, and Node.js, with a strong emphasis on database design, performance optimization, and end-to-end delivery.
            </motion.p>
            
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-300 mb-8 leading-relaxed"
            >
              Currently pursuing B.Tech IT (Anna University) and consistently exploring new web technologies. Outside of coding, I enjoy experimenting with AI/ML ideas, shipping side projects, and contributing to open source.
            </motion.p>

            {/* Personal Info */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
            >
              {[
                { label: 'Location', value: 'Nagercoil, Kanyakumari (DT), Tamil Nadu, India' },
                { label: 'Availability', value: 'Open to Work' },
                { label: 'Interests', value: 'AI, MERN, Python' },
              ].map((info, index) => (
                <motion.div
                  key={info.label}
                  variants={itemVariants}
                  className="glass-effect p-4 rounded-lg"
                >
                  <div className="text-primary-400 text-sm font-medium mb-1">
                    {info.label}
                  </div>
                  <div className="text-white font-semibold">
                    {info.value}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Skills Grid */}
          <motion.div variants={itemVariants}>
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold mb-8 text-center lg:text-left"
            >
              What I <span className="gradient-text">Do</span>
            </motion.h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-effect p-6 rounded-xl text-center group hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500/30 transition-colors duration-300">
                    <skill.icon size={24} className="text-primary-400" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-white">
                    {skill.name}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {skill.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section - Additional Info */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16"
        >
          <motion.div
            variants={itemVariants}
            className="glass-effect p-8 rounded-2xl text-center"
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold mb-4"
            >
              My <span className="gradient-text">Philosophy</span>
            </motion.h3>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              " Every project 
              is an opportunity to learn, innovate, and push the boundaries of 
              what's possible in web development."
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 