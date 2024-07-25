import { Component, OnInit } from '@angular/core';
import { Brand } from '../constants/brand';
import { Product } from 'src/app/home/constants/product';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/collection/constants/category';
import { BrandsService } from 'src/app/services/brands.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-collection-view',
  templateUrl: './collection-view.component.html',
  styleUrls: ['./collection-view.component.scss']
})
export class CollectionViewComponent implements OnInit {
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
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.authService.observerCurrentUser.subscribe((res) => {
      if (res) {
        this.userLogged = true;
        this.userId = res.uid;
      }else{
        this.userLogged = false;
      }
    });
    this.activatedRoute.params.subscribe(((res: any) => {
      let collectionId = res['collection-id'];
      this.getProductsCategory(collectionId);
    }));
  }

  getProductsCategory(collectionId: any) {
    this.categoryService.getCategoryByName(collectionId).subscribe((res) => {
      let category = res[0];
      this.collectionName = category.categoryName;
      this.bannerImage = category.categoryImage;
      this.productService.productsByCategoryId(category.id).subscribe((res) => {
        var productsAux: Product[] = [];
        res.forEach((element: any) => {
          productsAux.push(
            {
              "id": element.id,
              "titulo": element.titulo,
              "precio": element.precioOriginal,
              "imagen": element.images[0],
              "description": element.descripcion,
              "cantidad": element.disponibilidad["cantidad"]
            }
          );
        });
        this.products = productsAux;
      });
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
