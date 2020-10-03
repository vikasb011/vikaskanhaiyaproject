import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class DataService {
  private userIdSource = new BehaviorSubject<any>(0);
  currentUser = this.userIdSource.asObservable();

  private orderNumSource = new BehaviorSubject<any>(0);
  currentOrder = this.orderNumSource.asObservable();

  constructor() { }

  setUser(message: any) {
    this.userIdSource.next(message)
  }

   setOrderNumber(message: any) {
    this.orderNumSource.next(message)
  }
}
