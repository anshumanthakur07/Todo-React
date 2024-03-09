import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Add = ({ tasks, setTasks }) => {

    const [task, setTask] = useState({
        id: '',
        name: '',
        status: 'todo',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (task.name.length < 3) {
            toast.error('Task name should be at least 3 characters long');
            return;
        }

        const newTask = { ...task, id: uuidv4() };

        setTasks((prev) => {
            const updatedTasks = [...prev, newTask];
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return updatedTasks;
        });

        setTask({ id: '', name: '', status: 'todo' });
        toast.success('Task added successfully');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className='border-2 border-slate-400 bg bg-slate-100 rounded-md mr-4 h-12 w-64 px-1'
                value={task.name}
                onChange={(e) => setTask({ ...task, name: e.target.value ,id: uuidv4()  })}
            />
            <button className='bg-cyan-500 rounded-md px-4 h-12'>Add</button>
        </form>
    );
};

export default Add;
