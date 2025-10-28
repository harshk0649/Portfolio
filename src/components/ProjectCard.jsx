import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ProjectCard = ({ title, description, technologies, link }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.05,
        z: 50,
      }}
    >
      <motion.div
        className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
      >
        <motion.span
          className="text-white text-4xl font-bold"
          style={{
            transform: "translateZ(50px)",
          }}
        >
          {title.charAt(0)}
        </motion.span>
      </motion.div>
      <motion.div
        className="p-6"
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
      >
        <motion.h3
          className="text-xl font-bold text-gray-800 mb-2"
          style={{
            transform: "translateZ(50px)",
          }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-gray-600 mb-4"
          style={{
            transform: "translateZ(25px)",
          }}
        >
          {description}
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-2 mb-4"
          style={{
            transform: "translateZ(25px)",
          }}
        >
          {technologies.map((tech, index) => (
            <motion.span
              key={index}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
              whileHover={{ scale: 1.1 }}
              style={{
                transform: "translateZ(15px)",
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
        <motion.a
          href={link}
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded transition-all duration-300 shadow-lg"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          whileTap={{ scale: 0.95 }}
          style={{
            transform: "translateZ(25px)",
          }}
        >
          View Project
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
