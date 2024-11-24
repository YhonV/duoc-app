import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { firebaseErrors } from 'src/app/config/constants';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  firebaseService = inject(FirebaseService);
  utilService = inject(UtilService);

  constructor(private router: Router) {}

  ngOnInit() {}

  // ============== Metodos para validaciones del formulario ============== //

  validarRut(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const rut = control.value;
      const esValido = /^[0-9]{7,8}-[0-9Kk]$/.test(rut);
      
      return esValido ? null : { rutInvalido: true };
    }  
  }

  validarPass: ValidatorFn = (formGroup: AbstractControl): { [key: string]: boolean } | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword
      ? { mismatch: true }
      : null;
  };
  
  validarPhone(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phone = control.value;
      
      // Verifica que el teléfono tenga 9 dígitos y solo contenga números
      const esValido = /^[0-9]{9}$/.test(phone);
      
      return esValido ? null : { phoneInvalido: true };
    };
  }

  filtrarPhone(event: any): void {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  registerForm = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    rut: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, this.validarPhone()]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl(''),
  }, { validators: this.validarPass });

 

  async onSubmit() {
    if (this.registerForm.valid) {
      const loading = await this.utilService.loading();
      await loading.present();
  
      try {
        if(this.registerForm.value.email.includes('profesor')){
          this.registerForm.controls.role.setValue('Profesor');
        }else{
          this.registerForm.controls.role.setValue('Estudiante');
        }
        const res = await this.firebaseService.signUp(this.registerForm.value as User);

        let uid = res.user.uid;
        this.registerForm.controls.uid.setValue(uid);

        this.setUserToFirestore(uid);

        await loading.dismiss();
        this.utilService.openAlert('Usuario registrado exitosamente', 'En unos segundos te vamos a redirigir al login', 'checkmark-circle');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000); 
      } catch (error) {
        await loading.dismiss();
  
        let message = 'Ocurrió un error durante el registro';
        if (error instanceof FirebaseError) {
          message = firebaseErrors[error.code] || message;
        }
        this.utilService.openAlert(message, '', 'close-circle');
      }
    }
  }

  async setUserToFirestore(uid: string) {
    if (this.registerForm.valid) {
      const loading = await this.utilService.loading();
      //await loading.present();
  
      let path = `users/${uid}`;
      delete this.registerForm.value.password;
      delete this.registerForm.value.confirmPassword;
  
      try {
        await this.firebaseService.setDocument(path, this.registerForm.value);
      } catch (error) {
        console.error('Error al guardar el usuario en Firestore', error);
      } finally {
        //await loading.dismiss();
      }
    }
  }
}
