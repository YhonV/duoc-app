import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssistancePage } from './assistance.page';

describe('AssistancePage', () => {
  let component: AssistancePage;
  let fixture: ComponentFixture<AssistancePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create tableData', () => {
    const expectedTableData = [
      { title: 'ARQUITECTURA ASY4131', clase: 'ARQUITECTURA ASY4131', seccion: '003V', qr: 'ARQUITECTURA ASY4131 Lunes 10:00 - 12:00 003V', sala: 'Sala 101', horario: 'Lunes 10:00 - 12:00' },
      { title: 'CALIDAD DE SOFTWARE CSY4111', clase: 'CALIDAD DE SOFTWARE CSY4111', seccion: 'ASY4131-004V', qr: 'CALIDAD DE SOFTWARE CSY4111 Martes 10:00 - 12:00 ASY4131-004V', sala: 'Sala 102', horario: 'Martes 10:00 - 12:00' },
      { title: 'ESTADISTICA DESCRIPTIVA MAT4140', clase: 'ESTADISTICA DESCRIPTIVA MAT4140', seccion: '004V', qr: 'ESTADISTICA DESCRIPTIVA MAT4140 Miércoles 10:00 - 12:00 004V', sala: 'Sala 303', horario: 'Miércoles 10:00 - 12:00' },
      { title: 'PROG. APPS MÓVILES PGY4122', clase: 'PROG. APPS MÓVILES PGY4122', seccion: '005V', qr: 'PROG. APPS MÓVILES PGY4122 Jueves 10:00 - 12:00 005V', sala: 'Sala 330', horario: 'Jueves 10:00 - 12:00' },
      { title: 'ETICA PARA EL TRABAJO EAY4450', clase: 'ETICA PARA EL TRABAJO EAY4450', seccion: '006V', qr: 'ETICA PARA EL TRABAJO EAY4450 Viernes 10:00 - 12:00 006V', sala: 'Sala 403', horario: 'Viernes 10:00 - 12:00' },
      { title: 'PROCESO DE PORTAFOLIO PY41447', clase: 'PROCESO DE PORTAFOLIO PY41447', seccion: '007V', qr: 'PROCESO DE PORTAFOLIO PY41447 Lunes 13:00 - 16:00 007V', sala: 'Sala 310', horario: 'Lunes 13:00 - 16:00' },
      { title: 'INGLES INTERMEDIO INI5111', clase: 'INGLES INTERMEDIO INI5111', seccion: '008V', qr: 'INGLES INTERMEDIO INI5111 Martes 13:00 - 15:00 008V', sala: 'Sala 105', horario: 'Martes 13:00 - 15:00' },
      { title: 'PROG. APPS MÓVILES PGY4126', clase: 'PROG. APPS MÓVILES PGY4126', seccion: '009V', qr: 'PROG. APPS MÓVILES PGY4126 Miércoles 15:00 - 18:00 009V', sala: 'Sala 413', horario: 'Miércoles 15:00 - 18:00' },
      { title: 'ARQUITECTURA ASY4131', clase: 'ARQUITECTURA ASY4131', seccion: '002V', qr: 'ARQUITECTURA ASY4131 Jueves 14:00 - 17:00 002V', sala: 'Sala 410', horario: 'Jueves 14:00 - 17:00' }
    ];
    expect(component.tableData).toEqual(expectedTableData);
  });
});