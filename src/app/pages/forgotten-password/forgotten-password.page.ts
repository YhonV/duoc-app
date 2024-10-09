import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { firebaseErrors } from 'src/app/config/constants';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilService } from 'src/app/services/utils.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.page.html',
  styleUrls: ['./forgotten-password.page.scss'],
})
export class ForgottenPasswordPage implements OnInit {

  @ViewChild(ModalComponent) modal!: ModalComponent;
  isModalVisible: boolean = false;
  title: string = '';
  content: string = '';
  image: string = '';
  description: string = '';
  autoClose: boolean = false;
  redirectTo: string = '';

  forgottenForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  firebaseService = inject(FirebaseService);
  utilService = inject(UtilService);

  constructor(private router: Router) { }

  ngOnInit() {
  }

  
  async onSubmit() {
    if (this.forgottenForm.valid) {
      const loading = await this.utilService.loading();
      await loading.present();
  
      try {
        const res = await this.firebaseService.sendRecorveryEmail(this.forgottenForm.value.email);
  
        await loading.dismiss();
  
        this.openModal(
          'Correo enviado exitosamente',
          'Por favor, sigue las instrucciones enviadas a tu correo.',
          'assets/icon/check.png',
          '',
          true
        );
   
      } catch (error) {
        await loading.dismiss();
  
        let message = 'Ocurrió un error durante la recuperación de contraseña';
        if (error instanceof FirebaseError) {
          message = firebaseErrors[error.code] || message;
        }
  
        this.openModal(
          'Error',
          message,
          'assets/icon/error.jpg',
          'Por favor, inténtalo de nuevo.',
          true
        );
      }
    }
  }

  // Función para abrir el modal con los datos adecuados
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

  // Función para cerrar el modal
  closeModal() {
    this.isModalVisible = false;
    if (this.modal) {
      this.modal.close();
    }
  }


}
