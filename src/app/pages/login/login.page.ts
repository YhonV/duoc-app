import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

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

  constructor(private router: Router) {}

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.valid) {
      // Lógica para manejar el inicio de sesión exitoso
      console.log('Formulario válido', this.form.value);
    }
  }

    // Función para abrir el modal con los datos adecuados
    openModal(title: string, content: string, image: string, description: string) {
      this.title = title;
      this.content = content;
      this.image = image;
      this.description = description;
      this.isModalVisible = true;
    }
  
    // Función para cerrar el modal
    onModalClose() {
      this.isModalVisible = false;
    }

  ingresar(){
    const emailValue = this.form.get('email')?.value;
    const passwordValue = this.form.get('password')?.value;
    
    if (emailValue && passwordValue && emailValue === 'admin@gmail.com' && passwordValue === 'admin123') {
      this.router.navigate(['/home']);
    }
    else {
      this.openModal(
        'Error',
        'Usuario incorrecto o no autorizado.',
        'assets/icon/error.jpg',
        'Por favor, inténtalo de nuevo.'
      );
    }
  }



}
