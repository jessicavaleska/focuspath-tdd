import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of tasks', () => {
    component.tasks = [
      { id: 1, title: 'Tarefa 1', completed: false, createdAt: new Date(), updatedAt: null },
      { id: 2, title: 'Tarefa 2', completed: true, createdAt: new Date(), updatedAt: null }
    ];

    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBe(2);
  });

  it('should emit taskDeleted when delete button is clicked', () => {
    spyOn(component.taskDeleted, 'emit');

    component.tasks = [
      { id: 1, title: 'Tarefa 1', completed: false, createdAt: new Date(), updatedAt: null }
    ];

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.taskDeleted.emit).toHaveBeenCalledWith(1);
  });

  it('should emit taskToggled when checkbox is changed', () => {
    spyOn(component.taskToggled, 'emit');

    component.tasks = [
      { id: 1, title: 'Tarefa 1', completed: false, createdAt: new Date(), updatedAt: null }
    ];

    fixture.detectChanges();

    const checkbox = fixture.nativeElement.querySelector('input');
    checkbox.dispatchEvent(new Event('change'));

    expect(component.taskToggled.emit).toHaveBeenCalledWith(1);
  });
});
