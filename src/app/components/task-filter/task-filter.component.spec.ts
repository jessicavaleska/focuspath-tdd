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

  it('should emit completed filter when completed button is clicked', () => {
    spyOn(component.filterChanged, 'emit');

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[1].click();

    expect(component.filterChanged.emit).toHaveBeenCalledWith('completed');
  });

  it('should emit pending filter when pending button is clicked', () => {
    spyOn(component.filterChanged, 'emit');

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[2].click();

    expect(component.filterChanged.emit).toHaveBeenCalledWith('pending');
  });

  it('should update activeFilter when a filter is selected', () => {
    component.selectFilter('completed');

    expect(component.activeFilter).toBe('completed');
  });

  it('should apply active state to selected filter button', () => {
    component.selectFilter('pending');
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons[2].classList).toContain('active');
  });
});