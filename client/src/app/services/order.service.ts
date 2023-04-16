import { Injectable } from '@angular/core';
import { IOrder } from '../models/order';
import { IProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
    orders: IProduct[] = [];

    constructor() { }

      getOrders(){
        return this.orders;
      }

     addOrders(prod: any){
      this.orders.push(prod);
     }

     removeProductInOrder(id: any){
      this.orders = this.orders.filter(p => p._id !== id);
     }


     clearOrder() {
      this.orders = [];
     }
}
