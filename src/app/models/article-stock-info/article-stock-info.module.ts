import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';




export class ArticleStockInfoModule {
  id: number
  accountIdSuivi: number
  stockOuverture?: number
  tauxOuverture?: number
  seuil?: number
  stockdisponible?: number
  stockEngagee?: number

  constructor() {
    this.id = 0;
    this.stockEngagee=0;
  }
}
