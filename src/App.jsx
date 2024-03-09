import React, { useEffect, useState } from "react";
import Completed from "./components/Completed";
import Notstarted from "./components/Notstarted";
import Started from "./components/Started";
import Show from "./components/Show";
import Add from "./components/Add";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer/>
      <div className="bg-[#e5e7eb] w-screen h-screen flex flex-col items-center gap-16 pt-32">
        <Add tasks={tasks} setTasks={setTasks}/> 
        <Show tasks={tasks} setTasks={setTasks}/>
        {/* <Started tasks={tasks} setTasks={setTasks}/> */}
      </div>
    
    </>
  );
};

export default App;
