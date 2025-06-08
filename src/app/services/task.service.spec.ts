import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { Task } from '../models/task.model';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new task to the list', () => {
    const task: Task = {
      id: 1,
      title: 'Estudar Angular',
      completed: false,
      createdAt: new Date()
    };

    service.addTask(task);

    const tasks = service.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0]).toEqual(task);
  });

  it('should update a task and set updatedAt, keeping createdAt unchanged', () => {
    const createdAt = new Date();

    const task: Task = {
      id: 1,
      title: 'Study Angular',
      completed: false,
      createdAt
    };

    service.addTask(task);

    const updatedTask: Task = {
      id: 1,
      title: 'Study Angular with TDD',
      completed: true,
      createdAt,
      updatedAt: new Date()
    };

    service.editTask(updatedTask);

    const tasks = service.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].id).toBe(1);
    expect(tasks[0].title).toBe('Study Angular with TDD');
    expect(tasks[0].completed).toBe(true);
    expect(tasks[0].createdAt).toEqual(createdAt);
    expect(tasks[0].updatedAt).toBeTruthy();
  });

  it('should delete a task by its id', () => {
    const task1: Task = {
      id: 1,
      title: 'Study Angular',
      completed: false,
      createdAt: new Date()
    };

    const task2: Task = {
      id: 2,
      title: 'Practice TDD',
      completed: false,
      createdAt: new Date()
    };

    service.addTask(task1);
    service.addTask(task2);

    let tasks = service.getTasks();
    expect(tasks.length).toBe(2);

    service.deleteTask(1);
    tasks = service.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].id).toBe(2);
  });

  it('should toggle the completed status of a task and update updatedAt', () => {
    const createdAt = new Date();

    const task: Task = {
      id: 1,
      title: 'Study Angular',
      completed: false,
      createdAt
    };

    service.addTask(task);

    service.toggleCompleted(1);

    let tasks = service.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].completed).toBe(true);
    expect(tasks[0].updatedAt).toBeTruthy();

    const updatedAtAfterFirstToggle = tasks[0].updatedAt ? tasks[0].updatedAt.getTime() : 0;

    service.toggleCompleted(1);

    tasks = service.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].completed).toBe(false);
    expect(tasks[0].updatedAt).toBeTruthy();
    expect(tasks[0].updatedAt!.getTime()).toBeGreaterThanOrEqual(updatedAtAfterFirstToggle);
  });

  it('should return all tasks when filter is "all"', () => {
    const task1: Task = {
      id: 1,
      title: 'Task 1',
      completed: false,
      createdAt: new Date()
    };

    const task2: Task = {
      id: 2,
      title: 'Task 2',
      completed: true,
      createdAt: new Date()
    };

    service.addTask(task1);
    service.addTask(task2);

    const filteredTasks = service.filterTasks('all');
    expect(filteredTasks.length).toBe(2);
  });

  it('should return only completed tasks when filter is "completed"', () => {
    const task1: Task = {
      id: 1,
      title: 'Task 1',
      completed: false,
      createdAt: new Date()
    };

    const task2: Task = {
      id: 2,
      title: 'Task 2',
      completed: true,
      createdAt: new Date()
    };

    service.addTask(task1);
    service.addTask(task2);

    const filteredTasks = service.filterTasks('completed');
    expect(filteredTasks.length).toBe(1);
    expect(filteredTasks[0].completed).toBe(true);
  });

  it('should return only pending tasks when filter is "pending"', () => {
    const task1: Task = {
      id: 1,
      title: 'Task 1',
      completed: false,
      createdAt: new Date()
    };

    const task2: Task = {
      id: 2,
      title: 'Task 2',
      completed: true,
      createdAt: new Date()
    };

    service.addTask(task1);
    service.addTask(task2);

    const filteredTasks = service.filterTasks('pending');
    expect(filteredTasks.length).toBe(1);
    expect(filteredTasks[0].completed).toBe(false);
  });

  it('should save tasks to LocalStorage when saveTasksToStorage is called', () => {
    const task1: Task = {
      id: 1,
      title: 'Task 1',
      completed: false,
      createdAt: new Date()
    };

    const task2: Task = {
      id: 2,
      title: 'Task 2',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    service.addTask(task1);
    service.addTask(task2);

    spyOn(localStorage, 'setItem');

    service.saveTasksToStorage();

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'tasks',
      jasmine.any(String)
    );
  });

  it('should load tasks from LocalStorage when loadTasksFromStorage is called', () => {
    const storedTasks = [
      {
        id: 1,
        title: 'Task 1',
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Task 2',
        completed: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(storedTasks));

    service.loadTasksFromStorage();

    const tasks = service.getTasks();
    expect(tasks.length).toBe(2);
    expect(tasks[0].id).toBe(1);
    expect(tasks[1].completed).toBe(true);
  });

  it('should clear tasks from LocalStorage when clearTasksStorage is called', () => {
    spyOn(localStorage, 'removeItem');

    service.clearTasksStorage();

    expect(localStorage.removeItem).toHaveBeenCalledWith('tasks');
    expect(service.getTasks().length).toBe(0);
  });
});
