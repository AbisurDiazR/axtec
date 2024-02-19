import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule,
    MatTabsModule,
    CarouselModule,
    MatCardModule
  ],
  exports: [
    HeaderComponent,
    MatIconModule,
    HttpClientModule,
    MatTabsModule,
    CarouselModule,
    MatCardModule
  ]
})
export class SharedModule { }
