import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { BooksListComponent } from './book/books-list/books-list.component';
import { CreateBookComponent } from './book/create-book/create-book.component';
import { BookDetailsComponent } from './book/book-details/book-details.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './guards/auth.guard';
import { EditBookComponent } from './book/edit-book/edit-book.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { ProfileComponent } from './user/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoggedInGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

  { path: 'books', component: BooksListComponent },
  {
    path: 'create-book',
    component: CreateBookComponent,
    canActivate: [AuthGuard],
  },
  { path: 'books/:id', component: BookDetailsComponent },
  {
    path: 'edit/:id',
    component: EditBookComponent,
    canActivate: [AuthGuard],
  },
  { path: 'search', component: SearchComponent },

  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];
