import { TabRow } from "./TabRow";
import { Tax } from "../tax/Tax";

export class TabArticleData {
  public tabRows:TabRow[];
  subTotal:number;
  totalQuantity:number;
  totalDiscount:number;
  showShippingCosts:boolean;
  shippingCosts: number
  shippingCostsTaxId: number
  otherCostsAmount:number;
  otherCostsLabel:string;
  infoClient:string
  total:number;
  shippingCostsTax:Tax;
  sumOfTaxes:{tax:Tax,value:number}[]
  isArticleVisible:boolean = true;
  isQuantityVisible:boolean = true;
  isPriceVisible:boolean = true;
  doApplyTotalDiscount:boolean = false;
  isTaxVisible:boolean = false;
  isAmountVisible:boolean = true;
  isDiscountVisible:boolean = false;
  messages:string[] = [];
  constructor(values:{
                subTotal: number;
                shippingCostsTaxId?: number;
                shippingCosts: number;
                total: number;
                totalQuantity?: number;
                infoClient: string;
                tabRows: TabRow[];
                totalDiscount: number;
                showShippingCosts: boolean;
                otherCostsAmount: number;
                sumOfTaxes: { tax: Tax; value: number }[];
                otherCostsLabel: string;
                isArticleVisible:boolean;
                isQuantityVisible:boolean ;
                isPriceVisible:boolean;
                isTaxVisible:boolean ;
                doApplyTotalDiscount:boolean ;
                isAmountVisible:boolean ;
                isDiscountVisible:boolean;
              })
  {
    this.tabRows = values.tabRows;
    this.subTotal = values.subTotal;
    this.totalQuantity = values.totalDiscount;
    this.totalDiscount = values.totalDiscount;
    this.showShippingCosts = values.showShippingCosts;
    this.shippingCosts = values.shippingCosts;
    this.shippingCostsTaxId = values.shippingCostsTaxId;
    this.otherCostsAmount = values.otherCostsAmount;
    this.otherCostsLabel = values.otherCostsLabel;
    this.infoClient = values.infoClient;
    this.total = values.total;
    this.sumOfTaxes = values.sumOfTaxes;
    this.isArticleVisible = values.isArticleVisible;
    this.isDiscountVisible = values.isDiscountVisible;
    this.isTaxVisible = values.isTaxVisible;
    this.isPriceVisible = values.isPriceVisible;
    this.isQuantityVisible = values.isQuantityVisible;
    this.isAmountVisible = values.isAmountVisible;
    this.doApplyTotalDiscount = values.doApplyTotalDiscount;
  }

  validate(){
    this.messages = [];
    for(let tabRow of this.tabRows){
      if(tabRow.articleId == null && !tabRow.isImplicit){
        this.messages.push('Choisissez un article pour la ligne '+(tabRow.id+1));
      }
      if(tabRow.isImplicit && tabRow.name==null && tabRow.name?.trim()==""){
        this.messages.push('isImplicit = '+tabRow.isImplicit+'| Champ Vide Dans La ligne '+(tabRow.id+1));
      }
    }

  }

}
