import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentPortalComponent } from './student-portal/student-portal.component';
import { InstructorPortalComponent } from './instructor-portal/instructor-portal.component';
import { UserLoginSignupComponent } from './user-login-signup/user-login-signup.component';
import { AuthGuardService } from './services/auth.service';
import { CreateCourseComponent } from './instructor-portal/create-course/create-course.component';
import { AllCoursesComponent } from './student-portal/all-courses/all-courses.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: UserLoginSignupComponent },
  {
    path: 'studentPortal',
    component: StudentPortalComponent,
    canActivate: [AuthGuardService],

    // children: [
    //   {

    //   },
    // ],
  },
  {
    path: 'allCourses',
    component: AllCoursesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'instructorPortal',
    component: InstructorPortalComponent,
    canActivate: [AuthGuardService],
    // children: [
    //   {
    //     path: 'create-new-course',
    //     component: CreateCourseComponent,
    //   },
    // ],
  },
  {
    path: 'create-new-course',
    component: CreateCourseComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'page-not-found', component: InstructorPortalComponent },
  { path: '**', redirectTo: 'page-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
