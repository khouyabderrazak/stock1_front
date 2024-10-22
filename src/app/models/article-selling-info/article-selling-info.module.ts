import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tax } from '../Tax';




export class ArticleSellingInfoModule { 
  id:number;
  pricePerUnit?:number
  accountId:number
  description?:string
  taskId?:number 
  tax?:Tax
  /**
   *
   */
  constructor() {
    this.id=0;
  }
}
