import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {
  }

  createPayment(product: any): Promise<any>{
    return this.http.post('api/mercadopago',product).pipe(
      map((response: any) => {
        // Maneja la respuesta exitosa
        return response;
      }),
      catchError((error: any) => {
        // Maneja el error
        console.error('Error creating payment', error);
        return throwError(error);
      })
    ).toPromise();
  }

  getUsers(){
    return this.http.get('api/products').pipe(
      map((response: any) => {
        // Maneja la respuesta exitosa
        return response;
      }),
      catchError((error: any) => {
        // Maneja el error
        console.error('Error creating payment', error);
        return throwError(error);
      })
    ).toPromise();
  }
}
