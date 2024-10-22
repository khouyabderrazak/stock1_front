import { Injectable } from '@angular/core';
import { Currency } from '../models/currency/currency';

@Injectable({
  providedIn: 'root'
})
export class DonneeService {

  constructor() {

  }



devises: Currency[] = [
    { id: 1, label: "Dirham marocain (MAD)" },
    { id: 2, label: "Dollar américain (USD)" },
    { id: 3, label: "Euro (EUR)" },
    { id: 4, label: "Yen japonais (JPY)" },
    { id: 5, label: "Livre sterling (GBP)" },
    { id: 6, label: "Dollar canadien (CAD)" },
    { id: 7, label: "Dollar australien (AUD)" },
    { id: 8, label: "Franc suisse (CHF)" },
    { id: 9, label: "Yuan chinois (CNY)" },
    { id: 10, label: "Couronne suédoise (SEK)" },
    { id: 11, label: "Couronne norvégienne (NOK)" },
    { id: 12, label: "Dollar néo-zélandais (NZD)" },
    { id: 13, label: "Peso mexicain (MXN)" },
    { id: 14, label: "Roupie indienne (INR)" },
    { id: 15, label: "Rouble russe (RUB)" },
    { id: 16, label: "Rand sud-africain (ZAR)" },
    { id: 17, label: "Dollar de Singapour (SGD)" },
    { id: 18, label: "Dollar de Hong Kong (HKD)" },
    { id: 19, label: "Couronne danoise (DKK)" },
    { id: 20, label: "Couronne tchèque (CZK)" },
    { id: 21, label: "Zloty polonais (PLN)" }
];




// Utilisation :


  

  Titres:{
     id:number,
     label:string
  }[]=[
    {
      id:1,
      label:'M'
    },
    {
      id:1,
      label:'Mme'
    },
    {
      id:1,
      label:'Mlle'
    },
    {
      id:1,
      label:'Melle'
    },
    {
      id:1,
      label:'Dr'
    },
    
  ]


  poindsMessures: {
    id: number,
    label: string
  }[] = [
      {
        id: 1,
        label: 'lb'
      },
      {
        id: 1,
        label: 'kg'
      },
      {
        id: 1,
        label: 'g'
      }, {
        id: 1,
        label: 'oz'
      }
    ]
  messures: { id: number, label: string }[] = [
    {
      id: 1,
      label: 'cm'
    }, {
      id: 2,
      label: 'in'
    }
  ]
  revenus: { id: number, label: string }[] = [
    {
      id: 1,
      label: "Autres Charges"
    },
    {
      id: 2,
      label: "Frais d'expéditions"
    },
    {
      id: 3,
      label: "Remise"
    },
    {
      id: 4,
      label: "Revenus des frais de retard"
    },
    {
      id: 5,
      label: "Revenus d'intérêts"
    },
    {
      id: 6,
      label: "Revenus généraux"
    },
    {
      id: 7,
      label: "Ventes"
    }
]

  achatComptes = [
      {
  
        label: "Dépenses",
        items: [
          {value: 1,label: "Affranchissements" },
          {value: 2, label: "Amortissements" },
          {value: 3, label: "Autres frais" },
          {value: 4, label: "Créances irrécouvrables" },
          {value: 5, label: "Dépenses automobile" },
          {value: 6, label: "Dépenses de consultants" },
          {value: 7, label: "Dépenses de conciergerie" },
          {value: 8, label: "Dépenses d'informatique et d'internet" },
          {value: 9, label: "Dépenses téléphoniques" },
          {value: 10, label: "Fournitures de bureau" },
          {value: 11, label: "Frais bancaires et charges" },
          {value: 12, label: "Frais de cartes de crédit" },
          {value: 13, label: "Frais de déplacement" },
          {value: 14, label: "Frais de location" },
          {value: 15, label: "Frais d'hébergement" },
          {value: 16, label: "Imprimerie et papeterie" },
          {value: 17, label: "Non classé" },
          {value: 18, label: "Publicité et marketing" },
          {value: 19, label: "Remises d'achats" },
          {value: 20, label: "Réparations et entretien" },
          {value: 21, label: "Repas et divertissements" },
          {value: 22, label: "Salaires et rémunérations des employés" }
        ]
      },
      {
       
        label: "Coûts des marchandises vendues",
        items: [
          { value: 23, label: "Coûts des marchandises vendues" }
        ]
      }
    ]

    suiviLeStockComptes=[
      {
        label: 'Stock',
        items: [
          {
            value: 1,
            label: 'Équipement en stock'
          }
        ]
      }
      
    ]

}


