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
import { BookOwnerGuard } from './guards/book-owner.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    data: { animation: 'HomePage' },
  },
  { path: 'home', component: HomeComponent, data: { animation: 'HomePage' } },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedInGuard],
    data: { animation: 'LoginPage' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoggedInGuard],
    data: { animation: 'RegisterPage' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { animation: 'ProfilePage' },
  },
  {
    path: 'books',
    component: BooksListComponent,
    data: { animation: 'BooksPage' },
  },
  {
    path: 'create-book',
    component: CreateBookComponent,
    canActivate: [AuthGuard],
    data: { animation: 'CreateBookPage' },
  },
  {
    path: 'books/:id',
    component: BookDetailsComponent,
    data: { animation: 'BookDetailsPage' },
  },
  {
    path: 'edit/:id',
    component: EditBookComponent,
    canActivate: [AuthGuard, BookOwnerGuard],
    data: { animation: 'EditBookPage' },
  },
  {
    path: 'search',
    component: SearchComponent,
    data: { animation: 'SearchPage' },
  },
  { path: '404', component: ErrorComponent, data: { animation: 'ErrorPage' } },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];
