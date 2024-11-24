import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssistanceStudentPage } from './assistance-student.page';
import { Preferences } from '@capacitor/preferences';
import { UtilService } from 'src/app/services/utils.service';
import { BarcodeScanner } from 'capacitor-barcode-scanner';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { HttpClientModule } from '@angular/common/http';

describe('AssistanceStudentPage', () => {
  let component: AssistanceStudentPage;
  let fixture: ComponentFixture<AssistanceStudentPage>;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistanceStudentPage ],
      imports: [IonicModule.forRoot(),
                AngularFireModule.initializeApp(environment.firebaseConfig),
                HttpClientModule
      ],
      providers: [ UtilService, Preferences, BarcodeScanner ]
    }).compileComponents();


    fixture = TestBed.createComponent(AssistanceStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should asig.transversales - true', () => {
    const event = { detail: { checked: true } };
    component.mostrarAsignaturas(event);
    expect(component.mostrarTransversales).toBeTrue();
  });

  it('should asig.transversales - false', () => {
    const event = { detail: { checked: false } };
    component.mostrarAsignaturas(event);
    expect(component.mostrarTransversales).toBeFalse();
  });

  it('should modal - true', () => {
    component.setOpen(true);
    expect(component.isModalOpen).toBeTrue();
  });

  it('should modal - false', () => {
    component.setOpen(false);
    expect(component.isModalOpen).toBeFalse();
  });
});
