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
import { Signup } from '../models/signup.model';
@Injectable({ providedIn: 'root' })
export class SignUpUser {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}
  baseUrl: string = environment.baseUrl;
  createUserSignup(
    name: string,
    // phone: string,
    email: string,
    password: string,
    // gender: string,
    role: string
  ) {
    const postData: Signup = {
      name,
      // phone,
      email,
      password,
      // gender,
      role,
    };
    return this.http.post<Signup>(`${this.baseUrl}/signUp`, postData);
  }
}
