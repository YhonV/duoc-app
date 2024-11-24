import { Component, inject, Input, OnInit } from '@angular/core';
import { AssistanceStudentPage } from 'src/app/pages/assistance-student/assistance-student.page';
import { Historial } from 'src/app/models/historial.model';
import { UtilService } from 'src/app/services/utils.service';
import { Seccion } from 'src/app/models/asistencia.model';
import { Preferences } from '@capacitor/preferences';
import { User } from 'firebase/auth';

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
  @Input() showAttendanceButton: boolean = true;
  scanResult = '';
  selectedClass: string = '';
  selectedQRImage: string = '';
  isModalOpen = false;
  assistance: AssistanceStudentPage;
  historial: Historial[] = [];
  
  
  utilService = inject(UtilService)
  
  constructor() {}

  ngOnInit() {
  }


  async listarAsistencias(clase: string) {
    try {
      const loading = await this.utilService.loading();
      await loading.present();
      const lista = await this.utilService.get<Seccion[]>('https://pgy4121serverlessapi.vercel.app/api/asistencia/listar');
      const filteredSecciones = lista.filter(seccion => seccion.seccion === clase);
  
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
      loading.dismiss();
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

      this.setOpen(true);

    } catch (error) {
      console.error('Error al listar asistencias:', error);
      throw error;
    }
    
  }
  
    setOpen(isOpen: boolean) {
      this.isModalOpen = isOpen;
    }

    transformarFecha(fechaNumero: number): Date {
      const fechaString = fechaNumero.toString();
      const year = parseInt(fechaString.substring(0, 4));
      const month = parseInt(fechaString.substring(4, 6)) - 1; // Restamos 1 porque los meses en Date empiezan desde 0
      const day = parseInt(fechaString.substring(6, 8));
      return new Date(year, month, day);
    }
    

}