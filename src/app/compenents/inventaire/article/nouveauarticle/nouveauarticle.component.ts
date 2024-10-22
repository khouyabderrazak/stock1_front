import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { MessageService, SelectItemGroup } from 'primeng/api';
import { UniteService } from '../../../../services/unite.service';
import { CommonModule } from '@angular/common';
import { ManufacutrerService } from '../../../../services/manufacutrer.service';
import { TaxService } from '../../../../services/tax.service';
import { DonneeService } from '../../../../services/constants.service';
import { TooltipModule } from 'primeng/tooltip';
import { SupplierService } from '../../../../services/supplier.service';
import { ArticleService } from '../../../../services/article.service';
import { DimensionModule } from '../../../../models/dimension/dimension.module';
import { ArticleSellingInfoModule } from '../../../../models/article-selling-info/article-selling-info.module';
import { ArticleImportInfoModule } from '../../../../models/article-import-info/article-import-info.module';
import { ArticleStockInfoModule } from '../../../../models/article-stock-info/article-stock-info.module';
import { UploadFileComponent } from '../../../upload-file/upload-file.component';
import { ArticleModule } from '../../../../models/article/article.module';
import { Tax } from '../../../../models/Tax';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkService } from '../../../../services/mark.service';
@Component({
  selector: 'app-nouveauarticle',
  standalone: true,
  imports: [FormsModule, PanelModule, DividerModule,
    RadioButtonModule, UploadFileComponent, FileUploadModule,
    ToastModule, InputTextareaModule, ButtonModule, InputTextModule,
    DropdownModule , CommonModule, CheckboxModule, ToggleButtonModule, InputSwitchModule, TooltipModule],
  templateUrl: './nouveauarticle.component.html',
  styleUrl: './nouveauarticle.component.css',
  providers:[UniteService,ManufacutrerService,TaxService,DonneeService,SupplierService,ArticleService,MarkService,ManufacutrerService]
})

export class NouveauarticleComponent implements OnInit {
  typeTitle = 'Sélectionnez si cet article est une marchandise physique ou un service que vous offrez. Souvenez-vous également qu\'une fois que vous avez inclus cet article dans une transaction, vous ne pouvez plus changer son type.'
  SkuTitle = 'L\'unité de gestion des stocks de l\'article'
  unites = []
  UniteTitle = 'L\'article sera mesuré en fonction de cette unité (par exemple : kg, douzaine).'
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
  id: number = null;
  route:ActivatedRoute=inject(ActivatedRoute);
  
  article: ArticleModule = new ArticleModule();

  dimension: DimensionModule = new DimensionModule()

  sellInfo: ArticleSellingInfoModule = new ArticleSellingInfoModule();

  importInfo: ArticleImportInfoModule = new ArticleImportInfoModule();

  articleStockInf: ArticleStockInfoModule = new ArticleStockInfoModule();
  
  router=inject(Router)

  constructor(
    private messageService: MessageService,
    private markService:MarkService,
    private taxesService:TaxService,
    private articleService:ArticleService,
    private supplierService:SupplierService,
    private donneService:DonneeService,
    private uniteService:UniteService,
    private manufaturerService:ManufacutrerService) {

  }


  ngOnInit(): void {
    this.getUnites()
    this.getMarks()
    this.getAllManufactuers()
    this.getTaxes();
    this.poindsMessures = this.donneService.poindsMessures;
    this.messures = this.donneService.messures;
    this.revenus = this.donneService.revenus;
    this.achatComptes = this.donneService.achatComptes;
    this.suiviLeStockComptes = this.donneService.suiviLeStockComptes;
    this.getALlSuppliers()
    
    this.route.params.subscribe(
      (params) => {
        if (params.hasOwnProperty('id')) {
          this.id = params['id']
            this.articleService.getOneArticle(this.id).subscribe(
              (res) => {
                this.article = res;
                if (res.sellInfo) {
                  this.isVenteChecked = true;
                  this.sellInfo = res.sellInfo;
                }
                if (res.importInfo) {
                  this.isAchatChecked = true;
                  this.importInfo = res.importInfo;
                }
                if (res.followStock) {
                  this.articleStockInf = res.articleStockInf;
                  this.isStockSuivi = true;
                }
              }
            )
        }
      }
    )
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

  VenteChecked() {
    console.log("oui");
  }

  AchatChecked() {

  }


  submit() {

    if (this.article.articleName == null || this.article.articleName == '') {
      this.showError("le nom de l'article est demandee");
      return;
    }

    if (this.dimension.height != null && this.dimension.width != null && this.dimension.length != null) {
      this.article.dimensionId = 0;
      this.article.dimension = this.dimension;
      console.log(this.dimension);
    }

    if (this.isVenteChecked) {
      if (this.sellInfo.pricePerUnit == null) {
        this.showError("les informations sur le ventes le Prix de vente est demandee")
        return;
      }
      if (this.sellInfo.accountId == null) {
        this.showError("les informations sur le ventes le Compte est demandee")
        return;
      }
      this.article.sellInfoId = 0;
      this.article.sellInfo = this.sellInfo;
    }

    if (this.isAchatChecked) {
      if (this.importInfo.pricePerUnit == null) {
        this.showError("les informations sur les achats le Prix de vente est demandee")
        return;
      }
      if (this.importInfo.accountId == null) {
        this.showError("les informations sur les achats le Compte est demandee")
        return;
      }
      this.article.importInfoId = 0;
      this.article.importInfo = this.importInfo;
    }

    if (this.isStockSuivi && this.isVenteChecked && this.isAchatChecked) {
      if (this.articleStockInf.accountIdSuivi == null) {
        this.showError("Suivre le stock pour cet article Compte de stock")
        return;
      }
      this.article.followStock = true;
      this.article.articleStockInfoId = 0;
      this.articleStockInf.stockdisponible=this.articleStockInf.stockOuverture;
      this.article.articleStockInf = this.articleStockInf;

    }

    if (this.id == null) {
      this.articleService.addArticle(this.article, this.fileImage).subscribe(
        (response) => {
          this.showSuccess("article ajouter avec success")
          this.annuler();
        },
        (error) => {
          this.showError("il y'a une erreur lors de l'ajout de l'article")
        }
      )
    } else {
      this.articleService.onUpdateArticle(this.article).subscribe(
        (response) => {
          this.showSuccess("article modifier avec success")
          this.annuler();
        },
        (error) => {
          this.showError("il y'a une erreur lors de la modifiction de l'article")
        }
      )
    }
  }


  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }


  chooseFile(event: any) {
    this.fileImage = event;
    console.log(this.fileImage);
  }

  annuler() {

    if(this.id!=null){
      this.router.navigate(["/article/details/",this.id]);
    }

    this.article = new ArticleModule();
    this.dimension = new DimensionModule();
    this.sellInfo = new ArticleSellingInfoModule();
    this.importInfo = new ArticleImportInfoModule();
    this.articleStockInf = new ArticleStockInfoModule();
  }

  
}

