// Show.js
import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const Show = ({ tasks, setTasks }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);



  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
    setTasks(updatedTasks);
    setSelectedTask(null); // Close the modal after updating
  };
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setSelectedTask(null); // Close the modal after deleting
  };

  useEffect(() => {
    if (tasks && Array.isArray(tasks)) {
      const ftodos = tasks.filter((task) => task.status === "todo");
      const finProgress = tasks.filter((task) => task.status === "inprogress");
      const fclosed = tasks.filter((task) => task.status === "closed");

      setTodos(ftodos);
      setInProgress(finProgress);
      setClosed(fclosed);
    }
  }, [tasks]);

  const statues = ["todo", "inprogress", "closed"];

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className='flex gap-20'>
      {statues.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          closed={closed}
          onTaskClick={handleTaskClick}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
        />
      ))}
       <Modal
        onClose={() => setSelectedTask(null)}
        isOpen={selectedTask !== null}
        task={selectedTask}
        setTask={setSelectedTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

const Section = ({ status, tasks, setTasks, todos, inProgress, closed, onTaskClick }) => {
  let text = "todo";
  let bg = "bg-[#f87171]";
  let taskstomap = todos;

  if (status === "inprogress") {
    text = "inprogress";
    bg = "bg-[#fbbf24]";
    taskstomap = inProgress;
  }
  if (status === "closed") {
    text = "closed";
    bg = "bg-[#a3e635]";
    taskstomap = closed;
  }

  return (
    <>
      <div className={`w-64`}>
        <Header text={text} bg={bg} count={taskstomap.length} />
        {taskstomap.length >= 0 &&
          taskstomap.map((task) => (
            <Task
              key={task.id}
              task={task}
              tasks={tasks}
              setTasks={setTasks}
              onTaskClick={onTaskClick}
            />
          ))}
      </div>
    </>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <>
      <div className={`bg-[#efefef] flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
        <div className={`flex ${bg} rounded-md pl-2 pr-2 text-black text-xl`}>
          {text}
        </div>
        <div className='ml-4 text-[#525252] '>
          {count >= 0 ? count : count + 2}
        </div>
      </div>
    </>
  );
};

const Task = ({ task, tasks, setTasks, onTaskClick }) => {
  const handleTaskClick = () => {
    onTaskClick(task);
  };

  return (
    <>
      <div 
        className={`relative p-4 mt-3 shadow-md rounded-md cursor-grab bg-[#efefef]`}
        onClick={handleTaskClick}
      >
        <p>{task.name}</p>
      </div>
    </>
  );
};

export default Show;
