import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';

// 3D Skill Icon Component
const SkillIcon3D = ({ position, icon, name, level, color }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = React.useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      if (hovered) {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      position={position}
    >
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.3 : 1}
      >
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.8}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </mesh>
      <Html position={[0, 2, 0]} center>
        <div className="text-center">
          <div className="text-white text-lg font-bold bg-dark-800/90 px-3 py-1 rounded-lg mb-1">
            {icon}
          </div>
          <div className="text-primary-400 text-sm font-medium bg-dark-800/90 px-2 py-1 rounded">
            {name}
          </div>
        </div>
      </Html>
    </Float>
  );
};

// 2D Skills Visualization Component
const Skills2D = ({ skills }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="glass-effect p-6 rounded-xl text-center group hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300"
        >
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
            {skill.icon}
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">{skill.name}</h3>
          <div className="w-full bg-dark-700 rounded-full h-2 mb-2">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
              className="h-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
            />
          </div>
          <span className="text-primary-400 text-sm font-medium">{skill.level}%</span>
        </motion.div>
      ))}
    </div>
  );
};

// 2D Skill Card Component
const SkillCard = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass-effect p-6 rounded-xl group hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center group-hover:bg-primary-500/30 transition-colors duration-300">
            <span className="text-xl">{skill.icon}</span>
          </div>
          <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
        </div>
        <span className="text-primary-400 font-bold">{skill.level}%</span>
      </div>
      
      <div className="w-full bg-dark-700 rounded-full h-2 mb-2">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
          className="h-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
        />
      </div>
      
      <p className="text-gray-400 text-sm">{skill.description}</p>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const [webGLAvailable, setWebGLAvailable] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebGLAvailable(false);
    }
  }, []);

  const skills = [
    { name: 'React', icon: '⚛️', level: 95, description: 'Advanced React with Hooks, Context, and Performance optimization' },
    { name: 'JavaScript', icon: '🟨', level: 90, description: 'ES6+, Modern JavaScript, Async/Await, Promises' },
    { name: 'Node.js', icon: '🟢', level: 85, description: 'Backend development, Express.js, REST APIs, Authentication' },
    { name: 'TypeScript', icon: '🔷', level: 80, description: 'Type safety, Interfaces, Generics, Advanced types' },
    { name: 'Python', icon: '🐍', level: 75, description: 'Data analysis, Machine Learning, Django, Flask' },
    { name: 'MongoDB', icon: '🍃', level: 85, description: 'NoSQL databases, Mongoose, Aggregation, Indexing' },
   
  ];

  const threeJSkills = [
    { icon: '⚛️', name: 'React', position: [0, 0, -5], color: '#61dafb', level: 95 },
    { icon: '🟨', name: 'JavaScript', position: [3, 2, -3], color: '#f7df1e', level: 90 },
    { icon: '🟢', name: 'Node.js', position: [-3, 1, -4], color: '#339933', level: 85 },
    { icon: '🔷', name: 'TypeScript', position: [5, 0, -2], color: '#3178c6', level: 80 },
    { icon: '🐍', name: 'Python', position: [-5, 3, -3], color: '#3776ab', level: 75 },
    { icon: '🍃', name: 'MongoDB', position: [2, -2, -6], color: '#47a248', level: 85 },
  ];

  return (
    <section id="skills" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels 
            across various technologies and frameworks.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - 3D/2D Skills Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="h-96 lg:h-[500px] relative"
          >
            {webGLAvailable && !error ? (
              <Canvas
                camera={{ position: [0, 0, 10], fov: 75 }}
                style={{ background: 'transparent' }}
                onError={() => setError(true)}
              >
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                
                {threeJSkills.map((skill, index) => (
                  <SkillIcon3D
                    key={skill.name}
                    position={skill.position}
                    icon={skill.icon}
                    name={skill.name}
                    level={skill.level}
                    color={skill.color}
                  />
                ))}
              </Canvas>
            ) : (
              <Skills2D skills={threeJSkills} />
            )}
          </motion.div>

          {/* Right Column - Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 