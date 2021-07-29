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
  userName: any;
  constructor(private http: HttpClient) {
    this.userName = JSON.parse(localStorage.getItem('userData') || '{}');
  }
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
    return this.http.get<any>(`${this.baseUrl}/userCourses`, {});
    //   .pipe(
    //   map((ele: any) => {
    //     const arr: any = [];
    //     ele.data.forEach((dataInfo: any) => {
    //       let data = {
    //         courseName: dataInfo.courseName,
    //         // duration: dataInfo.duration,
    //         // prerequisites: dataInfo.prerequisites,
    //         // Enroll: true,
    //         // createdBy:dataInfo.createdBy
    //       };
    //       // if (dataInfo.enrolledStu.includes(this.userName.email)) {
    //       //   data.Enroll = false;
    //       // }
    //       arr.push(data);
    //     });

    //     return arr;
    //   })
    // );
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
