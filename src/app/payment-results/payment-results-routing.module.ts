import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FailurePageComponent } from './failure-page/failure-page.component';
import { SuccessPageComponent } from './success-page/success-page.component';
import { PendingPageComponent } from './pending-page/pending-page.component';

const routes: Routes = [
  {
    path: 'failure',
    component: FailurePageComponent
  },
  {
    path: 'success',
    component: SuccessPageComponent
  },
  {
    path: 'pending',
    component: PendingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentResultsRoutingModule { }
