import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.page.html',
  styleUrls: ['./assistance.page.scss'],
})
export class AssistancePage implements OnInit {

  currentDate: string;
  userName: string = 'Profesor'; 

  tableData = [
    { clase: 'ARQUITECTURA ASY4131', seccion: '003V', qr:'', sala: 'Sala 101', horario: 'Lunes 10:00 - 12:00' },
    { clase: 'ARQUITECTURA ASY4132', seccion: 'ASY4131-004V', qr:'', sala: 'Sala 102', horario: 'Martes 10:00 - 12:00' },
    { clase: 'PROG. APPS MÓVILES PGY4121', seccion: '004V', qr:'', sala: 'Sala 303', horario: 'Miércoles 10:00 - 12:00' },
    { clase: 'PROG. APPS MÓVILES PGY4122', seccion: '005V', qr:'', sala: 'Sala 303', horario: 'Jueves 10:00 - 12:00' },
  ];

  constructor() { this.currentDate = this.getFormattedDate();}

  ngOnInit() {
    this.tableData = this.tableData.map(row => ({
      ...row,
      qr: `${row.clase} ${row.horario} ${row.seccion}`
    }));
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
}