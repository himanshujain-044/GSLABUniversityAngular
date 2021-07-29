import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from '../app/material/material.module';

import { UserLoginSignupComponent } from './user-login-signup/user-login-signup.component';
import { SignUpUser } from './services/signup.service';
import { StudentPortalComponent } from './student-portal/student-portal.component';
import { InstructorPortalComponent } from './instructor-portal/instructor-portal.component';
import { AuthInterceptorService } from './services/interceptor.service';
import { CreateCourseComponent } from './instructor-portal/create-course/create-course.component';
import { AllCoursesComponent } from './student-portal/all-courses/all-courses.component';
import { ShowCourseDetailComponent } from './common-component/show-course-detail/show-course-detail.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { HeaderComponent } from './common-component/header/header.component';
import { TableComponent } from './common-component/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginSignupComponent,
    StudentPortalComponent,
    InstructorPortalComponent,
    CreateCourseComponent,
    AllCoursesComponent,
    ShowCourseDetailComponent,
    LoadingSpinnerComponent,
    HeaderComponent,
    TableComponent,
  ],
  imports: [
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
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
