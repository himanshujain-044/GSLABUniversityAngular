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

@Injectable({ providedIn: 'root' })
export class LoginUser {
  error = new Subject<string>();
  user = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient, private router: Router) {}
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
      })
    );
  }
  logoutUser() {
    return this.http.get<any>(`${this.baseUrl}/logout`, {}).subscribe(
      (data) => {
        this.user.next(null);
        this.router.navigate(['/login']);
      },
      (error) => {
        this.user.next(null);
        this.router.navigate(['/login']);
      }
    );
  }
}
