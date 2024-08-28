import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.page.html',
  styleUrls: ['./forgotten-password.page.scss'],
})
export class ForgottenPasswordPage implements OnInit {

  forgottenForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor() { }

  ngOnInit() {
  }

  validarEmail() {
    if (this.forgottenForm.get('email')?.invalid) {
      console.log('hola') ;
    }
    console.log('hola1234') ;
  }
}
