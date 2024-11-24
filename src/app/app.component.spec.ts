import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, MenuController } from '@ionic/angular';
import { AppComponent } from './app.component';
import { FirebaseService } from './services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule,
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      providers: [FirebaseService, AngularFireAuth, MenuController],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should closeMenu', async () =>{
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.closeMenu();
    expect(app).toBeTruthy();
  })

  it('should viewProfile', async () =>{
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.viewProfile();
    expect(app).toBeTruthy();
  })

  it('should logout', async () =>{
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.logout();
    expect(app).toBeTruthy();
  })

  it('should cargarFirebase', async () =>{
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.cargarFirebase();
    expect(app).toBeTruthy();
  })

});