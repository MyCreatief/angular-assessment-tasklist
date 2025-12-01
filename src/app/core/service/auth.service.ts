import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'role';

  private readonly _role = signal<string>(this.loadRole());

  role = this._role.asReadonly();

  setRole(role: string) {
    this._role.set(role);
    localStorage.setItem(this.storageKey, role);
  }

  private loadRole(): string {
    return localStorage.getItem(this.storageKey) ?? 'viewer';
  }

  hasRole(required: string[]): boolean {
    return required.includes(this._role());
  }
}
