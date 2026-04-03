import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { Task } from '../../models/task.model';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  const mockTasks: Task[] = [
    {
      id: 1,
      title: 'Estudar TDD',
      completed: false,
      createdAt: new Date(),
      updatedAt: null
    },
    {
      id: 2,
      title: 'Configurar CI/CD',
      completed: true,
      createdAt: new Date(),
      updatedAt: null
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    component.tasks = mockTasks;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of tasks', () => {
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBe(2);
  });

  it('should emit taskDeleted when delete button is clicked', () => {
    spyOn(component.taskDeleted, 'emit');

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.taskDeleted.emit).toHaveBeenCalledWith(1);
  });

  it('should emit taskToggled when checkbox is changed', () => {
    spyOn(component.taskToggled, 'emit');

    fixture.detectChanges();

    const checkbox = fixture.nativeElement.querySelector('input');
    checkbox.dispatchEvent(new Event('change'));

    expect(component.taskToggled.emit).toHaveBeenCalledWith(1);
  });

  it('should display task titles', () => {
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Estudar TDD');
    expect(text).toContain('Configurar CI/CD');
  });

  it('should mark completed task checkbox as checked', () => {
    fixture.detectChanges();

    const checkboxes = fixture.nativeElement.querySelectorAll('input[type="checkbox"]');

    expect(checkboxes[0].checked).toBeFalse();
    expect(checkboxes[1].checked).toBeTrue();
  });
});
