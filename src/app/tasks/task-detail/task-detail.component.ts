import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TaskService } from '../../core/task.service';

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

  task = this.taskService.getTask(this.route.snapshot.paramMap.get('id')!);
}
