import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {  ModalController, Platform } from '@ionic/angular';
import { Barcode, BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import { HttpClient } from '@angular/common/http';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user.model';
import { Preferences } from '@capacitor/preferences';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-assistance-student',
  templateUrl: './assistance-student.page.html',
  styleUrls: ['./assistance-student.page.scss'],
})
export class AssistanceStudentPage implements OnInit {

  @ViewChild(ModalComponent) modal!: ModalComponent;
  isModalVisible: boolean = false;
  title: string = '';
  content: string = '';
  image: string = '';
  description: string = '';
  autoClose: boolean = false;
  user = {} as User;
  isSupported = false;
  barcodes: Barcode[] = [];
  scanResult = '';
  mostrarTransversales = false;
  redirectTo: string = '';
  utilService = inject(UtilService)

  constructor(
    private http:HttpClient,
    private modalController: ModalController,
    private platform : Platform,
    private router: Router,
  ) { }

  async ngOnInit() {
    const userResult = await Preferences.get({ key: 'userDoc' });
    this.user = userResult.value ? JSON.parse(userResult.value) as User : {} as User;
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
  
    if (data) {
      this.scanResult = data?.barcode?.displayValue;
  
      try {
        const qrData = JSON.parse(this.scanResult);
        const seccion = qrData.seccion;
        const code = qrData.code;
  
        if (seccion && code) {
          this.createAssistance(seccion, code);
        } else {
          console.error('QR code does not contain the required attributes');
        }
      } catch (error) {
        console.error('Error parsing QR code data', error);
      }
    }
  }

  // ====== Read QR from an image ====== //
  async readQRCode(){
    const {files } = await FilePicker.pickImages();

    const path = files[0]?.path;
    
    const { barcodes } = await BarcodeScanner.readBarcodesFromImage({
      path,
      formats: []
    }) 

    try{
      const qrData = JSON.parse(barcodes[0]?.displayValue);
      const seccion = qrData.seccion;
      const code = qrData.code;
      if (seccion && code) {
        this.createAssistance(seccion, code);
      } else {
        console.error('QR code does not contain the required attributes');
      }
    } catch (error) {
      console.error('Error parsing QR code data', error);
    }

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

  
  // ========= Materias transversales (Toggle) ========= //

  get filteredTableData() {
    return this.mostrarTransversales
      ? this.tableData.filter(asignatura => asignatura.esTransversal)
      : this.tableData;
  }

  mostrarAsignaturas(event: any) {
    this.mostrarTransversales = event.detail.checked;
  }

  // =========  ========= //

  registrarAsistencia(){
    console.log('Ingresando a registrarAsistencia')
    this.createAssistance('Prueba0911V3', 'W097')
  }


  async createAssistance(seccion: string, code: string){
    console.log('Ingresando a createAssistance')
    const loading = await this.utilService.loading();
    await loading.present();

    const token = await FirebaseAuthentication.getIdToken();
    console.log('token:', token);
    this.http.post('https://pgy4121serverlessapi.vercel.app/api/asistencia/qr',
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
      next: async data => {
        await loading.dismiss();
          this.openModal(
            'Alerta',
            'Asistencia registrada correctamente.',
            'assets/icon/check.png',
            'Serás redirigido a la página de inicio de sesión.',
            true
          );
      },
      error: async error => {          
        if (error.status === 400 && error.error && error.error.message) {
          await loading.dismiss();
          this.openModal(
            'Alerta',
            error.error.message,
            'assets/icon/error.jpg',
            'Serás redirigido a la página de inicio de sesión.',
            true
          );
        } else {
          await loading.dismiss();
          this.openModal(
            'Alerta',
            'ERROR NO CONTROLADO  ',
            'assets/icon/error.jpg',
            'Serás redirigido a la página de inicio de sesión.',
            true
          );
        }
      }
    })
  }

  // ============== Metodos para el modal ============== //
  // Función para abrir el modal con los datos adecuados
  openModal(title: string, content: string, image: string, description: string, autoClose: boolean) {
    this.title = title;
    this.content = content;
    this.image = image;
    this.description = description;
    this.autoClose = autoClose;
    this.isModalVisible = true;
    
    setTimeout(() => {
      if (this.modal) {
        this.modal.open();
      } else {
        console.error('Modal component not found');
      }
    });

    if (autoClose) {
      setTimeout(() => {
        this.isModalVisible = false;
        if (this.redirectTo) {
          this.router.navigate([this.redirectTo]);
        }
      }, 3000);
    }
  }

  // Función para cerrar el modal
  onModalClose() {
    this.isModalVisible = false;
    if (this.redirectTo) {
      this.router.navigate([this.redirectTo]);
    }
  }
}