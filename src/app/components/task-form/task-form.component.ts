import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent {
  title = '';

  @Output() taskAdded = new EventEmitter<string>();

  submitTask(): void {
    const trimmedTitle = this.title.trim();

    if (!trimmedTitle) {
      return;
    }

    this.taskAdded.emit(trimmedTitle);
    this.title = '';
  }
}