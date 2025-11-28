import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TaskService } from './task.service';
import { Task } from './models/task.model';

describe('TaskService', () => {
  let service: TaskService;

  // Strongly typed mock object for localStorage
  let mockStorage: {
    getItem: ReturnType<typeof vi.fn>;
    setItem: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
    };

    vi.stubGlobal('localStorage', mockStorage);

    service = new TaskService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load empty tasks when storage is empty', () => {
    mockStorage.getItem.mockReturnValue(null);

    const newService = new TaskService();
    expect(newService.tasks()).toEqual([]);
  });

  it('should add a task', () => {
    mockStorage.getItem.mockReturnValue(null);

    // We gebruiken NIET langer een volledige Task, want de service vult zelf velden aan
    const payload = { title: 'Test task', description: 'Description' };

    service.addTask(payload);

    const tasks = service.tasks();
    expect(tasks).toHaveLength(1);

    expect(tasks[0].title).toBe('Test task');
    expect(tasks[0].description).toBe('Description');

    // Velden gegenereerd door service
    expect(tasks[0].id).toBeDefined();
    expect(tasks[0].createdAt).toBeInstanceOf(Date);
    expect(tasks[0].done).toBe(false);

    expect(mockStorage.setItem).toHaveBeenCalled();
  });

  it('should get a task by id', () => {
    service.addTask({ title: 'Task A', description: 'Something' });

    const id = service.tasks()[0].id;

    const found = service.getTaskById(id);
    expect(found?.title).toBe('Task A');
  });

  it('should return null when task id does not exist', () => {
    const found = service.getTaskById('unknown');
    expect(found).toBeNull();
  });

  it('should update a task', () => {
    service.addTask({ title: 'Old title', description: 'Old info' });

    const id = service.tasks()[0].id;

    service.updateTask(id, { title: 'New title' });

    const updated = service.getTaskById(id);

    expect(updated?.title).toBe('New title');
  });

  it('should delete a task', () => {
    service.addTask({ title: 'To delete', description: '' });

    const id = service.tasks()[0].id;

    service.deleteTask(id);

    expect(service.tasks()).toHaveLength(0);
  });

  it('should toggle the done state of a task', () => {
    service.addTask({ title: 'Toggle task', description: '' });

    const id = service.tasks()[0].id;

    service.toggleDone(id);
    expect(service.getTaskById(id)?.done).toBe(true);

    service.toggleDone(id);
    expect(service.getTaskById(id)?.done).toBe(false);
  });

  it('should load fake API data', async () => {
    await service.loadFakeApiData();

    const tasks = service.tasks();
    expect(tasks).toHaveLength(2);
    expect(tasks[0].title).toBe('Fake API taak 1');
    expect(tasks[1].title).toBe('Fake API taak 2');
  });
});
