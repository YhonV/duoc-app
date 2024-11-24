import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgottenPasswordPage } from './forgotten-password.page';
import { IonicModule } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilService } from 'src/app/services/utils.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ForgottenPasswordPage', () => {
  let component: ForgottenPasswordPage;
  let fixture: ComponentFixture<ForgottenPasswordPage>;
  let utilService: UtilService;
  let firebaseService: FirebaseService;

  beforeEach( async () => {
      await TestBed.configureTestingModule({
        declarations: [ ForgottenPasswordPage ],
        imports: [IonicModule.forRoot(), AngularFireModule.initializeApp(environment.firebaseConfig), HttpClientModule],
        providers: [FirebaseService, UtilService, AngularFireAuth ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

    fixture = TestBed.createComponent(ForgottenPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
