import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TaskService } from './task.service';
import { Task } from './models/task.model';

/**
 * Test suite for the TaskService.
 * These tests cover only the public API of the service.
 * Internal fields such as private signals are not accessed directly.
 */
describe('TaskService', () => {
  let service: TaskService;

  // Strongly typed mock object for localStorage
  let mockStorage: {
    getItem: ReturnType<typeof vi.fn>;
    setItem: ReturnType<typeof vi.fn>;
  };

  /**
   * Before each test we create a fresh mock for localStorage.
   * The global localStorage reference is replaced so the service
   * interacts entirely with the mock instead of the browser API.
   * Afterwards we create a new instance of TaskService.
   */
  beforeEach(() => {
    mockStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
    };

    vi.stubGlobal('localStorage', mockStorage);

    service = new TaskService();
  });

  /**
   * The service should always initialize without errors.
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * When no value exists in storage, the service should return an empty list.
   */
  it('should load empty tasks when storage is empty', () => {
    mockStorage.getItem.mockReturnValue(null);

    const newService = new TaskService();
    expect(newService.tasks()).toEqual([]);
  });

  /**
   * Adding a task should update the list and write to storage.
   */
  it('should add a task', () => {
    const task: Task = {
      id: '1',
      title: 'Test task',
      description: 'Description',
      done: false,
      createdAt: new Date(),
    };

    service.addTask(task);

    expect(service.tasks()).toHaveLength(1);
    expect(service.tasks()[0]).toEqual(task);
    expect(mockStorage.setItem).toHaveBeenCalled();
  });

  /**
   * The service should return a stored task by its id.
   */
  it('should get a task by id', () => {
    const task: Task = {
      id: 'a1',
      title: 'Task A',
      description: 'Something',
      done: false,
      createdAt: new Date(),
    };

    service.addTask(task);

    const found = service.getTaskById('a1');
    expect(found).toEqual(task);
  });

  /**
   * When a task does not exist, null should be returned.
   */
  it('should return null when task id does not exist', () => {
    const found = service.getTaskById('unknown');
    expect(found).toBeNull();
  });

  /**
   * Updating a task should merge the provided fields into the stored task.
   */
  it('should update a task', () => {
    const task: Task = {
      id: '10',
      title: 'Old title',
      description: 'Old info',
      done: false,
      createdAt: new Date(),
    };

    service.addTask(task);
    service.updateTask('10', { title: 'New title' });

    const updated = service.getTaskById('10');
    expect(updated?.title).toBe('New title');
  });

  /**
   * Deleting a task should remove it from the list.
   */
  it('should delete a task', () => {
    const task: Task = {
      id: 'x1',
      title: 'To delete',
      description: '',
      done: false,
      createdAt: new Date(),
    };

    service.addTask(task);
    service.deleteTask('x1');

    expect(service.tasks()).toHaveLength(0);
  });

  /**
   * Toggling a task should switch its "done" state.
   */
  it('should toggle the done state of a task', () => {
    const task: Task = {
      id: 'toggle1',
      title: 'Toggle task',
      description: '',
      done: false,
      createdAt: new Date(),
    };

    service.addTask(task);

    service.toggleDone('toggle1');
    expect(service.getTaskById('toggle1')?.done).toBe(true);

    service.toggleDone('toggle1');
    expect(service.getTaskById('toggle1')?.done).toBe(false);
  });

  /**
   * The fake API loader should create one example task after the delay.
   */
  it('should load fake API data', async () => {
    await service.loadFakeApiData();

    const tasks = service.tasks();
    expect(tasks).toHaveLength(2);
    expect(tasks[0].title).toBe('Fake API taak 1');
    expect(tasks[1].title).toBe('Fake API taak 2');
  });
});
