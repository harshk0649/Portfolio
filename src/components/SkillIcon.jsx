import { motion } from 'framer-motion';

const SkillIcon = ({ name, icon }) => {
  return (
    <motion.div
      className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
    </motion.div>
  );
};

export default SkillIcon;
