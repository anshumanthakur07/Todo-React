// Show.js
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { useDrag, useDrop } from 'react-dnd';

const Show = ({ tasks, setTasks }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [notstarted, setnotStarted] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setcompleted] = useState([]);

  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setSelectedTask(null); // Close the modal after updating
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setSelectedTask(null); // Close the modal after deleting
  };

  

  useEffect(() => {
    if (tasks && Array.isArray(tasks)) {
      const fnotStarted = tasks.filter((task) => task.status === "notstarted");
      const finProgress = tasks.filter((task) => task.status === "inprogress");
      const fcompleted = tasks.filter((task) => task.status === "completed");

      setnotStarted(fnotStarted);
      setInProgress(finProgress);
      setcompleted(fcompleted);
    }
  }, [tasks]);

  const statues = ["notstarted", "inprogress", "completed"];

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
          notStarted={notstarted}
          inProgress={inProgress}
          completed={completed}
          onTaskClick={handleTaskClick}
          onUpdateTask={handleUpdateTask} // Pass the handleUpdateTask function
          onDeleteTask={handleDeleteTask}
        />
      ))}
       <Modal  
        onClose={() => setSelectedTask(null)}
        isOpen={selectedTask !== null}
        tasks={tasks}
        task={selectedTask}
        setTask={setSelectedTask}
        setTasks={setTasks}
        id={tasks.id}


      
      />
    </div>
  );
};

const Section = ({ status, tasks, setTasks, notStarted, inProgress, completed, onTaskClick }) => {



  const [{ isOver }, drop] = useDrop(() => ({
    accept:"task",

    drop:(item)=>additemtoselection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    }),
  }));


  let text = "notstarted";
  let bg = "bg-[#f87171]";
  let taskstomap = notStarted;

  if (status === "inprogress") {
    text = "inprogress";
    bg = "bg-[#fbbf24]";
    taskstomap = inProgress;
  }
  if (status === "completed") {
    text = "completed";
    bg = "bg-[#a3e635]";
    taskstomap = completed;
  }

  const additemtoselection = (id) => {
    // console.log(id);
    setTasks((prev) => {
      const newtasks = prev.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            status: status,
          };
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(newtasks));
      return newtasks;

    });
  }

  return (
    <>
      <div ref={drop}
      className={`w-64 rounded-md p-2 ${isOver?"bg-[#f3f4f6]":""}`} 
      >
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



  const [{ isDragging }, drag] = useDrag(() => ({
    type:"task",
    item:{id:task.id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
  }));

  return (
    <>
      <div  ref={drag}
        className={`relative p-4 mt-3 shadow-md rounded-md ${isDragging?"opacity-20":"opacity-100"} cursor-grab bg-[#efefef]`}
        onClick={handleTaskClick}
      >
        <p>{task.name}</p>
      </div>
    </>
  );
};

export default Show;
