import { Component, inject, Input, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  firebaseService = inject(FirebaseService);
  utilService = inject(UtilService);


  user: any;
  @Input() name: string;
  @Input() email: string;
  @Input() phone: string;
  @Input() headquarters: string = 'Sede Maipú';

  constructor() { }

  async ngOnInit() {
    try {
      this.name = await this.firebaseService.getUserDisplayName();
      this.email = await this.firebaseService.getUserEmail();
      this.phone = await this.firebaseService.getUserPhoneNumber();
      console.log('Datos del usuario cargados:', { name: this.name, email: this.email, phone: this.phone });
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  }

  

}
