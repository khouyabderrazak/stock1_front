import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse, faCaretRight, faSearch, faDolly, faChartColumn, faFolder, faPlug, faBagShopping, faCartShopping, faCaretDown, faList, faRightFromBracket, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { DialogModule } from 'primeng/dialog';
import { ProfileComponent } from '../profile/profile.component';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { UserStoreService } from '../../services/user-store.service';
import {PanelMenuModule  } from 'primeng/panelmenu';
import { MenuComponent } from '../menu/menu.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { LayoutService } from '../../services/layout.sevice';
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component';
import { LoaderComponent } from '../loader/loader.component';
import { Subscription, take } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FontAwesomeModule, RouterModule, FormsModule, ButtonModule, DialogModule, ProfileComponent, MenuModule,
    PanelMenuModule ,MenuComponent,TopbarComponent,ProfileMenuComponent,LoaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [AuthService]
})
export class DashboardComponent implements AfterViewInit ,OnDestroy {
  title = 'app';
  visible: boolean = false;
  items: MenuItem[] | undefined;
  username: string = ""
  showLoader: boolean = false;
  isOpen:boolean=true;
  isprofileMenuOpen:boolean=false;
  @ViewChild('menu_list') menu_list:ElementRef
  @ViewChild(TopbarComponent) topBar:any
  @ViewChild('men_profile') men_profile:ElementRef

  layoutServiceMenuSupscruption:Subscription
  layoutServicePorfileMenuSupscruption:Subscription
  eventSubscruption:Subscription
  eventListenSubscruption:any

  /**
   *
   */
  constructor(
    private auth: AuthService,
    private userStore: UserStoreService,
    private router: Router,
    private layoutService:LayoutService,
    private render:Renderer2
  ) {
     
  }
  
  ngAfterViewInit(): void {
  this.eventListenSubscruption= this.render.listen(
       'document',
       'click',
       (event)=>{
        if(window.innerWidth < 500 && !this.layoutService.state && !this.menu_list.nativeElement.contains(event.target) && !this.topBar.toggleBtn.nativeElement.contains(event.target)){
          this.layoutService.onUpdateMenu();      
        }
        
        if(!this.layoutService.stateprofile && !this.men_profile.nativeElement.contains(event.target) && !this.topBar.profileBtn.nativeElement.contains(event.target)){
               this.layoutService.setProfileMenu();
        }

       }
     )
  }


  ngOnInit() {

    this.userStore.getUsername().subscribe(
      (val) => {
        var username = this.auth.getUserNameFromToken();
        this.username = val || username;
      }
    )
   this.eventSubscruption = this.router.events.subscribe(
      (routeEvent) => {
        if (routeEvent instanceof NavigationStart) {
          this.showLoader = true;
        }
        if (routeEvent instanceof NavigationEnd) {
          setTimeout(() => {
            this.showLoader = false;
          }, 500)
        }
      }
    )

   this.layoutServiceMenuSupscruption = this.layoutService.updateMenu.subscribe(
      (data)=>{
          this.isOpen=data;
          console.log(" dashboard :" + data);
      }
    )

   this.layoutServicePorfileMenuSupscruption = this.layoutService.gerProfileMenu.subscribe(
      (data)=>{
        this.isprofileMenuOpen=data;
        console.log(this.isprofileMenuOpen)
      }
    )

  }


  searchList = [
    {
      'id': 1,
      'name': 'Clients'
    }, {
      'id': 2,
      'name': 'Articles'
    }, {
      'id': 3,
      'name': 'Ajustements De Stock'
    }, {
      'id': 4,
      'name': 'Commandes client'
    }, {
      'id': 5,
      'name': 'Colis'
    }, {
      'id': 6,
      'name': 'Expeditions'
    }, {
      'id': 7,
      'name': 'Factures'
    }, {
      'id': 8,
      'name': 'Retours vente'
    }, {
      'id': 9,
      'name': 'Facture d\'avoir'
    }
    , {
      'id': 10,
      'name': 'Fournisseurs'
    }, {
      'id': 11,
      'name': 'Bons de commande'
    }, {
      'id': 12,
      'name': 'Avis de reception d\'achat'
    }, {
      'id': 13,
      'name': 'Factures fournisseurs'
    }, {
      'id': 14,
      'name': 'Avoirs fournisseur'
    }, {
      'id': 15,
      'name': 'Documents'
    }, {
      'id': 16,
      'name': 'Taches'
    }
  ];


  list = [
    {
      label: 'Accueil',
      routerLink: '/dashboard',
      icon: 'pi pi-home'
    },
    {
      label: 'Inventaire',
      icon: 'pi pi-cart-plus',
      items: [
        {
          label: 'Articles',
          routerLink: '/dashboard/article',
          icon: 'pi pi-cog me-2'
        },
        {
          label: 'Groupes d\'articles',
          routerLink: '/dashboard/articlegroup',
          icon: 'pi pi-cog me-2'
        },
        {
          label: 'Ajustements ds stock',
          routerLink: '/dashboard/ajustements-stock',
          icon: 'pi pi-cog me-2'
        }
      ]
    },
    {
      label: 'Ventes',
      icon: 'pi pi-shopping-cart',
      items: [
        {
          label: 'Clients',
          routerLink: '/dashboard/ventes/client',
          icon: 'pi pi-cog me-2'
        },
        {
          label: 'Commandes Client',
          routerLink: '/dashboard/ventes/commandes-client',
          icon: 'pi pi-cog me-2'
        },
        {
          label: 'Colis',
          routerLink: '/dashboard/ventes/colis',
          icon: 'pi pi-cog me-2'
        },
        {
          label: 'Expeditions',
          routerLink: '/dashboard/ventes/expeditions',
          icon: 'pi pi-cog me-2'
        },
        {
          label: 'Factures',
          routerLink: '/dashboard/ventes',
          icon: 'pi pi-cog me-2'
        },
        {
          label: 'Tickets de vente',
          routerLink: '/dashboard/ventes/tickets-de-vente',
          icon: 'pi pi-cog me-2'
        },
        {
          label: 'Paiments recus',
          routerLink: '/dashboard/ventes/paiements-recus',
          icon: 'pi pi-cog me-2'
        },
        {
          label: 'Retours vente',
          routerLink: '/dashboard/ventes/retours-vente',
          icon: 'pi pi-cog me-2'
        },
        {
          label: 'Factures d\'avoir',
          routerLink: '/dashboard/ventes/factures-davoir',
          icon: 'pi pi-cog me-2'
        }
      ]
    },
    {
      label: 'Achats',
      icon: 'pi pi-shopping-bag',
      items: [
        {
          label: 'Fournisseurs',
          routerLink: '/dashboard/achats/fournisseurs',
          icon: 'pi pi-cog me-2'
        },
        {
          label: 'Despenses',
          routerLink: '/dashboard/achats/depenses',
          icon: 'pi pi-cog me-2'
        },
        {
          label: 'Bons de commandes',
          routerLink: '/dashboard/achats/bons-de-commandes',
          icon: 'pi pi-cog me-2'
        },
        {
          label: 'Avis de reception d\'achat',
          routerLink: '/dashboard/achats/avis-de-reception',
          icon: 'pi pi-cog me-2'
        },
        {
          label: 'Factures fournisseurs',
          routerLink: '/dashboard/achats/factures-fournisseurs',
          icon: 'pi pi-cog me-2'
        },
        {
          label: 'Paiements effectues',
          routerLink: '/dashboard/achats/paiements-effectues',
          icon: 'pi pi-cog me-2'
        },
        {
          label: 'Avoirs fournisseur',
          routerLink: '/dashboard/achats/avoirs-fournisseur',
          icon: 'pi pi-cog me-2'
        }
      ]
    },
    {
      label: 'Integrations',
      icon: 'pi pi-share-alt',
      routerLink: '/dashboard/integrations'
    },
    {
      label: 'Rapportes',
      icon: 'pi pi-chart-bar',
      routerLink: '/dashboard/rapports'
    },
    {
      label: 'Documentations',
      icon: 'pi pi-folder pi-folder-open',
      routerLink: '/dashboard/documentations'
    }
  ];

  ngOnDestroy(): void {
      this.layoutServiceMenuSupscruption.unsubscribe();
      this.layoutServicePorfileMenuSupscruption.unsubscribe();
      this.eventSubscruption.unsubscribe();

      this.eventListenSubscruption();
  }
 
}
