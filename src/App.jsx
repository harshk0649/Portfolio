import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Hero3D from './components/Hero3D';
import ProjectCard from './components/ProjectCard';
import SkillIcon from './components/SkillIcon';
import ContactForm from './components/ContactForm';

function App() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React frontend, Node.js backend, and MongoDB database. Features include user authentication, payment processing, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
      link: "#"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      technologies: ["React", "Express", "Socket.io", "PostgreSQL", "Material-UI"],
      link: "#"
    },
    {
      title: "Weather Dashboard",
      description: "Interactive weather application with location-based forecasts, historical data visualization, and personalized weather alerts.",
      technologies: ["React", "Node.js", "Chart.js", "OpenWeather API", "Geolocation"],
      link: "#"
    },
    {
      title: "Social Media Analytics",
      description: "Dashboard for social media analytics with data visualization, trend analysis, and automated reporting features.",
      technologies: ["React", "D3.js", "Python", "FastAPI", "PostgreSQL"],
      link: "#"
    },
    {
      title: "Real-time Chat Application",
      description: "Scalable chat platform with real-time messaging, file sharing, and group chat functionality using WebSocket technology.",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB", "AWS S3"],
      link: "#"
    },
    {
      title: "Portfolio Website",
      description: "Modern, responsive portfolio website built with React and Framer Motion, featuring smooth animations and interactive elements.",
      technologies: ["React", "Framer Motion", "Tailwind CSS", "Vite", "Vercel"],
      link: "#"
    }
  ];

  const skills = [
    { name: "React", icon: "⚛️", level: 95 },
    { name: "Node.js", icon: "🟢", level: 90 },
    { name: "TypeScript", icon: "🔷", level: 85 },
    { name: "Python", icon: "🐍", level: 80 },
    { name: "MongoDB", icon: "🍃", level: 75 },
    { name: "PostgreSQL", icon: "🐘", level: 80 },
    { name: "Express.js", icon: "🚂", level: 85 },
    { name: "Tailwind CSS", icon: "🎨", level: 90 }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CTO, TechCorp",
      company: "TechCorp",
      testimonial: "Harsh delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and modern tech stack made all the difference.",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      position: "Product Manager, InnovateLabs",
      company: "InnovateLabs",
      testimonial: "Working with Harsh was a great experience. His full-stack development skills and ability to deliver scalable solutions are outstanding.",
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      position: "Engineering Director, DataFlow",
      company: "DataFlow",
      testimonial: "Harsh's expertise in React and Node.js helped us build a robust platform quickly. His code quality and problem-solving skills are top-notch.",
      avatar: "ER"
    },
    {
      name: "David Kim",
      position: "Founder, StartupXYZ",
      company: "StartupXYZ",
      testimonial: "Harsh brought creativity and technical excellence to our team. His work on our full-stack applications improved our user experience significantly. A true professional.",
      avatar: "DK"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Interactive Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Dynamic Grid Lines */}
          <motion.div
            className="absolute inset-0 opacity-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 2 }}
          >
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00ff88" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </motion.div>

          {/* Floating Data Points */}
          {Array.from({ length: 30 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-green-400 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6],
                rotate: [0, 360],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* 3D Floating Cubes */}
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={`cube-${i}`}
              className="absolute w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-30"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
                transform: `perspective(1000px) rotateX(${i * 45}deg) rotateY(${i * 60}deg)`,
              }}
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 3,
              }}
            />
          ))}

          {/* 3D Floating Spheres */}
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={`sphere-${i}`}
              className="absolute w-12 h-12 bg-gradient-to-r from-pink-400 to-orange-500 rounded-full opacity-25 blur-sm"
              style={{
                left: `${15 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                transform: `perspective(1000px) rotateX(${i * 30}deg)`,
              }}
              animate={{
                y: [0, -50, 0],
                rotateX: [0, 180, 360],
                scale: [1, 1.3, 1],
                opacity: [0.25, 0.5, 0.25],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 4,
              }}
            />
          ))}

          {/* 3D Geometric Shapes */}
          {Array.from({ length: 5 }, (_, i) => (
            <motion.div
              key={`shape-${i}`}
              className={`absolute w-10 h-10 opacity-20 ${i % 2 === 0 ? 'bg-gradient-to-r from-blue-400 to-green-500' : 'bg-gradient-to-r from-yellow-400 to-red-500'}`}
              style={{
                left: `${20 + i * 16}%`,
                top: `${40 + (i % 2) * 30}%`,
                transform: `perspective(1000px) rotateZ(${i * 72}deg) rotateX(${i * 36}deg)`,
                clipPath: i % 3 === 0 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : i % 3 === 1 ? 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' : 'circle(50% at 50% 50%)',
              }}
              animate={{
                rotateZ: [0, 360],
                rotateX: [0, 180],
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 12 + Math.random() * 6,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          {/* Professional Content with Moving Border */}
          <motion.div
            className="relative bg-gray-900 rounded-lg p-8 mb-8 mx-auto max-w-4xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated Border */}
            <motion.div
              className="absolute inset-0 rounded-lg"
              style={{
                background: 'conic-gradient(from 0deg, #00ff88, #0099ff, #ff0080, #ffaa00, #00ff88)',
                padding: '2px',
              }}
              animate={{
                background: [
                  'conic-gradient(from 0deg, #00ff88, #0099ff, #ff0080, #ffaa00, #00ff88)',
                  'conic-gradient(from 360deg, #00ff88, #0099ff, #ff0080, #ffaa00, #00ff88)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="bg-gray-900 bg-opacity-90 rounded-lg h-full w-full"></div>
            </motion.div>

            {/* Terminal Header */}
            <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-400 font-mono text-sm ml-4">harsh@portfolio:~$</span>
              </div>
              <motion.div
                className="text-green-400 font-mono text-sm"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ●
              </motion.div>
            </div>

            {/* Professional Content */}
            <div className="space-y-6 text-center relative z-10">
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
              >
                Harsh Khatri
              </motion.h1>

              <motion.div
                className="text-2xl md:text-3xl text-cyan-300 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5 }}
              >
                Full-Stack Developer
              </motion.div>

              <motion.div
                className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 1.5 }}
              >
                Crafting innovative solutions through modern web technologies and creative problem-solving
              </motion.div>

              {/* Professional Tags */}
              <motion.div
                className="flex flex-wrap justify-center gap-3 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                {[
                  { text: "React", color: "from-blue-500 to-cyan-500" },
                  { text: "Node.js", color: "from-purple-500 to-pink-500" },
                  { text: "TypeScript", color: "from-green-500 to-teal-500" },
                  { text: "Full Stack", color: "from-orange-500 to-red-500" }
                ].map((tag, index) => (
                  <motion.span
                    key={index}
                    className={`px-4 py-2 bg-gradient-to-r ${tag.color} bg-opacity-20 border border-opacity-30 rounded-full text-white text-sm font-medium backdrop-blur-sm`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {tag.text}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>

            {/* Interactive Action Button */}
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <motion.button
              className="group relative bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-10 py-5 rounded-lg font-mono font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                🚀 View My Work
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  🔍
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                initial={false}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.button>
          </motion.div>

          {/* Dynamic Status Indicators */}
          <motion.div
            className="mt-12 flex justify-center space-x-8 text-sm font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            <motion.div
              className="flex items-center space-x-2 text-cyan-400"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span>React Online</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2 text-purple-400"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span>Node.js Active</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2 text-green-400"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Ready to Code</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Floating Code Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Massive Code Rain Effect */}
          {Array.from({ length: 25 }, (_, i) => (
            <motion.div
              key={`code-${i}`}
              className={`absolute font-mono opacity-80 ${i % 3 === 0 ? 'text-green-300' : i % 3 === 1 ? 'text-cyan-300' : 'text-blue-300'}`}
              style={{
                left: `${(i * 4) % 100}%`,
                top: `-50px`,
                fontSize: `${12 + Math.random() * 8}px`,
                fontWeight: 'bold',
              }}
              animate={{
                y: ['0vh', '130vh'],
                opacity: [0, 0.9, 0.9, 0],
                x: [0, Math.random() * 20 - 10, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear"
              }}
            >
              {[
                '01010101', 'function()', 'import AI', 'neuralNet', 'predict()',
                '<AI/>', '{ML}', 'train()', 'deploy()', 'class AI', 'async def',
                'const model', 'def predict', 'import torch', 'from sklearn',
                'tensorflow', 'keras', 'numpy', 'pandas', 'matplotlib',
                'docker run', 'kubectl', 'aws s3', 'git commit', 'npm install'
              ][i % 25]}
            </motion.div>
          ))}

          {/* Previous 3D Sphere Elements - Restored and Enhanced */}
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-20 blur-sm"
            animate={{
              y: [0, -40, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.div
            className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-pink-400 to-red-500 rounded-lg opacity-25 blur-sm"
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
              rotate: [0, -180, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

          <motion.div
            className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-30 blur-sm"
            animate={{
              rotate: [0, 360],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />

          <motion.div
            className="absolute bottom-1/3 left-1/4 w-28 h-28 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 blur-sm"
            animate={{
              y: [0, 35, 0],
              x: [0, -25, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />

          <motion.div
            className="absolute top-1/4 right-1/3 w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full opacity-25 blur-sm"
            animate={{
              rotate: [0, -360],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />

          {/* Massive Interactive Elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 text-cyan-300 opacity-40 font-mono text-4xl cursor-pointer"
            whileHover={{ scale: 1.5, opacity: 1 }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ⚡
          </motion.div>

          <motion.div
            className="absolute bottom-1/4 right-1/4 text-pink-300 opacity-50 font-mono text-5xl cursor-pointer"
            whileHover={{ scale: 1.8, opacity: 1 }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            🤖
          </motion.div>

          {/* Additional Massive AI Symbols */}
          <motion.div
            className="absolute top-1/2 left-1/3 text-purple-300 opacity-35 font-mono text-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.35, 0.7, 0.35],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            🧠
          </motion.div>

          <motion.div
            className="absolute top-2/3 right-1/3 text-blue-300 opacity-40 font-mono text-2xl"
            animate={{
              rotate: [0, 360],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          >
            ⚙️
          </motion.div>

          {/* Floating Binary Code Blocks */}
          <motion.div
            className="absolute top-1/6 right-1/6 text-green-300 opacity-60 font-mono text-sm font-bold"
            animate={{
              y: [0, -100, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: 0.5
            }}
          >
            01010101<br/>
            10101010<br/>
            01010101
          </motion.div>

          <motion.div
            className="absolute bottom-1/6 left-1/6 text-cyan-300 opacity-50 font-mono text-xs font-bold"
            animate={{
              x: [0, 50, 0],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            function train() {'{'}<br/>
            &nbsp;&nbsp;return model<br/>
            {'}'}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        {/* Massive 3D Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Neural Network Visualization */}
          <motion.div
            className="absolute top-20 left-10 w-24 h-24 border-2 border-green-400 rounded-full opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-32 left-32 w-16 h-16 border-2 border-blue-400 rounded-full opacity-15"
            animate={{
              scale: [1, 0.8, 1],
              rotate: [360, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute top-16 left-48 w-20 h-20 border-2 border-purple-400 rounded-full opacity-25"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />

          {/* Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            <motion.line
              x1="15%" y1="25%" x2="25%" y2="20%" stroke="#00ff88" strokeWidth="1"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.line
              x1="25%" y1="20%" x2="35%" y2="25%" stroke="#00ff88" strokeWidth="1"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />
            <motion.line
              x1="35%" y1="25%" x2="45%" y2="20%" stroke="#00ff88" strokeWidth="1"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            />
          </svg>

          {/* Floating AI Symbols */}
          <motion.div
            className="absolute top-1/4 right-1/4 text-cyan-400 opacity-30 text-6xl"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🧠
          </motion.div>

          <motion.div
            className="absolute bottom-1/4 left-1/4 text-green-400 opacity-25 text-5xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            ⚡
          </motion.div>

          <motion.div
            className="absolute top-1/2 right-1/6 text-purple-400 opacity-20 text-4xl"
            animate={{
              x: [0, 30, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            🤖
          </motion.div>

          {/* Code Matrix Effect */}
          <motion.div
            className="absolute bottom-20 right-20 text-green-400 opacity-20 font-mono text-sm"
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            01010101<br/>
            10101010<br/>
            01010101<br/>
            11110000
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl border border-green-400 border-opacity-30 p-8 mb-8 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-5xl font-bold text-white mb-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About Me
            </motion.h2>

            <motion.div
              className="text-xl text-gray-300 leading-relaxed space-y-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <p>
                Passionate Full-Stack Developer specializing in modern web technologies
              </p>
              <p>
                Expert in React, Node.js, and TypeScript with experience in building scalable applications
              </p>
              <p>
                Creating innovative solutions from responsive web apps to robust backend systems
              </p>
              <p>
                Always exploring new technologies and best practices in software development
              </p>
              <motion.div
                className="text-cyan-400 mt-6 font-semibold"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Always Learning, Always Innovating 🚀
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Interactive Skill Showcase */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {[
              { icon: "⚛️", title: "React Expert", desc: "Modern React applications with hooks and state management" },
              { icon: "🟢", title: "Node.js Developer", desc: "Backend APIs, Express, and server-side JavaScript" },
              { icon: "🚀", title: "Full Stack", desc: "End-to-end web development and deployment" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-lg border border-blue-400 border-opacity-20 p-6 hover:border-opacity-40 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="text-4xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2 font-mono">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Professional 3D Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Geometric Shapes */}
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 border-2 border-indigo-300 rounded-lg opacity-20"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-10 blur-xl"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/4 w-20 h-20 border border-cyan-300 rounded-full opacity-15"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

          {/* Floating Professional Elements */}
          <motion.div
            className="absolute top-1/3 right-1/3 text-indigo-400 opacity-20 text-4xl"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            💼
          </motion.div>

          <motion.div
            className="absolute bottom-1/3 left-1/3 text-blue-400 opacity-15 text-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 15, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            📈
          </motion.div>

          <motion.div
            className="absolute top-1/2 right-1/4 text-purple-400 opacity-25 text-2xl"
            animate={{
              rotate: [0, 360],
              opacity: [0.25, 0.5, 0.25],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          >
            🏆
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Professional Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A journey of innovation and leadership in technology
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-400 via-blue-400 to-purple-400 transform md:-translate-x-0.5"></div>

            <div className="space-y-12">
              {[
                {
                  title: "Senior AI/ML Engineer",
                  company: "TechNova AI",
                  period: "2023 - Present",
                  description: "Leading development of enterprise-scale AI solutions, architecting neural network systems, and mentoring ML teams. Deployed production models serving 1M+ users with 99.9% uptime.",
                  technologies: ["TensorFlow", "PyTorch", "AWS", "Kubernetes", "MLOps"],
                  achievements: ["40% improvement in model accuracy", "Led team of 8 engineers", "Published 3 research papers"]
                },
                {
                  title: "Machine Learning Engineer",
                  company: "DataFlow Systems",
                  period: "2021 - 2023",
                  description: "Developed and deployed computer vision systems for autonomous vehicles. Built scalable ML pipelines processing 100TB+ data daily, reducing inference time by 60%.",
                  technologies: ["Python", "OpenCV", "scikit-learn", "Docker", "Apache Spark"],
                  achievements: ["60% faster inference", "Processed 100TB+ daily", "Patent filed for CV algorithm"]
                },
                {
                  title: "Full-Stack Developer & ML Researcher",
                  company: "InnovateAI Labs",
                  period: "2019 - 2021",
                  description: "Created responsive web applications with integrated ML capabilities. Developed NLP models for sentiment analysis achieving 94% accuracy. Built CI/CD pipelines for ML deployment.",
                  technologies: ["React", "Node.js", "Python", "NLP", "Jenkins"],
                  achievements: ["94% model accuracy", "40% faster deployment", "Open-source contributions"]
                }
              ].map((exp, index) => (
                <motion.div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    className="absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transform md:-translate-x-2 z-10"
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />

                  {/* Content Card */}
                  <motion.div
                    className={`w-full md:w-5/12 ml-16 md:ml-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">{exp.title}</h3>
                        <p className="text-indigo-600 font-semibold text-lg">{exp.company}</p>
                      </div>
                      <span className="text-gray-500 font-medium mt-2 md:mt-0 px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">{exp.description}</p>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Key Achievements</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-center text-gray-600">
                            <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3 flex-shrink-0"></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 rounded-full text-sm font-medium border border-indigo-200"
                            whileHover={{ scale: 1.05, y: -1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        {/* Subtle Hacker Vibes */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 text-purple-500 opacity-5 font-mono text-xs"
            animate={{
              opacity: [0.05, 0.08, 0.05],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {'{'}...{'}'}
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 right-1/4 text-cyan-500 opacity-5 font-mono text-xs"
            animate={{
              opacity: [0.05, 0.07, 0.05],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            01010101
          </motion.div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl font-bold text-gray-800 mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Education
          </motion.h2>
          <motion.div
            className="bg-gray-50 rounded-lg p-8 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Bachelor of Computer Science</h3>
            <p className="text-blue-600 font-semibold text-lg mb-4">University of Technology</p>
            <p className="text-gray-600 mb-4">2015 - 2019</p>
            <p className="text-gray-700">
              Graduated with honors, specializing in Software Engineering and Web Technologies.
              Completed capstone project on AI-driven web applications, achieving 95% grade.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-gray-100 relative overflow-hidden">
        {/* Floating 3D Elements with Coding Theme */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Matrix-style falling code */}
          <motion.div
            className="absolute top-16 right-16 text-green-500 opacity-20 font-mono text-sm"
            animate={{
              y: [0, 100, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            101010
          </motion.div>
          <motion.div
            className="absolute bottom-16 left-16 text-blue-500 opacity-15 font-mono text-xs"
            animate={{
              y: [0, -80, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: 1
            }}
          >
            function()
          </motion.div>
          <motion.div
            className="absolute top-1/2 left-1/3 text-purple-500 opacity-25 font-mono text-xs"
            animate={{
              x: [0, 50, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            {'</>'}
          </motion.div>
          {/* Circuit board pattern */}
          <motion.div
            className="absolute top-1/4 right-1/4 text-cyan-500 opacity-10 font-mono text-lg"
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            ▓▒░
          </motion.div>
          {/* More coder vibes */}
          <motion.div
            className="absolute top-1/3 left-1/4 text-red-500 opacity-12 font-mono text-xs"
            animate={{
              opacity: [0.12, 0.25, 0.12],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2
            }}
          >
            {'import React'}
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 right-1/3 text-orange-500 opacity-12 font-mono text-xs"
            animate={{
              opacity: [0.12, 0.2, 0.12],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.8
            }}
          >
            {'export default'}
          </motion.div>
          <motion.div
            className="absolute top-2/3 left-1/2 text-indigo-500 opacity-12 font-mono text-xs"
            animate={{
              opacity: [0.12, 0.18, 0.12],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
          >
            {'console.log()'}
          </motion.div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Skills & Technologies
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <SkillIcon key={index} {...skill} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Enhanced 3D Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Massive 3D Geometric Shapes */}
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 border-4 border-indigo-400 rounded-lg opacity-15"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              transform: "perspective(1000px) rotateX(45deg) rotateY(45deg)",
            }}
          />

          <motion.div
            className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full opacity-20 blur-xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
              rotate: [0, -180, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            style={{
              transform: "perspective(1000px) rotateX(30deg)",
            }}
          />

          <motion.div
            className="absolute bottom-20 left-1/4 w-28 h-28 border-2 border-cyan-400 rounded-full opacity-25"
            animate={{
              scale: [1, 1.4, 1],
              rotate: [0, 360, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            style={{
              transform: "perspective(1000px) rotateY(60deg)",
            }}
          />

          <motion.div
            className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg opacity-30 blur-sm"
            animate={{
              y: [0, -25, 0],
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
            style={{
              transform: "perspective(1000px) rotateX(20deg) rotateZ(45deg)",
            }}
          />

          <motion.div
            className="absolute bottom-1/3 left-1/3 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20"
            animate={{
              x: [0, -15, 0],
              y: [0, 20, 0],
              rotate: [0, -360, 0],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
            style={{
              transform: "perspective(1000px) rotateY(30deg) rotateX(15deg)",
            }}
          />

          {/* Floating 3D Code Elements */}
          <motion.div
            className="absolute top-1/4 left-1/2 text-cyan-500 opacity-20 font-mono text-lg font-bold"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            style={{
              transform: "perspective(1000px) rotateX(45deg)",
            }}
          >
            {'</>'}
          </motion.div>

          <motion.div
            className="absolute bottom-1/4 right-1/3 text-purple-500 opacity-25 font-mono text-xl font-bold"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            style={{
              transform: "perspective(1000px) rotateY(60deg)",
            }}
          >
            {'{}'}
          </motion.div>

          <motion.div
            className="absolute top-2/3 left-1/4 text-green-500 opacity-15 font-mono text-base font-bold"
            animate={{
              x: [0, 25, 0],
              rotate: [0, -90, -180, -270, -360],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
            style={{
              transform: "perspective(1000px) rotateZ(30deg)",
            }}
          >
            {'function()'}
          </motion.div>

          {/* 3D Floating Particles */}
          {Array.from({ length: 15 }, (_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-30"
              style={{
                left: `${10 + (i * 6) % 80}%`,
                top: `${20 + (i * 8) % 60}%`,
                transform: `perspective(1000px) rotateX(${i * 15}deg) rotateY(${i * 20}deg)`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, 20, 0],
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              animate={{
                textShadow: [
                  "0 0 20px rgba(99, 102, 241, 0.5)",
                  "0 0 40px rgba(147, 51, 234, 0.5)",
                  "0 0 20px rgba(99, 102, 241, 0.5)",
                ],
              }}
            >
              Featured Projects
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Innovative solutions built with cutting-edge technologies and creative problem-solving
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                  z: 50,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              href="#contact"
              className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Build Something Amazing
            </motion.a>
          </motion.div>
        </div>
      </section>



      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white relative overflow-hidden">
        {/* Massive 3D Neural Network Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Neural Network Nodes */}
          {Array.from({ length: 12 }, (_, i) => (
            <motion.div
              key={`node-${i}`}
              className={`absolute border-2 rounded-full opacity-20 ${i % 3 === 0 ? 'border-green-400' : i % 3 === 1 ? 'border-blue-400' : 'border-purple-400'}`}
              style={{
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, 360],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Connecting Neural Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-15">
            {Array.from({ length: 8 }, (_, i) => (
              <motion.line
                key={`line-${i}`}
                x1={`${10 + i * 10}%`}
                y1={`${20 + Math.random() * 60}%`}
                x2={`${20 + i * 10}%`}
                y2={`${20 + Math.random() * 60}%`}
                stroke="#00ff88"
                strokeWidth="1"
                animate={{ opacity: [0.15, 0.4, 0.15] }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </svg>

          {/* Floating AI Elements */}
          <motion.div
            className="absolute top-20 left-20 text-cyan-400 opacity-30 text-6xl"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🧠
          </motion.div>

          <motion.div
            className="absolute bottom-20 right-20 text-green-400 opacity-25 text-5xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            ⚡
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-1/4 text-purple-400 opacity-20 text-4xl"
            animate={{
              rotate: [0, 360],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            🤖
          </motion.div>

          <motion.div
            className="absolute bottom-1/4 right-1/3 text-blue-400 opacity-25 text-3xl"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          >
            🚀
          </motion.div>

          {/* Matrix Code Rain */}
          <motion.div
            className="absolute top-1/4 right-1/4 text-green-400 opacity-20 font-mono text-sm"
            animate={{
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            01010101<br/>
            10101010<br/>
            01010101<br/>
            11110000<br/>
            00001111
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl border border-green-400 border-opacity-30 p-8 mb-12 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Let's Connect
            </motion.h2>

            <motion.div
              className="text-xl text-gray-300 leading-relaxed space-y-6 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <p>
                Ready to collaborate on innovative projects?
              </p>
              <p>
                Let's build the future together - from web applications to machine learning solutions
              </p>
              <motion.div
                className="text-cyan-400 mt-6 font-semibold"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Connection Established 🔗
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-lg border border-blue-400 border-opacity-20 p-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-cyan-400">Contact Information</h3>
              <p className="text-lg mb-8 text-gray-300">
                Open to collaborations, research partnerships, and innovative projects.
                Let's connect and explore possibilities!
              </p>
              <div className="space-y-6">
                <motion.div
                  className="flex items-center p-4 bg-gray-700 bg-opacity-50 rounded-lg border border-gray-600"
                  whileHover={{ scale: 1.02, borderColor: '#00ff88' }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-green-500 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white font-mono">Email</p>
                    <p className="text-gray-300">harsh.khatri@example.com</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center p-4 bg-gray-700 bg-opacity-50 rounded-lg border border-gray-600"
                  whileHover={{ scale: 1.02, borderColor: '#00ff88' }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-blue-500 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white font-mono">Phone</p>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center p-4 bg-gray-700 bg-opacity-50 rounded-lg border border-gray-600"
                  whileHover={{ scale: 1.02, borderColor: '#00ff88' }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-purple-500 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white font-mono">Location</p>
                    <p className="text-gray-300">San Francisco, CA</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-lg border border-purple-400 border-opacity-20 p-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-purple-400">Send Message</h3>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white py-12 relative overflow-hidden">
        {/* Massive 3D Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Neural Network Grid */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            <defs>
              <pattern id="footer-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00ff88" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#footer-grid)" />
          </svg>

          {/* Floating AI Elements */}
          <motion.div
            className="absolute top-20 left-20 text-cyan-400 opacity-30 text-4xl"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🧠
          </motion.div>

          <motion.div
            className="absolute bottom-20 right-20 text-green-400 opacity-25 text-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            ⚡
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-1/4 text-purple-400 opacity-20 text-2xl"
            animate={{
              rotate: [0, -180, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            🤖
          </motion.div>

          <motion.div
            className="absolute bottom-1/4 right-1/3 text-blue-400 opacity-25 text-xl"
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          >
            🚀
          </motion.div>

          {/* Matrix Code Rain */}
          <motion.div
            className="absolute top-1/4 right-1/4 text-green-400 opacity-15 font-mono text-xs"
            animate={{
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            01010101<br/>
            10101010<br/>
            11110000
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl border border-green-400 border-opacity-30 p-8 mb-12 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h3
              className="text-4xl font-bold text-center mb-8 text-cyan-400"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Thank You
            </motion.h3>

            <motion.div
              className="text-xl text-gray-300 leading-relaxed space-y-6 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <p>
                Thank you for exploring my portfolio
              </p>
              <p>
                Let's connect and build amazing things together
              </p>
              <motion.div
                className="text-cyan-400 mt-6 font-semibold"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Always Innovating 🚀
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <motion.div
                className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-lg border border-blue-400 border-opacity-20 p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">About Me</h3>
                <p className="text-gray-300 mb-6">
                  Full-Stack Developer passionate about creating innovative solutions
                  that push the boundaries of technology.
                </p>
                <div className="flex space-x-4">
                  <motion.a
                    href="#"
                    className="bg-gray-700 p-3 rounded-lg border border-gray-600 hover:border-green-400 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </motion.a>
                  <motion.a
                    href="#"
                    className="bg-gray-700 p-3 rounded-lg border border-gray-600 hover:border-green-400 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </motion.a>
                  <motion.a
                    href="#"
                    className="bg-gray-700 p-3 rounded-lg border border-gray-600 hover:border-green-400 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 6.627 5.374 12 12 12s12-5.373 12-12c0-6.627-5.374-12-12-12zm4.562 8.161c-.18.717-.962 1.228-1.93 1.228-.664 0-1.23-.45-1.23-1.357 0-.867.545-1.492 1.23-1.492.664 0 1.23.45 1.23 1.357 0 .093-.005.18-.008.264zm-4.56 1.615c-.664 0-1.23-.45-1.23-1.357 0-.867.545-1.492 1.23-1.492.664 0 1.23.45 1.23 1.357 0 .867-.545 1.492-1.23 1.492zm4.56 0c-.664 0-1.23-.45-1.23-1.357 0-.867.545-1.492 1.23-1.492.664 0 1.23.45 1.23 1.357 0 .867-.545 1.492-1.23 1.492z"/>
                    </svg>
                  </motion.a>
                  <motion.a
                    href="#"
                    className="bg-gray-700 p-3 rounded-lg border border-gray-600 hover:border-green-400 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 6.627 5.374 12 12 12s12-5.373 12-12c0-6.627-5.374-12-12-12zm2.218 18.616c-.354.069-.468-.149-.468-.27v-2.34c0-.229-.08-.379-.172-.455-1.77-.242-3.797-.791-3.797-3.553 0-.991.354-1.463.354-1.463-.354-.17-1.625.122-2.704 1.122.188.326.688 1.54.688 1.54v.001c0 .979.504 1.46.504 1.46-.688.152-1.33.354-1.854.596-.52.238-1.15.479-1.854.479-.188 0-.354-.119-.354-.354 0-.238.119-.354.354-.354.688 0 1.33-.119 1.854-.479.52-.238 1.15-.354 1.854-.596 0-.238.119-.119.354-.119s.354.119.354.354c0 .979-.504 1.712-.688 1.979.979.979 2.704.979 3.797 0-.188-.326-.688-1.54-.688-1.54v-.001c0-.979-.504-1.46-.504-1.46.688-.152 1.33-.354 1.854-.596.52-.238 1.15-.479 1.854-.479.188 0 .354.119.354.354 0 .238-.119.354-.354.354-.688 0-1.33.119-1.854.479-.52.238-1.15.354-1.854.596-.08.076-.172.226-.172.455v2.34c0 .121-.114.339-.468.27-1.33-.479-2.218-1.712-2.218-3.267 0-1.712.979-2.921 2.218-3.553-.979-.979-2.218-1.122-2.218-1.122s-.979 0-1.854.979c-.979.979-1.854 1.712-1.854 3.267 0 1.555.688 2.788 2.218 3.267z"/>
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-lg border border-purple-400 border-opacity-20 p-6"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4 className="text-lg font-semibold mb-4 text-purple-400">Quick Links</h4>
              <ul className="space-y-3">
                <li><motion.a href="#about" className="text-gray-400 hover:text-cyan-400 transition-colors" whileHover={{ x: 5 }}>About</motion.a></li>
                <li><motion.a href="#experience" className="text-gray-400 hover:text-cyan-400 transition-colors" whileHover={{ x: 5 }}>Experience</motion.a></li>
                <li><motion.a href="#projects" className="text-gray-400 hover:text-cyan-400 transition-colors" whileHover={{ x: 5 }}>Projects</motion.a></li>
                <li><motion.a href="#contact" className="text-gray-400 hover:text-cyan-400 transition-colors" whileHover={{ x: 5 }}>Contact</motion.a></li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-lg border border-cyan-400 border-opacity-20 p-6"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4 className="text-lg font-semibold mb-4 text-cyan-400">Tech Stack</h4>
              <ul className="space-y-3">
                <li className="text-gray-400 flex items-center">
                  <span className="text-cyan-400 mr-2">●</span> React
                </li>
                <li className="text-gray-400 flex items-center">
                  <span className="text-purple-400 mr-2">●</span> Node.js
                </li>
                <li className="text-gray-400 flex items-center">
                  <span className="text-green-400 mr-2">●</span> Python
                </li>
                <li className="text-gray-400 flex items-center">
                  <span className="text-blue-400 mr-2">●</span> TypeScript
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            className="border-t border-gray-700 mt-12 pt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="text-gray-400">
              © 2024 Harsh Khatri. All rights reserved. Built with ❤️ and modern web technologies.
            </p>
            <motion.div
              className="mt-4 text-cyan-400 text-sm font-semibold"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Innovation never stops...
            </motion.div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default App;
