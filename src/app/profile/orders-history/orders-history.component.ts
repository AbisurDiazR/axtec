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
  itemsPerPage = 3;
  currentPage = 1;
  totalPages = 0;
  totalPagesArray:any[] = [];
  lastVisible: any;
  isFirstPage: boolean = true;

  constructor(
    private authService: AuthService,
    private saleServices: PurchaseService
  ){}
  
  ngOnInit(){
    this.setUserId();
    this.calculateTotalPages();
    this.updatePaginatedOrders();
  }
  
  setUserId() {
    this.authService.observerCurrentUser.subscribe((res) => {
      res ? this.currentUserId = res.uid : this.currentUserId = '';
      this.getFirstPage();
    });
  }

  getFirstPage() {
    this.saleServices.getUserSalesFirstPage(this.currentUserId).subscribe((data:any) => {
      this.orders = data.sale;
      this.lastVisible = data.lastVisible;
      this.isFirstPage = false;
    });
  }

  getNextPage() {
    if (!this.isFirstPage) {
      this.saleServices.getUserSalesNextPage(this.currentUserId, this.lastVisible).subscribe(data => {
        this.orders = [...this.orders, ...data.sale];
        this.lastVisible = data.lastVisible;
      });
    }
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.orders.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updatePaginatedOrders() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedOrders = this.orders.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedOrders();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedOrders();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedOrders();
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
