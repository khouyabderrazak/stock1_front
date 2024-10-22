import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Article } from "../models/Article";


@Injectable(
    {
        providedIn: "root"
    }
)

export class AjustementDeStockService {
    
    /**
     *
     */
    constructor(private http:HttpClient) {
        
        
    }

    getData():Observable<Article[]>{
      return  new Observable(
            (sub)=>{
                setTimeout(
                   ()=>{
                       
                    this.http.get<Article[]>("https://localhost:7020/api/Articles").subscribe(
                        (data)=>{
                            sub.next(data);
                        }
                    )   
                   }
                   ,10000
                )
            }
        )
    }
}
