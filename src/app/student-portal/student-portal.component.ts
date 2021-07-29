import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Courses } from '../services/course.service.';
import { LoginUser } from '../services/login.service';

export interface TableColumnNames {
  courseName: string;
  status: string;
}
@Component({
  selector: 'app-student-portal',
  templateUrl: './student-portal.component.html',
  styleUrls: ['./student-portal.component.scss'],
})
export class StudentPortalComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private authService: LoginUser,
    private router: Router,
    private Courses: Courses
  ) {}
  colData: string[] = ['courseName', 'status'];
  dataSource: any;

  userName: any = {};
  courseDetail: any;
  showCourseDetail: boolean = false;
  // errorOccured: any = null;
  // @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
    this.getUserCourses();
    this.userName = JSON.parse(localStorage.getItem('userData') || '{}');
    //  this.dataSource.sort = this.sort;
  }

  onLogout() {
    this.authService.logoutUser();
  }
  onAllCourses() {
    this.router.navigate(['/allCourses']);
  }
  getUserCourses() {
    this.Courses.getUserCourses().subscribe(
      (responseData) => {
        const arr: any = [];
        responseData.data.enrolledCourses.forEach((ele: any) => {
          const data: any = {
            courseName: ele.courseName,
            createdBy: ele.email,
          };
          if (moment(new Date()).diff(moment(ele.date), 'days') > 15) {
            data.status = 'Completed';
          } else {
            data.status = 'In progress';
          }
          arr.push(data);
        });
        this.dataSource = arr;
        console.log(this.dataSource)
      },
      (error:any) => {
        if (error.status === 401) {
          this.openSnackBar('Please login again');
          this.router.navigate(['/login']);
        }
      }
    );
  }
  onShowCourseDetail(course: any) {
    this.Courses.getSingleCourseDetail(
      course.createdBy,
      course.courseName
    ).subscribe((responseData) => {
      this.courseDetail = responseData.data;
      this.showCourseDetail = true;
    });
  }
  onCloseCD() {
    this.showCourseDetail = false;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Ok', { duration: 3000 });
  }
}
