import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-show-course-detail',
  templateUrl: './show-course-detail.component.html',
  styleUrls: ['./show-course-detail.component.scss'],
})
export class ShowCourseDetailComponent implements OnInit {
  constructor() {}
  @Input() courseDetail: any;
  // @Input() courseDuration: string = '';
  // @Input() courseInstructorName: string = '';
  // @Input() courseInstructorEmail: string = '';
  @Output() close = new EventEmitter<void>();
  ngOnInit(): void {}
  onClose() {
    this.close.emit();
  }
}
