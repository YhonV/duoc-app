import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { FirebaseService } from './services/firebase.service';
import { Capacitor } from '@capacitor/core';
import { initializeApp } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  firebaseService = inject(FirebaseService);
  constructor(
    private menuController: MenuController,
    private router: Router
  ) {}
 
  ngOnInit(){
    this.cargarFirebase();
  }

  closeMenu() {
    this.menuController.close('main-menu');
  }

  viewProfile() {
    this.closeMenu();
    this.router.navigate(['/profile']);
  }

  async logout() {
      this.closeMenu();
      const result = await this.firebaseService.logOutUser();
  }


  async cargarFirebase(){

    const firebaseConfig = {
      apiKey: "AIzaSyC-QV-kFIn7jfsIK4LfXFhTwdbE75Qrj7g",
      authDomain: "duoc-app.firebaseapp.com",
      projectId: "duoc-app",
      storageBucket: "duoc-app.appspot.com",
      messagingSenderId: "1013657341098",
      appId: "1:1013657341098:web:cb6c5ace686655598214d3"
    }

    if(Capacitor.isNativePlatform() == false)
    {
      initializeApp(firebaseConfig);
    }
  }
}
