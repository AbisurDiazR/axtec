import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Address } from '../utils/address';
import { Observable, map } from 'rxjs';
import { Product } from '../home/constants/product';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _db: AngularFirestore) { }

  createAddress(newAddress: Address) {
    return this._db.collection('addresses').add(newAddress);
  }

  getAddresses(uuid: string): Observable<any> {
    return this._db.collection('addresses', ref => ref.where('clientId', '==', uuid)).get().pipe(
      map((addresses: any) => {
        const address = addresses.docs.map((value: any) => {
          const data = value.data();
          const id = value.id;
          return { id: id, ...data };
        });
        return address;
      })
    );
  }

  async addShoppingCart(userId: string, product: Product) {
    const cartRef = this._db.collection('shopping-carts').doc(userId);
    const productRef = cartRef.collection('products').doc(product.id);

    return this._db.firestore.runTransaction(async (transaction) => {
      const cartDoc = await transaction.get(cartRef.ref);
      const productDoc = await transaction.get(productRef.ref);
      //cartDoc.exists ? console.log(cartDoc.exists) : transaction.set(cartRef.ref, { createdAt: new Date() });
      if (!cartDoc.exists) {
        transaction.set(cartRef.ref, { createdAt: new Date() });
      }

      //const productDoc = await transaction.get(productRef.ref);
      //productDoc.exists ? transaction.update(productRef.ref, { quantity: productDoc.data()?.['quantity'] + 1 }) : transaction.set(productRef.ref, { ...product, quantity: 1 });
      
      if (productDoc.exists) {
        const newQuantity = productDoc.data()?.['quantity'] + 1;
        transaction.update(productRef.ref, { quantity: newQuantity });
      } else {
        transaction.set(productRef.ref, { ...product, quantity: 1 });
      }
    });
  }

  // Verificar la existencia de un documento en la colección shopping-cart
  documentExistsInShoppingCart(cartId: string): Observable<any> {
    return this._db.collection('shopping-cart', ref => ref.where('cartId', '==', cartId)).get().pipe(
      map((carts: any) => {
        const cart = carts.docs.map((value: any) => {
          const data = value.data();
          const id = value.id;
          return { id: id, ...data }
        });
      })
    );
  }

  // Verificar la existencia de un documento en la subcolección products
  async documentExistsInProducts(cartId: string, productId: string) {
    const docRef = this._db.collection('shopping-cart').doc(cartId)
      .collection('products').doc(productId).ref;
    const docSnapshot = await docRef.get();
    return docSnapshot.exists;
  }

}
