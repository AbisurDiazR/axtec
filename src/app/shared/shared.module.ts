import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
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
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import localeEsMX from '@angular/common/locales/es-MX';
import { LottieModule } from "ngx-lottie";
import player from "lottie-web";
import { PurchaseComponent } from './purchase/purchase.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PolicyDialogComponent } from './policy-dialog/policy-dialog.component';

//player lottie
export function playerFactory() {
  return player;
}

registerLocaleData(localeEsMX);

//const lang = "es-MX";

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/','.json');
}

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchBarComponent,
    PurchaseComponent,
    PolicyDialogComponent
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
    TranslateModule,
    MatChipsModule,
    MatSelectModule,
    LottieModule.forRoot({player: playerFactory}),
    MatDialogModule
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
    TranslateModule,
    MatChipsModule,
    MatSelectModule,
    PurchaseComponent,
    MatDialogModule
  ]
})
export class SharedModule { }
