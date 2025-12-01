import { beforeEach, describe, expect, it } from 'vitest';
import { runInInjectionContext, createEnvironmentInjector } from '@angular/core';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let injector: ReturnType<typeof createEnvironmentInjector>;

  beforeEach(() => {
    injector = createEnvironmentInjector([TaskService]);

    service = runInInjectionContext(injector, () => new TaskService());

    localStorage.clear();

    service.init({ seed: false });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load empty tasks when storage is empty', () => {
    expect(service.tasks().length).toBe(0);
  });

  it('should add a task', () => {
    service.addTask({ title: 'Test' });

    const tasks = service.tasks();
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Test');
  });

  it('should get a task by id', () => {
    service.addTask({ title: 'Task A' });
    const id = service.tasks()[0].id;

    const found = service.getTask(id);
    expect(found?.title).toBe('Task A');
  });

  it('should return null when task id does not exist', () => {
    const found = service.getTask('unknown');
    expect(found).toBeNull();
  });

  it('should update a task', () => {
    service.addTask({ title: 'Old' });
    const id = service.tasks()[0].id;

    service.updateTask(id, { title: 'New title' });

    const updated = service.getTask(id);
    expect(updated?.title).toBe('New title');
  });

  it('should delete a task', () => {
    service.addTask({ title: 'To delete' });
    const id = service.tasks()[0].id;

    service.deleteTask(id);

    expect(service.tasks().length).toBe(0);
  });

  it('should toggle the done state of a task', () => {
    service.addTask({ title: 'Toggle' });
    const id = service.tasks()[0].id;

    service.toggleDone(id);
    expect(service.getTask(id)?.done).toBe(true);

    service.toggleDone(id);
    expect(service.getTask(id)?.done).toBe(false);
  });

  it('should load fake API data', async () => {
    await service.loadFakeApiData();

    const tasks = service.tasks();
    expect(tasks.length).toBe(2);
    expect(tasks[0].title).toBe('Fake API taak 1');
  });
});
