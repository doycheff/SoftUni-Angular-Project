import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  navigation = [
    { name: 'Home', href: '/' },
    { name: 'Books', href: '/books' },
    { name: 'Create a Book', href: '/create-book' },
    { name: 'Search', href: '/search' },
  ];

  constructor(private userService: UserService, private router: Router) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  getEmail(): string {
    return this.userService.user?.email || '';
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/home']);
  }

  closeMenu(menu: HTMLDetailsElement): void {
    menu.open = false;
  }
}
