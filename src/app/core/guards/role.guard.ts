import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const RoleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const allowed = auth.hasRole(route.data['roles'] ?? []);

  if (!allowed) {
    router.navigate(['/not-allowed']);
    return false;
  }

  return true;
};

export function canAccessRoute(route: ActivatedRouteSnapshot, role: string): boolean {
  const required = route.data?.['roles'] ?? [];
  return required.length === 0 || required.includes(role);
}
