import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SubSink } from 'subsink';
import { SidenavService } from './services/sidenav.service';
import { MatDrawer } from '@angular/material/sidenav';
import { DEFAULT_LANGUAGE } from './shared/data';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  private _subs = new SubSink();
  @ViewChild('drawer') drawer!: MatDrawer;
  
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private sideNavService: SidenavService,
    private translate: TranslateService
  ){
    translate.setDefaultLang(DEFAULT_LANGUAGE);
    this.iconRegistry.addSvgIcon('ic-computadoras', this.sanitizer.bypassSecurityTrustResourceUrl('assets/iconos/ordenador-portatil.svg'))
    .addSvgIcon('ic-computadoras-light', this.sanitizer.bypassSecurityTrustResourceUrl('assets/iconos/ordenador-portatil-light.svg'))
    .addSvgIcon('ic-fotos', this.sanitizer.bypassSecurityTrustResourceUrl('assets/iconos/camara.svg'))
    .addSvgIcon('ic-fotos-light', this.sanitizer.bypassSecurityTrustResourceUrl('assets/iconos/camara-light.svg'))
    .addSvgIcon('ic-software', this.sanitizer.bypassSecurityTrustResourceUrl('assets/iconos/desarrollador-de-software.svg'))
    .addSvgIcon('ic-software-light', this.sanitizer.bypassSecurityTrustResourceUrl('assets/iconos/desarrollador-de-software-light.svg'))
    .addSvgIcon('ic-tv', this.sanitizer.bypassSecurityTrustResourceUrl('assets/iconos/smart-tv.svg'))
    .addSvgIcon('ic-tv-light', this.sanitizer.bypassSecurityTrustResourceUrl('assets/iconos/smart-tv-light.svg'))
    .addSvgIcon('ic-hardware', this.sanitizer.bypassSecurityTrustResourceUrl('assets/iconos/pastilla.svg'))
    .addSvgIcon('ic-hardware-light', this.sanitizer.bypassSecurityTrustResourceUrl('assets/iconos/pastilla-light.svg'))
    .addSvgIcon('ic-smartphone', this.sanitizer.bypassSecurityTrustResourceUrl('assets/iconos/telefono-inteligente.svg'))
    .addSvgIcon('ic-smartphone-light', this.sanitizer.bypassSecurityTrustResourceUrl('assets/iconos/telefono-inteligente-light.svg'))
    .addSvgIcon('ic-free-shipment', this.sanitizer.bypassSecurityTrustResourceUrl('assets/iconos/entrega-gratis.svg'))
    .addSvgIcon('ic-secure-payment', this.sanitizer.bypassSecurityTrustResourceUrl('assets/iconos/tarjeta-de-credito.svg'))
    .addSvgIcon('ic-return-money', this.sanitizer.bypassSecurityTrustResourceUrl('assets/iconos/reembolso.svg'))
    .addSvgIcon('ic-search', this.sanitizer.bypassSecurityTrustResourceUrl('assets/iconos/search.svg'))
    .addSvgIcon('ic-down', this.sanitizer.bypassSecurityTrustResourceUrl('assets/iconos/down.svg'))
    .addSvgIcon('ic-menu', this.sanitizer.bypassSecurityTrustResourceUrl('assets/iconos/menu.svg'))
    .addSvgIcon('ic-grid-on', this.sanitizer.bypassSecurityTrustResourceUrl('assets/iconos/grid-on.svg'))
    .addSvgIcon('ic-grid-off', this.sanitizer.bypassSecurityTrustResourceUrl('assets/iconos/grid-off.svg'))
    .addSvgIcon('ic-list-on', this.sanitizer.bypassSecurityTrustResourceUrl('assets/iconos/list-on.svg'))
    .addSvgIcon('ic-list-off', this.sanitizer.bypassSecurityTrustResourceUrl('assets/iconos/list-off.svg'));
    this._subs.add(this.sideNavService.open.subscribe((param: any) => {
      param ? this.drawer.open() : this.drawer.close();
    }));
  }  
  
  ngOnInit(): void {
    this.sideNavService.changeOpen(false);
  }

  closeDrawer(value: boolean){
    this.sideNavService.changeOpen(value);
  }
}
