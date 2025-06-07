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

    const updatedAtAfterFirstToggle = tasks[0].updatedAt;

    service.toggleCompleted(1);

    tasks = service.getTasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].completed).toBe(false);
    expect(tasks[0].updatedAt).toBeTruthy();
    expect(tasks[0].updatedAt).not.toEqual(updatedAtAfterFirstToggle);
  });
});
