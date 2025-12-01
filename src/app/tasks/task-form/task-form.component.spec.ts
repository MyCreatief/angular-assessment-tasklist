import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createEnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TaskFormComponent } from './task-form.component';
import { TaskService } from '../../core/service/task.service';
import { Router } from '@angular/router';

class MockTaskService {
  addTask = vi.fn();
}

class MockRouter {
  navigate = vi.fn();
}

describe('TaskFormComponent (class only)', () => {
  let mockService: MockTaskService;
  let mockRouter: MockRouter;
  let injector: ReturnType<typeof createEnvironmentInjector>;

  beforeEach(() => {
    mockService = new MockTaskService();
    mockRouter = new MockRouter();

    injector = createEnvironmentInjector([
      { provide: TaskService, useValue: mockService },
      { provide: Router, useValue: mockRouter },
    ]);
  });

  function createComponent() {
    return runInInjectionContext(injector, () => new TaskFormComponent());
  }

  it('should create', () => {
    const component = createComponent();
    expect(component).toBeTruthy();
  });

  it('should show error when title is empty', () => {
    const component = createComponent();

    component.title.set('');
    component.submit();

    expect(component.showError()).toBe(true);
  });

  it('should submit when title is filled', () => {
    const component = createComponent();

    component.title.set('Test title');
    component.description.set('Test desc');

    component.submit();

    expect(mockService.addTask).toHaveBeenCalledWith({
      title: 'Test title',
      description: 'Test desc',
    });
  });

  it('should navigate after successful submit', () => {
    const component = createComponent();

    component.title.set('Navigate');
    component.description.set('Go');

    component.submit();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/tasks']);
  });
});
