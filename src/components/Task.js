const Task = ({ task, index, completeTask, removeTask }) => {
  return (
    <div
      className={`flex justify-between items-center p-3 rounded-lg shadow-md transition-all cursor-pointer border ${
        task.completed
          ? "bg-green-200 dark:bg-green-700 text-gray-700 dark:text-gray-300 line-through"
          : "bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
      }`}
    >
      {/* Task text with completion toggle */}
      <span className="flex-1" onClick={() => completeTask(index)}>
        {task.text}
      </span>
      {/* Toggle Completed/Uncompleted */}
      <button
        onClick={() => completeTask(index)}
        className={`px-2 py-1 text-sm rounded-md transition-all ${
          task.completed ? "bg-gray-500 text-white" : "bg-blue-500 text-white"
        }`}
      >
        {task.completed ? "Undo" : "Done"}
      </button>
      {/* Delete Button */}
      <button
        onClick={() => removeTask(index)} // This triggers removeTask
        className="text-red-500 hover:text-red-700 text-lg transition-all"
      >
        ❌
      </button>
    </div>
  );
};
export default Task;
