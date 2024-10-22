import { Component, OnInit, inject } from '@angular/core';
import { ArticleService } from '../../../../services/article.service';
import { ArticleModule } from '../../../../models/article/article.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleImportInfoModule } from '../../../../models/article-import-info/article-import-info.module';
import { ArticleSellingInfoModule } from '../../../../models/article-selling-info/article-selling-info.module';
import { ImageComponent } from '../../../image/image.component';
import { FieldsetModule } from 'primeng/fieldset'
import { TabMenuModule } from 'primeng/tabmenu'
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ChartModule } from 'primeng/chart';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { UnitModule } from '../../../../models/unit/unit.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { UploadFileService } from '../../../../services/upload-file.service';
import { UploadFileComponent } from '../../../upload-file/upload-file.component';
import { ArticleStockInfoModule } from '../../../../models/article-stock-info/article-stock-info.module';
import {TaxService} from "../../../../services/tax.service";
import { DonneeService } from '../../../../services/constants.service';


@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [CardModule,ImageComponent, ChartModule ,CommonModule, FieldsetModule, TabMenuModule, MenuModule, ToastModule, ButtonModule, ConfirmDialogModule,UploadFileComponent],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css',
  providers:[ArticleService,DonneeService,MessageService,ConfirmationService,UploadFileService,TaxService]
})
export class ArticleDetailsComponent implements OnInit {

  route = inject(ActivatedRoute)
  article: ArticleModule = new ArticleModule();
  compteVente;
  compteAchat;
  compteStock;
  router = inject(Router);
  fileImage: any;
  isEdit=false;
  id: number;
  data: any;
  stockEngager:number;
  stockPourVente:number;

  options: any;

  constructor(private articleService:ArticleService,
    private messageService:MessageService,
    private confirmationService:ConfirmationService,
    private fileUploadService:UploadFileService,
    private donneeService:DonneeService

    ) {
    this.article.importInfo = new ArticleImportInfoModule();
    this.article.sellInfo = new ArticleSellingInfoModule();
    this.article.articleStockInf=new ArticleStockInfoModule();
    this.article.unit = new UnitModule();
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.id = params['id']
      }
    )
    this.getOneArticle(this.id);
    console.log(this.article);//article ici null

  }

  update() {
    let id: number = this.id;
    this.router.navigate(['/dashboard/article/update', id])
  }


  confirm2(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Veux-tu supprimer cet article ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.delete();
      },
      reject: () => {

      }
    });
  }

  delete() {
    console.log(this.id)
    this.articleService.onDeleteArticle(this.id).subscribe(
      (response) => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'L\'article a été supprimé avec succès' });
        this.router.navigate(['/article']);
      }
      ,
      (erreur) => {
        this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Échec de la suppression de l\'article.' });
      }
    )

  }

  getOneArticle(id: number) {
    this.articleService.getOneArticle(id).subscribe(
      (response) => {
        this.article = response;
        console.log(this.article);
        if (this.article.sellInfo) {
          this.compteVente = this.donneeService.revenus.find(p => p.id == this.article.sellInfo.accountId)?.label;
        }
        if (this.article.importInfo) {
          this.compteAchat = this.donneeService.achatComptes.find(p => p.items.find(c => c.value == this.article.importInfo.accountId))?.items.find(c => c.value == this.article.importInfo.accountId)?.label;
        }
        if(this.article.articleStockInf){
          this.compteStock=this.donneeService.suiviLeStockComptes.find(p => p.items.find(c => c.value == this.article.articleStockInf.accountIdSuivi))?.items.find(d=>d.value=this.article.articleStockInf.accountIdSuivi)?.label;
          this.stockEngager=this.article.articleStockInf.stockEngagee;
          this.stockPourVente=this.article.articleStockInf.stockdisponible-this.stockEngager;


    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');


    this.data = {
        labels: ['Stock engagé', 'Disponible à la vente'],
        datasets: [
            {
                data: [this.stockEngager, this.stockPourVente],
                backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400')]
            }
        ]
    };
    this.options = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };

        }
      }
    )
  }

  confirmImage(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Veux-tu supprimer cet image ?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.deleteImage();
      },
      reject: () => {
      }
    });
  }

  deleteImage() {
   this.articleService.onDeleteArticleImage(this.id).subscribe(
      (res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'L\'image a été supprimé avec succès' });
        this.article.imagePath=null;
      },
      (error) => {
        this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Échec de la suppression de l\'image.' });
      }
    )
  }
  chooseFile(event: any) {
    this.fileImage = event;

    this.articleService.onAddIamge(this.id,this.fileImage).subscribe((res)=>{
      // this.article.imagePath=res.imagePath;
      // this.isEdit=true;
    },
    (error)=>{
      console.log(error);
    }
    )


  }
  updateImage(){
      this.isEdit=true;
  }
}
