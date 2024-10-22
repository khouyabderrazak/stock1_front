import {Unit} from "../unit/unit";
import {Manufacturer} from "../manufacturer/manufacturer";
import {Dimension} from "../dimension/dimension";
import {ArticleSellingInfo} from "../article-selling-info/article-selling-info";
import {ArticleImportInfo} from "../article-import-info/article-import-info";
import {ArticleStockInfo} from "../article-stock-info/article-stock-info";
import { Mark } from "../mark";

export interface  ArticleLite{
  id:number
  articleName:string
}

export interface Article extends ArticleLite{
  markId?:number
  mark?:Mark
  sku?:string
  unitId?:number
  unit?:Unit
  ImagePath?:string
  manufacturerId?:number
  manufacturer?:Manufacturer
  upc?:string
  isReturnable:boolean
  ean?:string
  dimensionId?:number
  dimension?:Dimension
  weight?:number;
  sellInfoId?:number;
  sellInfo?:ArticleSellingInfo;
  importInfoId?:number;
  importInfo?:ArticleImportInfo;
  mpn?:string;
  isbn?:string;
  typeArticle:number;
  followStock?:boolean;
  articleStockInfoId?:number;
  articleStockInf?:ArticleStockInfo;
}
