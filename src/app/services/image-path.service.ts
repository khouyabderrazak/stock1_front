import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImagePathModule } from '../models/image-path/image-path.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagePathService {

  constructor() {
  
  }

  addImagPaths(http:HttpClient,imagePaths:ImagePathModule[]):Observable<any>{
      return http.post("https://localhost:7020/api/ImagePath",imagePaths);
  }
}
