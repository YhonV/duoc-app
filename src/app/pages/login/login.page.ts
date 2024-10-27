import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { FirebaseError } from 'firebase/app';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilService } from 'src/app/services/utils.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { firebaseErrors } from '../../config/constants';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  @ViewChild(ModalComponent) modal!: ModalComponent;
  isModalVisible: boolean = false;
  title: string = '';
  content: string = '';
  image: string = '';
  description: string = '';
  autoClose: boolean = false;
  redirectTo: string = '';

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
        this.openModal(
                'Error',
                message,
                'assets/icon/error.jpg',
                'Por favor, inténtalo de nuevo.',
                true
              );
              this.closeModal();
      }).finally(() =>{
        this.utilService.loadingCtrl.dismiss();
      })
    }
  }
  
  closeModal() {
    this.isModalVisible = false;
    if (this.modal) {
      this.modal.close();
    }
  }
  
  openModal(title: string, content: string, image: string, description: string, isVisible: boolean) {
    this.title = title;
    this.content = content;
    this.image = image;
    this.description = description;
    this.isModalVisible = isVisible;
    
    setTimeout(() => {
      if (this.modal) {
        this.modal.open();
      } else {
        console.error('Modal component not found');
      }
    });
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
