import { Article } from "./Article"
import { ArticleModule } from "./article/article.module"

export class ArticleGroup{
    id:number
    groupName:string
    description?:string
    articles?:ArticleModule[] 
    imagePath?:string
    stockDisp?:number
    constructor(){
      this.id=0;
    }
}