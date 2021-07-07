import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType,
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Login } from '../models/login.model';
@Injectable({ providedIn: 'root' })
export class LoginUser {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}
  baseUrl: string = environment.baseUrl;
  loginUser(email: string, password: string, rememberme: boolean) {
    const postData: Login = {
      email,
      password,
      rememberme,
    };
    return this.http.post<Login>(`${this.baseUrl}/login`, postData);
  }
}
