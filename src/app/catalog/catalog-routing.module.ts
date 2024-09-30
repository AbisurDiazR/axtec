import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogProductsComponent } from './catalog-products/catalog-products.component';
import { CatalogProductComponent } from './catalog-product/catalog-product.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogProductsComponent
  },
  {
    path: 'brand/:id',
    component: CatalogProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
