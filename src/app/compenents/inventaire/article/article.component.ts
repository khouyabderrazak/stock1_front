import { Component, OnInit, inject } from '@angular/core';
import {  MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { Router, RouterModule } from '@angular/router';
import { ArticleService } from '../../../services/article.service';
import { } from '@angular/common/http';
import { UploadFileService } from '../../../services/upload-file.service';
import { ImageComponent } from '../../image/image.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {Article} from "../../../models/article/article";
import { LoadingIndicatorComponent } from '../../loading-indicator/loading-indicator.component';
import { UserStoreService } from '../../../services/user-store.service';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [RouterModule, CardModule , TableModule, ImageComponent, ToastModule,CommonModule,ButtonModule, LoadingIndicatorComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
  providers:[ArticleService,MessageService,UploadFileService]
})
export class ArticleComponent implements OnInit {
  articles!: Article[];
  selectedArticles!: any[];
  fileName = '20240304232340apliquerThreshod.PNG';

  constructor(
    private articleService:ArticleService,
  ) {
  }
  ngOnInit() {
    this.articleService.getArticles().subscribe(
      (res) => {
        this.articles = res;
        console.log(this.articles);
      }

    )
  
  }

 router=inject(Router)
  onOneRowSelected(id:number){
       this.router.navigate(['/dashboard/article/details',id]);
  }

}





