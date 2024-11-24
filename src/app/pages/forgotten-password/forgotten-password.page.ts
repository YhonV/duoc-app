import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseError } from 'firebase/app';
import { firebaseErrors } from 'src/app/config/constants';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.page.html',
  styleUrls: ['./forgotten-password.page.scss'],
})
export class ForgottenPasswordPage implements OnInit {

  forgottenForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  firebaseService = inject(FirebaseService);
  utilService = inject(UtilService);

  constructor() { }

  ngOnInit() {
  }

  
  async onSubmit() {
    if (this.forgottenForm.valid) {
      const loading = await this.utilService.loading();
      await loading.present();
  
      try {
        const res = await this.firebaseService.sendRecorveryEmail(this.forgottenForm.value.email);
  
        await loading.dismiss();
        this.utilService.openAlert('Se ha enviado un correo de recuperación de contraseña', '', 'checkmark-circle');
      } catch (error) {
        await loading.dismiss();
  
        let message = 'Ocurrió un error durante la recuperación de contraseña';
        if (error instanceof FirebaseError) {
          message = firebaseErrors[error.code] || message;
        }
  
        this.utilService.openAlert(message, '', 'close-circle');
      }
    }
  }

}
