import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenDTo } from '../models/tokenDTo';
import { catchError, of, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlApi:string="https://localhost:7020/api/User/"

  route=inject(Router)

  private userPayload:any;
   
  /**
   *
   */
  constructor() {
     
  }

  signUp(http:HttpClient,user:any){
       return http.post<any>(this.urlApi+'register',user)
  }

  login(http:HttpClient,user:any){
        return http.post<any>('https://localhost:7020/api/User/authenticate',user)
  }

  storeToken(tokenValue:string){
       localStorage.setItem('token',tokenValue);
  }

  signOut(){
    localStorage.clear();
    this.route.navigate(['/login']);
  }

  getToken():string{
       return localStorage.getItem('token');
  }

  isLoggedIn():Boolean{
       return !!localStorage.getItem('token');
  }
  
   public DecodedToken(){
     const jwtHelper=new JwtHelperService();
     var token=this.getToken();
     console.log(jwtHelper.decodeToken(token))
     return jwtHelper.decodeToken(token);
   }
   
   getUserNameFromToken(){
      this.userPayload=this.DecodedToken();
       return this.userPayload?.unique_name;
   }

    
   getRoleFromToken(){
       this.userPayload=this.DecodedToken();
       return this.userPayload?.role;
   }

   renewToken(http:HttpClient,token:TokenDTo){
       return http.post<TokenDTo>(this.urlApi+"Refresh",token);
   }

   storeRefreshToken(tokenValue:string){
     localStorage.setItem('refreshtoken',tokenValue);
   }

   getRefreshToken():string{
     return localStorage.getItem('refreshtoken');
   }

   isEmailAlreadyExist(email:string,http:HttpClient){
      
      return http.get("https://localhost:7020/api/User/isEmailAlreadyExist/"+email);
   }

}
