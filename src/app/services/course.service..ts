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
import { InsCourse, GetCourses } from '../models/course.model';
@Injectable({ providedIn: 'root' })
export class Courses {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}
  baseUrl: string = environment.baseUrl;
  createNewCoruse(courseName: string, duration: string, prerequisites: string) {
    const postData: InsCourse = {
      courseName,
      duration,
      prerequisites,
    };
    return this.http.post<InsCourse>(`${this.baseUrl}/insertCourse`, postData);
  }
  enrollCourse(createdBy: string, courseName: string) {
    const postData: any = {
      courseName,
      createdBy,
    };
    return this.http.post<any>(`${this.baseUrl}/enrollCourse`, postData);
  }
  getCourses() {
    return this.http.get<any>(`${this.baseUrl}/courses`, {});
  }
  getAllCourses() {
    return this.http.get<any>(`${this.baseUrl}/allCourses`, {});
  }
  getUserCourses() {
    return this.http.get<any>(`${this.baseUrl}/userCourses`, {});
  }
  getSingleCourseDetail(createdBy: string, courseName: string) {
    return this.http.get<any>(`${this.baseUrl}/paticularCourse`, {
      params: { createdBy, courseName },
    });
  }
}
