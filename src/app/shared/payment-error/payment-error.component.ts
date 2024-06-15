import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-payment-error',
  templateUrl: './payment-error.component.html',
  styleUrls: ['./payment-error.component.scss']
})
export class PaymentErrorComponent {
  animationOptions: AnimationOptions = {
    path: '/assets/animations/payment-error.json',
    loop: true
  }
}
