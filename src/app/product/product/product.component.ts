import { Component, OnInit, isDevMode } from '@angular/core';
import { Product } from 'src/app/home/constants/product';
import { Item } from 'src/app/home/constants/item';
import { Review } from '../constants/review';
import { MatDialog } from '@angular/material/dialog';
import { PolicyDialogComponent } from 'src/app/shared/policy-dialog/policy-dialog.component';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProviderService } from 'src/app/services/provider.service';
import { PaymentService } from 'src/app/services/payment.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  description: boolean = true;
  delivery: boolean = false;
  review: boolean = false;
  productQuantity: number = 1;

  product: Product = {
    titulo: '',
    precio: 0,
    cantidad: 0
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
  productId: string = "";
  devMode: boolean = false;
  userLogged: boolean = false;

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private providerService: ProviderService,
    private paymentService: PaymentService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((param) => {
      this.productId = param["product-id"];
    });
    this.authService.observerCurrentUser.subscribe((res) => {
      if (res) {
        this.userLogged = true
      } else {
        this.userLogged = false;
      }
    })
    this.setProduct();
  }

  setProduct() {
    this.devMode = isDevMode();
    this.productService.getProductById(this.productId).subscribe((res) => {
      var productImages: any[] = []
      var currentProduct = res;
      var index = 0;
      currentProduct.images.forEach((image: String) => {
        productImages.push({ id: index, url: image });
      });
      this.product = {
        id: currentProduct.id,
        description: currentProduct.descripcion,
        peso: currentProduct.peso,
        cantidad: currentProduct.disponibilidad["cantidad"],
        titulo: currentProduct.titulo,
        precio: +currentProduct.precioOriginal,
        images: productImages,
        sku: currentProduct.sku,
      };
      if (this.product && this.product.images && this.product.images.length > 0) {
        this.currentImage = this.product.images[0].url;
      }
      this.setCategory(currentProduct.categoria);
      this.setProvider(currentProduct.marca);
      this.setSubcategories(currentProduct.categoria);
    });
  }

  setSubcategories(categoria: any) {
    this.categoryService.getSubcategoriesByCategoryId(categoria).subscribe((res) => {
      var subcategoriesTmp: string[] = [];
      res.forEach((subcategorie: any) => {
        subcategoriesTmp.push(subcategorie.subCategoryName);
      });
      this.product.subcategorias = subcategoriesTmp;
    })
  }

  setProvider(marca: string) {
    this.providerService.getCategoryById(marca).subscribe((res) => {
      this.product.vendedor = res.brandName;
    });
  }

  setCategory(categoria: string) {
    this.categoryService.getCategoryById(categoria).subscribe((res) => {
      this.product.categoria = res.categoryName;
    });
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

  purchase() {
    let item: Item = {
      title: this.product.titulo,
      unit_price: this.product.precio != undefined ? this.product.precio : 0.0,
      quantity: this.productQuantity
    };
    let productTmp = {
      "back_urls": environment.back_urls,
      "items": item,
      "fee": 0
    }
    this.paymentService.createPayment(productTmp).then((res: any) => {
      let response = res.data;
      if (response && response.init_point) {
        localStorage.setItem('idSell', `${this.productId}`);
        window.location.href = response.init_point;
      } else {
        console.error('Error: init_point not found in response', response);
      }
    }).catch((error: any) => {
      console.error('Error creating payment:', error);
    });
  }

  onQuantityChange(value: number) {
    console.log(value);
    if (value == 0) {
      this.productQuantity = this.productQuantity + 1;
    } else if(value > this.product.cantidad){
      this.productQuantity = this.product.cantidad;
    }
    else {
      this.productQuantity = value;
    }
  }

}
