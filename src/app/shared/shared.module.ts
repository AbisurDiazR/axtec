import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { FooterComponent } from './footer/footer.component';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule } from '@ngx-translate/core';

const lang = "es-MX";

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/','.json');
}

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule,
    MatTabsModule,
    CarouselModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    TranslateModule
  ],
  exports: [
    HeaderComponent,
    MatIconModule,
    HttpClientModule,
    MatTabsModule,
    CarouselModule,
    MatCardModule,
    MatButtonModule,
    FooterComponent,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    SearchBarComponent,
    MatSidenavModule,
    MatDividerModule,
    TranslateModule
  ]
})
export class SharedModule { }
