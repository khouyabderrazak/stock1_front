import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnitModule } from '../models/unit/unit.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UniteService {

  constructor(private http:HttpClient) { 

  }
  public getUnities():Observable<any>{
      return this.http.get<UnitModule[]>("https://localhost:7020/api/Unit");
  }
}
