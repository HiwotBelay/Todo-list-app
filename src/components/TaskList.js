import Task from "./Task";

const TaskList = ({ tasks, completeTask, removeTask }) => {
  return (
    <div className="mt-5 space-y-3">
      {tasks.length === 0 ? <p className="text-center text-gray-500 italic">No tasks yet. Add something!</p> : null}
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          index={index}
          completeTask={completeTask}
          removeTask={removeTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
