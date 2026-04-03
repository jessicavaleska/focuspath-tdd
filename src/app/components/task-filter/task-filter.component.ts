import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TaskFilter = 'all' | 'completed' | 'pending';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-filter.component.html'
})
export class TaskFilterComponent {
  activeFilter: TaskFilter = 'all';

  @Output() filterChanged = new EventEmitter<TaskFilter>();

  selectFilter(filter: TaskFilter): void {
    this.activeFilter = filter;
    this.filterChanged.emit(filter);
  }
}