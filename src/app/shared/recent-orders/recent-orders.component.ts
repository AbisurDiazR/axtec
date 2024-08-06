import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Sale } from 'src/app/utils/sale';

@Component({
  selector: 'app-recent-orders',
  templateUrl: './recent-orders.component.html',
  styleUrls: ['./recent-orders.component.scss']
})
export class RecentOrdersComponent implements OnInit {

  orders: Sale[] = [];

  currentUserId: string = '';

  constructor(
    private authService: AuthService,
    private saleServices: PurchaseService
  ) { }

  ngOnInit() {
    this.setSales();
  }

  setSales() {
    this.authService.observerCurrentUser.subscribe((res) => {
      res ? this.currentUserId = res.uid : this.currentUserId = '';
      this.populateSales(this.currentUserId);
    });
  }

  populateSales(currentUserId: string) {
    this.saleServices.getUserSales(currentUserId).subscribe((res: any) => {
      if (res) {
        res.forEach((sale: any) => {
          console.log(sale);
          this.orders.push({
            cardholderName: sale.cardholderName,
            clientId: sale.clientId,
            collection_id: sale.collection_id,
            collection_status: sale.collection_status,
            dateSale: sale.dateSale,
            merchant_order_id: sale.merchant_order_id,
            payment_id: sale.payment_id,
            payment_type: sale.payment_type,
            preference_id: sale.preference_id,
            processing_mode: sale.processing_mode,
            products: sale.products,
            shippingAddress: sale.shippingAddress,
            contact: sale.contact,
            shippingInfo: sale.shippingInfo,
            site_id: sale.site_id,
            status: sale.status,
            total: sale.total
          });
        });
      }
      console.log(this.orders);
    });
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
