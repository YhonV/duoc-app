import { Component, inject, Input, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @Input() username: string = 'Jorge Videla';
  @Input() email: string = 'jorge.videla@profesorduoc.cl';
  @Input() phone: string = '+569 1234 5678';
  @Input() headquarters : string = 'Sede Maipú';

  firebaseService = inject(FirebaseService);

  user = this.firebaseService.getUserDisplayName();

  constructor() { }

  ngOnInit() {
    console.log(this.user);
  }



  

 
}
