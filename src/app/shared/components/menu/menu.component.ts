import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  constructor(
    private menuController: MenuController,
    private router: Router
  ) {}

  ngOnInit() {}

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
