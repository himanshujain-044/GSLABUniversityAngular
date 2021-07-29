import { stringify } from '@angular/compiler/src/util';
import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Courses } from 'src/app/services/course.service.';
import { LoginUser } from 'src/app/services/login.service';
// encapsulation: ViewEncapsulation.None;
@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss'],
})
export class AllCoursesComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private Courses: Courses,
    private router: Router,
    private authService: LoginUser
  ) {}
  // allCourses: any = [];

  // colData: string[] = ['courseName']; ///, 'prerequisites', 'duration', 'Enroll'
  colData: string[] = ['courseName', 'status'];
  dataSource: any;
  userName: any;
  ngOnInit(): void {
    this.userName = JSON.parse(localStorage.getItem('userData') || '{}');
    this.getUserCourses();
  }
  // ngOnChanges(changes: SimpleChanges) {
  //   // changes.prop contains the old and the new value...
  // }

  showCourseDetail: boolean = false;
  courseDetail: any;
  isCourseAvailable: boolean = true;
  // getAllCourses() {
  //   this.Courses.getAllCourses().subscribe(
  //     (responseData: any) => {

  //       this.allCourses = responseData.data.enrolledCourses;
  //       console.log(this.allCourses);
  //     },
  //     (error) => {
  //       if (error.status === 401) {
  //         this.openSnackBar('Please Login again');
  //         this.router.navigate(['/login']);
  //       }
  //     }
  //   );
  // }
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
        console.log(this.dataSource);
        console.log('Hii');
      },
      (error: any) => {
        if (error.status === 401) {
          this.openSnackBar('Please login again');
          this.router.navigate(['/login']);
        }
      }
    );
  }

  onClose() {
    this.router.navigate(['/studentPortal']);
  }
  onCloseCD() {
    this.showCourseDetail = false;
  }
  onShowCourseDetail(courseDetail: any) {
    this.showCourseDetail = true;
    this.courseDetail = courseDetail;
  }
  onCheckEnroll(course: any): boolean {
    const userLogined: any = JSON.parse(
      localStorage.getItem('userData') || '{}'
    );
    if (course.enrolledStu.includes(userLogined.email)) return true;
    else return false;
  }
  // onEnroll(course: any) {
  //   console.log(course);
  //   this.Courses.enrollCourse(course.createdBy, course.courseName).subscribe(
  //     (responseData) => {
  //       this.openSnackBar(responseData.data);
  //       this.getAllCourses();
  //     },
  //     (error) => {
  //       this.openSnackBar(error.error.message);
  //     }
  //   );
  // }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Ok', { duration: 3000 });
  }
  onLogout() {
    this.authService.logoutUser();
  }
}
