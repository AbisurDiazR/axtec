import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

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
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    HeaderComponent,
    MatIconModule,
    HttpClientModule,
    MatTabsModule,
    CarouselModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class SharedModule { }
