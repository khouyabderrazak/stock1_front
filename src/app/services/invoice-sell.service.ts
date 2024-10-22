import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {apiUrls} from "../data/data";
import { Invoice } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceSellService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http:HttpClient) { }

  AddInvoiceSell(invoice: any): Observable<any> {
    return  this.http.post(apiUrls.invoiceSell, invoice)
  }

  getInvoiceSelles():Observable<Invoice[]>{
        return this.http.get<Invoice[]>(apiUrls.invoiceSell);
  }

  getSingleInvoice(id:number):Observable<Invoice>{
       return this.http.get<Invoice>(apiUrls.invoiceSell+"/signleInvoice/"+id)
  }

}
