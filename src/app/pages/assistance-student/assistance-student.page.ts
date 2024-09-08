import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-assistance-student',
  templateUrl: './assistance-student.page.html',
  styleUrls: ['./assistance-student.page.scss'],
})
export class AssistanceStudentPage implements OnInit {

  scanResult = '';
  constructor(
    private loadingController: LoadingController,
    private platform: Platform,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  tableData = [
    { title: 'ARQUITECTURA ASY4131', clase: 'ARQUITECTURA ASY4131', seccion: '003V', qr:'', sala: 'Sala 101', horario: 'Lunes 10:00 - 12:00', esTransversal: false },
    { title: 'CALIDAD DE SOFTWARE CSY4111', clase: 'CALIDAD DE SOFTWARE CSY4111', seccion: 'ASY4131-004V', qr:'', sala: 'Sala 102', horario: 'Martes 10:00 - 12:00', esTransversal: false },
    { title: 'ESTADISTICA DESCRIPTIVA MAT4140', clase: 'ESTADISTICA DESCRIPTIVA MAT4140', seccion: '004V', qr:'', sala: 'Sala 303', horario: 'Miércoles 10:00 - 12:00', esTransversal: false },
    { title: 'PROG. APPS MÓVILES PGY4122', clase: 'PROG. APPS MÓVILES PGY4122', seccion: '005V', qr:'', sala: 'Sala 330', horario: 'Jueves 10:00 - 12:00', esTransversal: false },
    { title: 'ETICA PARA EL TRABAJO EAY4450', clase: 'ETICA PARA EL TRABAJO EAY4450', seccion: '006V', qr:'', sala: 'Sala 403', horario: 'Viernes 10:00 - 12:00', esTransversal: true },
    { title: 'PROCESO DE PORTAFOLIO PY41447', clase: 'PROCESO DE PORTAFOLIO PY41447', seccion: '007V', qr:'', sala: 'Sala 310', horario: 'Lunes 13:00 - 16:00', esTransversal: false },
    { title: 'INGLES INTERMEDIO INI5111', clase: 'INGLES INTERMEDIO INI5111', seccion: '008V', qr:'', sala: 'Sala 105', horario: 'Martes 13:00 - 15:00', esTransversal: true }
  ];
  
  mostrarTransversales = false;

  get filteredTableData() {
    return this.mostrarTransversales
      ? this.tableData.filter(asignatura => asignatura.esTransversal)
      : this.tableData;
  }

  mostrarAsignaturas(event: any) {
    this.mostrarTransversales = event.detail.checked;
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

}
