import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-failure-page',
  templateUrl: './failure-page.component.html',
  styleUrls: ['./failure-page.component.scss']
})
export class FailurePageComponent implements OnInit {
  productId: any;

  constructor(
    private router: Router,
    private purchaseService: PurchaseService,
    private authService: AuthService,
    private loaderService: LoaderService
  ){}
  
  ngOnInit(): void {
    this.productId = localStorage.getItem('idSell');
    this.authService.observerCurrentUser.subscribe((res) => {
      if (res) {
        this.loaderService.changeLoader(true);
        let clientId = res.uid;
        this.purchaseService.deleteTemporalPurchase(clientId).then(() => {
          this.loaderService.changeLoader(false);
        });
      }
    });
  }

  tryAgain(){
    if (this.productId != undefined) {
      this.router.navigate([`product/${this.productId}`]);
    }else{
      this.router.navigate(['home']);
    }
  }

}
