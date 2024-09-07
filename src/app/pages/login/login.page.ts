import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { AutenticacionService } from 'src/app/autenticacion.service';

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

  constructor(private router: Router, private autenticacionService: AutenticacionService) {}

  ngOnInit() {
  }

  closeModal() {
    this.isModalVisible = false;
    if (this.modal) {
      this.modal.close();
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Diste clic en el botón de ingresar');
    }
  }

  ingresar() {
    const emailValue = this.form.get('email')?.value;
    const passwordValue = this.form.get('password')?.value;
  
    if (emailValue === 'admin@gmail.com' && passwordValue === 'admin123') {
      this.autenticacionService.setUserRole('admin');  // Establecer rol como admin
      this.router.navigate(['/home']);
    } else if (emailValue === 'student@gmail.com' && passwordValue === 'student123') {
      this.autenticacionService.setUserRole('student');  // Establecer rol como estudiante
      this.router.navigate(['/home']);
    } else {
      this.openModal(
        'Error',
        'Usuario incorrecto o no autorizado.',
        'assets/icon/error.jpg',
        'Por favor, inténtalo de nuevo.',
        true
      );
      this.closeModal();
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
