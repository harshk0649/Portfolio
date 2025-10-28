import { motion } from 'framer-motion';
import Hero3D from './components/Hero3D';
import ProjectCard from './components/ProjectCard';
import SkillIcon from './components/SkillIcon';
import ContactForm from './components/ContactForm';

function App() {
  const projects = [
    {
      title: "AI-Powered Code Review Assistant",
      description: "Machine learning model that analyzes code quality, suggests improvements, and predicts potential bugs using NLP and deep learning techniques.",
      technologies: ["Python", "TensorFlow", "NLP", "FastAPI", "Docker"],
      link: "#"
    },
    {
      title: "Neural Network Visualizer",
      description: "Interactive 3D visualization tool for neural networks with real-time training visualization and architecture exploration.",
      technologies: ["React", "Three.js", "Python", "WebGL", "D3.js"],
      link: "#"
    },
    {
      title: "Predictive Analytics Dashboard",
      description: "Real-time analytics platform using machine learning for business intelligence, featuring automated insights and predictive modeling.",
      technologies: ["React", "Python", "scikit-learn", "AWS", "PostgreSQL"],
      link: "#"
    },
    {
      title: "Computer Vision API",
      description: "RESTful API for image recognition and object detection using convolutional neural networks, deployed on cloud infrastructure.",
      technologies: ["Python", "OpenCV", "TensorFlow", "FastAPI", "AWS Lambda"],
      link: "#"
    },
    {
      title: "AI Chatbot Platform",
      description: "Scalable chatbot platform with natural language processing, multi-language support, and integration with various messaging platforms.",
      technologies: ["Node.js", "Python", "NLP", "MongoDB", "WebSocket"],
      link: "#"
    },
    {
      title: "ML Model Deployment Pipeline",
      description: "Automated CI/CD pipeline for machine learning models with A/B testing, model versioning, and performance monitoring.",
      technologies: ["Python", "Docker", "Kubernetes", "Jenkins", "Prometheus"],
      link: "#"
    }
  ];

  const skills = [
    { name: "React", icon: "⚛️", level: 95 },
    { name: "Python", icon: "🐍", level: 90 },
    { name: "TensorFlow", icon: "🧠", level: 85 },
    { name: "Node.js", icon: "🟢", level: 80 },
    { name: "Three.js", icon: "🎲", level: 75 },
    { name: "AWS", icon: "☁️", level: 85 },
    { name: "Docker", icon: "🐳", level: 80 },
    { name: "MongoDB", icon: "🍃", level: 75 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <Hero3D />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Harsh Khatri
          </motion.h1>
          <motion.div
            className="text-xl md:text-2xl text-gray-300 mb-8 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="inline-block relative">
              <span className="bg-gradient-to-r from-green-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent animate-pulse font-mono">
                AI-Powered Developer
              </span>
              <span className="absolute -top-1 -right-1 w-1 h-1 bg-green-400 rounded-full animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-1 h-1 bg-green-400 rounded-full"></span>
            </span>
            <span className="mx-4 text-gray-500 font-mono">&&</span>
            <span className="inline-block relative">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-pulse font-mono">
                ML Engineer
              </span>
              <span className="absolute -top-1 -left-1 w-1 h-1 bg-purple-400 rounded-full animate-ping"></span>
              <span className="absolute -top-1 -left-1 w-1 h-1 bg-purple-400 rounded-full"></span>
            </span>
          </motion.div>
          <motion.button
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl font-mono"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            onClick={() => {
              const experienceSection = document.getElementById('experience');
              experienceSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore AI Projects
          </motion.button>
        </div>

        {/* Floating AI/ML Code Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 text-green-400 opacity-20 font-mono text-sm"
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {'<AI />'}
          </motion.div>
          <motion.div
            className="absolute top-1/3 right-20 text-blue-400 opacity-15 font-mono text-xs"
            animate={{
              x: [0, 30, 0],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            {'{machineLearning}'}
          </motion.div>
          <motion.div
            className="absolute bottom-1/3 left-20 text-purple-400 opacity-25 font-mono text-xs"
            animate={{
              rotate: [0, 360],
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            {'</>'}
          </motion.div>
          <motion.div
            className="absolute top-1/2 right-1/4 text-cyan-400 opacity-18 font-mono text-xs"
            animate={{
              opacity: [0.18, 0.35, 0.18],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            {'neuralNetwork()'}
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 right-1/3 text-pink-400 opacity-22 font-mono text-xs"
            animate={{
              opacity: [0.22, 0.4, 0.22],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          >
            {'predict()'}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        {/* Subtle Hacker Vibes */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-10 left-10 text-green-500 opacity-5 font-mono text-xs"
            animate={{
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {'>'} console.log('Hello World')
          </motion.div>
          <motion.div
            className="absolute bottom-10 right-10 text-blue-500 opacity-5 font-mono text-xs"
            animate={{
              opacity: [0.05, 0.08, 0.05],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            {'<script>'}
          </motion.div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl font-bold text-gray-800 mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Me
          </motion.h2>
          <motion.div
            className="text-lg text-gray-600 leading-relaxed space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p>
              I'm a passionate full-stack developer with over 5 years of experience in modern web technologies.
              I specialize in creating scalable, performant applications using cutting-edge frameworks and tools.
            </p>
            <p>
              My expertise spans across the entire development stack - from crafting intuitive user interfaces
              with React and Vue.js, to building robust backend systems with Node.js, Python, and cloud platforms.
              I have a keen eye for design and user experience, ensuring every project not only functions flawlessly
              but also delights users with its aesthetics and interactivity.
            </p>
            <p>
              When I'm not coding, you'll find me exploring emerging technologies, contributing to open-source projects,
              or mentoring aspiring developers. I believe in continuous learning and staying ahead of the curve
              in this rapidly evolving field.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-gray-50 relative overflow-hidden">
        {/* Floating 3D Elements with Coding Theme */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Code brackets */}
          <motion.div
            className="absolute top-20 left-10 text-6xl text-green-400 opacity-10 font-mono"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {'{'}
          </motion.div>
          <motion.div
            className="absolute top-40 right-20 text-4xl text-blue-400 opacity-15 font-mono"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            {'</>'}
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-1/4 text-3xl text-purple-400 opacity-20 font-mono"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            {'}'}
          </motion.div>
          {/* Binary code effect */}
          <motion.div
            className="absolute top-1/3 right-1/3 text-green-500 opacity-10 font-mono text-sm"
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            01010101
          </motion.div>
          {/* Additional coder vibes */}
          <motion.div
            className="absolute top-1/2 left-1/2 text-cyan-500 opacity-8 font-mono text-xs"
            animate={{
              opacity: [0.08, 0.15, 0.08],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          >
            {'function() {'}
          </motion.div>
          <motion.div
            className="absolute bottom-1/3 right-1/2 text-pink-500 opacity-8 font-mono text-xs"
            animate={{
              opacity: [0.08, 0.12, 0.08],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.5
            }}
          >
            {'const dev = true;'}
          </motion.div>
          <motion.div
            className="absolute top-1/4 left-1/3 text-yellow-500 opacity-8 font-mono text-xs"
            animate={{
              opacity: [0.08, 0.14, 0.08],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8
            }}
          >
            {'// code'}
          </motion.div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Professional Experience
          </motion.h2>
          <div className="space-y-8">
            {[
              {
                title: "Senior Full-Stack Developer",
                company: "TechCorp Solutions",
                period: "2022 - Present",
                description: "Leading development of enterprise-scale applications, mentoring junior developers, and architecting scalable solutions.",
                technologies: ["React", "Node.js", "AWS", "Docker", "Kubernetes"]
              },
              {
                title: "Full-Stack Developer",
                company: "InnovateLabs",
                period: "2020 - 2022",
                description: "Developed and maintained multiple client projects, implemented CI/CD pipelines, and improved application performance by 40%.",
                technologies: ["Vue.js", "Python", "PostgreSQL", "Jenkins"]
              },
              {
                title: "Frontend Developer",
                company: "DigitalAgency Pro",
                period: "2019 - 2020",
                description: "Created responsive web applications and interactive user interfaces for various clients across different industries.",
                technologies: ["React", "JavaScript", "SASS", "Figma"]
              }
            ].map((exp, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{exp.title}</h3>
                    <p className="text-blue-600 font-semibold">{exp.company}</p>
                  </div>
                  <span className="text-gray-500 mt-2 md:mt-0">{exp.period}</span>
                </div>
                <p className="text-gray-600 mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
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
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        {/* Floating 3D Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-12 left-12 w-24 h-24 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-10"
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-12 right-12 w-18 h-18 bg-gradient-to-r from-pink-400 to-red-500 rounded-lg opacity-15"
            animate={{
              x: [0, -20, 0],
              y: [0, 20, 0],
              rotate: [0, -180, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20"
            animate={{
              rotate: [0, 360],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-12"
            animate={{
              y: [0, 25, 0],
              x: [0, -15, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
          {/* Coder vibes for projects */}
          <motion.div
            className="absolute top-1/4 left-1/2 text-green-500 opacity-8 font-mono text-xs"
            animate={{
              opacity: [0.08, 0.15, 0.08],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          >
            {'git commit'}
          </motion.div>
          <motion.div
            className="absolute bottom-1/2 right-1/4 text-blue-500 opacity-8 font-mono text-xs"
            animate={{
              opacity: [0.08, 0.12, 0.08],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.2
            }}
          >
            {'npm install'}
          </motion.div>
          <motion.div
            className="absolute top-3/4 left-1/3 text-purple-500 opacity-8 font-mono text-xs"
            animate={{
              opacity: [0.08, 0.14, 0.08],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7
            }}
          >
            {'deploy()'}
          </motion.div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Featured Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gray-900 text-white relative overflow-hidden">
        {/* Subtle Hacker Vibes */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-20 text-green-500 opacity-5 font-mono text-xs"
            animate={{
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {'//'} Contact me
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-20 text-blue-500 opacity-5 font-mono text-xs"
            animate={{
              opacity: [0.05, 0.08, 0.05],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            {'</>'}
          </motion.div>
        </div>
        {/* Floating 3D Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-20 w-28 h-28 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-8"
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
            className="absolute bottom-20 right-20 w-20 h-20 bg-gradient-to-r from-pink-500 to-orange-600 rounded-lg opacity-10"
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
            className="absolute top-1/2 left-1/3 w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-12"
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
            className="absolute bottom-1/4 right-1/4 w-18 h-18 bg-gradient-to-r from-green-500 to-teal-600 rounded-full opacity-9"
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
            className="absolute top-1/4 right-1/3 w-12 h-12 bg-gradient-to-r from-yellow-500 to-red-600 rounded-full opacity-11"
            animate={{
              rotate: [0, -360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Let's Work Together
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <p className="text-lg mb-8 text-gray-300">
                I'm always open to discussing new opportunities and interesting projects.
                Whether you have a project in mind or just want to chat about technology,
                feel free to reach out!
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-blue-500 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-300">harsh.khatri@example.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-500 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-500 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-gray-300">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-xl font-bold mb-4">Harsh Khatri</h3>
              <p className="text-gray-300 mb-4">
                Full-Stack Developer passionate about creating innovative web solutions
                and pushing the boundaries of technology.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a></li>
                <li><a href="#skills" className="text-gray-300 hover:text-white transition-colors">Skills</a></li>
                <li><a href="#projects" className="text-gray-300 hover:text-white transition-colors">Projects</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h4 className="text-lg font-semibold mb-4">Connect With Me</h4>
              <div className="flex space-x-4">
                <motion.a
                  href="https://github.com"
                  className="bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="https://linkedin.com"
                  className="bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.a>
                <motion.a
                  href="https://twitter.com"
                  className="bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="border-t border-gray-700 mt-8 pt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-gray-300">
              © 2024 Harsh Khatri. All rights reserved. Built with React, Three.js & Framer Motion.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default App;
