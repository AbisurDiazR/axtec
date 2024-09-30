import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Sale } from 'src/app/utils/sale';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss']
})
export class OrdersHistoryComponent implements OnInit {
  
  orders: Sale[] = [];
  currentUserId: string = "";
  paginatedOrders:any[] = [];
  currentPage: number = 0;
  pageSize: number = 0;

  constructor(
    private authService: AuthService,
    private saleServices: PurchaseService
  ){}
  
  ngOnInit(){
    this.setUserId();
  }
  
  setUserId() {
    this.authService.observerCurrentUser.subscribe((res) => {
      res ? this.currentUserId = res.uid : this.currentUserId = '';
      this.getSales(this.currentUserId);
    });    
  }
  
  getSales(currentUserId: string) {
    this.saleServices.getAllUserSales(currentUserId).subscribe((res) => {
      this.orders = res;
    });
    this.currentPage = 1;
    this.pageSize = 3;
  }

  numberOfPages(){
    return Math.ceil(this.orders.length / this.pageSize);
  }

  viewOrder(sale: Sale): void {
    // Aquí puedes implementar la lógica para ver los detalles de la orden
    console.log('Ver detalles de la orden:', sale);
  }

  getPaymentType(paymentType: string): String {
    switch (paymentType) {
      case 'credit_card':
        return 'Tarjeta de crédito';
        break;
      default:
        return ''
        break;
    }
  }
}
