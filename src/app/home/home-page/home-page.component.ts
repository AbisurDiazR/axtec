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

  bestSellers: any = [
    {
      nombre: "Apple Power Mac G5 Desktop",
      precio: "$20.00",
      imagen: "https://tm-shopify031-computers.myshopify.com/cdn/shop/products/apple_power_mac_g5_desktop_1_780x825_crop_center.png?v=1396975059"
    },
    {
      nombre: "Apple MacBook Pro (13'' 2.7GHz i7)",
      precio: "$80.00",
      imagen: "https://tm-shopify031-computers.myshopify.com/cdn/shop/products/apple_macbook_pro_13_2-7ghz_i7_1_780x825_crop_center.png?v=1396975049"
    },
    {
      nombre: "Apple iPad 2 (16GB Wi-Fi, Black)",
      precio: "$150.00",
      imagen: "https://tm-shopify031-computers.myshopify.com/cdn/shop/products/apple_ipad_2_16gb_wi-fi_black_1_780x825_crop_center.png?v=1396975044"
    }
  ];

  mostWanted: any = [
    {
      nombre: "Apple Power Mac G5 Desktop",
      precio: "$20.00",
      imagen: "https://tm-shopify031-computers.myshopify.com/cdn/shop/products/apple_power_mac_g5_desktop_1_780x825_crop_center.png?v=1396975059"
    },
    {
      nombre: "Apple MacBook Pro (13'' 2.7GHz i7)",
      precio: "$80.00",
      imagen: "https://tm-shopify031-computers.myshopify.com/cdn/shop/products/apple_macbook_pro_13_2-7ghz_i7_1_780x825_crop_center.png?v=1396975049"
    },
    {
      nombre: "Apple iPad 2 (16GB Wi-Fi, Black)",
      precio: "$150.00",
      imagen: "https://tm-shopify031-computers.myshopify.com/cdn/shop/products/apple_ipad_2_16gb_wi-fi_black_1_780x825_crop_center.png?v=1396975044"
    }
  ];

  onSale: any = [
    {
      nombre: "Apple Time Capsule - 1 TB",
      precio: "$60.00",
      imagen: "https://tm-shopify031-computers.myshopify.com/cdn/shop/products/apple_time_capsule_-_1_tb_1_100x100_crop_center.png?v=1396975064",
      nuevo: true,
      rebajado: false
    },
    {
      nombre: "Apple TV",
      precio: "$78.00",
      imagen: "https://tm-shopify031-computers.myshopify.com/cdn/shop/products/apple_tv_1_100x100_crop_center.png?v=1396975069",
      nuevo: true,
      rebajado: true,
      precioOriginal: "$100.00"
    },
    {
      nombre: "Apple TV 3.0 con Blu-ray y HD tuner",
      precio: "$399.00",
      imagen: "https://tm-shopify031-computers.myshopify.com/cdn/shop/products/img_08_100x100_crop_center.png?v=1663333027",
      nuevo: false,
      rebajado: false
    }
  ]

  articles: any = [
    {
      titulo: "Repellendus consequuntur aut",
      fecha: "08 de abril de 2014",
      extracto: "Ullam consequatur, dolorem necessitatibus, perspiciatis, magni, voluptatem, doloribus, voluptas, iure, distinctio. Quaerat, facilis, voluptatum.",
      imagen: "https://tm-shopify031-computers.myshopify.com/cdn/shop/articles/post-1_370x275_crop_top.jpg?v=1604580029"
    },
    {
      titulo: "Harum, at sequi impedit",
      fecha: "08 de abril de 2014",
      extracto: "Doloribus, voluptatem, doloribus, voluptas, iure, distinctio. Quaerat, facilis, voluptatum.",
      imagen: "https://tm-shopify031-computers.myshopify.com/cdn/shop/articles/post-2_370x275_crop_top.jpg?v=1604580046"
    },
    {
      titulo: "Tempora quae dolor cumque nemo",
      fecha: "08 de abril de 2014",
      extracto: "Quaerat, facilis, voluptatum. Suscipit, dolorem, sit, amet, consectetur, adipiscing, elit. Suspendisse potenti.",
      imagen: "https://tm-shopify031-computers.myshopify.com/cdn/shop/articles/post-3_370x275_crop_top.jpg?v=1604580081"
    }
  ];

  options: OwlOptions = CustomOptios;

  discounts: Discount[] = [
    {
      imagePath: 'assets/banners/pc.webp',
      className: 'home-card-blue',
      title: 'Computadoras',
      content: '¡Obtén 20% de descuento!',
    },
    {
      imagePath: 'assets/banners/mac.webp',
      className: 'home-card-gray',
      title: 'Laptops',
      content: '¡Obtén 50% de descuento!',
    },
    {
      imagePath: 'assets/banners/tablet.webp',
      className: 'home-card-blue',
      title: 'Tablets',
      content: '¡Obtén 50% de descuento!',
    },
    {
      imagePath: 'assets/banners/monitor.webp',
      className: 'home-card-gray',
      title: 'Monitores',
      content: '¡Obtén 10% de descuento!',
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
