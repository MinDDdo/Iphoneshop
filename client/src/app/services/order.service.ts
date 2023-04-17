import { Injectable } from '@angular/core';
import { IProduct } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { api } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  URL: string = 'order';
    orders: IProduct[] = [];

    constructor( private http: HttpClient ) { }


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

     createOrder(cust_id: string, items:any ): Observable<any> {
      const body = {
        cust_id,
        items
      };
      return this.http.post<any>(
        api.baseURL + this.URL + '/create',
        body
      ) .pipe(
        retry(1),
        catchError(this.handleError)
      )

     }
     handleError(error: any) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
        console.log(errorMessage)
      } else if (error.error && error.error.error) {
        errorMessage = error.error.error;
        console.log(errorMessage)
      } else {
        errorMessage = 'An unexpected error occurred.';
        console.log(errorMessage);
      }
  
      return throwError(() => {
        return errorMessage;
      });
    }
}
