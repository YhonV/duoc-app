import { inject, Injectable } from '@angular/core';
import { AlertController, IonicSafeString, LoadingController, NavController, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  toasCtrl = inject(ToastController);
  loadingCtrl = inject(LoadingController);
  private http = inject(HttpClient);
  private alert = inject(AlertController);
  private nav = inject(NavController);

  constructor(private afAuth: AngularFireAuth) { }
  async takePicture(promptLabelHeader: string){ 
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto: 'Selecciona una imagen',
      promptLabelPicture: 'Toma una foto'
    });
  };

  

  loading(){
    return this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'crescent'
    });
  }

  async presentToast(opts?: ToastOptions){
    const toast = await this.toasCtrl.create(opts)
    toast.present();
  }

  async post<T>(url: string, body: any) {
    const user = await this.afAuth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }
    const idToken = await user.getIdToken();
    console.log('idToken', idToken);
    return lastValueFrom(this.http.post<T>(url, body, {
      headers: {
        "Authorization": "Bearer " + idToken
      }
    }));
  }

  async get<T>(url: string) {
    const user = await this.afAuth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }
    const idToken = await user.getIdToken();
    console.log('idToken', idToken);
    return lastValueFrom(this.http.get<T>(url, {
      headers: {
        "Authorization": "Bearer " + idToken
      }
    }));
  }

async mensaje(texto:string){
  const m = await this.alert.create({
      message:texto,
      buttons:['Ok'],
      translucent:true,
  })
  await m.present();
  await m.onDidDismiss();
}

async openAlert(cabecera: string, msg: string, iconName: string) {
  const alert = await this.alert.create({
    header: cabecera,
    message: new IonicSafeString(`<ion-icon name="${iconName}" style="font-size: 5em; color: #488aff; margin-bottom: -20px;"></ion-icon><p>${msg}</p>`),
    buttons: ['Aceptar'],
    mode: 'ios'
  });

  await alert.present();
}

}
