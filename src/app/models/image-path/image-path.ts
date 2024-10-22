import {Article} from "../article/article";

export interface ImagePath {
  id :number
  path:string;
  articleId?:number
  article?:Article
}
