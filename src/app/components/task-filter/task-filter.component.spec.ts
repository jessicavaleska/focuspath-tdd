import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFilterComponent } from './task-filter.component';

describe('TaskFilterComponent', () => {
  let component: TaskFilterComponent;
  let fixture: ComponentFixture<TaskFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFilterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit all filter when all button is clicked', () => {
    spyOn(component.filterChanged, 'emit');

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[0].click();

    expect(component.filterChanged.emit).toHaveBeenCalledWith('all');
  });
});