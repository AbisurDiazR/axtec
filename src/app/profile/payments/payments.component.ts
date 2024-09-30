import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  userId!: string | null;

  constructor(
    private paymentService: PaymentService
  ){}
  
  ngOnInit(): void {
    this.userId = localStorage.getItem('uid');
    this.getUserPayments(this.userId);
  }
  
  getUserPayments(userId: string | null) {
    if(userId) this.paymentService.getPendingPayments(userId).subscribe((res) => {
      console.log(res);
    });
  }

}
