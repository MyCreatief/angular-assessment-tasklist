import { Injectable, signal } from '@angular/core';
import { Task } from './models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly storageKey = 'tasks';
  private readonly _tasks = signal<Task[]>([]);

  // expose read-only
  tasks = this._tasks.asReadonly();

  /**
   * Initialize service state.
   * Called once from AppComponent or main.ts.
   * Loads from storage or seeds data if wanted.
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

  /** CRUD OPERATIONS **/
  addTask(task: Task): void {
    const updated = [...this._tasks(), task];
    this._tasks.set(updated);
    this.save();
  }

  updateTask(id: string, updates: Partial<Task>): void {
    const updated = this._tasks().map((t) => (t.id === id ? { ...t, ...updates } : t));
    this._tasks.set(updated);
    this.save();
  }

  deleteTask(id: string): void {
    const updated = this._tasks().filter((t) => t.id !== id);
    this._tasks.set(updated);
    this.save();
  }

  toggleDone(id: string): void {
    this.updateTask(id, { done: !this.getTask(id)?.done });
  }

  getTask(id: string): Task | null {
    return this._tasks().find((t) => t.id === id) ?? null;
  }

  /** NEW: alias used by tests **/
  getTaskById(id: string): Task | null {
    return this.getTask(id);
  }

  /** NEW: fake API loader used in tests **/
  async loadFakeApiData(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 10));

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
