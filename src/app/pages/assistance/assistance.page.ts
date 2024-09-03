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
    { clase: 'CALIDAD DE SOFTWARE CSY4111', seccion: 'ASY4131-004V', qr:'', sala: 'Sala 102', horario: 'Martes 10:00 - 12:00' },
    { clase: 'ESTADISTICA DESCRIPTIVA MAT4140', seccion: '004V', qr:'', sala: 'Sala 303', horario: 'Miércoles 10:00 - 12:00' },
    { clase: 'PROG. APPS MÓVILES PGY4122', seccion: '005V', qr:'', sala: 'Sala 330', horario: 'Jueves 10:00 - 12:00' },
    { clase: 'ETICA PARA EL TRABAJO EAY4450', seccion: '006V', qr:'', sala: 'Sala 403', horario: 'Viernes 10:00 - 12:00' },
    { clase: 'PROCESO DE PORTAFOLIO PY41447', seccion: '007V', qr:'', sala: 'Sala 310', horario: 'Lunes 13:00 - 16:00' },
    { clase: 'INGLES INTERMEDIO INI5111', seccion: '008V', qr:'', sala: 'Sala 105', horario: 'Martes 13:00 - 15:00' },
    { clase: 'PROG. APPS MÓVILES PGY4126', seccion: '009V', qr:'', sala: 'Sala 413', horario: 'Miércoles 15:00 - 18:00' },
    { clase: 'ARQUITECTURA ASY4131', seccion: '002V', qr:'', sala: 'Sala 410', horario: 'Jueves 14:00 - 17:00' },
  ];

  constructor() {}

  ngOnInit() {
    this.tableData = this.tableData.map(row => ({
      ...row,
      qr: `${row.clase} ${row.horario} ${row.seccion}`
    }));
  }
}