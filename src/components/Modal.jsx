// import { createPortal } from "react-dom";
// import { AiOutlineClose } from "react-icons/ai";

// const Modal = ({ onClose, isOpen, children, task, setTask, tasks, setTasks }) => {
//   return createPortal(
//     isOpen && (
//       <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
//         <div className="bg-white rounded-md p-4">
//           <form>
//             <input
//               type="text"
//               placeholder="Task Title"
//               value={task.name}
//               onChange={(e) => setTask({ ...task, name: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Task Status"
//               value={tasks.status}
//               onChange={(e) => setTasks({ ...tasks, status: e.target.value })}
//             />
//             <textarea
//               placeholder="Task Description"
//               value={tasks.description}
//               onChange={(e) => setTasks({ ...tasks, description: e.target.value })}
//             ></textarea>
//           </form>
//           <div className="flex justify-end">
//             <AiOutlineClose onClick={onClose} className="text-2xl cursor-pointer" />
//           </div>
//           {children}
//         </div>
//       </div>
//     ),
//     document.getElementById("modal-root")
//   );
// };

// export default Modal;


import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";

const Modal = ({ onClose, isOpen, task, setTask, setTasks }) => {



  const handleUpdateTask = () => {
    // Update the specific task with the new details and call the onUpdateTask callback
    onUpdateTask({ ...task, name: task.name, status: task.status, description: task.description });
    onClose(); // Close the modal after updating
  };

  const handleDeleteTask = () => {
    // Delete the task from the tasks array and call the onDeleteTask callback
    onDeleteTask(task.id);
    onClose(); // Close the modal after deleting
  };

  return (
    createPortal(
      isOpen && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white rounded-md p-9 ">
            <div className="flex justify-end ">

              <AiOutlineClose onClick={onClose} className="text-2xl cursor-pointer my-0" />
            </div>
            <form className="flex flex-col">
              <input className="bg-gray-100 p-2 rounded-md mb-2 my-5"
                type="text"
                placeholder="Task Title"
                value={task.name}
                onChange={(e) => setTask({ ...task, name: e.target.value })}
              />
              <input className="bg-gray-100 p-2 rounded-md mb-2 my-5"
                type="text"
                placeholder="Task Status"
                value={task.status}
                onChange={(e) => setTask({ ...task, status: e.target.value })}
              />
              <textarea
              className="bg-gray-100 p-2 rounded-md mb-2 my-10 h-32 w-full resize-none"
                placeholder="Task Description"
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
              ></textarea>
            </form>
            <div className="flex justify-end ">
              <button onClick={handleUpdateTask} className="bg-[#a3e635] rounded-md mx-8 pl-2 pr-2" >Update</button>
              <button onClick={handleDeleteTask}className="bg-[#ef4444] rounded-md mx-8 pl-2 pr-2">Delete</button>
            </div>
          </div>
        </div>
      ),
      document.getElementById("modal-root")
    )
  );
};
export default Modal;
