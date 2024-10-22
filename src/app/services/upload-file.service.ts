import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http:HttpClient) { 

  }
  uploadFile(file):Observable<any>{
       const formData=new FormData();
       formData.append('file',file,file.name);
       return this.http.post("https://localhost:7020/api/UploadFiles",formData,{reportProgress:true,observe:'events'});            
  }

  DownLoadFile(ImagePath:string):Observable<any>{
        return this.http.get("https://localhost:7020/api/UploadFiles?fileName="+ImagePath,{ responseType: 'blob' });
  }

  DeleteFile(name:string):Observable<any>{
         return this.http.delete("https://localhost:7020/api/UploadFiles/"+name);
  }

}
