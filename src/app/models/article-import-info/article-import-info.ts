import {Supplier} from "../supplier/supplier";
import {Tax} from "../tax/Tax";

export interface ArticleImportInfo {
  id:number;
  pricePerUnit?:number
  accountId:number
  description?:string
  taskId?:number
  tax?:Tax
  supplierId?:number
  preferredSupplier?:Supplier
}
