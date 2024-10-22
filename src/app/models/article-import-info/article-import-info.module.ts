import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierModule } from '../supplier/supplier.module';
import { Tax } from '../Tax';




export class ArticleImportInfoModule { 
  id:number;
  pricePerUnit?:number
  accountId:number
  description?:string
  taskId?:number
  tax?:Tax
  supplierId?:number
  preferredSupplier?:SupplierModule
  /**
   *
   */
  constructor() {   
    this.id=0; 
  }
}
