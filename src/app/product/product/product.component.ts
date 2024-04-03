import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/home/constants/product';
import { Review } from '../constants/review';
import { MatDialog } from '@angular/material/dialog';
import { PolicyDialogComponent } from 'src/app/shared/policy-dialog/policy-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  description: boolean = true;
  delivery: boolean = false;
  review: boolean = false;

  product: Product = {
    "id": 1,
    "titulo": "Laptop HP Pavilion 15",
    "precio": 899.99,
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget sem at elit finibus condimentum. Nullam eleifend leo vel lacus cursus, sed tincidunt diam vestibulum. Nulla facilisi. Donec vel aliquam elit. Vivamus convallis ultrices nisl, ut fermentum risus suscipit id. Nulla sit amet turpis in tortor venenatis lobortis.",
    "images": [
      { idImage: 0, url: "https://tm-shopify031-computers.myshopify.com/cdn/shop/products/apple_wireless_keyboard_mc184_1_148x148_crop_center.png?v=1396975080" },
      { idImage: 1, url: "https://tm-shopify031-computers.myshopify.com/cdn/shop/products/apple_wireless_keyboard_mc184_2_148x148_crop_center.png?v=1396975080" },
      { idImage: 2, url: "https://tm-shopify031-computers.myshopify.com/cdn/shop/products/apple_wireless_keyboard_mc184_3_148x148_crop_center.png?v=1663570747" }],
    "cantidad": 100,
    "vendedor": "HP",
    "categoria": "Computadoras Portatiles",
    "peso": "25.06 kg",
    "subcategorias": [
      'Laptops HP Pavilion',
      'Laptops HP ENVY',
      'Laptops HP Spectre',
      'Laptops HP EliteBook',
      'Laptops HP ProBook',
      'Laptops HP ZBook',
      'Laptops HP Chromebook',
      'Laptops HP Omen',
      // Agrega más subcategorías si es necesario
    ]
  };
  reviews: Review[] = [
    {
      "author": "Usuario 1",
      "rating": 5,
      "content": "Excelente producto. ¡Lo recomiendo totalmente!"
    },
    {
      "author": "Usuario 2",
      "rating": 4,
      "content": "Buen producto, pero podría mejorar en algunos aspectos."
    },
    {
      "author": "Usuario 3",
      "rating": 3,
      "content": "Producto aceptable, cumple su función."
    },
    {
      "author": "Usuario 4",
      "rating": 2,
      "content": "No estoy satisfecho con el producto, esperaba más."
    },
    {
      "author": "Usuario 5",
      "rating": 1,
      "content": "Muy decepcionado con la calidad del producto."
    }
  ];
  currentImage: any;
  imageLoaded: boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    if (this.product && this.product.images && this.product.images.length > 0) {
      this.currentImage = this.product.images[0].url;
    }
  }

  selectDescription() {
    this.description = true;
    this.delivery = false;
    this.review = false;
  }
  selectDelivery() {
    this.description = false;
    this.delivery = true;
    this.review = false;
  }
  selectReview() {
    this.description = false;
    this.delivery = false;
    this.review = true;
  }

  openPolicy(policyName: string) {
    const dialogRef = this.dialog.open(PolicyDialogComponent, {
      data: { policyName: policyName }
    });
  }

  previousImage() {
    if (this.product && this.product.images) {
      const currentIndex = this.product.images.findIndex(image => image.url === this.currentImage);
      if (currentIndex > 0) {
        this.currentImage = this.product.images[currentIndex - 1].url;
      } else {
        // Si ya estamos en la primera imagen, volvemos a la última
        this.currentImage = this.product.images[this.product.images.length - 1].url;
      }
    }
  }

  nextImage() {
    if (this.product && this.product.images) {
      const currentIndex = this.product.images.findIndex(image => image.url === this.currentImage);
      if (currentIndex < this.product.images.length - 1) {
        this.currentImage = this.product.images[currentIndex + 1].url;
      } else {
        // Si ya estamos en la última imagen, volvemos a la primera
        this.currentImage = this.product.images[0].url;
      }
    }
  }

  updateCurrentImage(imageUrl: string) {
    this.currentImage = imageUrl;
  }

  onImageLoad() {
    this.imageLoaded = true;
  }

}
