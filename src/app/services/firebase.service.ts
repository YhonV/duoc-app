import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updatePhoneNumber, updateProfile } from 'firebase/auth';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private userDataSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  userData$: Observable<any> = this.userDataSubject.asObservable();

  auth = inject(AngularFireAuth);
  router = inject(Router);

  constructor() { 
    this.auth.authState.subscribe(async user => {
      if (user) {
        this.userDataSubject.next(user);
        await Preferences.set({ key: 'user', value: JSON.stringify(user) });
        console.log(`User logged: ${user.displayName}`);
      } else {
        this.userDataSubject.next(null);
        await Preferences.remove({ key: 'user' });
        console.log('No user');
      }
    })
  }


  // Login de usuario
  signIn(user : User){
      return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Registro de usuarios
  signUp(user:User){
      return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // No sé la verdad si es actualizar el nombre o qué jasdjajd
  updateUser(displayName: string){
      return updateProfile(getAuth().currentUser, { displayName });
  }

  // Cerrar sesión
  async logOutUser() {
    try {
      await this.auth.signOut();
      await Preferences.remove({ key: 'user' });
      this.router.navigate(['/login']);
      console.log(`Se cerró la sesión del user ${this.userDataSubject.value.displayName}`);
      return true;
    } catch (error) {
      console.error('Error al cerrar sesión en FirebaseService', error);
      throw error;
    }
  }

  getUser(): Observable<any> {
    return this.userData$;
  }

  async getUserDisplayName(): Promise<string | null> {
    const userData = this.userDataSubject.value;
    if (userData) {
      return userData.displayName;
    } else {
      const { value } = await Preferences.get({key: 'user'});
      if (value) {
        const user = JSON.parse(value);
        return user.displayName;
      }
      return null;
    }
  }
  
}
