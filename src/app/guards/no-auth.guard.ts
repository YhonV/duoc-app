import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { getAuth, onAuthStateChanged } from "firebase/auth";

@Injectable({
  providedIn: 'root',
})
export class noAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve) => {
      const auth = getAuth();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Check if the user is trying to access the login page
          if (state.url === '/login') {
            console.log('User is logged in, allowing access to login page');
            resolve(true);
          } else {
            console.log('User is logged in, navigating to home');
            this.router.navigate(['home']);
            resolve(false);
          }
        } else {
          console.log('User is not logged in, allowing access');
          resolve(true);
        }
      });
    });
  }
}