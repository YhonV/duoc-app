import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Seccion } from 'src/app/models/asistencia.model';
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

  async listarAsistencias() {
    try {
      // Define el tipo de la respuesta como un arreglo de `Seccion`
      const lista = await this.utilService.get<Seccion[]>('https://pgy4121serverlessapi.vercel.app/api/asistencia/listar');
      
      // Devuelve la lista si necesitas usarla en otro lugar

      lista.forEach(seccion => {
        console.log(`Sección: ${seccion.seccion === 'PruebaYhonv2'}`);
        seccion.asistencia.forEach(asistencia => {
          console.log(`Clase ID: ${asistencia.claseId}`);
          console.log(`Fecha: ${asistencia.fecha}`);
          console.log(`Asistido: ${asistencia.asistido}`);
          console.log(`Fecha/Hora: ${asistencia.fechaHora}`);
        });
      });

      return lista;
    } catch (error) {
      console.error('Error al listar asistencias:', error);
      throw error; // Manejo del error para el llamador
    }
  }
  

  // ========= Materias transversales (Toggle) ========= //

  get filteredTableData() {
    return this.mostrarTransversales
      ? this.tableData.filter(asignatura => asignatura.esTransversal)
      : this.tableData;
  }

  mostrarAsignaturas(event: any) {
    this.mostrarTransversales = event.detail.checked;
  }

}