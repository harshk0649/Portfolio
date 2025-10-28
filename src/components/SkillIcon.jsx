import { motion } from 'framer-motion';

const SkillIcon = ({ name, icon, level }) => {
  return (
    <motion.div
      className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          className="bg-blue-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        ></motion.div>
      </div>
      <span className="text-sm text-gray-600 mt-1">{level}%</span>
    </motion.div>
  );
};

export default SkillIcon;
