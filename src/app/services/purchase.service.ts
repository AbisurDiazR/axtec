import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Item } from '../home/constants/item';
import { map, Observable, retry } from 'rxjs';
import { Sale } from '../utils/sale';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private _db: AngularFirestore) { }

  setTemporalPurchase(clientId: string, item: Item){
    return this._db.collection('temporalPurchase').add({clientId: clientId, ...item});
  }

  getTemporalPurchase(clientId: string){
    return this._db.collection('temporalPurchase', ref => ref.where('clientId', '==', clientId)).get().pipe(
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

  createSale(sale: Sale){
    return this._db.collection('sales').add(sale);
  }

  async deleteTemporalPurchase(clientId: string): Promise<void> {
    try {
      const querySnapshot:any = await this._db.collection('temporalPurchase', ref => ref.where('clientId', '==', clientId)).get().toPromise();
      
      const batch = this._db.firestore.batch();
      querySnapshot.forEach((doc: any) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      console.log('Documents successfully deleted');
    } catch (error) {
      console.error('Error removing documents: ', error);
    }
  }

  getUserSales(userId: string): Observable<any>{
    return this._db.collection('sales', ref => ref.where('clientId', '==', userId)).get().pipe(
      map((sales: any) => {
        const sale = sales.docs.map((value: any) => {
          const data = value.data();
          const id = value.id;
          return { id: id, ...data };
        });
        return sale;
      })
    );
  }
}
