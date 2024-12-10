import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { EmailDirective } from '../../core/directives/email.directive';
import { DOMAINS } from '../../constants';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, EmailDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  domains = DOMAINS;
  generalError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/books']);
      },
      error: (err) => {
        this.generalError = 'Email or password don\'t match';
      },
    });
  }
}
