import { describe, it, expect, beforeEach, vi } from 'vitest';
import { signal } from '@angular/core';
import { TaskListComponent } from './task-list.component';
import { Task } from '../../core/models/task.model';
import { TaskService } from '../../core/task.service';

describe('TaskListComponent', () => {
  let service: TaskService;

  const mockTasks = signal<Task[]>([
    {
      id: '1',
      title: 'Test task',
      description: 'desc',
      done: false,
      createdAt: new Date(),
    },
  ]);

  beforeEach(() => {
    service = {
      tasks: mockTasks,
      init: vi.fn(),
    } as unknown as TaskService;
  });

  it('should create', () => {
    const component = new TaskListComponent(service);
    expect(component).toBeTruthy();
  });

  it('should expose tasks from the service', () => {
    const component = new TaskListComponent(service);
    const tasks = component.tasks();

    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Test task');
  });
});
