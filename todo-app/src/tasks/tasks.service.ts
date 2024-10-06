import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4} from 'uuid';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(title: string, description: string): Task {
        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): void {
        const foundTaskIndex = this.tasks.findIndex(task => task.id === id);

        if (foundTaskIndex === -1) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        this.tasks.splice(foundTaskIndex, 1);
    }

    updateTask(id: string, title: string, status: TaskStatus): Task {
        const task = this.tasks.find(task => task.id === id);

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        
        task.title = title;
        task.status = status;
        return task;
    }
}
