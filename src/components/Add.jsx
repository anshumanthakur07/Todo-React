import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Add = ({ tasks, setTasks }) => {
    const [task, setTask] = useState({
        name: '',
        status: 'notstarted',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (task.name.length < 3) {
            toast.error('Task name should be at least 3 characters long',{autoClose:2000});
            return;
        }
            
        const newTask = { ...task, id: uuidv4() };
        const updatedTasks = [...tasks, newTask];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);

        setTask({ name: '', status: 'notstarted' });
        toast.success('Task added successfully',{autoClose:2000});
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className='border-2 border-slate-400 bg-slate-100  rounded-md mr-4 h-12 w-64 px-3'
                placeholder="Add Task"
                value={task.name}
                onChange={(e) => setTask({ ...task, name: e.target.value })}
            />
            <button className='bg-cyan-500 rounded-md px-4 h-12'>Add</button>
        </form>
    );
};

export default Add;
