import { useState } from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiPlusCircle } from "react-icons/fi";
import "../styles/App.css";

const TaskInput = ({ addTask }) => {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    addTask(task, dueDate);
    setTask("");
    setDueDate("");
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="flex flex-col gap-4 mb-4 bg-white/30 p-6 rounded-lg shadow-xl backdrop-blur-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animated-bg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-3 rounded-md shadow-inner">
        <FiPlusCircle className="text-blue-500 text-xl" />
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-white"
        />
      </div>
      
      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-3 rounded-md shadow-inner">
        <FiCalendar className="text-blue-500 text-xl" />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-white"
        />
      </div>
      
      <motion.button
        type="submit"
        className="bg-blue-600 text-white px-5 py-3 rounded-md shadow-md hover:bg-blue-700 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Add Task
      </motion.button>
    </motion.form>
  );
};

export default TaskInput;
