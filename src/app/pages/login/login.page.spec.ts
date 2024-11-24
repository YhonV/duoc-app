import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilService } from 'src/app/services/utils.service';
import { Preferences } from '@capacitor/preferences';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { HttpClientModule } from '@angular/common/http';
import { UserCredential } from 'firebase/auth';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [IonicModule.forRoot(), 
                ReactiveFormsModule,
                AngularFireModule.initializeApp(environment.firebaseConfig),
                HttpClientModule],
      providers: [FirebaseService, UtilService, NavController, Preferences]
    }).compileComponents();


    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Funciona  OnSubmit', async () => {
    const email = 'dahori.10@gmail.com';
    const password = '123456';
    component.form.controls['email'].setValue(email);
    component.form.controls['password'].setValue(password);
    expect(component.form.valid).toBeTruthy();


    const firebaseServiceSpy = spyOn(TestBed.inject(FirebaseService), 'signIn').and.returnValue(
      Promise.resolve({
        user: { 
          uid: '123',
          email: email,
          displayName: null, // O el valor correspondiente si existe
          phoneNumber: null, // O el valor correspondiente si existe
          photoURL: null,    // O el valor correspondiente si existe
          providerId: 'firebase',
          // Incluye aquí cualquier otra propiedad necesaria para tu caso
        },
        providerId: 'firebase',
        operationType: 'signIn', // Puede ser 'signIn' o lo que corresponda
      } as UserCredential) // Esto asegura que TypeScript lo trate como un `UserCredential`
    );
    });
});
