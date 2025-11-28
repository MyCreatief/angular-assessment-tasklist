import { describe, it, expect, beforeEach } from 'vitest';
import { createEnvironmentInjector, runInInjectionContext, inject } from '@angular/core';
import { TaskDetailComponent } from './task-detail.component';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../core/task.service';
import { Task } from '../../core/models/task.model';

class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: () => '123',
    },
  };
}

class MockTaskService {
  getTask(id: string) {
    return {
      id,
      title: 'Mock title',
      description: 'Mock desc',
      createdAt: new Date('2023-01-01'),
      done: false,
    } satisfies Task;
  }
}

describe('TaskDetailComponent', () => {
  let injector: ReturnType<typeof createEnvironmentInjector>;

  beforeEach(() => {
    injector = createEnvironmentInjector([
      { provide: ActivatedRoute, useClass: MockActivatedRoute },
      { provide: TaskService, useClass: MockTaskService },
    ]);
  });

  function createComponent() {
    return runInInjectionContext(injector, () => new TaskDetailComponent());
  }

  it('should create', () => {
    const component = createComponent();
    expect(component).toBeTruthy();
  });

  it('should resolve task from TaskService based on route id', () => {
    const component = createComponent();

    expect(component.task).toBeDefined();
    expect(component.task!.id).toBe('123');
    expect(component.task!.title).toBe('Mock title');
  });

  it('should fetch the correct task when route param changes', () => {
    const component = createComponent();

    // vergelijk een paar waarden
    expect(component.task!.description).toBe('Mock desc');
    expect(component.task!.done).toBe(false);
  });
});
