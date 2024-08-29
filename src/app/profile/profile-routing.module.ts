import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { MainComponent } from './main/main.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';
import { SettingsComponent } from './settings/settings.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
//import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
      },
      {
        path: 'main',
        component: MainComponent,
        //canActivate: [AuthGuard]
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent
      },
      {
        path: 'new-orders',
        component: NewOrdersComponent
      },
      {
        path: 'orders-history',
        component: OrdersHistoryComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
