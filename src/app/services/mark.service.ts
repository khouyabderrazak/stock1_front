import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkService {

  constructor(private http:HttpClient) { }

  public getAllMarks():Observable<any>{
          return  this.http.get("https://localhost:7020/api/Mark");
  }

}
