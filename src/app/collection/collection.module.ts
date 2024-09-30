import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionComponent } from './collection/collection.component';
import { SharedModule } from '../shared/shared.module';
import { CollectionViewComponent } from './collection-view/collection-view.component';


@NgModule({
  declarations: [
    CollectionComponent,
    CollectionViewComponent
  ],
  imports: [
    CommonModule,
    CollectionRoutingModule,
    SharedModule
  ]
})
export class CollectionModule { }
