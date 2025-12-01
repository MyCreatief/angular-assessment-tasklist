import { Routes } from '@angular/router';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },

  {
    path: 'tasks',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./tasks/task-list/task-list.component').then((m) => m.TaskListComponent),
      },
      {
        path: 'new',
        canActivate: [RoleGuard],
        data: { roles: ['admin', 'editor'] },
        loadComponent: () =>
          import('./tasks/task-form/task-form.component').then((m) => m.TaskFormComponent),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./tasks/task-detail/task-detail.component').then((m) => m.TaskDetailComponent),
      },
    ],
  },

  // fallback
  {
    path: '**',
    redirectTo: 'tasks',
  },
];
