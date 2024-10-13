import { Component, inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  currentUser: string = '';
  private userSubscription: Subscription;
  firebaseServce = inject(FirebaseService);
  role = this.firebaseServce.role;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.userSubscription = this.firebaseService.getUser().subscribe(
      user => {
        this.currentUser = user ? user.name : '';
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}

