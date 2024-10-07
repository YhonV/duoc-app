import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { FirebaseService } from './services/firebase.service';

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
}
