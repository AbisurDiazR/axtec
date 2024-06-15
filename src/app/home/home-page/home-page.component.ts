import { Component, OnInit } from '@angular/core';
import { Discount } from '../constants/discount';
import { Category } from '../constants/category';
import { Product } from '../constants/product';
import { CustomOptios } from '../constants/customOptions';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Article } from 'src/app/blog/constants/article';
import { RedirectService } from 'src/app/services/redirect.service';
import { Router } from '@angular/router';
import { DiscountsService } from 'src/app/services/discounts.service';
import { CategoryService } from 'src/app/services/category.service';
import { PromotionsService } from 'src/app/services/promotions.service';
import { Promotion } from '../constants/promotion';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  
  products: Product[] = [];

  bestSellers: any = [
    {
      nombre: "Apple Power Mac G5 Desktop",
      precio: 20.00,
      imagen: "https://tm-shopify031-computers.myshopify.com/cdn/shop/products/apple_power_mac_g5_desktop_1_780x825_crop_center.png?v=1396975059"
    },
    {
      nombre: "Apple MacBook Pro (13'' 2.7GHz i7)",
      precio: 80.00,
      imagen: "https://tm-shopify031-computers.myshopify.com/cdn/shop/products/apple_macbook_pro_13_2-7ghz_i7_1_780x825_crop_center.png?v=1396975049"
    },
    {
      nombre: "Apple iPad 2 (16GB Wi-Fi, Black)",
      precio: 150.00,
      imagen: "https://tm-shopify031-computers.myshopify.com/cdn/shop/products/apple_ipad_2_16gb_wi-fi_black_1_780x825_crop_center.png?v=1396975044"
    }
  ];

  mostWanted: any = [
    {
      nombre: "Apple Power Mac G5 Desktop",
      precio: 20.00,
      imagen: "https://tm-shopify031-computers.myshopify.com/cdn/shop/products/apple_power_mac_g5_desktop_1_780x825_crop_center.png?v=1396975059"
    },
    {
      nombre: "Apple MacBook Pro (13'' 2.7GHz i7)",
      precio: 80.00,
      imagen: "https://tm-shopify031-computers.myshopify.com/cdn/shop/products/apple_macbook_pro_13_2-7ghz_i7_1_780x825_crop_center.png?v=1396975049"
    },
    {
      nombre: "Apple iPad 2 (16GB Wi-Fi, Black)",
      precio: 150.00,
      imagen: "https://tm-shopify031-computers.myshopify.com/cdn/shop/products/apple_ipad_2_16gb_wi-fi_black_1_780x825_crop_center.png?v=1396975044"
    }
  ];

  onSale: any = [
    {
      nombre: "Apple Time Capsule - 1 TB",
      precio: 60.00,
      imagen: "https://tm-shopify031-computers.myshopify.com/cdn/shop/products/apple_time_capsule_-_1_tb_1_100x100_crop_center.png?v=1396975064",
      nuevo: true,
      rebajado: false
    },
    {
      nombre: "Apple TV",
      precio: 78.00,
      imagen: "https://tm-shopify031-computers.myshopify.com/cdn/shop/products/apple_tv_1_100x100_crop_center.png?v=1396975069",
      nuevo: true,
      rebajado: true,
      precioOriginal: 100.0
    },
    {
      nombre: "Apple TV 3.0 con Blu-ray y HD tuner",
      precio: 399.00,
      imagen: "https://tm-shopify031-computers.myshopify.com/cdn/shop/products/img_08_100x100_crop_center.png?v=1663333027",
      nuevo: false,
      rebajado: false
    }
  ]

  articles: Article[] = [
    {
      id: "1",
      titulo: "Repellendus consequuntur aut",
      fecha: "08 de abril de 2014",
      extracto: "Ullam consequatur, dolorem necessitatibus, perspiciatis, magni, voluptatem, doloribus, voluptas, iure, distinctio. Quaerat, facilis, voluptatum.",
      imagen: "https://tm-shopify031-computers.myshopify.com/cdn/shop/articles/post-1_370x275_crop_top.jpg?v=1604580029"
    },
    {
      id: "2",
      titulo: "Harum, at sequi impedit",
      fecha: "08 de abril de 2014",
      extracto: "Doloribus, voluptatem, doloribus, voluptas, iure, distinctio. Quaerat, facilis, voluptatum.",
      imagen: "https://tm-shopify031-computers.myshopify.com/cdn/shop/articles/post-2_370x275_crop_top.jpg?v=1604580046"
    },
    {
      id: "3",
      titulo: "Tempora quae dolor cumque nemo",
      fecha: "08 de abril de 2014",
      extracto: "Quaerat, facilis, voluptatum. Suscipit, dolorem, sit, amet, consectetur, adipiscing, elit. Suspendisse potenti.",
      imagen: "https://tm-shopify031-computers.myshopify.com/cdn/shop/articles/post-3_370x275_crop_top.jpg?v=1604580081"
    }
  ];

  options: OwlOptions = CustomOptios;

  //Descuentos
  discounts: Discount[] = [];

  categories: Category[] = [
    { hover: false, iconDark: 'ic-computadoras', iconLight: 'ic-computadoras-light', categoryName: 'Tablets', categoryPath: '' },
    { hover: false, iconDark: 'ic-fotos', iconLight: 'ic-fotos-light', categoryName: 'Camaras', categoryPath: '' },
    { hover: false, iconDark: 'ic-software', iconLight: 'ic-software-light', categoryName: 'Software', categoryPath: '' },
    { hover: false, iconDark: 'ic-tv', iconLight: 'ic-tv-light', categoryName: 'Gaming', categoryPath: '' },
    { hover: false, iconDark: 'ic-hardware', iconLight: 'ic-hardware-light', categoryName: 'Hardware', categoryPath: '' },
    { hover: false, iconDark: 'ic-smartphone', iconLight: 'ic-smartphone-light', categoryName: 'Smartphone', categoryPath: '' },
  ];

  promotions: Promotion[] = [];

  constructor(
    private navigateService: RedirectService,
    private router: Router,
    private discountService: DiscountsService,
    private categoryService: CategoryService,
    private promotionService: PromotionsService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.setDiscounts();
    this.setPromotions();
    this.getLastProducts();
  }
  
  getLastProducts() {
    this.productService.getLastProducts().subscribe((res) => {
      res.forEach((element: any) => {
        this.products.push(
          {
            imagen: element.images[0],
            titulo: element.titulo,
            precio: element.precioOriginal
          }
        );
      });
    });
  }

  setPromotions() {
    this.promotionService.getPromotions().subscribe((res) => {
      console.log(res);
      this.promotions = res;
    });
  }

  //Inicializar descuentos
  setDiscounts() {
    this.discountService.getDiscounts().subscribe((res) => {
      this.discounts = res;
    });
  }

  changeIcon(isHover: boolean, index: number) {
    this.categories[index].hover = isHover;
  }

  goToBlog(path: string | undefined) {
    if (path != undefined) {
      this.navigateService.redirectTo(`blog/${path}`);
    }
  }

  goToCollection(categoryName: string | undefined) {
    console.log(categoryName);
    if (categoryName) {
      this.categoryService.getCategoryIdByName(categoryName).subscribe((res) => {
        if (res != null) {
          this.router.navigate([`collection/${categoryName}`], { queryParams: { page: 1 } });
        }
      });
    }
  }

  goToCategoryList(idCategory: string | undefined) {
    if (idCategory != undefined) {
      this.categoryService.getCategoryById(idCategory).subscribe((res) => {
        this.router.navigate([`collection/${res.categoryName}`], { queryParams: { page: 1 } });
      });
    }
  }

  goToCatalog() {
    this.router.navigate([`collection`]);
  }

  goToProduct() {
    this.router.navigate([`product/1`]);
  }

}
