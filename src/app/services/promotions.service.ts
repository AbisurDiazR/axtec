import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  constructor(private _db: AngularFirestore) { }

  getPromotions(): Observable<any>{
    return this._db.collection('promotions').get().pipe(
      map((promotions: any) => {
        const promotion = promotions.docs.map((value: any) => {
          const id = value.id;
          const data = value.data();
          return { id: id, ...data };
        });
        return promotion;
      })
    );
  }
}
