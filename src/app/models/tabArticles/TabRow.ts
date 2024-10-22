import { Tax } from "../tax/Tax";

export class TabRow {
  id?: number ;
  name?: string;
  isImplicit:boolean = false;
  desc?: string;
  articleId?: number;
  discount:number;
  quantity?: number;
  price?:number;
  tax?: Tax ;
  taxId?:number;
  imgUrl?: string;
  loading?:boolean;
}
