import { HttpClient, HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Inject, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TokenDTo } from '../models/tokenDTo';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  const router = inject(Router);
  const auth = inject(AuthService);
  const http = inject(HttpClient);

  console.log("Inside interceptor");

  const token = localStorage.getItem('token');
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });

  return next(authReq)
  // .pipe(
  //   catchError((err: any) => {
  //     if (err instanceof HttpErrorResponse && err.status === 401) {
  //       return handleUnauthorizedError(req, next, auth, http, messageService, router);
  //     }
  //     return throwError(() => new Error(err?.error?.message));
  //   })
  // );
};

export const handleUnauthorizedError = (
  
  req: HttpRequest<any>, 
  next: HttpHandlerFn, 
  auth: AuthService, 
  http: HttpClient, 
  messageService: MessageService, 
  router: Router
) => { 
  const token = auth.getToken();
  const refreshToken = auth.getRefreshToken();
  const tokenApi: TokenDTo = {
    accessToken: token,
    refreshToken: refreshToken
  };

  return auth.renewToken(http, tokenApi).pipe(
    switchMap((data: TokenDTo) => {
      auth.storeToken(data?.accessToken);
      auth.storeRefreshToken(data?.refreshToken);

      const newToken = data?.accessToken;
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${newToken}`)
      });

      return next(authReq);
    }),
    catchError((err: any) => {
      setTimeout(() => {
        messageService.add({ severity: 'error', summary: 'Error', detail: "Token is expired, please login again!" });
      }, 100);
      localStorage.clear();
      router.navigate(['/']);
      return throwError(() => new Error("Some error occurred during token renewal"));
    })
  );
};
