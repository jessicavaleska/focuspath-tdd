import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TaskService } from './services/task.service';

describe('AppComponent', () => {
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    taskServiceSpy = jasmine.createSpyObj('TaskService', [
      'getTasks',
      'addTask',
      'deleteTask',
      'toggleCompleted',
      'filterTasks'
    ]);

    taskServiceSpy.getTasks.and.returnValue([]);
    taskServiceSpy.filterTasks.and.returnValue([]);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'focuspath-tdd' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('focuspath-tdd');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, focuspath-tdd');
  });

  it('should call addTask and refresh tasks when a task is added', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.onTaskAdded('Nova tarefa');

    expect(taskServiceSpy.addTask).toHaveBeenCalledWith('Nova tarefa');
    expect(taskServiceSpy.getTasks).toHaveBeenCalled();
    expect(taskServiceSpy.filterTasks).toHaveBeenCalledWith('all');
  });
});
