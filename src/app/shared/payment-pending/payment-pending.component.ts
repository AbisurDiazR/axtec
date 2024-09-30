import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-payment-pending',
  templateUrl: './payment-pending.component.html',
  styleUrls: ['./payment-pending.component.scss']
})
export class PaymentPendingComponent {
  animationOptions: AnimationOptions = {
    path: '/assets/animations/payment-pending.json',
    loop: true
  }
}
