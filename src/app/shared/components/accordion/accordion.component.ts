import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { AttendanceModalComponent } from './attendance-modal.component';
import { BarcodeScanningModalComponent } from 'src/app/pages/assistance-student/barcode-scanning-modal.component';

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

  constructor(
    private loadingController: LoadingController,
    private platform: Platform,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    if(this.platform.is('capacitor')){
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }
  }

  async openQRModal(row: TableData) {
    this.selectedClass = row.clase;
    this.selectedQRImage = row.qr ?? '';
    this.modal.showQRCode = true;
    this.warning = '** Código válido por 10 minutos **';
    this.modal.modal.present();
  }  

  async startScanner() {
    const modal = await this.modalController.create({
    component: BarcodeScanningModalComponent,
    cssClass: 'barcode-scanning-modal',
    showBackdrop: false,
    componentProps: { 
      formats: [],
      LensFacing: LensFacing.Back,
     }
    });
  
    await modal.present();

    const { data } = await modal.onWillDismiss();
    
    if(data){
      this.scanResult = data?.barcode?.displayValue;
    }
  }

  async openAttendanceModal(row: TableData) {
    const modal = await this.modalController.create({
      component: AttendanceModalComponent,
      componentProps: {
        attendanceRecords: [
          { date: '2024-08-15',  present: true, justified: false, absent: false },
          { date: '2024-08-16',  present: false, justified: false, absent: true },
          { date: '2024-08-19',  present: true, justified: false, absent: false },
          { date: '2024-08-19',  present: false, justified: false, absent: true },
          { date: '2024-08-20',  present: true, justified: false, absent: false },
          { date: '2024-08-20',  present: true, justified: false, absent: false },
          { date: '2024-08-21',  present: false, justified: false, absent: true },
          { date: '2024-08-19',  present: true, justified: false, absent: false },
          { date: '2024-08-20',  present: true, justified: false, absent: false },
          { date: '2024-08-21',  present: false, justified: true, absent: false },
          { date: '2024-08-22',  present: true, justified: false, absent: false },
          { date: '2024-08-23',  present: false, justified: true, absent: false },
          { date: '2024-08-25',  present: true, justified: false, absent: false },
          { date: '2024-08-25',  present: true, justified: false, absent: false },
          { date: '2024-08-26',  present: true, justified: false, absent: false },
          { date: '2024-08-27',  present: false, justified: false, absent: true },
        ]
      },
      cssClass: 'attendance-modal'
    });
    await modal.present();
  }

}