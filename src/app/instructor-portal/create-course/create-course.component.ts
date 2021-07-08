import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InsertCourse } from 'src/app/services/insertCourse.service.';

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
  constructor(private insertCourse: InsertCourse) {}

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
    this.close.emit();
  }
  onCreateCourse() {
    const courseName = this.createCourseForm.value.courseName;
    const duration = this.createCourseForm.value.duration;
    const prerequisites = this.createCourseForm.value.prerequisites;

    this.insertCourse
      .createNewCoruse(courseName,duration,prerequisites)
      .subscribe(
        (responseData) => {
          console.log(responseData);
          this.createCourseForm.reset();
        },
        (error) => {
        //  this.errorOccured = error.message;
        }
      );
  }
}
