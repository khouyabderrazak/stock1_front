import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ImageComponent } from '../../image/image.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { GroupArticlesService } from '../../../services/group-articles.service';
import { ArticleGroup } from '../../../models/articleGroup';
import { ArticleModule } from '../../../models/article/article.module';
import { LoadingIndicatorComponent } from '../../loading-indicator/loading-indicator.component';

@Component({
  selector: 'app-articlegroup',
  standalone: true,
  imports: [RouterModule,ImageComponent , CommonModule ,
           ButtonModule , CardModule ,TableModule, LoadingIndicatorComponent],
  templateUrl: './articlegroup.component.html',
  styleUrl: './articlegroup.component.css',
  providers:[GroupArticlesService]
})
export class ArticlegroupComponent {
  ArticlesGroups!: ArticleGroup[];
  selectedGroups!: any[];
  constructor(private articleGroupService:GroupArticlesService){

  }
  ngOnInit() {
    this.getAllGroups();
  }


  getAllGroups() {
    this.articleGroupService.getAllgroups().subscribe(
      (res) => {
        console.log(res);
        const modifiedRes = res.map(group => ({
          ...group,
          stockDisp: this.caculeStockDisp(group.articles)
        }));
        this.ArticlesGroups = modifiedRes;
      },
      (err)=>{
        console.log(err);
      }
    );
  }
  
  caculeStockDisp(articles: ArticleModule[]) {
    let stockDisp = 0;
    articles.forEach((article) => {
      if (article.articleStockInf && article.articleStockInf.stockdisponible) {
        stockDisp += article.articleStockInf.stockdisponible;
      }
    });
    return stockDisp;
  }
  


 router=inject(Router)
  onOneRowSelected(id:number){
       this.router.navigate(['/dashboard/articlegroup/groupeDetail/',id]);
  }
}
