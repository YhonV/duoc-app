import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePage } from './profile.page';
import { Preferences } from '@capacitor/preferences';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilService } from 'src/app/services/utils.service';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { HttpClientModule } from '@angular/common/http';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;
  let utilService: jasmine.SpyObj<UtilService>;


  beforeEach( async () => {
    const utilServiceSpy = jasmine.createSpyObj('UtilService', ['takePicture']);

    await TestBed.configureTestingModule({
      declarations: [ ProfilePage ],
      imports: [IonicModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        HttpClientModule
      ],
      providers: [
        { provide: UtilService, useValue: utilServiceSpy },
        FirebaseService,
        Preferences
      ]
    }).compileComponents();

    utilService = TestBed.inject(UtilService) as jasmine.SpyObj<UtilService>;

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should takeImage', async () => {
    const mockDataUrl = 'data:image/png;base64,testdata';
    utilService.takePicture.and.returnValue(Promise.resolve({ dataUrl: mockDataUrl, format: 'png', saved: false }));

    await component.takeImage();

    expect(utilService.takePicture).toHaveBeenCalledWith('Imagen de perfil');
    expect(component.image).toEqual(mockDataUrl);
  });

});
