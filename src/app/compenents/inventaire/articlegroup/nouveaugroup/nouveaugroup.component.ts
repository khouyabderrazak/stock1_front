import { Component, OnInit, inject } from '@angular/core';

import { RadioButtonModule } from 'primeng/radiobutton'
import { InputTextModule } from 'primeng/inputtext'
import { DropdownModule } from 'primeng/dropdown'
import { CheckboxModule } from 'primeng/checkbox'
import { ArticleModule } from '../../../../models/article/article.module';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from '../../../upload-file/upload-file.component';
import { ArticleStockInfoModule } from '../../../../models/article-stock-info/article-stock-info.module';
import { ArticleImportInfoModule } from '../../../../models/article-import-info/article-import-info.module';
import { ArticleSellingInfoModule } from '../../../../models/article-selling-info/article-selling-info.module';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../../../services/article.service';
import { MessageService, SelectItemGroup } from 'primeng/api';
import { SupplierService } from '../../../../services/supplier.service';
import { DonneeService } from '../../../../services/constants.service';
import { TaxService } from '../../../../services/tax.service';
import { Tax } from '../../../../models/Tax';
import { ManufacutrerService } from '../../../../services/manufacutrer.service';
import { UniteService } from '../../../../services/unite.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip'
import { ToastModule } from 'primeng/toast'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { ChipsModule } from 'primeng/chips'
import { ButtonModule } from 'primeng/button'
import { DividerModule } from 'primeng/divider'
import { ArticleGroup } from '../../../../models/articleGroup';
import { Mark } from '../../../../models/mark';
import { MarkService } from '../../../../services/mark.service';
import { GroupArticlesService } from '../../../../services/group-articles.service';

@Component({
  selector: 'app-nouveaugroup',
  standalone: true,
  imports: [DividerModule,ChipsModule, ButtonModule, CommonModule, InputTextareaModule, FormsModule, TooltipModule, RadioButtonModule , InputTextModule, DropdownModule, CheckboxModule, UploadFileComponent,ToastModule],
  templateUrl: './nouveaugroup.component.html',
  styleUrl: './nouveaugroup.component.css',
  providers:[HttpClient,GroupArticlesService,UniteService,ManufacutrerService,TaxService,DonneeService,SupplierService,ArticleService,MarkService,ManufacutrerService]

})
export class NouveaugroupComponent implements OnInit {

  typeTitle = 'Sélectionnez si cet article est une marchandise physique ou un service que vous offrez. Souvenez-vous également qu\'une fois que vous avez inclus cet article dans une transaction, vous ne pouvez plus changer son type.'
  SkuTitle = 'L\'unité de gestion des stocks de l\'article'
  unites = []
  UniteTitle = 'L\'article sera mesuré en fonction de cette unité (par exemple : kg, douzaine).'
  http = inject(HttpClient)
  uniteMessure = 1;
  poidsUnit: number = 1;
  marques = []
  fabricants = []

  MpnTitle = 'Le numéro de fabrication permet d\'identifier de manière univoque la conception d\'une pièce.'
  UPCTitle = 'Numéro unique à 12 chiffres associé au code-barres (code produit universel).'
  IsbnTitle = 'Numéro d\'identification unique à 13 chiffres pour les livres commerciaux (International Standard Book Number - ISBN ou Numéro International Normalisé de Livre - NINL).'
  EanTitle = 'Numéro unique à 13 chiffres (code article international).'
  isVenteChecked: boolean = false;
  isAchatChecked: boolean = false;
  suppliers = []
  taxes: Tax[] = []
  poindsMessures: {
    id: number,
    label: string
  }[];
  messures: { id: number, label: string }[];
  revenus: { id: number, label: string }[];
  achatComptes: SelectItemGroup[]
  isReturnableTitle = 'Activez cette option si l\'article est éligible pour le retour en vente.'
  isStockSuivi: boolean = false
  StockOuvertureTitle = 'Le stock disponible à la vente au début de la période comptable'
  TauxOuvertureTitle = ' le tarif auquel vous avez acheté chaque unité du stock d\'ouverture';
  SeuilTitle = 'Lorsque le stock atteint le point de commande, une notification vous sera envoyée'
  suiviLeStockComptes: SelectItemGroup[];
  AccountIdSuivi: number = 1;
  fileImage: any;
  route = inject(ActivatedRoute)
  id: number = null;
  article: ArticleModule = new ArticleModule();
  articleGroup:ArticleGroup


  items: Item[] = []
  itemId: number = 1;

  Articles: ArticleModule[] = [];

  constructor(private markService:MarkService,
    private taxesService:TaxService,
    private articleService:ArticleService,
    private supplierService:SupplierService,
    private donneService:DonneeService,
    private uniteService:UniteService,
    private manufaturerService:ManufacutrerService,
    private groupArticlesService:GroupArticlesService,
    private messageService: MessageService,

    ) {
    this.article = new ArticleModule();
    this.articleGroup=new ArticleGroup();
  }

  ngOnInit(): void {
    this.getUnites()
    this.getMarks();
    this.getAllManufactuers()
    this.getTaxes();
    this.poindsMessures = this.donneService.poindsMessures;
    this.messures = this.donneService.messures;
    this.revenus = this.donneService.revenus;
    this.achatComptes = this.donneService.achatComptes;
    this.getALlSuppliers()
    this.suiviLeStockComptes = this.donneService.suiviLeStockComptes;
    this.initialzeArticle();

    this.items.push({
      id: 0,
      attribut: '',
      values: []
    });

  }
  getUnites() {
    this.uniteService.getUnities().subscribe((response) => {
      this.unites = response;
    })

  
  }
  getMarks() {
    this.markService.getAllMarks().subscribe((response) => {
      this.marques = response;
    })
  }

  getAllManufactuers() {
    this.manufaturerService.getAllManufacuters().subscribe((response) => {
      this.fabricants = response;
      console.log(this.fabricants)
    })
  }

  getTaxes() {
    this.taxesService.getTaxes().subscribe((response: any) => {
      response.forEach((task: any) => {
        task.title = task.title + '[' + task.ratio + '%]';
      });
      this.taxes = response;
    });
  }

  getALlSuppliers() {
    this.supplierService.getAllSuppliers().subscribe((response) => {
      this.suppliers = response;
    })
  }

  addRow() {

    if (this.items.length < 3) {
      this.items.push({
        id: this.itemId,
        attribut: '',
        values: []
      });
      this.itemId += 1;
    }

  }

  deleteItem(id: number) {
    if (this.items.length > 1) {
      this.items = this.items.filter(p => p.id != id);
    }
    this.AddArticles();
  }

  AddArticles() {
    this.Articles = [];
    let itemsNoVide = [];

    // Filtrer les éléments avec attribut non vide et valeurs non vides
    this.items.forEach(p => {
        if (p.attribut !== '' && p.values.length > 0) {
            itemsNoVide.push(p);
        }
    });

    // Générer les combinaisons
    if (itemsNoVide.length > 0) {
        for (let j = 0; j < itemsNoVide[0].values.length; j++) {
            if (itemsNoVide.length > 1) {
                for (let k = 0; k < itemsNoVide[1].values.length; k++) {
                    if (itemsNoVide.length > 2) {
                        for (let l = 0; l < itemsNoVide[2].values.length; l++) {
                            this.createArticleAAjouter(itemsNoVide[0].values[j] + "/" + itemsNoVide[1].values[k] + "/" + itemsNoVide[2].values[l]);
                        }
                    } else {
                      this.createArticleAAjouter( itemsNoVide[0].values[j] + "/" + itemsNoVide[1].values[k]);
                    }
                }
            } else {
               this.createArticleAAjouter(itemsNoVide[0].values[j]);
            }
        }
    }
}
createArticleAAjouter(name:string){
  let article =new ArticleModule();
  article.sellInfo=new ArticleSellingInfoModule();
  article.importInfo=new ArticleImportInfoModule();
  article.articleStockInf=new ArticleStockInfoModule();
  article.articleName =name;
  article.markId=this.article.markId;
  article.manufacturerId=this.article.manufacturerId;
  article.unitId=this.article.unitId;
  this.Articles.push(article);
}

  chooseFile(file: any) {
    this.fileImage=file;
  }

  Enregistrer() {
    this.articleGroup.articles = this.Articles;
    console.log(this.articleGroup);
    delete this.articleGroup.stockDisp;
  
    if (this.articleGroup.groupName == '' || this.articleGroup.groupName == null) {
      this.showError("Le nom du groupe est requis");
      return;
    } else if (this.articleGroup.articles.length == 0) {
      this.showError("Ajouter au moins un article");
      return;
    } else {
      for (let art of this.articleGroup.articles) {
        if (art.articleName == "") {
          this.showError("Le nom de l'article est requis");
          return;
        } else if (art.sellInfo.pricePerUnit == null || art.sellInfo.pricePerUnit.toString() == "") {
          this.showError("Le prix de vente de l'article est requis");
          return;
        } else if (art.importInfo.pricePerUnit == null || art.importInfo.pricePerUnit.toString()=="") {
          this.showError("Le prix de revient de l'article est requis");
          return;
        }
      }
    }
  
    this.groupArticlesService.addGroupArticles(this.articleGroup, this.fileImage).subscribe(
      (res) => {
        this.showSuccess("le groupe est enregister avec success")
        this.initialzeArticle();
        this.articleGroup=new ArticleGroup();
        this.Articles=[]
        this.items=[]
      
      }
    );
 
  }
  
  initialzeArticle(){
    this.article.sellInfo = new ArticleSellingInfoModule();
    this.article.importInfo = new ArticleImportInfoModule();
    this.article.articleStockInf = new ArticleStockInfoModule();
    this.article.mark=new Mark();
    this.article.importInfo.accountId=23; 
    this.article.sellInfo.accountId=7;
    this.article.articleStockInf.accountIdSuivi=1;
  }


  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }


}

interface Item {
  id: number,
  attribut: string,
  values: string[]
}
