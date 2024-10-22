import { Article } from "./Article";
import { AssociatedDocs } from "./associated-docs/associated-docs";
import { Client } from "./client/client";
import { PaymentCondition } from "./payment-condition/payment-condition";
import { Seller } from "./seller/seller";
import { Tax } from "./Tax";

export interface Invoice {
    id: number;
    clientId: number;
    client?: Client;
    generalConditions?: string;
    nInvoice: string;
    nOrder?: string;
    paymentConditionId?: number;
    paymentCondition?: PaymentCondition;
    invoiceDate?: Date;
    dueDate?: Date;
    sellerId?: number;
    seller?: Seller;
    note?: string;
    tabArticles?: TabArticles;
    associatedDocsId?: number;
    associatedDocs?: AssociatedDocs;
  }

  export interface TabArticles {
    id: number;
    fraisdexpedition?: number;
    total?: number;
    sousTotal?: number;
    taxTotal?: number;
    articlesInfo?: ArticlesInfo[];
  }
  
  export interface ArticlesInfo {
    id: number;
    articleId?: number;
    article?: Article;
    quantite?: number;
    taux?: number;
    taxId?: number;
    tax?: Tax;
    montant?: number;
    note?: string;
    tabArticlesId?: number;
  }

  
  