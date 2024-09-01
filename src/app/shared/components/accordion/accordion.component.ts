import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

interface TableData {
  clase: string;
  seccion: string;
  qr: string;
  sala: string;
  horario: string;
}

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {
  @Input() data: TableData[] = [];
  @Input() showQRColumn: boolean = true;
  @ViewChild('modal') modal!: ModalComponent;

  selectedClass: string = '';
  selectedQRImage: string = '';

  constructor() {}

  ngOnInit() {}

  openQRModal(row: TableData) {
    this.selectedClass = row.clase;
    this.selectedQRImage = row.qr; // Asigna la imagen del QR desde los datos de la fila
    this.modal.modal.present();
  }
}