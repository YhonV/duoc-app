import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-inputs',
  templateUrl: './custom-inputs.component.html',
  styleUrls: ['./custom-inputs.component.scss'],
})
export class CustomInputsComponent  implements OnInit {

  @Input() control!: FormControl;
  @Input() type!: string;
  @Input() label!: string;
  @Input() autocomplete!: string;
  @Input() icon!: string;

  isPassword !: boolean;
  hide : boolean = true;
  
  constructor() { }

  ngOnInit() {
    if(this.type === 'password') {
      this.isPassword = true;
    }
  }

  showPassword() {
    this.hide = !this.hide;

    if(this.hide) {
      this.type = 'password';
    } else {
      this.type = 'text';
    }
  }

}
