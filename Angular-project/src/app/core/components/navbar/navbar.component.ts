import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserForAuth } from '../../../types/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('userMenu') userMenu!: ElementRef<HTMLDetailsElement>;

  navigation = [
    { name: 'Home', href: '/' },
    { name: 'Books', href: '/books' },
    { name: 'Create a Book', href: '/create-book' },
    { name: 'Search', href: '/search' },
  ];

  user: UserForAuth | null = null;
  userSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.userObservable.subscribe((user) => {
        this.user = user;
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  getEmail(): string {
    return this.user?.email || '';
  }

  logout() {
    this.authService.logout();
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
