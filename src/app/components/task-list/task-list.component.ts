import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent {
  @Input() tasks: any[] = [];
  
  @Output() taskDeleted = new EventEmitter<number>();
  @Output() taskToggled = new EventEmitter<number>();

  deleteTask(id: number): void {
    this.taskDeleted.emit(id);
  }

  toggleTask(id: number): void {
    this.taskToggled.emit(id);
  }
}