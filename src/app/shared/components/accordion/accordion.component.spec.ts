import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AccordionComponent } from './accordion.component';
import { UtilService } from 'src/app/services/utils.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';

describe('CustomTableComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordionComponent ],
      imports: [IonicModule.forRoot(), HttpClientModule, AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers: [UtilService, AngularFireAuth ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setOpen be true', () => {
    let open = true;
    component.setOpen(open);
    expect(component.isModalOpen).toBeTruthy();
  })

  it('should transformarFecha', () =>{
    let date = 20230101;
    let result = component.transformarFecha(date);
    let mock = new Date(2023, 0, 1);
    expect(result).toEqual(mock);
  })
});
