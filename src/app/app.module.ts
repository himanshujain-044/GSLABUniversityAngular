import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserLoginSignupComponent } from './user-login-signup/user-login-signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignUpUser } from './services/signup.service';
import { StudentPortalComponent } from './student-portal/student-portal.component';
import { InstructorPortalComponent } from './instructor-portal/instructor-portal.component';
import { AuthInterceptorService } from './services/interceptor.service';
import { CreateCourseComponent } from './instructor-portal/create-course/create-course.component';
import { AlterErrorComponent } from './user-login-signup/alter-error/alter-error.component';
import { AllCoursesComponent } from './student-portal/all-courses/all-courses.component';
import { ShowCourseDetailComponent } from './student-portal/all-courses/show-course-detail/show-course-detail.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginSignupComponent,
    StudentPortalComponent,
    InstructorPortalComponent,
    CreateCourseComponent,
    AlterErrorComponent,
    AllCoursesComponent,
    ShowCourseDetailComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
  ],
  providers: [
    SignUpUser,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
