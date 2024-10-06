import React, { useEffect, useState} from "react";
import axios from "axios";

interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
}

const TaskManager: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>('');
    const [newDescription, setNewDescription] = useState<string>('');

    useEffect(() => {
        fetchTask();
    }, []);

    const fetchTask = async () => {
        try {
            const response = await axios.get('http://localhost:3000/tasks');
            setTasks(response.data);
        } catch (error) {
            console.log('Error: ', error)
        }
    };

    const createTask = async () => {
        try {
            const response = await axios.post('http://localhost:3000/tasks', {
                title: newTask,
                description: newDescription,
            });
            setTasks([...tasks, response.data]);
            setNewTask('');
            setNewDescription('');
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    const deleteTask = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3000/tasks/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    const updateTask = async (id: string, status: string) => {
        try {
            const taskToUpdate = tasks.find(task => task.id === id);
            if (!taskToUpdate) return;

            const response = await axios.patch(`http://localhost:3000/tasks/${id}`, {
                title: taskToUpdate.title,
                description: taskToUpdate.description,
                status,
            });

            setTasks(tasks.map(task => (task.id === id ? response.data : task)));
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    return (
        <div>
            <h1>Task Manager</h1>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter new task"
             />
            <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Enter description"
             />
             <button onClick={createTask}>Add</button>

             <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <span>{task.title} - {task.description} - {task.status}</span>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                        <button onClick={() => updateTask(task.id, 'IN_PROGRESS')}>Start</button>
                        <button onClick={() => updateTask(task.id, 'DONE')}>Complete</button>
                    </li>
                ))}
             </ul>
        </div>
    );
};

export default TaskManager;
