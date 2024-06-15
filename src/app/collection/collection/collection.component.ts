import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/collection/constants/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit{

  items: Category[] = [];
  
  constructor(
    private router: Router,
    private categoryServices: CategoryService
  ){}
  
  ngOnInit(): void {
    this.setCategories();
  }
  
  setCategories() {
    this.categoryServices.getAllCategories().subscribe((res) => {
      this.items = res;
    });
  }
  
  navigateTo(collectionId: string | undefined){
    this.router.navigate([`collection/${collectionId}`], {queryParams: { page: 1 } });
  }
}
