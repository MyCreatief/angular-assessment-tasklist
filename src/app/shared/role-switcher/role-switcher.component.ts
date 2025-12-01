import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-role-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-switcher.component.html',
  styleUrls: ['./role-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleSwitcherComponent {
  private readonly auth = inject(AuthService);

  roles = ['viewer', 'editor', 'admin'];

  activeRole = this.auth.role;

  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  switchRole(role: string) {
    this.auth.setRole(role);
    this.dropdownOpen = false;
  }
}
