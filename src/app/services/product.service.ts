import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl: String = environment.api_url;

  constructor(private _db: AngularFirestore) { }

  getProductById(productId: string): Observable<any> {
    return this._db.collection('products').doc(productId).valueChanges();
  }

  productsByCategoryId(categoryId: string): Observable<any> {
    return this._db.collection('products', ref => ref.where('categoria', '==', categoryId)).get().pipe(
      map((products: any) => {
        const product = products.docs.map((value: any) => {
          const data = value.data();
          const id = value.id;
          return { id: id, ...data };
        });
        return product;
      })
    );
  }

  getLastProducts(): Observable<any> {
    //return this._db.collection('products', ref => ref.orderBy('createdAt', 'desc').limit(6)).valueChanges();
    return this._db.collection('products', ref => ref.orderBy('createdAt', 'desc').limit(6)).get().pipe(
      map((products: any) => {
        const product = products.docs.map((value: any) => {
          const data = value.data();
          const id = value.id;
          return { id: id, ...data };
        });
        return product;
      })
    );
  }
}
