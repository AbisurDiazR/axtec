import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ){
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
    .addSvgIcon('ic-smartphone-light', this.sanitizer.bypassSecurityTrustResourceUrl('assets/iconos/telefono-inteligente-light.svg'));
  }
}
