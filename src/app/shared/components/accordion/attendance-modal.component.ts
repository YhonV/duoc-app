import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

interface AttendanceRecord {
  date: string;
  subject: string;
  present: boolean;
  justified: boolean;
  absent: boolean;
}

@Component({
  selector: 'app-attendance-modal',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Historial de Asistencia</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismissModal()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="attendance-table">
        <div class="table-header">
          <div class="header-cell">Fecha</div>
          <div class="header-cell">Materia</div>
          <div class="header-cell">Presente</div>
          <div class="header-cell">Justificado</div>
          <div class="header-cell">Ausente</div>
        </div>
        <div class="table-body">
          <div class="table-row" *ngFor="let record of attendanceRecords">
            <div class="table-cell">{{ record.date }}</div>
            <div class="table-cell">{{ record.subject }}</div>
            <div class="table-cell">
              <ion-icon [name]="record.present ? 'checkmark-circle' : 'close-circle'" 
                        [color]="record.present ? 'success' : 'medium'"></ion-icon>
            </div>
            <div class="table-cell">
              <ion-icon [name]="record.justified ? 'checkmark-circle' : 'close-circle'" 
                        [color]="record.justified ? 'warning' : 'medium'"></ion-icon>
            </div>
            <div class="table-cell">
              <ion-icon [name]="record.absent ? 'checkmark-circle' : 'close-circle'" 
                        [color]="record.absent ? 'danger' : 'medium'"></ion-icon>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .attendance-table {
      width: 100%;
      border-collapse: collapse;
    }
    .table-header {
      display: flex;
      background-color: #f4f4f4;
      font-weight: bold;
      border-bottom: 2px solid #ddd;
    }
    .table-body {
      display: flex;
      flex-direction: column;
    }
    .table-row {
      display: flex;
      border-bottom: 1px solid #ddd;
    }
    .header-cell, .table-cell {
      flex: 1;
      padding: 10px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .table-row:nth-child(even) {
      background-color: #f9f9f9;
    }
    ion-icon {
      font-size: 24px;
    }
  `]
})
export class AttendanceModalComponent {
  @Input() attendanceRecords: AttendanceRecord[] = [];

  constructor(private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss();
  }
}