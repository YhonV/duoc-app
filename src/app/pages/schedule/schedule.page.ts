import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {


  tableData = [
    { clase: 'Lunes', seccion: '003V', qr:'', sala: 'Sala 101', horario: 'Lunes 10:00 - 12:00' },
    { clase: 'Martes', seccion: 'ASY4131-004V', qr:'', sala: 'Sala 102', horario: 'Martes 10:00 - 12:00' },
    { clase: 'Miércoles', seccion: '004V', qr:'', sala: 'Sala 303', horario: 'Miércoles 10:00 - 12:00' },
    { clase: 'Jueves', seccion: '005V', qr:'', sala: 'Sala 303', horario: 'Jueves 10:00 - 12:00' },
    { clase: 'Viernes', seccion: '006V', qr:'', sala: 'Sala 303', horario: 'Jueves 10:00 - 12:00' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
