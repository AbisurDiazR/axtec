import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandsService } from 'src/app/services/brands.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-catalog-products',
  templateUrl: './catalog-products.component.html',
  styleUrls: ['./catalog-products.component.scss']
})
export class CatalogProductsComponent implements OnInit {
  brands: any[] = [];

  constructor(
    private brandService: BrandsService,
    private loaderService: LoaderService,
    private router: Router
  ){}
  
  ngOnInit(){
    this.setBrands();
  }
  
  setBrands() {
    this.loaderService.changeLoader(true);
    this.brandService.getAllBrands().subscribe((res) => {
      this.brands = res;
      this.loaderService.changeLoader(false);
    });
  }

  navigateTo(brand: any){
    this.router.navigate([`catalog/brand/${brand.id}`]);
  }

}
