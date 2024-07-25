import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-payment-successfully',
  templateUrl: './payment-successfully.component.html',
  styleUrls: ['./payment-successfully.component.scss']
})
export class PaymentSuccessfullyComponent {
  animationOptions: AnimationOptions = {
    path: '/assets/animations/payment-successfully.json',
    loop: false
  }
}
