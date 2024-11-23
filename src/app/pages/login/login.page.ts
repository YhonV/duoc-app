import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { FirebaseError } from 'firebase/app';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilService } from 'src/app/services/utils.service';
import { firebaseErrors } from '../../config/constants';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  isModalVisible: boolean = false;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  firebaseService = inject(FirebaseService);
  utilService = inject(UtilService);
  navCtrl = inject(NavController); 

  constructor() {}

  ngOnInit() {
  }

  async onSubmit() {
    if (this.form.valid) {
      const loading = await this.utilService.loading();
      await loading.present();
      await this.firebaseService.signIn(this.form.value as User).then(async res =>{
        this.navCtrl.navigateRoot("/home");
        await this.getUserToFirestore(res.user.uid);
      }).catch(error =>{
        let message = 'Ocurrió un error durante el inicio de sesión';
        if(error instanceof FirebaseError){
          message = firebaseErrors[error.code] || message;}
        this.utilService.openAlert(message, '', 'close-circle'); 
      }).finally(() =>{
        this.utilService.loadingCtrl.dismiss();
      })
    }
  }

  async getUserToFirestore(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilService.loading();
      await loading.present();
      
      let path = `users/${uid}`;
      let userDoc : User | null = null;
      try {
        const docData = await this.firebaseService.getDocument(path);
        console.log('docData:', docData);
        if(docData){
          userDoc = {
            uid: uid,
            email: docData['email'],
            name: docData['name'],
            phone: docData['phone'],
            rut: docData['rut'],
          };
          await Preferences.set({
            key: 'userDoc',
            value: JSON.stringify(userDoc),
          });
        }
      } catch (error) {
        console.error('Error al obtener el usuario de Firestore', error);
      } finally {
        await loading.dismiss();
      }
    }
  }


  
}
