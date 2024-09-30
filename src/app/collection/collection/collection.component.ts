import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/collection/constants/category';
import { CategoryService } from 'src/app/services/category.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit{

  items: Category[] = [];
  
  constructor(
    private router: Router,
    private categoryServices: CategoryService,
    private loaderService: LoaderService
  ){}
  
  ngOnInit(): void {
    this.setCategories();
  }
  
  setCategories() {
    this.loaderService.changeLoader(true);
    this.categoryServices.getAllCategories().subscribe((res) => {
      this.items = res;
      this.loaderService.changeLoader(false);
    }, (err: any) => {
      this.loaderService.changeLoader(false);
    });
  }
  
  navigateTo(collectionId: string | undefined){
    this.router.navigate([`collection/${collectionId}`], {queryParams: { page: 1 } });
  }
}
