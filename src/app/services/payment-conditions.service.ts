import { Injectable } from '@angular/core';
import {PaymentCondition} from "../models/payment-condition/payment-condition";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {Article} from "../models/article/article";
import {apiUrls} from "../data/data";

@Injectable({
  providedIn: 'root'
})
export class PaymentConditionsService {

  paymentConditions:PaymentCondition[] = [];
  constructor(private http:HttpClient) { }

  getPaymentConditions():Observable<PaymentCondition[]>{
    if (this.paymentConditions.length > 0) {
      return of(this.paymentConditions);
    }
    else {
      return this.http.get<PaymentCondition[]>(apiUrls.paymentConditions).pipe(
        tap(paymentConditions => {
          this.paymentConditions = paymentConditions;
        }),
        catchError(error => {
          console.error('Error fetching Payment Conditions: ', error);
          return of([]);
        })
      );
    }
  }

}
