import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmailDirective } from '../../directives/email.directive';
import { UserService } from '../user.service';
import { DOMAINS } from '../../constants';
import { ComparePasswordDirective } from '../../directives/compare-password.directive';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [RouterLink, FormsModule, EmailDirective, ComparePasswordDirective],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    domains = DOMAINS;

    constructor(private userService: UserService, private router: Router) { }

    register(form: NgForm) {
        if (form.invalid) {
            return;
        }

        this.userService.register();
        this.router.navigate(['/home']);
    }
}
