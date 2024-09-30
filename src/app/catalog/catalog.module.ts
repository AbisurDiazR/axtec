import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogProductsComponent } from './catalog-products/catalog-products.component';
import { SharedModule } from '../shared/shared.module';
import { CatalogProductComponent } from './catalog-product/catalog-product.component';


@NgModule({
  declarations: [
    CatalogProductsComponent,
    CatalogProductComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    SharedModule
  ]
})
export class CatalogModule { }
