import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType,
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Login } from '../models/login.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class LoginUser {
  error = new Subject<string>();
  user = new BehaviorSubject<any>(null);
  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  baseUrl: string = environment.baseUrl;
  loginUser(email: string, password: string, rememberme: boolean) {
    const postData: Login = {
      email,
      password,
      rememberme,
    };
    return this.http.post<Login>(`${this.baseUrl}/login`, postData).pipe(
      tap((resData) => {
        this.user.next(resData);
        localStorage.setItem('userData', JSON.stringify(resData));
        this.autoLogout();
      })
    );
  }
  autoLogin() {
    const userLoginInfo: any = JSON.parse(
      localStorage.getItem('userData') || '{}'
    );
    if (!userLoginInfo) {
      return;
    }
    this.user.next(userLoginInfo);
  }
  logoutUser() {
    return this.http.get<any>(`${this.baseUrl}/logout`, {}).subscribe(
      (data) => {
        this.user.next(null);
        localStorage.removeItem('userData');
        this._snackBar.open('User logout successfully', 'Ok', {
          duration: 3000,
        });
        this.router.navigate(['/login']);
      },
      (error) => {
        this.user.next(null);
        localStorage.removeItem('userData');
        this._snackBar.open('User logout successfully', 'Ok', {
          duration: 3000,
        });
        this.router.navigate(['/login']);
      }
    );
  }
  autoLogout() {
    setTimeout(() => {
      this._snackBar.open('Session timeout', 'Ok', {
        duration: 3000,
      });
      this.logoutUser();
    }, 1000 * 60 * 60);
  }
}
