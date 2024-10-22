import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private usename$=new BehaviorSubject<string>("");
  
  private role$=new BehaviorSubject<string>("");

  constructor() { 

  }

  public getRole(){
  
    return this.role$.asObservable();
  
  }

  public setRole(role:string){
  
    this.role$.next(role);
  
  } 

  public getUsername(){
  
    return this.usename$.asObservable();
  
  }

  public setUsername(username:string){
   
    this.usename$.next(username);
  
  } 



}
