import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-pending-page',
  templateUrl: './pending-page.component.html',
  styleUrls: ['./pending-page.component.scss']
})
export class PendingPageComponent {
  productId: any;
  pendingPayment: any;
  userId!: string | null;

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private router: Router
  ){}
  
  ngOnInit(): void {
    this.userId = localStorage.getItem('uid');
    this.productId = localStorage.getItem('idSell');
    this.pendingPayment = this.route.queryParams;    
  }

  savePendingPayment(){
    const uid = this.userId ? this.userId : '';
    this.paymentService.createPaymentPending(uid, this.pendingPayment.value).then((res) => {
      this.router.navigate(['profile/payments']);
    });
  }
}
