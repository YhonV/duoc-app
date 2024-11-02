import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { Barcode, BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { HttpClient } from '@angular/common/http';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { FilePicker } from '@capawesome/capacitor-file-picker';

@Component({
  selector: 'app-assistance-student',
  templateUrl: './assistance-student.page.html',
  styleUrls: ['./assistance-student.page.scss'],
})
export class AssistanceStudentPage implements OnInit {

  isSupported = false;
  barcodes: Barcode[] = [];
  scanResult = '';
  constructor(
    private http:HttpClient,
    private modalController: ModalController,
    private platform : Platform,
  ) { }

  ngOnInit() {
    if(this.platform.is('capacitor')){
      BarcodeScanner.isSupported().then();
      BarcodeScanner.removeAllListeners();
    }
  }

  // ========= Escanear QR ========= //

  async startScanner() {
    const modal = await this.modalController.create({
    component: BarcodeScanningModalComponent,
    cssClass: 'barcode-scanning-modal',
    showBackdrop: false,
    componentProps: { 
      formats: [],
      LensFacing: LensFacing.Back
     }
    });
  
    await modal.present();

    const { data } = await modal.onWillDismiss();

    if(data){
      this.scanResult = data?.barcode?.displayValue;
    }
  
  }

  // ====== Read QR from an image ====== //
  async readQRCode(){
    const {files } = await FilePicker.pickImages();

    const path = files[0]?.path;

    if(!path){return;}

    const { barcodes } = await BarcodeScanner.readBarcodesFromImage({
      path,
      formats: []
    }) 

    this.scanResult = barcodes[0]?.displayValue;
  };




  // ========= Tabla de asistencias ========= //
  tableData = [
    { title: 'ARQUITECTURA ASY4131', clase: 'ARQUITECTURA ASY4131', seccion: '003V', qr:'', sala: 'Sala 101', horario: 'Lunes 10:00 - 12:00', esTransversal: false },
    { title: 'CALIDAD DE SOFTWARE CSY4111', clase: 'CALIDAD DE SOFTWARE CSY4111', seccion: 'ASY4131-004V', qr:'', sala: 'Sala 102', horario: 'Martes 10:00 - 12:00', esTransversal: false },
    { title: 'ESTADISTICA DESCRIPTIVA MAT4140', clase: 'ESTADISTICA DESCRIPTIVA MAT4140', seccion: '004V', qr:'', sala: 'Sala 303', horario: 'Miércoles 10:00 - 12:00', esTransversal: false },
    { title: 'PROG. APPS MÓVILES PGY4122', clase: 'PROG. APPS MÓVILES PGY4122', seccion: '005V', qr:'', sala: 'Sala 330', horario: 'Jueves 10:00 - 12:00', esTransversal: false },
    { title: 'ETICA PARA EL TRABAJO EAY4450', clase: 'ETICA PARA EL TRABAJO EAY4450', seccion: '006V', qr:'', sala: 'Sala 403', horario: 'Viernes 10:00 - 12:00', esTransversal: true },
    { title: 'PROCESO DE PORTAFOLIO PY41447', clase: 'PROCESO DE PORTAFOLIO PY41447', seccion: '007V', qr:'', sala: 'Sala 310', horario: 'Lunes 13:00 - 16:00', esTransversal: false },
    { title: 'INGLES INTERMEDIO INI5111', clase: 'INGLES INTERMEDIO INI5111', seccion: '008V', qr:'', sala: 'Sala 105', horario: 'Martes 13:00 - 15:00', esTransversal: true }
  ];

  get filteredTableData() {
    return this.mostrarTransversales
      ? this.tableData.filter(asignatura => asignatura.esTransversal)
      : this.tableData;
  }
  
  // ========= Materias transversales (Toggle) ========= //
  mostrarTransversales = false;

  mostrarAsignaturas(event: any) {
    this.mostrarTransversales = event.detail.checked;
  }


  async registrarAsistencia(seccion: string = 'MP003', code: string = '123456'){
    const token = await FirebaseAuthentication.getIdToken();
    console.log('token:', token);
    const api = this.http.post('https://pgy4121serverlessapi.vercel.app/api/asistencia/qr/',
      {
        seccion: seccion,
        code: code
      },
      {
      headers: {
        Authorization: `Bearer ${token.token}`
      }
      }
    ).subscribe({
      next: data => {
        console.log('data:', data);
      },
      error: error => {
        console.error('error:', error);
      }
    })
  }
}
