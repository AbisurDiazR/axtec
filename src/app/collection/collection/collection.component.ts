import { Component } from '@angular/core';
import { Item } from '../constants/item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent {
  
  constructor(private router: Router){}

  items: Item[] = [
    { id: 'accesories', name: 'Accesorios', image: 'https://tm-shopify031-computers.myshopify.com/cdn/shop/collections/iomega_ego_1_tb_usb_2-0_desktop_external_hard_drive_1_268x268_crop_top.png?v=1396975554'},
    { id: 'cases', name: 'Gabinetes', image: 'https://tm-shopify031-computers.myshopify.com/cdn/shop/collections/apple_g5_powermac_2ghz_desktop_computer_1_268x268_crop_top.png?v=1396975640'},
    { id: 'cd-drivers', name: 'Lectores CD/DVD', image: 'https://tm-shopify031-computers.myshopify.com/cdn/shop/products/apple_time_capsule_-_1_tb_1_268x268_crop_top.png?v=1396975064'},
    { id: 'card-controllers', name: 'Tarjetas controladoras', image: 'https://e7.pngegg.com/pngimages/644/915/png-clipart-ieee-1394-pci-express-conventional-pci-expansion-card-startech-com-others-electronic-device-controller.png'},
    { id: 'cpus', name: 'CPUS (Procesadores)', image: 'https://www.pngall.com/wp-content/uploads/11/Processor-PNG-Picture.png'},
    { id: 'enclousures', name: 'Gabinetes discos', image: 'https://w7.pngwing.com/pngs/707/189/png-transparent-hard-drives-usb-3-terabyte-disk-enclosure-seagate-technology-hard-disk-electronics-electronic-device-output-device.png'},
    { id: 'fans', name: 'Ventiladores (enfriamiento)', image: 'https://e7.pngegg.com/pngimages/280/740/png-clipart-computer-case-computer-fan-airflow-fan-technic-computer-fan.png'},
    { id: 'floppy-drivers', name: 'Unidades floppy', image: 'https://i.pinimg.com/736x/3e/a8/47/3ea8473fc2d18766139fd596f1e5d87a.jpg'},
    { id: 'gamer-gifts', name: 'Juegos e ideas de regalo', image: 'https://w7.pngwing.com/pngs/655/569/png-transparent-joystick-game-controllers-playstation-3-natec-gamepad-genesis-p44-pc-ps3-joystick-electronics-video-game-game-controllers.png'},
    { id: 'keyboards-mouses', name: 'Teclados / ratones', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaQ_0YRKp5-F95b0lalvAIeVPXFX26nEBqjg&usqp=CAU'},
    { id: 'rams', name: 'Memorias', image: 'https://ddtech.mx/assets/uploads/646b1fe7ffba76679f6ee53b760f35f7.png'},
    { id: 'monitors', name: 'Monitores', image: 'https://e7.pngegg.com/pngimages/968/36/png-clipart-computer-monitors-led-backlit-lcd-aoc-e2425swd-aoc-international-liquid-crystal-display-lcd-monitor-miscellaneous-television.png'},
    { id: 'motherboards', name: 'Tarjetas madre', image: 'https://w7.pngwing.com/pngs/318/595/png-transparent-intel-lga-1151-atx-motherboard-ddr4-sdram-motherboard-intel-electronic-device-computer-hardware.png'},
    { id: 'network-modems', name: 'Redes / modem', image: 'https://banner2.cleanpng.com/20180803/ty/kisspng-dsl-modem-router-vdsl-tp-link-zap-tp-link-archer-c5-5b6472aeaf1305.8350275115333096147171.jpg'},
    { id: 'power-suplies', name: 'Fuentes de poder', image: 'https://w7.pngwing.com/pngs/1010/184/png-transparent-power-supply-unit-power-converters-80-plus-atx-electric-power-computer-electronics-computer-electronic-device.png'},
    { id: 'pos', name: 'Puntos de venta', image: 'https://www.pngkit.com/png/detail/583-5830282_nightclub-bar-pos-system-pos-system.png'},
    { id: 'graphic-card', name: 'Adaptadores de video', image: 'https://w7.pngwing.com/pngs/593/74/png-transparent-graphics-cards-video-adapters-nvidia-geforce-gtx-1070-%E8%8B%B1%E4%BC%9F%E8%BE%BE%E7%B2%BE%E8%A7%86gtx-gigabyte-technology-others-electronic-device-computer-hardware-geforce.png'},
    { id: 'hard-disc', name: 'Discos duros', image: 'https://c0.klipartz.com/pngpicture/263/187/sticker-png-hard-drives-western-digital-serial-ata-terabyte-my-passport-external-hard-drive-computer-hard-disk-drive-electronic-device-serial-ata-solidstate-drive.png'},
  ];

  navigateTo(collectionId: string | undefined){
    this.router.navigate([`collection/${collectionId}`], {queryParams: { page: 1 } });
  }
}
