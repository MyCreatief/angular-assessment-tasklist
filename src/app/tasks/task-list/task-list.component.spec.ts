import { describe, it, expect, beforeEach } from 'vitest';
import { signal, runInInjectionContext, createEnvironmentInjector } from '@angular/core';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../core/task.service';
import { Task } from '../../core/models/task.model';

class MockTaskService {
  tasks = signal<Task[]>([
    {
      id: '1',
      title: 'Test task',
      description: 'desc',
      done: false,
      createdAt: new Date(),
    },
  ]);
}

describe('TaskListComponent', () => {
  let mockService: MockTaskService;
  let injector: ReturnType<typeof createEnvironmentInjector>;

  beforeEach(() => {
    mockService = new MockTaskService();

    // Maak een Angular DI injector
    injector = createEnvironmentInjector([{ provide: TaskService, useValue: mockService }]);
  });

  function createComponent() {
    return runInInjectionContext(injector, () => new TaskListComponent());
  }

  it('should create', () => {
    const component = createComponent();
    expect(component).toBeTruthy();
  });

  it('should expose tasks from the service', () => {
    const component = createComponent();
    const tasks = component.taskList;

    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Test task');
  });
});
