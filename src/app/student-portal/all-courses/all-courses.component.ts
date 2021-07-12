import { stringify } from '@angular/compiler/src/util';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Courses } from 'src/app/services/course.service.';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss'],
})
export class AllCoursesComponent implements OnInit, OnChanges {
  constructor(private Courses: Courses, private router: Router) {}
  allCourses: any = [];
  ngOnInit(): void {
    this.getAllCourses();
  }
  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
  }

  errorOccured: any = null;
  showCourseDetail: boolean = false;
  courseDetail: any;
  getAllCourses() {
    this.Courses.getAllCourses().subscribe(
      (responseData) => {
        console.log(responseData.data);
        this.allCourses = responseData.data;
      },
      (error) => {
        if (error.status === 401) {
          this.errorOccured = 'Please Login again ,session time out';
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
  onEnroll(course: any) {
    console.log(course);
    this.Courses.enrollCourse(course.createdBy, course.courseName).subscribe(
      (responseData) => {
        console.log(responseData);
        this.errorOccured = responseData.data;
        this.getAllCourses();
      },
      (error) => {}
    );
  }
  onCloseErSuc() {
    this.errorOccured = null;
     this.router.navigate(['/login']);
  }
  // onCloseError() {

  // }
}
