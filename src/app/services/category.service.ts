import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _db: AngularFirestore) { }

  getCategoryById(catId: string): Observable<any> {
    return this._db.collection('categories').doc(catId).valueChanges();
  }

  getSubcategoriesByCategoryId(catId: string): Observable<any> {
    return this._db.collection('subcategories', ref => ref.where('categoryId', '==', catId)).get().pipe(
      map((events: any) => {
        const element = events.docs.map((value: any) => {
          const data = value.data();
          const id = value.id;
          return { id, ...data };
        });
        return element;
      })
    );
  }

  getCategoryByName(categoryName: string): Observable<any> {
    return this._db.collection('categories', ref => ref.where('categoryName', '==', categoryName)).get().pipe(
      map((categories: any) => {
        const category = categories.docs.map((value: any) => {
          const data = value.data();
          const id = value.id;
          return { id, ...data };
        });
        return category;
      })
    );
  }

  getAllCategories(): Observable<any> {
    return this._db.collection('categories').get().pipe(
      map((categories: any) => {
        const category = categories.docs.map((value: any) => {
          const data = value.data();
          const id = value.id;
          return { id, ...data };
        });
        return category;
      })
    );
  }

  getCategoryIdByName(categoryName: string): Observable<string | null> {
    return this._db.collection('categories', ref => ref.where('categoryName', '==', categoryName)).get().pipe(
      map(querySnapshot => {
        if (querySnapshot.size > 0) {
          return querySnapshot.docs[0].id;
        } else {
          return null;
        }
      })
    );
  }
}
