import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskService } from './core/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-assessment-tasklist';

  private taskService = inject(TaskService);

  constructor() {
    this.taskService.init({ seed: true });
  }
}
