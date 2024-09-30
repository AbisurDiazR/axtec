import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentResultsRoutingModule } from './payment-results-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FailurePageComponent } from './failure-page/failure-page.component';
import { SuccessPageComponent } from './success-page/success-page.component';
import { PendingPageComponent } from './pending-page/pending-page.component';


@NgModule({
  declarations: [
    FailurePageComponent,
    SuccessPageComponent,
    PendingPageComponent
  ],
  imports: [
    CommonModule,
    PaymentResultsRoutingModule,
    SharedModule
  ]
})
export class PaymentResultsModule { }
