import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { TaskService } from '../../core/task.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
  private taskService = inject(TaskService);
  private router = inject(Router);

  title = signal('');
  description = signal('');
  showError = signal(false);

  submit() {
    if (!this.title().trim()) {
      this.showError.set(true);
      return;
    }

    this.taskService.addTask({
      title: this.title().trim(),
      description: this.description().trim(),
    });

    this.router.navigate(['/tasks']);
  }
}
