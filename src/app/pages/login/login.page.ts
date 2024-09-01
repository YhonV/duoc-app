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

  // openModal(title: string, content: string, image: string, description: string, isVisible: boolean) {
  //   this.title = title;
  //   this.content = content;
  //   this.image = image;
  //   this.description = description;
  //   this.isModalVisible = isVisible;
  // }

  closeModal() {
    this.isModalVisible = false;
  }

  onSubmit() {
    if (this.form.valid) {
      // Lógica para manejar el inicio de sesión exitoso
      console.log('Diste clic en el botón de ingresar');
    }
  }

  ingresar() {
    const emailValue = this.form.get('email')?.value;
    const passwordValue = this.form.get('password')?.value;
    if (emailValue !== 'admin@gmail.com' || passwordValue !== 'admin123') {
      this.openModal(
        'Error',
        'Usuario incorrecto o no autorizado.',
        'assets/icon/error.jpg',
        'Por favor, inténtalo de nuevo.',
        true
      );
    } else {
      this.router.navigate(['/home']);
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
  
}
