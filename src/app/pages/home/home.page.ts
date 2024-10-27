import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { Subscription } from 'rxjs';
import { meses } from 'src/app/config/constants';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})



export class HomePage implements OnInit {
  currentUser: string = '';
  private userSubscription: Subscription;
  firebaseServce = inject(FirebaseService);
  role : string = '';
  mesActual: number = 0;
  nombreMesActual: string = '';

  
  
  festivosMesActual: Array<{ date: string; title: string }> = [];

  constructor(private http:HttpClient, private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.mostrarDiasFestivos();
    this.userSubscription = this.firebaseService.getUser().subscribe(
      user => {
        this.currentUser = user ? user.name : '';
        this.role = user ? user.role : '';
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  async mostrarDiasFestivos() {
    this.http.get<{ status: string, data: Array<{ date: string, title: string }> }>('https://api.boostr.cl/holidays.json').subscribe({
      next: response => {
        const fechaActual = new Date();
        const proxFeriados = response.data.filter(dia => {
          const fechaFestivo = new Date(dia.date);
          return fechaFestivo > fechaActual;
        });

        proxFeriados.sort((a) => new Date(a.date).getTime());

        this.festivosMesActual = proxFeriados.slice(0, 1);
      },
      error: error => {
        console.error('error:', error);
      }
    });
}


}

