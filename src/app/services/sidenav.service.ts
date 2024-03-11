import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  public dataSource = new BehaviorSubject(false);
  public open = this.dataSource.asObservable();

  constructor() {}

  public changeOpen(open: boolean){
    this.dataSource.next(open);
  }
}