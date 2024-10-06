import { Controller, Get, Post, Delete, Patch, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getAllTasks(): Task[] {
        return this.taskService.getAllTasks();
    }

    @Post()
    createTask(
        @Body('title') title: string,
        @Body('description') description: string,
    ) : Task {
        return this.taskService.createTask(title, description);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string): void {
        this.taskService.deleteTask(id);
    }

    @Patch(':id')
    updateTask(
        @Param('id') id: string,
        @Body('title') title: string,
        @Body('status') status: TaskStatus,
    ) : Task {
        return this.taskService.updateTask(id, title, status);
    }
}
