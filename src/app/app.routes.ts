import { Routes } from '@angular/router';
import { ArticleComponent } from './compenents/inventaire/article/article.component';
import { HomeComponent } from './compenents/home/home.component';
import { ArticlegroupComponent } from './compenents/inventaire/articlegroup/articlegroup.component';
import { FacturesComponent } from './compenents/ventes/factures/factures.component';
import { ArticleDetailsComponent } from './compenents/inventaire/article/article-details/article-details.component';
import { NouveauarticleComponent } from './compenents/inventaire/article/nouveauarticle/nouveauarticle.component';
import { NouveaugroupComponent } from './compenents/inventaire/articlegroup/nouveaugroup/nouveaugroup.component';
import {NewInvoiceComponent} from "./compenents/ventes/factures/nouveaufacture/new-invoice.component";
import { GroupeDetailComponent } from './compenents/inventaire/articlegroup/groupe-detail/groupe-detail.component';
import { ClientComponent } from './compenents/ventes/client/client.component';
import { NouveauClientComponent } from './compenents/ventes/client/nouveau-client/nouveau-client.component';
import { NotFoundComponentComponent } from './compenents/not-found-component/not-found-component.component';
import { LoginComponent } from './compenents/login/login.component';
import { SignUPComponent } from './compenents/sign-up/sign-up.component';
import { DashboardComponent } from './compenents/dashboard/dashboard.component';
import { authGuard, resolve } from './guards/auth.guard';
import { AjustementDeStockComponent } from './compenents/inventaire/ajustement-de-stock/ajustement-de-stock.component';
import { FactureDetailsComponent } from './compenents/ventes/factures/facture-details/facture-details.component';


export const routes: Routes = [
    
   
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path:'login',
        component:LoginComponent
    },{
        path:'signUp',
        component:SignUPComponent
    },
    {
        path:'dashboard',
        component:DashboardComponent,
        canActivate:[authGuard],
        children:[
            {
                path:'',
                component:HomeComponent
            },
            {
                path:'article',
                children:[
                   {
                       path:'',
                       component:ArticleComponent
                   },
                   {
                      path:'articlenouveau',
                      component:NouveauarticleComponent
                   },
                   {
                       path:'update/:id',
                       component:NouveauarticleComponent
                   },
                   {
                     path:'details/:id',
                     component:ArticleDetailsComponent
                   }
                ]
             },
             {
                path:'articlegroup',
                children:[
                    {
                     path:'',
                     component:ArticlegroupComponent
                    },
                    {
                      path:'nouveaugroup',
                      component:NouveaugroupComponent
                    },
                    {
                     path:'groupeDetail/:id',
                     component:GroupeDetailComponent
                    }
                ]
             },
             {
                path:'ajustements-stock',
                resolve:{articles:resolve},
                component:AjustementDeStockComponent
             },
             {
                 path:'ventes',
                 children:[
                     {
                         path:'',
                         component:FacturesComponent
                     },{
                         path:'nouveaufacture',
                         component:NewInvoiceComponent
                     },{
                         path:'client',
                         component:ClientComponent
                     },{
                         path:'clients/nouveau',
                         component:NouveauClientComponent
                     },{
                        path:'detailsFacture/:id',
                        component:FactureDetailsComponent
                     }
                 ]
             },
        ]
    },
    {
        path:'**',
        component:NotFoundComponentComponent
    }

];
