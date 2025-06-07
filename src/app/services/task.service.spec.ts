import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';

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
});
