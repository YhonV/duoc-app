import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  currentDate: string;

  constructor(
    private menuController: MenuController,
    private router: Router
  ) { 
    this.currentDate = this.getFormattedDate();
  }

  ngOnInit() {}

  getFormattedDate(): string {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    };
    
    let formattedDate = date.toLocaleDateString('es-ES', options);
  
    // Divide la cadena en palabras
    let words = formattedDate.split(' ');
    
    // Capitaliza la primera palabra (día de la semana) y la tercera palabra (mes)
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    words[3] = words[3].charAt(0).toUpperCase() + words[3].slice(1);
    
    // Une las palabras de nuevo en una cadena
    return words.join(' ');
  }

  openMenu() {
    console.log('Abriendo menú...');
    this.menuController.open('end');
  }

  closeMenu() {
    console.log('Cerrando menú...');
    this.menuController.close('end');
  }

  viewProfile() {
    console.log('Viendo perfil...');
    this.closeMenu();
    this.router.navigate(['/profile']);
  }

  logout() {
    console.log('Cerrando sesión...');
    this.closeMenu();
    this.router.navigate(['/login']);
  }
}