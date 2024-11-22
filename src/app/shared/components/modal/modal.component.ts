import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { AnimationController, IonModal } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() image: string = '';
  @Input() description: string = '';
  @Input() trigger: string = '';
  @Input() autoClose: boolean = false;
  @Input() redirectTo: string = '';
  @Input() showQRCode: boolean = false;
  @ViewChild(IonModal) modal!: IonModal;
  isOpen: boolean = false;


  constructor(private animationCtrl: AnimationController,
    private router: Router
) {}

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;
  
    if (!root) {
      return null; 
    }
  
    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');
  
    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);
  
    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };
  
  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl)?.direction('reverse') || null;
  };
  

  onWillPresent() {
    if (this.autoClose) {
      setTimeout(() => {
        this.modal.dismiss();
        if (this.redirectTo) {
          this.router.navigate([this.redirectTo]);
        }
      }, 2000);
    }
  }

  dismiss() {
    this.modal.dismiss().then(() => {
      this.isOpen = false;
    });
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

} 