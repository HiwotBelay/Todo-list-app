import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";
import "./styles/App.css"; // ✅ Correct path for App.css

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("all");

  // Remove task function
  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };

  // Complete task function
  const completeTask = (index) => {
    const updatedTasks = tasks.map((task, taskIndex) =>
      taskIndex === index
        ? { ...task, completed: !task.completed }
        : task
    );
    setTasks(updatedTasks);
  };

  // Handle task addition with due date
  const addTask = (text, dueDate = null) => {
    setTasks([...tasks, { text, completed: false, dueDate, alerted: false }]);
  };

  // UseEffect to load saved tasks and dark mode settings from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedTheme);

    // Apply dark mode to body class
    document.body.classList.toggle("dark", savedTheme);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Toggle dark mode
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Check for due tasks and alert the user
  useEffect(() => {
    const interval = setInterval(() => {
      tasks.forEach((task, index) => {
        if (task.dueDate && !task.alerted) {
          const taskDueDate = new Date(task.dueDate);
          const currentDate = new Date();
          if (taskDueDate.toDateString() === currentDate.toDateString()) {
            alert(`Task "${task.text}" is due today!`);
            setTasks((prevTasks) =>
              prevTasks.map((t, i) =>
                i === index ? { ...t, alerted: true } : t
              )
            );
          }
        }
      });
    }, 86400000); // Check every 24 hours

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [tasks]);

  return (
    <div className="min-h-screen flex items-center justify-center animated-bg transition-all duration-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full bg-white/30 backdrop-blur-lg dark:bg-gray-800 shadow-2xl rounded-2xl p-8 transition-all border border-gray-200 dark:border-gray-700"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white drop-shadow-lg">🚀 My To-Do List</h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className="text-4xl transition-all"
          >
            {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-600" />}
          </motion.button>
        </div>

        <div className="flex justify-center space-x-4 mb-4">
          {["all", "completed", "pending"].map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg transition-all transform shadow-md ${
                filter === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Add Task Input */}
        <TaskInput addTask={addTask} />

        {/* Task List */}
        <TaskList
          tasks={tasks.filter((task) => {
            if (filter === "completed") return task.completed;
            if (filter === "pending") return !task.completed;
            return true; // All tasks
          })}
          completeTask={completeTask}
          removeTask={removeTask}
        />
      </motion.div>
    </div>
  );
};

export default App;
