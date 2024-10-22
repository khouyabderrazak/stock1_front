import { ActivatedRouteSnapshot, CanActivateFn, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { NgToastService } from 'ng-angular-popup';
import { AjustementDeStockComponent } from '../compenents/inventaire/ajustement-de-stock/ajustement-de-stock.component';
import { Observable } from 'rxjs';
import { Article } from '../models/Article';
import { AjustementDeStockService } from '../services/ajustement-de-stock.service';



export const authGuard: CanActivateFn = (route, state) => {
  const auth: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const toast: NgToastService = inject(NgToastService);
  const messageService=inject(MessageService);
  // console.log('AuthGuard activated');

  if (auth.isLoggedIn()) {
    console.log('User is logged in');
    return true;
  }

  setTimeout(() => {
       messageService.add({ severity: 'error', summary: 'Error', detail: "Login First" });
  }, 1000);
 
  router.navigate(['/login'],{queryParams:{'isAuthenticate':false}});
  return false;
};


export const resolve: ResolveFn<Article[]>=(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Article[]>=>{
     const ajustementService=inject(AjustementDeStockService);
     return ajustementService.getData();
}



