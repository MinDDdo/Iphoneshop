import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError,retry,throwError} from 'rxjs'; 
import { api } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  URL: string= 'product'

  constructor(private http: HttpClient){}

  getProducts(): Observable<any> {
    return this.http.get<any>(
      api.baseURL + this.URL
    ).pipe(
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
