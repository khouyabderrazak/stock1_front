import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleModule } from '../article/article.module';



export interface ImagePathModule{ 
  id :number
  path:string;
  articleId?:number
  article?:ArticleModule
}
