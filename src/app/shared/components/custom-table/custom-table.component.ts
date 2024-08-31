import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

interface TableData {
  clase: string;
  seccion: string;
  qr: string;
  sala: string;
}

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
})
export class CustomTableComponent implements OnInit {
  @Input() data: TableData[] = [];
  @Input() showQRColumn: boolean = true;
  @ViewChild('modal') modal!: ModalComponent;

  headers: string[] = ['Clase', 'Sección', 'QR', 'Sala'];

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