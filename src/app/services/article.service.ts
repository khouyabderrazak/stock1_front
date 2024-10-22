import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, forkJoin, throwError, of, tap} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ArticleModule } from '../models/article/article.module';
import {Article, ArticleLite} from "../models/article/article";
import {apiUrls} from "../data/data";

@Injectable({
   providedIn: 'root'
})
export class ArticleService {

  articles:Article[]=[];

     constructor(private http:HttpClient ) {
  }

  addArticle(article: ArticleModule, file: File): Observable<any> {
      const formData = new FormData();
      if (file) {
         formData.append('file', file, file.name);
      }
      formData.append('article', JSON.stringify(article));
      return this.http.post("https://localhost:7020/api/Articles", formData);
   }

  getArticles():Observable<Article[]>{
    if (this.articles.length > 0) {
      return of(this.articles);
    }
    else {
      return this.http.get<Article[]>(apiUrls.articlesUrl).pipe(
        tap(articles => {
          this.articles = articles;
        }),
        catchError(error => {
          console.log('Error fetching clients: ', error);
          return of([]);
        })
      );
    }
  }

  getArticlesLite(): Observable<ArticleLite[]> {
    return this.getArticles().pipe(
      map(articles => articles.map((article:Article) : ArticleLite => ({
        id : article.id,
        articleName : article.articleName
      })))
    );
  }

  getArticleById(id:number):Observable<Article>{
    if(id!=null){
      return this.http.get<Article>(apiUrls.articlesUrl+"/"+id).pipe(
        catchError(error => {
          return throwError(error);
        })
      );
    }
    else {
      throw new Error("Entered Id is Null !")
    }
  }

  getOneArticle( id: number): Observable<any> {
      return this.http.get<ArticleModule>("https://localhost:7020/api/Articles/" + id);
   }

   onDeleteArticle(id: number): Observable<any> {
      return this.http.delete("https://localhost:7020/api/Articles/" + id);
   }

   onUpdateArticle(article: ArticleModule): Observable<any> {
      return this.http.put("https://localhost:7020/api/Articles", article);
   }

   onDeleteArticleImage(id: number): Observable<any> {
      return this.http.delete("https://localhost:7020/api/Articles/deleteImage/" + id);
   }

   onAddIamge(id: number, file: any): Observable<any> {

      const formData = new FormData();

      if (file) {
         formData.append('file', file, file.name);
      }

      return this.http.post("https://localhost:7020/api/Articles/AddImage/" + id, formData);
   }

}

1
