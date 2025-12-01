import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  createEnvironmentInjector,
  EnvironmentInjector,
  runInInjectionContext,
} from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { RoleSwitcherComponent } from './role-switcher.component';

describe('RoleSwitcherComponent', () => {
  let injector: EnvironmentInjector;

  let mockAuth: {
    role: () => string;
    setRole: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockAuth = {
      role: vi.fn().mockReturnValue('viewer'),
      setRole: vi.fn(),
    };

    injector = createEnvironmentInjector([{ provide: AuthService, useValue: mockAuth }]);
  });

  function createComponent() {
    return runInInjectionContext(injector, () => new RoleSwitcherComponent());
  }

  it('should create', () => {
    const component = createComponent();
    expect(component).toBeTruthy();
  });

  it('should expose the available roles', () => {
    const component = createComponent();
    expect(component.roles).toEqual(['viewer', 'editor', 'admin']);
  });

  it('should expose the auth role signal as activeRole', () => {
    const component = createComponent();
    expect(component.activeRole).toBe(mockAuth.role);
  });
});
