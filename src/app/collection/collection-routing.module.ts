import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionComponent } from './collection/collection.component';
import { CollectionViewComponent } from './collection-view/collection-view.component';

const routes: Routes = [
  {
    path: '',
    component: CollectionComponent
  },
  {
    path: ':collection-id',
    component: CollectionViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionRoutingModule { }
