import { Component, OnInit } from '@angular/core';
import { Brand } from '../constants/brand';
import { Product } from 'src/app/home/constants/product';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/collection/constants/category';
import { BrandsService } from 'src/app/services/brands.service';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
    private brandService: BrandsService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(((res: any) => {
      console.log(res);
    }));
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
              "description": element.descripcion
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

  navigateToProduct(productId: number | undefined) {
    this.router.navigate([`product/${productId}`]);
  }
}
