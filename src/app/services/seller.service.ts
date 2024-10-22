import { Injectable } from '@angular/core';
import {PaymentCondition} from "../models/payment-condition/payment-condition";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {apiUrls} from "../data/data";
import {Seller} from "../models/seller/seller";

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  sellers:Seller[] = [];
  constructor(private http:HttpClient) { }

  getSellers():Observable<Seller[]>{
    if (this.sellers.length > 0) {
      return of(this.sellers);
    }
    else {
      return this.http.get<Seller[]>(apiUrls.sellers).pipe(
        tap(sellers => {
          this.sellers = sellers;
        }),
        catchError(error => {
          console.error('Error fetching Payment Conditions: ', error);
          return of([]);
        })
      );
    }
  }
}
