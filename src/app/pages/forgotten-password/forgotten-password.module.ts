import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgottenPasswordPageRoutingModule } from './forgotten-password-routing.module';

import { ForgottenPasswordPage } from './forgotten-password.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgottenPasswordPageRoutingModule,
    SharedModule
  ],
  declarations: [ForgottenPasswordPage]
})
export class ForgottenPasswordPageModule {}
