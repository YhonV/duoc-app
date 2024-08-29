import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  validarPass: ValidatorFn = (formGroup: AbstractControl): { [key: string]: boolean } | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword
      ? { mismatch: true }
      : null;
  }

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    rut: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  }, { validators: this.validarPass});


  

  constructor(private modalController: ModalController,
    private router: Router 
  ) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'custom-modal',
    });
    return await modal.present();
  }

  
  ngOnInit() {
  }


  onSubmit() {
    console.log(this.registerForm.value);
  }


  crearCuenta(){
    if (this.registerForm.valid){
      this.presentModal().then(() => {
        setTimeout(() => {
          this.modalController.dismiss().then(() => {
            this.router.navigate(['/login']); // Redirige a la vista de inicio de sesión
          });; // Cierra el modal después de 1 segundo
        }, 3000); // Ajusta el tiempo según sea necesario     
      });
    }
    console.log('Cuenta no creada');
  }

}
