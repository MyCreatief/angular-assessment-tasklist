import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly storageKey = 'tasks';
  private readonly _tasks = signal<Task[]>([]);

  // Expose read-only tasks
  readonly tasks = this._tasks.asReadonly();

  /**
   * Initialize service state.
   * Loads from storage or seeds data if needed.
   */
  init({ seed = true }: { seed?: boolean } = {}): void {
    const stored = localStorage.getItem(this.storageKey);

    if (stored) {
      this._tasks.set(JSON.parse(stored));
      return;
    }

    if (seed) {
      const seedData: Task[] = [
        {
          id: crypto.randomUUID(),
          title: 'Boodschappen doen',
          description: 'Melk, kaas, eieren',
          done: false,
          createdAt: new Date(),
        },
        {
          id: crypto.randomUUID(),
          title: 'Angular assessment afronden',
          description: 'Takenlijstcomponent en tests schrijven',
          done: false,
          createdAt: new Date(),
        },
        {
          id: crypto.randomUUID(),
          title: 'Met Belle wandelen',
          description: 'Even een rondje naar buiten',
          done: true,
          createdAt: new Date(),
        },
      ];

      this._tasks.set(seedData);
      this.save();
    }
  }

  /** CREATE */
  addTask(data: { title: string; description?: string }): void {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description ?? '',
      done: false,
      createdAt: new Date(),
    };

    this._tasks.update((current) => [...current, newTask]);
    this.save();
  }

  /** UPDATE */
  updateTask(id: string, updates: Partial<Task>): void {
    const updated = this._tasks().map((t) => (t.id === id ? { ...t, ...updates } : t));
    this._tasks.set(updated);
    this.save();
  }

  /** DELETE */
  deleteTask(id: string): void {
    const updated = this._tasks().filter((t) => t.id !== id);
    this._tasks.set(updated);
    this.save();
  }

  /** TOGGLE */
  toggleDone(id: string): void {
    const current = this.getTask(id);
    if (!current) return;

    this.updateTask(id, { done: !current.done });
  }

  /** READ */
  getTask(id: string): Task | null {
    return this._tasks().find((t) => t.id === id) ?? null;
  }

  /**
   * Fake API loader (for tests, but no artificial delay)
   * Deliberately synchronous, because tests should not depend on timers.
   */
  loadFakeApiData(): void {
    const fakeTasks: Task[] = [
      {
        id: crypto.randomUUID(),
        title: 'Fake API taak 1',
        description: 'Geüpload van fake backend',
        done: false,
        createdAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        title: 'Fake API taak 2',
        description: 'Tweede item uit fake backend',
        done: true,
        createdAt: new Date(),
      },
    ];

    this._tasks.set(fakeTasks);
    this.save();
  }

  /** Storage */
  private save(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this._tasks()));
  }
}
