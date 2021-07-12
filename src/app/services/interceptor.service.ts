import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { LoginUser } from './login.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: LoginUser) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(req.url);
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          console.log('user not');
          return next.handle(req);
        }
        if (req.url === 'http://localhost:8080/studentPor' && user.role === 'Student')
        console.log('user is ');
        const modifiedReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${user.token}`),
        });
        console.log(modifiedReq);
        console.log(req.url);
        return next.handle(modifiedReq);
      })
    );
  }
}
