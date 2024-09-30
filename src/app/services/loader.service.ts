import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public dataSource = new BehaviorSubject(false);
  public loader = this.dataSource.asObservable();

  constructor() { }

  public changeLoader(loader: boolean){
    this.dataSource.next(loader);
  }
}
