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
import { Course } from '../models/course.model';
@Injectable({ providedIn: 'root' })
export class InsertCourse {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}
  baseUrl: string = environment.baseUrl;
  createNewCoruse(courseName: string, duration: string, prerequisites: string) {
    const postData: Course = {
      courseName,
      duration,
      prerequisites,
    };
    return this.http.post<Course>(`${this.baseUrl}/insertCourse`, postData);
  }
}
