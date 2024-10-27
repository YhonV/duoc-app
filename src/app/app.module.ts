import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy, MenuController } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { QRCodeModule } from 'angularx-qrcode';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    QRCodeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    },
    MenuController,
    RouterModule,
    provideHttpClient()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}