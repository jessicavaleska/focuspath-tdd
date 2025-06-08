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
        return this.toggleTaskCompleted(task);
      }
      return task;
    });
  }

  private toggleTaskCompleted(task: Task): Task {
    return {
      ...task,
      completed: !task.completed,
      updatedAt: new Date()
    };
  }

  filterTasks(filter: 'all' | 'completed' | 'pending'): Task[] {
    const filterMap: Record<'all' | 'completed' | 'pending', (task: Task) => boolean> = {
      all: () => true,
      completed: (task) => task.completed,
      pending: (task) => !task.completed
    };

    return this.tasks.filter(filterMap[filter] ?? filterMap['all']);
  }

  saveTasksToStorage(): void {
    localStorage.setItem('tasks', this.serializeTasks());
  }

  loadTasksFromStorage(): void {
    const tasksJson = localStorage.getItem('tasks');
    if (tasksJson) {
      this.tasks = this.deserializeTasks(tasksJson);
    } else {
      this.tasks = [];
    }
  }

  private serializeTasks(): string {
    return JSON.stringify(this.tasks);
  }

  private deserializeTasks(tasksJson: string): Task[] {
    const tasksData = JSON.parse(tasksJson);
    return tasksData.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      updatedAt: task.updatedAt ? new Date(task.updatedAt) : undefined
    }));
  }
}
