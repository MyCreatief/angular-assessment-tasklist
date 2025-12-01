import { ChangeDetectionStrategy, Component, inject, effect } from '@angular/core';
import { Router, RouterOutlet, RouterStateSnapshot } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';

import { AuthService } from './core/service/auth.service';
import { TaskService } from './core/service/task.service';
import { canAccessRoute } from './core/guards/role.guard';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskListComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly taskService = inject(TaskService);

  constructor() {
    // Start application data
    this.taskService.init({ seed: true });

    // Listen to role changes and auto-redirect if needed
    effect(() => {
      const currentRole = this.auth.role();
      const tree = this.router.routerState.snapshot as RouterStateSnapshot;
      const activeRoute = this.getDeepest(tree.root);

      const allowed = canAccessRoute(activeRoute, currentRole);

      if (!allowed) {
        this.router.navigate(['/not-allowed']);
      }
    });
  }

  /** Find deepest child route */
  private getDeepest(route: any): any {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
