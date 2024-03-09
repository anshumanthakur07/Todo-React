import React, { useEffect, useState } from "react";
import Show from "./components/Show";
import Add from "./components/Add";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
      }
    } else {
      console.warn("No tasks found in localStorage.");
    }
  }, []);

  return (
    <>


    <DndProvider backend={HTML5Backend}>
    
      <ToastContainer/>
      <div className="bg-[#e5e7eb] w-screen h-screen flex flex-col items-center gap-16 pt-32">
        <Add tasks={tasks} setTasks={setTasks}/> 
        <Show tasks={tasks} setTasks={setTasks}/>
      </div>
      </DndProvider>
    
    </>
  );
};

export default App;
