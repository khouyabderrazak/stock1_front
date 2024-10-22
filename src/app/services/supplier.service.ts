import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SupplierModule } from '../models/supplier/supplier.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  constructor(private http:HttpClient) { 

  }
  getAllSuppliers():Observable<any>{
    return this.http.get<SupplierModule[]>("https://localhost:7020/api/Supplier");
  }                       
}
