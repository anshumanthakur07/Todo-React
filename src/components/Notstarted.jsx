// import React from 'react'

// const Notstarted = () => {
//     const count = 0;
//   return (
//     <div className="m-4h-[60px] rounded-lg bg-slate-300">
//         <div className="flex items-center justify-left  bg-red-500">
//             <h1 className='mx-4'>Not-started</h1>
//             <h2>{count}</h2>
//         </div>
      
//     </div>
//   )
// }

// export default Notstarted;


import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
// import AddAndUpdateContact from "./AddAndUpdateContact";
// import useDisclouse from "../hooks/useDisclouse";
import { toast } from "react-toastify";

const Notstarted = ({ contact }) => {
  const { isOpen, onClose, onOpen } = useDisclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={contact.id}
        className="flex items-center justify-between rounded-lg bg-yellow p-2"
      >
        <div className="flex gap-1">
          <HiOutlineUserCircle className="text-4xl text-orange" />
          <div className="">
            <h2 className="font-medium">{task1}</h2>
            {/* <p className="text-sm">{}</p> */}
          </div>
        </div>
        <div className="flex text-3xl">
          <RiEditCircleLine onClick={onOpen} className="cursor-pointer" />
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className="cursor-pointer text-orange"
          />
        </div>
      </div>
      <AddAndUpdateContact
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default Notstarted;