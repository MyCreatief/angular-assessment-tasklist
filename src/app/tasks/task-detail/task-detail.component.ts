import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../../core/service/task.service';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);
  private router = inject(Router);
  readonly auth = inject(AuthService);

  readonly id = this.route.snapshot.paramMap.get('id')!;

  task = this.taskService.getTask(this.id);

  deleteTask() {
    if (!this.auth.hasRole(['editor', 'admin'])) {
      return;
    }

    this.taskService.deleteTask(this.id);
    this.router.navigate(['/tasks']);
  }
}
