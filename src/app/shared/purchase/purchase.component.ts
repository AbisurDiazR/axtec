import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent {

  animationOptions: AnimationOptions = {
    path: '/assets/animations/purchase.json',
    loop: true
  }

}
