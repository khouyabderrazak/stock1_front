import { Component, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { LayoutService } from '../../services/layout.sevice';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [ MenuModule,ButtonModule ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

  items: MenuItem[] | undefined;
  @ViewChild('toggleBtn') toggleBtn:ElementRef
  @ViewChild('profileBtn') profileBtn:ElementRef
  /**
   *
   */
  constructor(private layoutService:LayoutService) {
  }


  ngOnInit() {
      this.items = [
          {
              label: 'Options',
              items: [
                  {
                      label: 'Refresh',
                      icon: 'pi pi-refresh'
                  },
                  {
                      label: 'Export',
                      icon: 'pi pi-upload'
                  }
              ]
          }
      ];
  }

  toggleList(){
    console.log(this.layoutService.state);
    this.layoutService.onUpdateMenu();
  }

  toggleUser(){
      this.layoutService.setProfileMenu();
  }

}
