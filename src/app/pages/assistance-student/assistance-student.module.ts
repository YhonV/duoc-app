import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssistanceStudentPageRoutingModule } from './assistance-student-routing.module';
import { AssistanceStudentPage } from './assistance-student.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssistanceStudentPageRoutingModule,
    SharedModule
  ],
  declarations: [AssistanceStudentPage]
})
export class AssistanceStudentPageModule {}
