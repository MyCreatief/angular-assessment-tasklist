import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  createEnvironmentInjector,
  EnvironmentInjector,
  runInInjectionContext,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { RoleGuard } from './role.guard';

describe('RoleGuard', () => {
  let injector: EnvironmentInjector;

  let mockAuth: {
    hasRole: ReturnType<typeof vi.fn>;
  };

  let mockRouter: {
    navigate: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockAuth = {
      hasRole: vi.fn(),
    };

    mockRouter = {
      navigate: vi.fn(),
    };

    injector = createEnvironmentInjector([
      { provide: AuthService, useValue: mockAuth },
      { provide: Router, useValue: mockRouter },
    ]);
  });

  function runGuard(requiredRoles: string[]) {
    const route = {
      data: {
        roles: requiredRoles,
      },
    } as unknown as Parameters<typeof RoleGuard>[0];

    const state = {} as Parameters<typeof RoleGuard>[1];

    return runInInjectionContext(injector, () => RoleGuard(route, state));
  }

  it('should allow navigation when user has required role', () => {
    mockAuth.hasRole.mockReturnValue(true);

    const result = runGuard(['editor']);

    expect(result).toBe(true);
    expect(mockAuth.hasRole).toHaveBeenCalledWith(['editor']);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should redirect when user does not have required role', () => {
    mockAuth.hasRole.mockReturnValue(false);

    const result = runGuard(['editor']);

    expect(result).toBe(false);
    expect(mockAuth.hasRole).toHaveBeenCalledWith(['editor']);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/not-allowed']);
  });
});
