import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Courses } from 'src/app/services/course.service.';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
  createCourseForm: any;
  nonWhitespaceRegExp: RegExp = new RegExp('\\S');
  @Output() close = new EventEmitter<void>();
  //@Output() confirm = new EventEmitter<void>();
  constructor(private course: Courses, private router: Router) {}
  errorOccured: any = null;
  ngOnInit(): void {
    this.createCourseForm = new FormGroup({
      courseName: new FormControl('', [
        Validators.required,
        Validators.pattern(this.nonWhitespaceRegExp),
      ]),
      duration: new FormControl('', [
        Validators.required,
        Validators.pattern(this.nonWhitespaceRegExp),
      ]),
      prerequisites: new FormControl('', [Validators.required]),
    });
  }

  onClose() {
     this.router.navigate(['/instructorPortal']);
    this.close.emit();

  }
  onCreateCourse() {
    const courseName = this.createCourseForm.value.courseName;
    const duration = this.createCourseForm.value.duration + 'h';
    const prerequisites = this.createCourseForm.value.prerequisites;

    this.course.createNewCoruse(courseName, duration, prerequisites).subscribe(
      (responseData: any) => {
        this.errorOccured = responseData.message;
      },
      (error: any) => {
        this.errorOccured = error.message;
      }
    );
  }
  onCloseError() {
    this.errorOccured = null;
  }
}
