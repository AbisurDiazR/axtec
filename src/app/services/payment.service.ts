import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HttpClient,
    private _db: AngularFirestore
  ) {
  }

  createPayment(product: any): Promise<any>{
    let url: String = '';
    isDevMode() ? url = 'api/mercadopago' : url = `${environment.api_url}api/mercadopago`;
    return this.http.post<any>(`${url}`,product).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    ).toPromise();
  }

  createPaymentPending(uid: string, payment: any){
    return this._db.collection('payments').doc(uid).collection('pending').add(payment);
  }

  getPendingPayments(uid: string){
    return this._db.collection('payments').doc(uid).collection('pending').get().pipe(
      map((payments: any) => {
        const payment = payments.docs.map((value: any) => {
          const data = value.data();
          const id = value.id;
          return { id: id, ...data }
        });
        return payment;
      })
    );
  }
  
}
