import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormComponent } from './task-form.component';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not emit taskAdded when title is empty', () => {
    spyOn(component.taskAdded, 'emit');

    component.title = '   ';
    component.submitTask();

    expect(component.taskAdded.emit).not.toHaveBeenCalled();
  });

  it('should emit taskAdded with trimmed title when title is valid', () => {
    spyOn(component.taskAdded, 'emit');

    component.title = '  Estudar TDD  ';
    component.submitTask();

    expect(component.taskAdded.emit).toHaveBeenCalledWith('Estudar TDD');
  });

  it('should clear the input after adding a valid task', () => {
    spyOn(component.taskAdded, 'emit');

    component.title = 'Nova tarefa';
    component.submitTask();

    expect(component.title).toBe('');
  });
});
