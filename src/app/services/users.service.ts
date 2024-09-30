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
      if (!cartDoc.exists) {
        transaction.set(cartRef.ref, { createdAt: new Date() });
      }

      if (productDoc.exists) {
        const newQuantity = productDoc.data()?.['quantity'] + 1;
        transaction.update(productRef.ref, { quantity: newQuantity });
      } else {
        transaction.set(productRef.ref, { ...product, quantity: 1 });
      }
    });
  }

  updateShoppingCartItems(cartId: string, productId: string, productQty: number) {
    return this._db.collection('shopping-carts').doc(cartId).collection('products').doc(productId).update({ quantity: productQty });
  }

  getShoppingCartById(userId: string): Observable<any> {
    return this._db.collection('shopping-carts').doc(userId).collection('products').get().pipe(
      map((items: any) => {
        const item = items.docs.map((value: any) => {
          const data = value.data();
          const id = value.id;
          return { id: id, ...data }
        });
        return item;
      })
    );
  }

  deleteCartItem(cartId: string, productId: string): Promise<void> {
    return this._db.collection('shopping-carts').doc(cartId).collection('products').doc(productId).delete();
  }

  async deleteCartItems(cartId: string): Promise<void> {
    const cartRef = this._db.collection('shopping-carts').doc(cartId);
    const productsRef = cartRef.collection('products');

    // Obtener todos los documentos en la subcolección 'products'
    const productsSnapshot = await productsRef.get().toPromise();

    if (productsSnapshot) {
      // Borrar todos los documentos en la subcolección 'products'
      const batch = this._db.firestore.batch();
      productsSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Ejecutar la eliminación en batch
      await batch.commit();
    }

    // Finalmente, borrar el documento en 'shopping-carts'
    await cartRef.delete();
  }

  deleteAddressById(addressId: string): Promise<void>{
    return this._db.collection('addresses').doc(addressId).delete();
  }

}
