import { Component, OnInit } from '@angular/core';
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
  constructor(private authService: LoginUser, private router: Router) { }
  // coursesEnrolled: any = [];
  ngOnInit(): void { }
  displayedColumns: string[] = ['courseName', 'status'];
  dataSource = ELEMENT_DATA;
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;

  onLogout() {
    this.authService.logoutUser()
  }
}
