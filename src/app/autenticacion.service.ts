import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private userRole: string = '';  // Almacena el rol del usuario

  // Establecer el rol del usuario
  setUserRole(role: string) {
    this.userRole = role;
  }

  // Obtener el rol del usuario
  getUserRole(): string {
    return this.userRole;
  }
}
