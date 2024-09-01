import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { QRCodeElementType, QRCodeModule } from 'angularx-qrcode';

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

  async openQRModal(row: TableData) {
    this.selectedClass = row.clase;
    this.selectedQRImage = row.qr;
    this.modal.showQRCode = true;
    this.modal.modal.present();
  }  
}