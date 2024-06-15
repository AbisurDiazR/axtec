import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FailurePageComponent } from './failure-page/failure-page.component';

const routes: Routes = [
  {
    path: '',
    component: FailurePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FailureRoutingModule { }
