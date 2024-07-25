import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { MainComponent } from './main/main.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SettingsComponent } from './settings/settings.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';


@NgModule({
  declarations: [
    ProfileComponent,
    NewOrdersComponent,
    MainComponent,
    OrdersHistoryComponent,
    WishlistComponent,
    TransactionsComponent,
    SettingsComponent,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    RouterModule
  ]  
})
export class ProfileModule { }
