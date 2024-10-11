import { CanActivateFn } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { inject } from '@angular/core';
import { UtilService } from '../services/utils.service';

export const authGuard: CanActivateFn = (route, state) => {
  const firebaseService = inject(FirebaseService);
  const utilService = inject(UtilService);

  return new Promise((resolve) => {
    firebaseService.getAuth().onAuthStateChanged((auth) => {
      if (auth) {
        resolve(true);
      } else {
        console.log('Acceso denegado');
        resolve(false);
      }
    });
  });
};


