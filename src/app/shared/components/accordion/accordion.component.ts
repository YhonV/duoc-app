import { Component, Input, OnInit, ViewChild } from '@angular/core';
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


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}