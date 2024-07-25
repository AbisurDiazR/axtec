import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {
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
  
}
