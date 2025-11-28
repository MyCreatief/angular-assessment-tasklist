import { Routes } from '@angular/router';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: TaskListComponent,
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    children: [
      { path: '', component: TaskListComponent },
      { path: 'new', component: TaskFormComponent },
      { path: ':id', component: TaskDetailComponent },
    ],
  },
];
