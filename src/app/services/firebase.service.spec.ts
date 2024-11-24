import { TestBed } from '@angular/core/testing';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { HttpClientModule } from '@angular/common/http';

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [FirebaseService, AngularFireAuth, AngularFirestore],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        HttpClientModule
      ]
    }).compileComponents();

    service = TestBed.inject(FirebaseService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  // No sirvió xddd revisar luego
});