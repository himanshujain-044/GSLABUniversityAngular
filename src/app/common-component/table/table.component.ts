import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() data: any;
  @Input() colData: string[] = [];
  @Input() isTableWidth: boolean = false;
  @Output() showCourseDetail = new EventEmitter<any>();
  @Output() enrollCourse = new EventEmitter<any>();
  // dataSource: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  constructor() {}
  ngOnInit(): any {
    this.data = new MatTableDataSource(this.data);
    this.data.sort = this.sort;
    this.data.paginator = this.paginator;
  }

  ngAfterViewInit(): any {}

  onShowCourseDetail(element: any) {
    this.showCourseDetail.emit(element);
  }

  onCheckEnroll(element: any) {}
  onEnroll(element: any) {
    this.enrollCourse.emit(element);
  }
}
