import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitModule } from '../unit/unit.module';
import { ManufacturerModule } from '../manufacturer/manufacturer.module';
import { DimensionModule } from '../dimension/dimension.module';
import { ArticleSellingInfoModule } from '../article-selling-info/article-selling-info.module';
import { ArticleImportInfoModule } from '../article-import-info/article-import-info.module';
import { ArticleStockInfoModule } from '../article-stock-info/article-stock-info.module';
import { ImagePathModule } from '../image-path/image-path.module';
import { ArticleGroup } from '../articleGroup';
import { Mark } from '../mark';




export class ArticleModule {
  id:number
  articleName?:string
  markId?:number
  mark?:Mark
  sku?:string
  unitId?:number
  unit?:UnitModule
  imagePath?:string
  manufacturerId?:number
  manufacturer?:ManufacturerModule
  upc?:string
  isReturnable:boolean
  ean?:string
  dimensionId?:number
  dimension?:DimensionModule
  weight?:number
  sellInfoId?:number
  sellInfo?:ArticleSellingInfoModule
  importInfoId?:number
  importInfo?:ArticleImportInfoModule
  mpn?:string
  isbn?:string
  typeArticle:number 
  followStock?:boolean
  articleStockInfoId?:number;
  articleStockInf?:ArticleStockInfoModule
  articleGroupId?:number
  articleGroup?:ArticleGroup
  constructor(){
     this.typeArticle=1;
     this.isReturnable=true;
     this.id=0;
     this.followStock=false;
  }
}



