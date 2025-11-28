import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { TaskService } from '../../core/task.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [DatePipe, RouterLink, SearchBarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  private readonly taskService = inject(TaskService);

  // zoekterm als signal
  searchQuery = signal('');

  onSearch(query: string) {
    this.searchQuery.set(query);
  }

  highlight(text: string): string {
    const query = this.searchQuery().toLowerCase();
    if (!query) return text;

    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'gi');

    return text.replace(regex, (match) => `<mark>${match}</mark>`);
  }

  get taskList() {
    return this.taskService.tasks();
  }
}
