import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { firebaseErrors } from 'src/app/config/constants';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilService } from 'src/app/services/utils.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  isModalVisible: boolean = false;
  title: string = '';
  content: string = '';
  image: string = '';
  description: string = '';
  autoClose: boolean = false;
  redirectTo: string = '';

  firebaseService = inject(FirebaseService);
  utilService = inject(UtilService);

  constructor(private router: Router) {}

  ngOnInit() {}

  // ============== Metodos para validaciones del formulario ============== //

  validarRut(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const rut = control.value;
      
      // Verifica que el rut tenga un formato válido
      const esValido = /^[0-9]{7,8}-[0-9Kk]$/.test(rut);
      
      return esValido ? null : { rutInvalido: true };
    }  
  }

  // Validador personalizado para las contraseñas
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
  }, { validators: this.validarPass });

 

  async onSubmit() {
    if (this.registerForm.valid) {
      const loading = await this.utilService.loading();
      await loading.present();
  
      try {
        const res = await this.firebaseService.signUp(this.registerForm.value as User);

        let uid = res.user.uid;
        this.registerForm.controls.uid.setValue(uid);

        this.setUserToFirestore(uid);

        await loading.dismiss();
        this.openModal(
          'Registro exitoso',
          'Tu cuenta ha sido creada exitosamente',
          'assets/icon/check.png',
          'Serás redirigido a la página de inicio de sesión.',
          true
        );
  
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000); 
      } catch (error) {
        await loading.dismiss();
  
        let message = 'Ocurrió un error durante el registro';
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

  async setUserToFirestore(uid: string) {
    if (this.registerForm.valid) {
      const loading = await this.utilService.loading();
      await loading.present();
  
      let path = `users/${uid}`;
      delete this.registerForm.value.password;
  
      try {
        await this.firebaseService.setDocument(path, this.registerForm.value);
      } catch (error) {
        console.error('Error al guardar el usuario en Firestore', error);
      } finally {
        await loading.dismiss();
      }
    }
  }

  // ============== Metodos para el modal ============== //
  
  // Función para abrir el modal con los datos adecuados
  openModal(title: string, content: string, image: string, description: string, autoClose: boolean) {
    this.title = title;
    this.content = content;
    this.image = image;
    this.description = description;
    this.autoClose = autoClose;
    this.isModalVisible = true;
    
    setTimeout(() => {
      if (this.modal) {
        this.modal.open();
      } else {
        console.error('Modal component not found');
      }
    });

    if (autoClose) {
      setTimeout(() => {
        this.isModalVisible = false;
        if (this.redirectTo) {
          this.router.navigate([this.redirectTo]);
        }
      }, 3000);
    }
  }

  // Función para cerrar el modal
  onModalClose() {
    this.isModalVisible = false;
    if (this.redirectTo) {
      this.router.navigate([this.redirectTo]);
    }
  }


}
