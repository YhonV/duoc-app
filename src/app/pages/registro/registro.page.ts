import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  // Validador personalizado para las contraseñas
  validarPass: ValidatorFn = (formGroup: AbstractControl): { [key: string]: boolean } | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword
      ? { mismatch: true }
      : null;
  };


  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    rut: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, this.validarPhone()]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  }, { validators: this.validarPass });


  validarRut(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const rut = control.value;
      
      // Verifica que el rut tenga un formato válido
      const esValido = /^[0-9]{7,8}-[0-9Kk]$/.test(rut);
      
      return esValido ? null : { rutInvalido: true };
    }  
  }
  
  validarPhone(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phone = control.value;
      
      // Verifica que el teléfono tenga 9 dígitos y solo contenga números
      const esValido = /^[0-9]{9}$/.test(phone);
      
      return esValido ? null : { phoneInvalido: true };
    };
  }
  

  

  // Método para filtrar la entrada de caracteres en el campo de teléfono
  filtrarPhone(event: any): void {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  constructor(private router: Router) {}

  ngOnInit() {}

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
      }, 3000); // Redirigir después de 3 segundos
    }
  }

  // Función para cerrar el modal
  onModalClose() {
    this.isModalVisible = false;
    if (this.redirectTo) {
      this.router.navigate([this.redirectTo]);
    }
  }

  // Función para manejar la creación de cuenta
  crearCuenta() {
    if (this.registerForm.valid) {
      this.openModal(
        'Cuenta creada',
        'Tu cuenta ha sido creada exitosamente.',
        'assets/icon/check.png',
        'Serás redirigido al inicio de sesión en unos segundos.',
        true
      );
      this.redirectTo = '/login';
    } else {
      this.openModal(
        'Error',
        'No se pudo crear la cuenta. Por favor, inténtalo de nuevo.',
        'assets/icon/error.png',
        '',
        false
      );
      this.redirectTo = '';
    }
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.crearCuenta();
  }
}
