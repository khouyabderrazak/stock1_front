import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [MenuModule,CommonModule ],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.css'
})
export class ProfileMenuComponent {

  /**
   *
   */
  constructor(private auth:AuthService) {
    
  }
  

    ngOnInit() {
        // this.items = [
        //     { 
        //       label: 'deconnect',
        //        icon: 'pi pi-sign-out',
        //        command:()=>{
        //            return this.auth.signOut();
        //        }
        //      },
        //     {
        //        label: 'Search',
        //         icon: 'pi pi-search'
        //      }
        // ];
    }

    signOut(){
      this.auth.signOut();
    }
}
