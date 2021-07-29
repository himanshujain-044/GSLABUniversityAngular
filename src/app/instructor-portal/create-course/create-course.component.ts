import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Courses } from 'src/app/services/course.service.';
import { MyErrorStateMatcher } from 'src/app/services/errorMatcher';
import { LoginUser } from 'src/app/services/login.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit, OnChanges {
  createCourseForm: any;
  nonWhitespaceRegExp: RegExp = new RegExp('\\S');
  @Output() close = new EventEmitter<void>();
  matcher = new MyErrorStateMatcher();
  constructor(
    private _snackBar: MatSnackBar,
    private course: Courses,
    private router: Router,
    private authService: LoginUser
  ) {}
  userName: any;
  isLoading:boolean=false;

  ngOnChanges(changes: SimpleChanges) {}
  ngOnInit(): void {
    this.createCourseForm = new FormGroup({
      courseName: new FormControl('', [
        Validators.required,
        Validators.pattern(this.nonWhitespaceRegExp),
      ]),
      duration: new FormControl('', [
        Validators.required,
        Validators.pattern(this.nonWhitespaceRegExp),
        Validators.pattern('^[0-9].*$'),
      ]),
      prerequisites: new FormControl('', [Validators.required]),
    });
    this.userName = JSON.parse(localStorage.getItem('userData') || '{}');
  }

  onClose() {
    this.router.navigate(['/instructorPortal']);
  }
  onCreateCourse() {
    if (!this.createCourseForm.valid) {
      return;
    }
    this.isLoading = true;
    const courseName = this.createCourseForm.value.courseName;
    const duration = this.createCourseForm.value.duration + 'h';
    const prerequisites = this.createCourseForm.value.prerequisites;
    console.log(this.createCourseForm);
    this.course.createNewCoruse(courseName, duration, prerequisites).subscribe(
      (responseData: any) => {
        this.isLoading = false;
        this.openSnackBar(responseData.message);
        this.createCourseForm.reset();
      },
      (error: any) => {
        this.openSnackBar(error.error.message);
      }
    );
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Ok', { duration: 3000 });
  }
  onLogout() {
    this.authService.logoutUser();
  }
}
