import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    navigation = [
        { name: 'Home', href: '/' },
        { name: 'Books', href: '/books' },
        { name: 'Create a Book', href: '/create-book' },
        { name: 'Search', href: '/search' }
    ];

}
