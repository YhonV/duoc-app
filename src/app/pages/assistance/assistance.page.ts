import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.page.html',
  styleUrls: ['./assistance.page.scss'],
})
export class AssistancePage implements OnInit {

  tableData = [
    { clase: 'ARQUITECTURA ASY4131', seccion: '003V', qr:'', sala: 'Sala 101', horario: 'Lunes 10:00 - 12:00' },
    { clase: 'ARQUITECTURA ASY4132', seccion: 'ASY4131-004V', qr:'', sala: 'Sala 102', horario: 'Martes 10:00 - 12:00' },
    { clase: 'PROG. APPS MÓVILES PGY4121', seccion: '004V', qr:'', sala: 'Sala 303', horario: 'Miércoles 10:00 - 12:00' },
    { clase: 'PROG. APPS MÓVILES PGY4122', seccion: '005V', qr:'', sala: 'Sala 303', horario: 'Jueves 10:00 - 12:00' },
    { clase: 'PROG. APPS MÓVILES PGY4123', seccion: '006V', qr:'', sala: 'Sala 303', horario: 'Jueves 10:00 - 12:00' },
    { clase: 'PROG. APPS MÓVILES PGY4124', seccion: '007V', qr:'', sala: 'Sala 303', horario: 'Jueves 10:00 - 12:00' },
    { clase: 'PROG. APPS MÓVILES PGY4125', seccion: '008V', qr:'', sala: 'Sala 303', horario: 'Jueves 10:00 - 12:00' },
    { clase: 'PROG. APPS MÓVILES PGY4126', seccion: '009V', qr:'', sala: 'Sala 303', horario: 'Jueves 10:00 - 12:00' },
    { clase: 'PROG. APPS MÓVILES PGY4127', seccion: '002V', qr:'', sala: 'Sala 303', horario: 'Jueves 10:00 - 12:00' },
  ];

  constructor() {}

  ngOnInit() {
    this.tableData = this.tableData.map(row => ({
      ...row,
      qr: `${row.clase} ${row.horario} ${row.seccion}`
    }));
  }
}