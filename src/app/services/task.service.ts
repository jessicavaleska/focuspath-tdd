import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];

  constructor() { }

  addTask(task: Task): void {
    this.tasks.push(task);
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  editTask(updatedTask: Task): void {
    this.tasks = this.tasks.map(task => {
      if (task.id === updatedTask.id) {
        return {
          ...task,
          title: updatedTask.title,
          completed: updatedTask.completed,
          updatedAt: new Date()
        };
      }
      return task;
    });
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => this.shouldKeepTask(task, taskId));
  }

  private shouldKeepTask(task: Task, taskIdToDelete: number): boolean {
    return task.id !== taskIdToDelete;
  }

  toggleCompleted(taskId: number): void {
    this.tasks = this.tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
          updatedAt: new Date()
        };
      }
      return task;
    });
  }
}
