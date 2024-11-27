import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmailDirective } from '../../core/directives/email.directive';
import { UserService } from '../user.service';
import { DOMAINS } from '../../constants';
import { ComparePasswordDirective } from '../../core/directives/compare-password.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, EmailDirective, ComparePasswordDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  domains = DOMAINS;
  generalError: string = '';

  constructor(private userService: UserService, private router: Router) {}

  register(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;

    this.userService.register(email, password).subscribe({
      next: (user) => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.generalError = err.error.message;
      },
    });
  }
}
