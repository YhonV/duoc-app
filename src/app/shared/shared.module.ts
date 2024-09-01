import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CustomInputsComponent } from './components/custom-inputs/custom-inputs.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { AccordionComponent } from './components/accordion/accordion.component';



@NgModule({
  declarations: 
    [HeaderComponent,
    CustomInputsComponent,
    LogoComponent,
    ModalComponent,
    AccordionComponent
  ],
  exports: 
    [HeaderComponent,
    CustomInputsComponent,
    ReactiveFormsModule,
    LogoComponent,
    ModalComponent,
    AccordionComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
