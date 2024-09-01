import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  currentDate: string;

  constructor() {
    this.currentDate = this.getFormattedDate();
  }

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

  ngOnInit() {
  }

}
