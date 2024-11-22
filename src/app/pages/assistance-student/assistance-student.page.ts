import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user.model';
import { Preferences } from '@capacitor/preferences';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/utils.service';
import { BarcodeScanner } from 'capacitor-barcode-scanner';

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
  scanResult = '';
  mostrarTransversales = false;
  redirectTo: string = '';
  utilService = inject(UtilService)

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  async ngOnInit() {
    const userResult = await Preferences.get({ key: 'userDoc' });
    this.user = userResult.value ? JSON.parse(userResult.value) as User : {} as User;
  }

  // Método para escanear QR en la versión web
  async startScannerWeb() {
    const spin = await this.utilService.loading();
    const scanR = await BarcodeScanner.scan();
    console.log('scanR', scanR);
    if (scanR.result) {
      try {
        const datos = JSON.parse(scanR.code!);
        const resultadoMarcar = await this.utilService.post<{ success: boolean }>('https://pgy4121serverlessapi.vercel.app/api/asistencia/qr', datos);
        spin.dismiss(); 
        this.utilService.openAlert('Asistencia registrada correctamente', 'Gracias por preferirnos :D', 'checkmark-circle');
      } catch (error: any) {
        spin.dismiss();
        console.log('error', error);
        if (error instanceof HttpErrorResponse) {
          this.utilService.openAlert('Error', error.error.message, 'alert-circle');
        } else {
          this.utilService.openAlert('Error', 'Ocurrió un error inesperado', 'alert-circle');
        }
      }
    }
  }

  // ========= Tabla de asistencias ========= //
  tableData = [
    
    { title: 'ARQUITECTURA ASY4131', clase: 'ARQUITECTURA ASY4131', seccion: '003V', qr: '', sala: 'Sala 101', horario: 'Lunes 10:00 - 12:00', esTransversal: false },
    { title: 'CALIDAD DE SOFTWARE CSY4111', clase: 'CALIDAD DE SOFTWARE CSY4111', seccion: 'ASY4131-004V', qr: '', sala: 'Sala 102', horario: 'Martes 10:00 - 12:00', esTransversal: false },
    { title: 'ESTADISTICA DESCRIPTIVA MAT4140', clase: 'ESTADISTICA DESCRIPTIVA MAT4140', seccion: '004V', qr: '', sala: 'Sala 303', horario: 'Miércoles 10:00 - 12:00', esTransversal: false },
    { title: 'PROG. APPS MÓVILES PGY4122', clase: 'PROG. APPS MÓVILES PGY4122', seccion: '005V', qr: '', sala: 'Sala 330', horario: 'Jueves 10:00 - 12:00', esTransversal: false },
    { title: 'ETICA PARA EL TRABAJO EAY4450', clase: 'ETICA PARA EL TRABAJO EAY4450', seccion: '006V', qr: '', sala: 'Sala 403', horario: 'Viernes 10:00 - 12:00', esTransversal: true },
    { title: 'PROCESO DE PORTAFOLIO PY41447', clase: 'PROCESO DE PORTAFOLIO PY41447', seccion: '007V', qr: '', sala: 'Sala 310', horario: 'Lunes 13:00 - 16:00', esTransversal: false },
    { title: 'INGLES INTERMEDIO INI5111', clase: 'INGLES INTERMEDIO INI5111', seccion: '008V', qr: '', sala: 'Sala 105', horario: 'Martes 13:00 - 15:00', esTransversal: true }
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

  registrarAsistencia() {
    console.log('Ingresando a registrarAsistencia');
    this.createAssistance('Prueba0911V3', 'W097');
  }

  async createAssistance(seccion: string, code: string) {
    console.log('Ingresando a createAssistance');
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
    });
  }

  // ============== Metodos para el modal ============== //
  // Función para abrir el modal con los datos adecuados
  openModal(title: string, content: string, image: string, description: string, autoClose: boolean) {
    // Reiniciar el estado del modal
    this.isModalVisible = false;
    
    // Establecer nuevos valores
    this.title = title;
    this.content = content;
    this.image = image;
    this.description = description;
    this.autoClose = autoClose;
    
    // Pequeño delay para asegurar que el estado se haya reiniciado
    setTimeout(() => {
      this.isModalVisible = true;
      if (this.modal) {
        this.modal.open();
      } else {
        console.error('Modal component not found');
      }
  
      if (autoClose) {
        setTimeout(() => {
          this.closeModal();
        }, 3000);
      }
    }, 100);
  }
  // Nuevo método para cerrar el modal
closeModal() {
  this.isModalVisible = false;
  this.title = '';
  this.content = '';
  this.image = '';
  this.description = '';
  this.autoClose = false;
  
  if (this.redirectTo) {
    this.router.navigate([this.redirectTo]);
  }
}

// Actualizar onModalClose para usar closeModal
onModalClose() {
  this.closeModal();
}

  presentAler(){
    this.utilService.openAlert('Error', 'Ocurrió un error inesperado', 'assets/icon/error.jpg');
  }   
}