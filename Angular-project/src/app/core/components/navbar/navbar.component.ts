import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../user/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @ViewChild('userMenu') userMenu!: ElementRef<HTMLDetailsElement>;

  navigation = [
    { name: 'Home', href: '/' },
    { name: 'Books', href: '/books' },
    { name: 'Create a Book', href: '/create-book' },
    { name: 'Search', href: '/search' },
  ];

  constructor(private userService: UserService, private router: Router, private authService: AuthService) {}

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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (
      this.userMenu &&
      !this.userMenu.nativeElement.contains(event.target as Node)
    ) {
      this.userMenu.nativeElement.open = false;
    }
  }
}
