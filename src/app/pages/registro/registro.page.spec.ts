import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { FormControl, ReactiveFormsModule, ValidationErrors, ValidatorFn} from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilService } from 'src/app/services/utils.service';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { HttpClientModule } from '@angular/common/http';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroPage ],
      imports: [IonicModule.forRoot(),
                ReactiveFormsModule,
                AngularFireModule.initializeApp(environment.firebaseConfig),
                HttpClientModule],
      providers: [FirebaseService, UtilService, Router]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validarRut', () => {
    const validatorFn: ValidatorFn = component.validarRut();
    let control = new FormControl('12345678-9');
    let result: ValidationErrors | null = validatorFn(control);
    expect(result).toBeNull(); 
  
  });

  it('should validarRut invalido', async() =>{
    const validatorFn: ValidatorFn = component.validarRut();
    let control = new FormControl('1234567-A');
    let result = validatorFn(control);
    expect(result).toEqual({ rutInvalido: true }); 
  })

  it('should validarPass', () => {
    const validatorFn: ValidatorFn = component.validarPass;
    let control = new FormControl('123456');
    let result: ValidationErrors | null = validatorFn(control);
    expect(result).toBeNull(); 
  });

  it('should validarPhone', () => {
    const validatorFn: ValidatorFn = component.validarPhone();
    let control = new FormControl('123456789');
    let result: ValidationErrors | null = validatorFn(control);
    expect(result).toBeNull();
  })
});