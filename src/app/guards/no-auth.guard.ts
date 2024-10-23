import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getAuth, onAuthStateChanged } from "firebase/auth";

@Injectable({
  providedIn: 'root',
})
export class noAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve) => {
      const auth = getAuth();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('User is logged in, navigating to home');
          this.router.navigate(['home'])
        } else {
          console.log('User is not logged in, allowing access');
          resolve(true);
        }
      });
    });
  }
}
