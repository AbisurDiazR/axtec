import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/collection/constants/brand';
import { Category } from 'src/app/home/constants/category';
import { Product } from 'src/app/home/constants/product';
import { AuthService } from 'src/app/services/auth.service';
import { BrandsService } from 'src/app/services/brands.service';
import { CategoryService } from 'src/app/services/category.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ProductService } from 'src/app/services/product.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-catalog-product',
  templateUrl: './catalog-product.component.html',
  styleUrls: ['./catalog-product.component.scss']
})
export class CatalogProductComponent implements OnInit {
  gridSelected: boolean = true;
  listSelected: boolean = false;

  brands: Brand[] = [];

  categories: Category[] = [];


  products: Product[] = [];

  collectionName: string | undefined;
  bannerImage: string = "";
  userId: string = '';
  userLogged: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
    private brandService: BrandsService,
    private authService: AuthService,
    private usersService: UsersService,
    private toastrService: ToastrService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.authService.observerCurrentUser.subscribe((res) => {
      if (res) {
        this.userLogged = true;
        this.userId = res.uid;
      } else {
        this.userLogged = false;
      }
    });
    this.activatedRoute.params.subscribe(((res: any) => {
      let collectionId = res['id'];
      this.getProductsBrand(collectionId);
    }));
  }

  getProductsBrand(brandId: string) {
    this.loaderService.changeLoader(true);
    this.productService.getProductByBrand(brandId).subscribe((res) => {
      var productsAux: Product[] = [];
      res.forEach((element: any) => {
        productsAux.push(
          {
            "id": element.id,
            "titulo": element.titulo,
            "precio": element.precioOriginal,
            "imagen": element.images[0],
            "description": element.descripcion,
            "cantidad": element.disponibilidad["cantidad"],
            "idPublisher": element.idPublisher
          }
        );
      });
      this.products = productsAux;
      console.log(this.products);
      this.loaderService.changeLoader(false);
    });
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
    this.brandService.getAllBrands().subscribe((res) => {
      this.brands = res;
    });
  }

  selectGrid() {
    this.gridSelected = true;
    this.listSelected = false;
  }

  selectList() {
    this.listSelected = true;
    this.gridSelected = false;
  }

  navigateToProduct(productId: string | undefined) {
    this.router.navigate([`product/${productId}`]);
  }

  addCart(product: Product) {
    if (product) {
      this.usersService.addShoppingCart(this.userId, product).then(() => {
        this.toastrService.success('Se agregado un nuevo producto a su carrito de compra', '¡Producto agregado!', {
          timeOut: 10000,
          positionClass: 'toast-top-right'
        });
      }).catch((err) => {
        console.log(err);
      });
    }
  }
}
