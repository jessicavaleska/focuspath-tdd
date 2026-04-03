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
});
