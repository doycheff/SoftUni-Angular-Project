import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../core/services/api.service';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

export const BookOwnerGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
): Observable<boolean> | boolean => {
  const authService = inject(AuthService);
  const apiService = inject(ApiService);
  const router = inject(Router);

  if (!authService.isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  const bookId = route.params['id'];

  if (!bookId) {
    router.navigate(['/login']);
    return false;
  }

  return apiService.getOneBook(bookId).pipe(
    map((book) => {
      if (book._ownerId === authService.userId) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
