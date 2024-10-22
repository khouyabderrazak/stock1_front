import {Tax} from "../tax/Tax";

export interface ArticleSellingInfo {
  id:number;
  pricePerUnit?:number
  accountId:number
  description?:string
  taskId?:number
  tax?:Tax
}
