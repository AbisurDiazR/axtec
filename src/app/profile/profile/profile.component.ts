import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  private subs = new SubSink();
  main: boolean = false;
  newOrders: boolean = false;
  ordersHistory: boolean = false;
  settings: boolean = false;
  logout: boolean = false;
  shoppingCart: boolean = false;
  
  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService
  ){
    this.subs.add(
      this.router.events.subscribe(() => {
        this.main = location.path().includes('main');
        this.shoppingCart = location.path().includes('shopping-cart');
        this.newOrders = location.path().includes('new-orders');
        this.ordersHistory = location.path().includes('orders-history');
        this.settings = location.path().includes('settings');
        this.logout = location.path().includes('logout');
      })
    );
  }

  goTo(route: string){
    this.router.navigate([`profile/${route}`])    
  }

  singout(){
    this.authService.logout();
    this.router.navigate(['home']);
  }
}
