import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Courses } from '../services/course.service.';
import { LoginUser } from '../services/login.service';

export interface TableColumnNames {
  courseName: string;
  status: string;
}

const ELEMENT_DATA: TableColumnNames[] = [
  { courseName: 'Nodejs', status: 'completed' },
  { courseName: 'Angualr', status: 'progress' },
  { courseName: 'ReactJS', status: 'completed' },
  { courseName: 'HTML/CSS', status: 'completed' },
];

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];
@Component({
  selector: 'app-student-portal',
  templateUrl: './student-portal.component.html',
  styleUrls: ['./student-portal.component.scss'],
})
export class StudentPortalComponent implements OnInit {
  constructor(
    private authService: LoginUser,
    private router: Router,
    private Courses: Courses
  ) {}
  // coursesEnrolled: any = [];
  ngOnInit(): void {
    this.getUserCourses();
    this.userName = JSON.parse(localStorage.getItem('userData') || '{}');
  }
  displayedColumns: string[] = ['courseName', 'status'];
  dataSource: any = [];
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;
  userName: any = {};
  courseDetail: any;
  showCourseDetail: boolean = false;
  errorOccured: any = null;
  // userName: string = this.authService.user.name;
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
            data.status = 'Complete';
          } else {
            data.status = 'In progress';
          }
          arr.push(data);
        });
        this.dataSource = arr;
      },
      (error) => {
        if (error.status === 401) {
          this.errorOccured = 'Please login again session time out';
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
  onCloseError() {
    this.errorOccured = null;
    this.router.navigate(['/login']);
  }
}
