import { Component, OnInit, inject } from '@angular/core';

import {ButtonModule} from 'primeng/button'
import {TableModule} from 'primeng/table'
import {CardModule} from 'primeng/card'
import { ActivatedRoute, Router, RouterModule, } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ImageComponent } from '../../../image/image.component';
import { GroupArticlesService } from '../../../../services/group-articles.service';
import { CommonModule } from '@angular/common';
import { ArticleGroup } from '../../../../models/articleGroup';
import { UploadFileComponent } from "../../../upload-file/upload-file.component";
import { ArticleService } from '../../../../services/article.service';
import { ConfirmationService, MessageService } from 'primeng/api';


import {ToastModule} from 'primeng/toast'
import {ConfirmDialogModule} from 'primeng/confirmdialog'

@Component({
    selector: 'app-groupe-detail',
    standalone: true,
    templateUrl: './groupe-detail.component.html',
    styleUrl: './groupe-detail.component.css',
    providers: [GroupArticlesService,ArticleService,ConfirmationService,MessageService],
    imports: [CardModule, ConfirmDialogModule, ToastModule, ButtonModule, TableModule, RouterModule, FormsModule, ImageComponent, CommonModule, UploadFileComponent]

})
export class GroupeDetailComponent implements OnInit {
  
  route=inject(ActivatedRoute)
  articles=[];
  group:ArticleGroup
  selectedArticles=[]
  id:number
  fileImage :File
  isEdit: boolean=false;

  constructor(private groupeArticlesService:GroupArticlesService,
         private confirmationService:ConfirmationService,
         private articleService:ArticleService,
         private messageService:MessageService,
        ){

  }

  ngOnInit(): void {
     this.route.params.subscribe(
        para=>this.id=para['id']
     )
     this.groupeArticlesService.getArticlesOfGroup(this.id).subscribe(
      (res)=>{
            console.log(res);
            this.articles=res.articles;
            this.group=res;
      }
     )
  }
   

  router=inject(Router)

  onOneRowSelected(id:number){
       this.router.navigate(['/dashboard/article/details',id]);
  }

  confirmImage(event: Event) {
    console.log("hhhhhh")
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
         this.group.imagePath=null;
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
