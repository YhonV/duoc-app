import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { AlertController, ModalController } from '@ionic/angular';
import { AttendanceModalComponent } from './attendance-modal.component';
import { AssistanceStudentPage } from 'src/app/pages/assistance-student/assistance-student.page';

interface TableData {
  title: string;
  clase: string;
  seccion: string;
  qr?: string;
  sala: string;
  horario: string;
  dia?: string;
}

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {
  @Input() data: TableData[] = [];
  @Input() showQRColumn: boolean = true;
  @Input() showScanQR: boolean = true;
  @Input() allAsistance: boolean = true;
  @ViewChild('modal') modal!: ModalComponent;
  @Input() warning: string = '';
  scanResult = '';
  selectedClass: string = '';
  selectedQRImage: string = '';
  isModalOpen = false;
  assistance: AssistanceStudentPage;
  
  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
  }

  async openQRModal(row: TableData) {
    this.selectedClass = row.clase;
    this.selectedQRImage = row.qr ?? '';
    this.modal.showQRCode = true;
    this.warning = '** Código válido por 10 minutos **';
    this.modal.modal.present();
  }  

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}