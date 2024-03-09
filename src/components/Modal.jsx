import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";

const Modal = ({ onClose, isOpen, task, tasks, setTask, setTasks, id }) => {
  const handleUpdateTask = (e, id) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    const updatedTask = {
      id: id,
      name: task.name,
      status: task.status,
      description: task.description,
    };
  
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => task.id === id ? updatedTask : task);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  
    toast.success("Task updated successfully");
    onClose(); // Close the modal after updating
  };
  

  const handleDeleteTask = (e, id) => {
    e.preventDefault();
    setTasks((prev) => {
      const newtasks = prev.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(newtasks));
      return newtasks;
    });
    toast.success("Task deleted successfully");
    onClose();
  };
 

  return createPortal(
    isOpen && (
      <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div className="bg-white rounded-md p-9">
          <div className="flex justify-end">
            <AiOutlineClose
              onClick={onClose}
              className="text-2xl cursor-pointer my-0"
            />
          </div>
          <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
            <input
              className="bg-gray-100 p-2 rounded-md mb-2 my-5"
              type="text"
              placeholder="Task Title"
              name="name"
              value={task.name}
              onChange={(e) => setTask({ ...task, [e.target.name]: e.target.value ,name:e.target.value})}
            />
            <input
              className="bg-gray-100 p-2 rounded-md mb-2 my-5"
              type="text"
              placeholder="Task Status"
              name="status"
              value={task.status}
              onChange={(e) => setTask({ ...task, [e.target.name]: e.target.value ,status:e.target.value})}
            />
            <textarea
              className="bg-gray-100 p-2 rounded-md mb-2 my-10 h-32 w-full resize-none"
              placeholder="Task Description"
              name="description"
              value={task.description}
              onChange={(e) => setTask({ ...task, [e.target.name]: e.target.value ,description:e.target.value})  }
            ></textarea>
          </form>
          <div className="flex justify-end">
            <button
              onClick={(e) => handleUpdateTask(e, task.id)}
              className="bg-[#a3e635] rounded-md mx-8 pl-2 pr-2"
            >
              Update
            </button>
            <button
              onClick={(e) => handleDeleteTask(e, task.id)}
              className="bg-[#ef4444] rounded-md mx-8 pl-2 pr-2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ),
    document.getElementById("modal-root")
  );
};

export default Modal;
