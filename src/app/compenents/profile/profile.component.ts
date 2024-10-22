import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MenuModule, ButtonModule , ToastModule ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  items: MenuItem[] | undefined;
  
  /**
   *
   */
  constructor(
     private auth:AuthService
  ) {
    
  }

  ngOnInit() {
      this.items = [
         
                  {
                      label: 'Settings',
                      icon: 'pi pi-cog'
                  },
                  {
                      label: 'Logout',
                      icon: 'pi pi-sign-out',
                      command:()=>{
                              this.auth.signOut();
                      }
                  }
                
        ]
    
   }
 }
 

