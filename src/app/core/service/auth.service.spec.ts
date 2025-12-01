import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  let mockStorage: {
    getItem: ReturnType<typeof vi.fn>;
    setItem: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
    };

    // Replace global localStorage with our mock
    vi.stubGlobal('localStorage', mockStorage as unknown as Storage);
  });

  it('should default to "viewer" when no role is stored', () => {
    mockStorage.getItem.mockReturnValue(null);

    service = new AuthService();

    expect(service.role()).toBe('viewer');
    expect(mockStorage.getItem).toHaveBeenCalledWith('role');
  });

  it('should load an existing role from storage', () => {
    mockStorage.getItem.mockReturnValue('editor');

    service = new AuthService();

    expect(service.role()).toBe('editor');
  });

  it('should update the role and persist it to storage', () => {
    mockStorage.getItem.mockReturnValue(null);
    service = new AuthService();

    service.setRole('editor');

    expect(service.role()).toBe('editor');
    expect(mockStorage.setItem).toHaveBeenCalledWith('role', 'editor');
  });

  it('should check permissions with hasRole', () => {
    mockStorage.getItem.mockReturnValue('editor');
    service = new AuthService();

    expect(service.hasRole(['editor'])).toBe(true);
    expect(service.hasRole(['viewer'])).toBe(false);
    expect(service.hasRole(['viewer', 'editor'])).toBe(true);
    expect(service.hasRole([])).toBe(false);
  });
});
