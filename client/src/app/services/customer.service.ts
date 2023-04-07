import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry, catchError, throwError } from 'rxjs'

import { api } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  URL: string = 'customer';

  constructor(
    private http: HttpClient
  ) { }

  setCustomer(data: any) {
    if (data) {
      localStorage.setItem('_id', data._id);
      localStorage.setItem('fristname', data.fristname);
      localStorage.setItem('lastname', data.lastname);
      localStorage.setItem('email', data.email);

    }
  }

  getCustomer():any {
    const _id = localStorage.getItem('_id');
    const fname = localStorage.getItem('fristname');
    const lname = localStorage.getItem('lastname');
    const email = localStorage.getItem('email');

    const data = {
      _id: _id,
      fristname: fname,
      lastname: lname,
      email: email
    };

    return data;
  }

  removeCustomer() {
    localStorage.removeItem('cus_data');
  }

  signup(body: any): Observable<any> {
    return this.http.post<any>(
      api.baseURL + this.URL + '/signup' ,
      body
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );

  }

  login(body: any): Observable<any> {
    return this.http.post<any>(
      api.baseURL + this.URL + '/login',
      body
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  update(body: any, id: any): Observable<any> {
    return this.http.put<any>(
      api.baseURL + this.URL + '/edit' + id,
      body
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(
      api.baseURL + this.URL + '/delete' + id
      
    ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
      console.log(errorMessage)
    } else if (error.error && error.error.error) {
      // Get server-side error
      errorMessage = error.error.error;
      console.log(errorMessage)
    } else {
      // Unexpected error
      errorMessage = 'An unexpected error occurred.';
      console.log(errorMessage);
    }

    return throwError(() => {
      return errorMessage;
    });
  }
}
