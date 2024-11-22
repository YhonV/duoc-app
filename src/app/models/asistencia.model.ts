export interface Asistencia {
    claseId: string;
    fecha: number;
    asistido: boolean;
    fechaHora: string | null;
  }
  
 export interface Seccion {
    seccion: string;
    asistencia: Asistencia[];
  }