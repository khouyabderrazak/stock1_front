import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {Observable, of, tap} from 'rxjs';
import {Tax} from "../models/tax/Tax";
import {apiUrls} from "../data/data";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class TaxService {

  taxes:Tax[] = [];
  constructor(private http:HttpClient) { }

  public getTaxes():Observable<Tax[]>{
   
      return this.http.get<Tax[]>(apiUrls.taxes).pipe(
       
        map(
          (res:Tax[])=>{
            return res.map(
              item=>{
                let  itemTile=item;
                itemTile.title=item.title+'['+item.ratio+'%]'
                return itemTile; 
              }
            )
          }
        )
      ,
        catchError(error => {
          console.error('Error fetching Payment Conditions: ', error);
          return of([]);
        })
      );
    }
}
