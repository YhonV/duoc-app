import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
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

  logout() {
    this.closeMenu();
    this.router.navigate(['/login']);
  }
}
