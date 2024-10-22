import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable(
    {
        providedIn: "root"
    }
)

export class LayoutService {

    state:boolean=false;
    stateprofile:boolean=true;

    sousMenuOpen=new Subject<string>(); 
    
    getSousMenuOpen=this.sousMenuOpen.asObservable();

    profileMenu=new Subject<boolean>();
    gerProfileMenu=this.profileMenu.asObservable();
    
    setProfileMenu(){
          this.profileMenu.next(this.stateprofile);  
          this.stateprofile = !this.stateprofile
    }

    setSousMenuOpen(data:string){
          this.sousMenuOpen.next(data);
    }

    updateMenu:EventEmitter<boolean>=new EventEmitter<boolean>();
    
    onUpdateMenu(){
        this.updateMenu.emit(this.state);
        this.state = !this.state
    }


}