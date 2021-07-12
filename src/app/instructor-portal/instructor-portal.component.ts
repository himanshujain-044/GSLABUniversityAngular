import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
    private authService: LoginUser,
    private router: Router,
    private getCourses: Courses
  ) {}
  // displayedColumns: string[] = ['courseName', 'numberOfStuEnrolled'];
  // dataSource: any = [];
  showCourseDetail: boolean = false;
  courseDetail: any = true;
  isNewCourse: boolean = false;
  coursesInfo: any = [];
  displayedColumns: string[] = ['courseName', 'Student enrolled'];
  dataSource: any = [];
  errorOccured: any = null;
  ngOnInit(): void {
    this.getInstructorCourses();
  }
  onLogout() {
    console.log('logout');
    this.authService.logoutUser();
  }
  onCreateNewCourse() {
    this.isNewCourse = true;
    this.router.navigate(['/create-new-course']);
  }
  getInstructorCourses() {
    this.getCourses.getCourses().subscribe(
      (responseData) => {
        console.log(responseData);
        this.dataSource = responseData.data;
        console.log(this.dataSource);
      },
      (error) => {
        if (error.status === 401)
          this.errorOccured = 'Please Login again ,session time out';
      }
    );
  }
  onCloseCreateCourse() {
    this.router.navigate(['/instructorPortal']);
    this.isNewCourse = false;
  }

  onShowCourseDetail(courseDetail: any) {
    this.showCourseDetail = true;
    this.courseDetail = courseDetail;
  }
  onCloseCD() {
    this.showCourseDetail = false;
  }
  onCloseErSuc() {
    this.errorOccured = null;
    this.router.navigate(['/login']);
  }
}
