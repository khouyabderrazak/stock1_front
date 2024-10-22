import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import {  HttpClient, provideHttpClient, withInterceptors} from '@angular/common/http';
import { TaxService } from './services/tax.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';


export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes),MdbModalService,DatePipe,BrowserAnimationsModule,provideAnimations(),TaxService,MessageService,ConfirmationService,
   
     provideHttpClient(withInterceptors([tokenInterceptor])),
     JwtHelperService,
       
   ]
};
