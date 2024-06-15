import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _db: AngularFirestore) { }

  getAllBrands(): Observable<any>{
    return this._db.collection('brands').get().pipe(
      map((brands: any) => {
        const brand = brands.docs.map((value: any) => {
          const data = value.data();
          const id = value.id;
          return { id: id, ...data };
        });
        return brand;
      })
    );
  }
}
