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
});
