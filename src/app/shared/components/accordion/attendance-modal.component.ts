import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AssistanceStudentPage } from 'src/app/pages/assistance-student/assistance-student.page';
interface AttendanceRecord {
  date: string;
  present: boolean;
  justified: boolean;
  absent: boolean;
}



@Component({
  selector: 'app-attendance-modal',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title class="title">Historial de Asistencia</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismissModal()">
          <ion-icon name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="attendance-table">
        <div class="table-header">
          <div class="header-cell date">Fecha</div>
          <div class="header-cell">Presente</div>
          <div class="header-cell">Justificado</div>
          <div class="header-cell">Ausente</div>
        </div>
        <div class="table-body">
          <div class="table-row" *ngFor="let record of attendanceRecords">
            <div class="table-cell date">{{ formatDate(record.date) }}</div>
            <div class="table-cell icon-cell">
              <ion-icon [name]="record.present ? 'checkmark-circle' : 'close-circle'" 
                        [color]="record.present ? 'success' : 'medium'"></ion-icon>
            </div>
            <div class="table-cell icon-cell">
              <ion-icon [name]="record.justified ? 'checkmark-circle' : 'close-circle'" 
                        [color]="record.justified ? 'warning' : 'medium'"></ion-icon>
            </div>
            <div class="table-cell icon-cell">
              <ion-icon [name]="record.absent ? 'checkmark-circle' : 'close-circle'" 
                        [color]="record.absent ? 'danger' : 'medium'"></ion-icon>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .title {
      font-size: 13px; 
    } 

    .attendance-table {
      width: 100%;
    }
    .table-header, .table-row {
      display: grid;
      grid-template-columns: 2fr repeat(3, 1fr);
      align-items: center;
    }
    .table-header {
      background-color: #f4f4f4;
      font-weight: bold;
      position: sticky;
      top: 0;
      z-index: 1;
    }
    .header-cell, .table-cell {
      padding: 10px 5px;
      text-align: center;
    }
    .header-cell.date, .table-cell.date {
      text-align: left;
      padding-left: 10px;
    }
    .table-body {
      overflow-y: auto;
      max-height: calc(100vh - 120px);
    }
    .table-row {
      border-bottom: 1px solid #ddd;
    }
    .table-row:nth-child(even) {
      background-color: #f9f9f9;
    }
    .icon-cell {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    ion-icon {
      font-size: 24px;
    }
    @media (max-width: 480px) {
      .table-header, .table-row {
        grid-template-columns: 1.5fr repeat(3, 1fr);
      }
      .header-cell, .table-cell {
        padding: 8px 2px;
        font-size: 14px;
      }
      ion-icon {
        font-size: 20px;
      }
    }
  `]
})
export class AttendanceModalComponent {
  @Input() attendanceRecords: AttendanceRecord[] = [];

  constructor(private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long'};
    return new Date(date).toLocaleDateString('es-ES', options);
  }



}