import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CustomInputsComponent } from './components/custom-inputs/custom-inputs.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { CustomTableComponent } from './components/custom-table/custom-table.component';



@NgModule({
  declarations: 
    [HeaderComponent,
    CustomInputsComponent,
    LogoComponent,
    ModalComponent,
    CustomTableComponent
  ],
  exports: 
    [HeaderComponent,
    CustomInputsComponent,
    ReactiveFormsModule,
    LogoComponent,
    ModalComponent,
    CustomTableComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
