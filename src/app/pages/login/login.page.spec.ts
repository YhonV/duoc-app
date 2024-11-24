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

  it('Formulario válido en método OnSubmit', async () => {
    const email = 'dahori.10@gmail.com';
    const password = '123456';
    component.form.controls['email'].setValue(email);
    component.form.controls['password'].setValue(password);
    expect(component.form.valid).toBeTruthy();
  });

  it('Formulario inválido en método OnSubmit', async () => {
    const email = 'dahori.10gmail.com';
    const password = '1234';
    component.form.controls['email'].setValue(email);
    component.form.controls['password'].setValue(password);
    expect(component.form.valid).toBeFalsy();
  });
    
});
