import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() maxLength: number = 0;
  @Output() inputEvent = new EventEmitter<any>();

  onInput(event: any) {
    this.inputEvent.emit(event);
  }

  enforceMaxLength(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value.length > this.maxLength) {
      input.value = input.value.slice(0, this.maxLength);
      // Actualizar el valor en el modelo (si estás usando Angular Forms)
      this.control.setValue(input.value, { emitEvent: false });
    }
  }

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
