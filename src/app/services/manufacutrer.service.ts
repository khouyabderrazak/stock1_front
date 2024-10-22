import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ManufacturerModule } from '../models/manufacturer/manufacturer.module';

@Injectable({
  providedIn: 'root'
})
export class ManufacutrerService {

  constructor(private http:HttpClient) { 

  }
  getAllManufacuters():Observable<any>{
       return this.http.get<ManufacturerModule[]>("https://localhost:7020/api/Manufacturer");
  }
}
