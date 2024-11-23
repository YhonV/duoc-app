import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updatePhoneNumber, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, addDoc, collection} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, ref, uploadString, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private userDataSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  userData$: Observable<any> = this.userDataSubject.asObservable();
  role: string = '';
  firestore = inject(AngularFirestore);
  auth = inject(AngularFireAuth);
  router = inject(Router);
  storage = inject(AngularFireStorage);

  constructor() { 
    this.auth.authState.subscribe(async user => {
      if (user) {
        const userDoc = await this.getDocument(`users/${user.uid}`);
        this.userDataSubject.next(userDoc);
        await Preferences.set({ key: 'user', value: JSON.stringify(userDoc) });
        console.log('Usuario sigue logueado:', userDoc);
        console.log(`User logged: ${user.displayName}`);
        console.log(this.role);
      } else {
        this.userDataSubject.next(null);
        await Preferences.remove({ key: 'user' });
        console.log('No user');
      }
    });
  }

  // ==================== AUTENTICACION ==================== // 

  // Login de usuario
  signIn(user : User){
      return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Registro de usuarios
  signUp(user:User){
    if(user.email.includes('profesor')){
      this.role = 'profesor';
    }
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Cerrar sesión
  async logOutUser() {
    try {
      await this.auth.signOut();
      await Preferences.remove({ key: 'user' });
      this.router.navigate(['/login']);
      return true;
    } catch (error) {
      console.error('Error al cerrar sesión en FirebaseService', error);
      throw error;
    }
  }

  getAuth(){
    return getAuth();
  }

  // ==================== RECUPERAR CONTRASEÑA ==================== // 

  // Resetear contraseña
  sendRecorveryEmail(email: string){
    try{
      return sendPasswordResetEmail(getAuth(), email);
    }catch (error){
      console.error('Error al enviar el correo de recuperación', error);
      throw error;
    }
  }

  // ==================== OBSERVABLE ==================== // 

  getUser(): Observable<any> {
    return this.userData$;
  }

  // ==================== FIRESTORE ==================== // 
  setDocument(path: string, data:any){
    try{
      return setDoc(doc(getFirestore(), path), data);
    }catch (error){
      console.error('Error al guardar el documento en Firestore', error);
      throw error;
    }
  }

  async getDocument(path: string){
    try{
      return (await getDoc(doc(getFirestore(), path))).data();
    }catch (error){
      console.error('Error al obtener el documento de Firestore', error);
      throw error;
    }
 }

 addAssistance(path: string, data:any){
  try{
    return addDoc(collection(getFirestore(), path), data);
  }catch (error){
    console.error('Error al guardar el documento en Firestore', error);
    throw error;
    }
  }

  async uploadImage(path: string, data_url: string){
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() =>{
      return getDownloadURL(ref(getStorage(), path));
    });
  }

}
