import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedulePage } from './schedule.page';

describe('SchedulePage', () => {
  let component: SchedulePage;
  let fixture: ComponentFixture<SchedulePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have tableData', () => {
    expect(component.tableData).toEqual([
      { title: 'Lunes ', clase: 'ARQUITECTURA ASY4131', seccion: '003V',  sala: 'Sala 101', horario: 'Lunes 10:00 - 12:00' },
      { title: 'Martes ', clase: 'CALIDAD DE SOFTWARE CSY4111', seccion: 'ASY4131-004V',  sala: 'Sala 102', horario: 'Martes 10:00 - 12:00' },
      { title: 'Miércoles', clase: 'ESTADISTICA DESCRIPTIVA MAT4140', seccion: '004V',  sala: 'Sala 303', horario: 'Miércoles 10:00 - 12:00' },
      { title: 'Jueves', clase: 'PROG. APPS MÓVILES PGY4122', seccion: '005V',  sala: 'Sala 303', horario: 'Jueves 10:00 - 12:00' },
      { title: 'Viernes', clase: 'ETICA PARA EL TRABAJO EAY4450', seccion: '006V',  sala: 'Sala 303', horario: 'Jueves 10:00 - 12:00' },
    ]);
  });
});
