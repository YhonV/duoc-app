import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/autenticacion.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userRole: string = '';  // Variable para almacenar el rol del usuario

  constructor(private autenticacionService : AutenticacionService) {}

  ngOnInit() {
    this.userRole = this.autenticacionService.getUserRole();  // Obtener el rol del usuario al cargar la página
  }
}

