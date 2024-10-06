import { inject, Injectable } from '@angular/core';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  toasCtrl = inject(ToastController);
  loadingCtrl = inject(LoadingController);

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
}
