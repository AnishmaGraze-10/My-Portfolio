import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import { motion } from 'framer-motion';

// Enhanced 3D Icon Component
const FloatingIcon = ({ position, icon, color, size = 1, index }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth rotation
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
      
      // Floating animation with different speeds for each icon
      const floatSpeed = 0.3 + (index * 0.1);
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * floatSpeed) * 0.002;
      
      // Hover effect
      if (hovered) {
        meshRef.current.scale.x = 1.2;
        meshRef.current.scale.y = 1.2;
        meshRef.current.scale.z = 1.2;
      } else {
        meshRef.current.scale.x = size;
        meshRef.current.scale.y = size;
        meshRef.current.scale.z = size;
      }
    }
  });

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 500);
  };

  return (
    <Float
      speed={2}
      rotationIntensity={0.8}
      floatIntensity={0.8}
      position={position}
    >
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
        scale={size}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.7}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.5 : 0}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Glow effect on hover */}
      {hovered && (
        <mesh position={position} scale={size * 1.5}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial 
            color={color}
            transparent 
            opacity={0.2}
            emissive={color}
            emissiveIntensity={0.3}
          />
        </mesh>
      )}
      
      {/* Icon label */}
      <Html position={[0, 1.2, 0]} center>
        <div 
          className={`text-white text-xl font-bold bg-dark-800/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20 transition-all duration-300 ${
            hovered ? 'scale-110 shadow-lg shadow-primary-500/50' : 'scale-100'
          }`}
        >
          {icon}
        </div>
      </Html>
      
      {/* Click effect */}
      {clicked && (
        <Html position={[0, 0, 0]} center>
          <div className="text-2xl animate-ping">
            ✨
          </div>
        </Html>
      )}
    </Float>
  );
};

// Enhanced 2D Icons Component with better animations
const FloatingIcons2D = () => {
  const icons = useMemo(() => [
    { icon: '⚛️', color: '#61dafb', name: 'React' },
    { icon: '🔷', color: '#3b82f6', name: 'TypeScript' },
    { icon: '⚡', color: '#fbbf24', name: 'JavaScript' },
    { icon: '🎨', color: '#ec4899', name: 'Design' },
    { icon: '🚀', color: '#10b981', name: 'Node.js' },
    { icon: '💎', color: '#8b5cf6', name: 'Three.js' },
    { icon: '🔥', color: '#ef4444', name: 'Firebase' },
    { icon: '☁️', color: '#06b6d4', name: 'Cloud' },
  ], []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {icons.map((iconData, index) => (
        <div
          key={index}
          className="absolute group"
          style={{
            left: `${15 + (index * 10)}%`,
            top: `${10 + (index * 12)}%`,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ 
              delay: index * 0.2, 
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              opacity: 1, 
              scale: 1.2,
              rotate: 360,
              transition: { duration: 0.3 }
            }}
            className="relative"
          >
            <div 
              className="text-4xl cursor-pointer transition-all duration-300 hover:drop-shadow-lg"
              style={{ color: iconData.color }}
            >
              {iconData.icon}
            </div>
            
            {/* Tooltip */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-dark-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {iconData.name}
              </div>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

// Main Floating Icons Component with Error Handling
const FloatingIcons = () => {
  const [webGLAvailable, setWebGLAvailable] = useState(true);
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebGLAvailable(false);
    }
    
    // Show icons after a short delay
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!webGLAvailable || error) {
    return <FloatingIcons2D />;
  }

  const iconData = [
    { icon: '⚛️', position: [6, 2, -5], color: '#61dafb', size: 1.2, name: 'React' },
    { icon: '🔷', position: [-6, 3, -3], color: '#3b82f6', size: 1, name: 'TypeScript' },
    { icon: '⚡', position: [4, 1, -7], color: '#fbbf24', size: 0.8, name: 'JavaScript' },
    { icon: '🎨', position: [-4, 4, -4], color: '#ec4899', size: 1.1, name: 'Design' },
    { icon: '🚀', position: [8, 2, -2], color: '#10b981', size: 0.9, name: 'Node.js' },
    { icon: '💎', position: [-8, 1, -6], color: '#8b5cf6', size: 1.3, name: 'Three.js' },
    { icon: '🔥', position: [2, 3, -8], color: '#ef4444', size: 0.7, name: 'Firebase' },
    { icon: '☁️', position: [-2, 2, -9], color: '#06b6d4', size: 0.9, name: 'Cloud' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 75 }}
        style={{ background: 'transparent' }}
        onError={() => setError(true)}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Enhanced lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ec4899" />
        <pointLight position={[0, 10, 0]} intensity={0.6} color="#10b981" />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#020617', 15, 25]} />
        
        {isVisible && iconData.map((iconData, index) => (
          <FloatingIcon
            key={index}
            position={iconData.position}
            icon={iconData.icon}
            color={iconData.color}
            size={iconData.size}
            index={index}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default FloatingIcons; 