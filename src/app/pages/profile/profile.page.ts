import { Component, inject, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
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

  name: string;
  email: string;
  phone: string;
  image: string | null = null;
  rut: string | null = null;
  headquarters: string = 'Sede Maipú';

  constructor() { }

  async ngOnInit() {
    try {
      const { value } = await Preferences.get({ key: 'userDoc' });
      const userDoc = value ? JSON.parse(value) : null;
      if( userDoc ){
        this.name = userDoc.name;
        this.email = userDoc.email;
        this.phone = userDoc.phone;
        this.rut = userDoc.rut;
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  }

  async takeImage(){
    const dataUrl = (await this.utilService.takePicture('Imagen de perfil')).dataUrl;
    this.image = dataUrl;
  }

}