import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountsService {

  constructor(private _db: AngularFirestore) { }

  getDiscounts(): Observable<any>{
    return this._db.collection("discounts").get().pipe(
      map((discounts: any) => {
        const discount = discounts.docs.map((value: any) => {
          const data = value.data();
          const id = value.id;
          return { id: id, ...data };
        });
        return discount;
      })
    );
  }
}
