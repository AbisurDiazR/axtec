import { Component } from '@angular/core';
import { Item } from '../constants/item';
import { Router } from '@angular/router';
import { COLLECTIONS } from '../constants/utils';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent {
  
  constructor(private router: Router){}

  items: Item[] = COLLECTIONS;

  navigateTo(collectionId: string | undefined){
    this.router.navigate([`collection/${collectionId}`], {queryParams: { page: 1 } });
  }
}
