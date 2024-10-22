import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutService } from '../../services/layout.sevice';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  @Input() item:any  

  isSousListOpen:boolean=false;

  /**
   *
   */
  constructor(
    private layotService:LayoutService
  ) {
      this.layotService.getSousMenuOpen.subscribe(
        (data)=>{
            if(data==this.item?.label){
                 this.isSousListOpen=!this.isSousListOpen;
            }else{
              this.isSousListOpen=false;
            }
        }
      )
  }

  toggleSousList(){
    setTimeout(
      ()=>{
        this.layotService.setSousMenuOpen(this.item.label);
      },
      100
    )
  }  

}
