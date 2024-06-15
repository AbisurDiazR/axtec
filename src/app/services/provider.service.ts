import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private _db: AngularFirestore) { }

  getCategoryById(brandId: string): Observable<any>{
    return this._db.collection('brands').doc(brandId).valueChanges();
  }
}
