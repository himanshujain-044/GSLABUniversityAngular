import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
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

@Component({
  selector: 'app-instructor-portal',
  templateUrl: './instructor-portal.component.html',
  styleUrls: ['./instructor-portal.component.scss'],
})
export class InstructorPortalComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private authService: LoginUser,
    private router: Router,
    private getCourses: Courses
  ) {}
  colData: string[] = ['courseName', 'Enrolled'];
  dataSource: any;
  showCourseDetail: boolean = false;
  courseDetail: any;
  userName: any;
  ngOnInit(): void {
    this.getInstructorCourses();
    this.userName = JSON.parse(localStorage.getItem('userData') || '{}');
  }

  onLogout() {
    this.authService.logoutUser();
  }
  onAddNewCourse() {
    this.router.navigate(['create-new-course']);
  }
  getInstructorCourses() {
    let arr: any = [];
    this.getCourses
      .getCourses()
      .pipe(
        map((ele: any) => {
          const arr: any = [];
          if (ele.data !== 'No courses available') {
            ele.data.forEach((ele: any) => {
              const data = {
                duration: ele.duration,
                instructorName: ele.instructorName,
                createdBy: ele.createdBy,
                courseName: ele.courseName,
                Enrolled: ele.numberOfStuEnrolled,
              };
              arr.push(data);
            });
          }
          return arr;
        })
      )
      .subscribe(
        (responseData: any) => {
          this.dataSource = responseData;
        },
        (error) => {
          if (error.status === 401) {
            this.openSnackBar(error.error?.message);
            this.router.navigate(['/login']);
          } else {
            this.openSnackBar(error.error?.message);
          }
        }
      );
  }

  onCloseCreateCourse() {
    this.router.navigate(['/instructorPortal']);
  }

  onShowCourseDetail(courseDetail: any) {
    this.showCourseDetail = true;
    this.courseDetail = courseDetail;
  }
  onCloseCD() {
    this.showCourseDetail = false;
  }
  onCloseErSuc() {
    this.router.navigate(['/login']);
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Ok', { duration: 3000 });
  }
}
