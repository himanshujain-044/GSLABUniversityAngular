import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private logout: LoginUser, private router: Router) {}

  isNewCourse: boolean = false;
  ngOnInit(): void {}
  displayedColumns: string[] = ['courseName', 'status'];
  dataSource = ELEMENT_DATA;
  onLogout() {
    this.logout.logoutUser();
  }
  onCreateNewCourse() {
    this.isNewCourse = true;
  }
  onCloseCreateCourse() {
    this.router.navigate(['/instructorPortal']);
    this.isNewCourse = false;
  }
}
