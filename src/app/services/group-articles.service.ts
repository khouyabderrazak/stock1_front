import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ArticleGroup } from "../models/articleGroup";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class GroupArticlesService{

     constructor(private http:HttpClient){

     }

     addGroupArticles(groupArticles: ArticleGroup, file: File): Observable<any>{
        const formData = new FormData();
        if (file) {
           formData.append('file', file, file.name);
        }
        formData.append('groupArticles', JSON.stringify(groupArticles));
        return this.http.post("https://localhost:7020/api/GroupArticles", formData);
     }

     add (groupArticles: ArticleGroup):Observable<any>{
        return this.http.post("https://localhost:7020/api/GroupArticles/addGroupArticles",groupArticles);
     }

     getAllgroups():Observable<ArticleGroup[]>{
               return this.http.get<ArticleGroup[]>("https://localhost:7020/api/GroupArticles");      
     }

     getArticlesOfGroup(id:number):Observable<ArticleGroup>{
          return this.http.get<ArticleGroup>("https://localhost:7020/api/GroupArticles/getGroupArticlesById/"+id);
     }

}