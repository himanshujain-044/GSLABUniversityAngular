import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}
  @Input() userName: any = '';
  @Input() isStudentPage: boolean = false;
  @Input() isInstructorPage: boolean = false;
  @Output() logout = new EventEmitter<void>();
  @Output() onAllCourses = new EventEmitter<void>();
  @Output() onAddNewCourse = new EventEmitter<void>();
  userDetail: any;
  ngOnInit(): void {
    this.userDetail = JSON.parse(localStorage.getItem('userData') || '{}');
  }
  onLogout() {
    this.logout.emit();
  }
  onAllCoursesH() {
    this.onAllCourses.emit();
  }
  onAddNewCourseH() {
    this.onAddNewCourse.emit();
  }
}
