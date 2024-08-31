import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.page.html',
  styleUrls: ['./assistance.page.scss'],
})
export class AssistancePage implements OnInit {
  presentingElement: Element | null = null;

  tableData = [
    { clase: 'ARQUITECTURA', seccion: 'ASY4131-003V', qr: 'QR1', sala: 'Sala 101' },
    { clase: 'ARQUITECTURA', seccion: 'ASY4131-004V', qr: 'QR1', sala: 'Sala 102' },
    { clase: 'PROG. APPS MÓVILES', seccion: 'PGY4121- 004V', qr: 'QR3', sala: 'Sala 303' },
    { clase: 'PROG. APPS MÓVILES', seccion: 'PGY4121- 005V', qr: 'QR3', sala: 'Sala 303' }
  ];

  constructor() { }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }
}