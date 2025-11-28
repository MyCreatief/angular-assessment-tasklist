import { Component, inject } from '@angular/core';
import { TaskService } from '../../core/task.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [DatePipe, RouterLink],
})
export class TaskListComponent {
  private readonly taskService = inject(TaskService);

  tasks = this.taskService.tasks;
}
