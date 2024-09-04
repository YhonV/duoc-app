import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssistanceStudentPage } from './assistance-student.page';

const routes: Routes = [
  {
    path: '',
    component: AssistanceStudentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistanceStudentPageRoutingModule {}
