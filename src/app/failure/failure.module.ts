import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FailureRoutingModule } from './failure-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FailurePageComponent } from './failure-page/failure-page.component';


@NgModule({
  declarations: [
    FailurePageComponent
  ],
  imports: [
    CommonModule,
    FailureRoutingModule,
    SharedModule
  ]
})
export class FailureModule { }
