import { Component, OnInit, } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Seccion } from 'src/app/models/asistencia.model';
import { User } from 'src/app/models/user.model';
import { Historial } from 'src/app/models/historial.model';
import { Preferences } from '@capacitor/preferences';
import { UtilService } from 'src/app/services/utils.service';
import { BarcodeScanner } from 'capacitor-barcode-scanner';

@Component({
  selector: 'app-assistance-student',
  templateUrl: './assistance-student.page.html',
  styleUrls: ['./assistance-student.page.scss'],
})
export class AssistanceStudentPage implements OnInit {
  user = {} as User;
  mostrarTransversales = false;
  historial: Historial[] = [];

  constructor(
    private utilService: UtilService,
  ) { }

  async ngOnInit() {
    try {
      // Recuperar usuario logeado
      const userResult = await Preferences.get({ key: 'user' }); // Cambiado de userDoc a user
      this.user = userResult.value ? JSON.parse(userResult.value) as User : {} as User;
  
      if (this.user && this.user.uid) {
        // Recuperar historial específico para el usuario
        const userKey = `historialAsistencias_${this.user.uid}`;
        const historialResult = await Preferences.get({ key: userKey });
        this.historial = historialResult.value ? JSON.parse(historialResult.value) : [];
        console.log(`Historial recuperado para el usuario ${this.user.uid}:`, this.historial);
      } else {
        console.warn('No se encontró información del usuario logeado.');
      }
    } catch (error) {
      console.error('Error al inicializar:', error);
    }
  }
  

  // Método para escanear QR en la versión web
  async startScannerWeb() { 
    const loading = await this.utilService.loading();
    const scanR = await BarcodeScanner.scan();
    if (scanR.result) {
      try {
        await loading.present();
        console.log('Entró al try');
        const datos = JSON.parse(scanR.code!);
        const resultadoMarcar = await this.utilService.post<{ success: boolean }>('https://pgy4121serverlessapi.vercel.app/api/asistencia/qr', datos);
        loading.dismiss();
        this.utilService.openAlert('Asistencia registrada correctamente', 'Gracias por preferirnos :D', 'checkmark-circle');
      } catch (error: any) {
        loading.dismiss();
        console.log('error', error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 404) {
            this.utilService.openAlert('Error', 'Código QR ha caducado, intente con otro nuevamente.', 'alert-circle');
          } else {
            this.utilService.openAlert('Error', error.error.message, 'alert-circle');
          }
        } else {
          this.utilService.openAlert('Error', 'Ocurrió un error inesperado', 'alert-circle');
        }
      }
    }
  }

  // ========= Tabla de asistencias ========= //
  tableData = [
    { title: 'ARQUITECTURA ASY4131', clase: 'ASY4131', seccion: '003V', qr: '', sala: 'Sala 101', horario: 'Lunes 10:00 - 12:00', esTransversal: false },
    { title: 'CALIDAD DE SOFTWARE CSY4111', clase: 'CSY4111', seccion: 'ASY4131-004V', qr: '', sala: 'Sala 102', horario: 'Martes 10:00 - 12:00', esTransversal: false },
    { title: 'ESTADISTICA DESCRIPTIVA MAT4140', clase: 'MAT4140', seccion: '004V', qr: '', sala: 'Sala 303', horario: 'Miércoles 10:00 - 12:00', esTransversal: false },
    { title: 'PROG. APPS MÓVILES PGY4122', clase: 'PGY4122', seccion: '005V', qr: '', sala: 'Sala 330', horario: 'Jueves 10:00 - 12:00', esTransversal: false },
    { title: 'ETICA PARA EL TRABAJO EAY4450', clase: 'EAY4450', seccion: '006V', qr: '', sala: 'Sala 403', horario: 'Viernes 10:00 - 12:00', esTransversal: true },
    { title: 'PROCESO DE PORTAFOLIO PY41447', clase: 'PY41447', seccion: '007V', qr: '', sala: 'Sala 310', horario: 'Lunes 13:00 - 16:00', esTransversal: false },
    { title: 'INGLES INTERMEDIO INI5111', clase: 'INI5111', seccion: '008V', qr: '', sala: 'Sala 105', horario: 'Martes 13:00 - 15:00', esTransversal: true }
  ];

  

  async listarAsistencias() {
    try {
      const lista = await this.utilService.get<Seccion[]>('https://pgy4121serverlessapi.vercel.app/api/asistencia/listar');
      const secciones = ['ASY4131', 'CSY4111', 'MAT4140', 'PGY4122', 'EAY4450', 'PY41447', 'INI5111'];
      const filteredSecciones = lista.filter(seccion => secciones.includes(seccion.seccion));
  
      this.historial = [];
      filteredSecciones.forEach(seccion => {
        seccion.asistencia.forEach(asistencia => {
          this.historial.push({
            seccion: seccion.seccion,
            asistencia: asistencia.asistido,
            fecha: asistencia.fecha
          });
        });
      });
  
      console.log('Historial construido:', this.historial);
  
      // Recuperar el ID único del usuario logeado
      const userResult = await Preferences.get({ key: 'user' }); // Cambiado de userDoc a user
      const user = userResult.value ? JSON.parse(userResult.value) as User : null;
  
      if (!user || !user.uid) {
        throw new Error('No se pudo identificar al usuario logeado.');
      }
  
      // Guardar historial asociado al usuario en Preferences
      const userKey = `historialAsistencias_${user.uid}`;
      await Preferences.set({
        key: userKey,
        value: JSON.stringify(this.historial)
      });
  
      console.log(`Historial guardado en Preferences para el usuario: ${user.uid}`);
    } catch (error) {
      console.error('Error al listar asistencias:', error);
      throw error;
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

    isModalOpen = false;
  
    setOpen(isOpen: boolean) {
      this.isModalOpen = isOpen;
    }
}