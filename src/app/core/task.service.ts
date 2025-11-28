import { Injectable, signal } from '@angular/core';
import { Task } from './models/task.model';

/**
 * This service is available everywhere in the project.
 * You do not need to import it manually.
 */
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  /**
   * storageKey contains the name used to save all tasks in localStorage.
   */
  private readonly storageKey = 'tasks';

  /**
   * _tasks holds the full list of tasks as a signal.
   * The first value is loaded from localStorage.
   */
  private readonly _tasks = signal<Task[]>(this.loadFromStorage());

  /**
   * tasks exposes the list of tasks as a read-only signal.
   * Components can read the value but cannot change it.
   */
  tasks = this._tasks.asReadonly();

  constructor() {
    // we cant be empty
  }

  /**
   * loadFromStorage reads stored tasks from localStorage.
   * Date values are turned into Date objects again.
   */
  private loadFromStorage(): Task[] {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return [];

    try {
      const parsed = JSON.parse(raw);

      // Convert stored date strings into real Date objects
      return parsed.map((rawTask: Task) => ({
        ...rawTask,
        createdAt: new Date(rawTask.createdAt),
      }));
    } catch {
      return [];
    }
  }

  /**
   * saveToStorage writes the full task list into localStorage.
   */
  private saveToStorage(tasks: Task[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  /**
   * addTask adds a new task to the list and stores the updated version.
   */
  addTask(task: Task) {
    const updatedTasks = [...this._tasks(), task];

    this._tasks.set(updatedTasks);
    this.saveToStorage(updatedTasks);
  }

  /**
   * getTaskById returns one task by its id.
   * Returns null when no task is found.
   */
  getTaskById(id: string): Task | null {
    return this._tasks().find(task => task.id === id) ?? null;
  }

  /**
   * updateTask changes values of an existing task.
   * Only the fields given in updates are changed.
   */
  updateTask(id: string, updates: Partial<Task>) {
    const updatedTasks = this._tasks().map(task =>
      task.id === id ? { ...task, ...updates } : task
    );

    this._tasks.set(updatedTasks);
    this.saveToStorage(updatedTasks);
  }

  /**
   * deleteTask removes a task from the list using its id.
   */
  deleteTask(id: string) {
    const filteredTasks = this._tasks().filter(task => task.id !== id);

    this._tasks.set(filteredTasks);
    this.saveToStorage(filteredTasks);
  }

  /**
   * toggleDone switches the done state of a task.
   */
  toggleDone(id: string) {
    const currentTask = this.getTaskById(id);
    if (!currentTask) return;

    this.updateTask(id, { done: !currentTask.done });
  }

  /**
   * loadFakeApiData creates one example task after a short delay.
   * This simulates a real API.
   */
  loadFakeApiData(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        const exampleTasks: Task[] = [
          {
            id: crypto.randomUUID(),
            title: 'Example task',
            description: 'This shows how a task looks',
            done: false,
            createdAt: new Date(),
          },
        ];

        this._tasks.set(exampleTasks);
        this.saveToStorage(exampleTasks);
        resolve();
      }, 600);
    });
  }
}
