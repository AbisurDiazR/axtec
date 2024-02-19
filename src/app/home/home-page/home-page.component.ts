import { Component } from '@angular/core';
import { Discount } from '../constants/discount';
import { Category } from '../constants/category';
import { Product } from '../constants/product';
import { CustomOptios } from '../constants/customOptions';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  products: Product[] = [
    {
      imagen: "https://i.ebayimg.com/images/g/4U4AAOSwOSdlnvkz/s-l1600.webp",
      titulo: "Apple Time Capsule - 1 TB",
      precio: "$60.00",
      nuevo: true,
      rebajado: false
    },
    {
      imagen: "https://i.ebayimg.com/images/g/vr4AAOSwz9hkEh3v/s-l1600.webp",
      titulo: "Apple TV  Apple TV 3.0 con Blu-ray y HD tuner",
      precio: "$78.00",
      nuevo: true,
      rebajado: true,
      precioOriginal: "$100.00"
    },
    {
      imagen: "https://i.ebayimg.com/images/g/CFEAAOSwaSlf1~bV/s-l1600.webp",
      titulo: "Apple Wireless Keyboard         MC184",
      precio: "$399.00",
      nuevo: false,
      rebajado: false
    },
    {
      imagen: "https://i.ebayimg.com/images/g/9aQAAOSwLPRkkyUa/s-l1600.webp",
      titulo: "Apple TV 4K",
      precio: "$420.00",
      nuevo: false,
      rebajado: false
    },
    {
      imagen: "https://i.ebayimg.com/images/g/97kAAOSwcStkQAsm/s-l1600.webp",
      titulo: "Beats Studio3 Wireless Headphones Sand Dune",
      precio: "$499.00",
      nuevo: true,
      rebajado: false
    },
    {
      imagen: "https://i.ebayimg.com/images/g/kTAAAOSw-GJlV4yJ/s-l1600.webp",
      titulo: "Beats Studio 3 Wireless Headphone Camo Collection - Sand Dune",
      precio: "$549.00",
      nuevo: true,
      rebajado: false
    }
  ];

  options: OwlOptions = CustomOptios;

  discounts: Discount[] = [
    {
      imagePath: 'assets/banners/mac.webp',
      className: 'home-card-blue',
      title: 'Card 1',
      content: 'Contenido de la Card 1',
    },
    {
      imagePath: 'assets/banners/monitor.webp',
      className: 'home-card-gray',
      title: 'Card 2',
      content: 'Contenido de la Card 2',
    },
    {
      imagePath: 'assets/banners/pc.webp',
      className: 'home-card-blue',
      title: 'Card 3',
      content: 'Contenido de la Card 3',
    },
    {
      imagePath: 'assets/banners/tablet.webp',
      className: 'home-card-gray',
      title: 'Card 4',
      content: 'Contenido de la Card 4',
    },
  ];

  categories: Category[] = [
    { hover: false, iconDark: 'ic-computadoras', iconLight: 'ic-computadoras-light', categoryName: 'Notebooks, Tablets', categoryPath: '' },
    { hover: false, iconDark: 'ic-fotos', iconLight: 'ic-fotos-light', categoryName: 'Foto / Video', categoryPath: '' },
    { hover: false, iconDark: 'ic-software', iconLight: 'ic-software-light', categoryName: 'Software', categoryPath: '' },
    { hover: false, iconDark: 'ic-tv', iconLight: 'ic-tv-light', categoryName: 'TV / Games', categoryPath: '' },
    { hover: false, iconDark: 'ic-hardware', iconLight: 'ic-hardware-light', categoryName: 'Hardware', categoryPath: '' },
    { hover: false, iconDark: 'ic-smartphone', iconLight: 'ic-smartphone-light', categoryName: 'Smartphone', categoryPath: '' },
  ]

  changeIcon(isHover: boolean, index: number) {
    this.categories[index].hover = isHover;
  }

}
