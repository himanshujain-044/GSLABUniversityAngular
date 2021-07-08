import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpUser } from '../services/signup.service';
import { LoginUser } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-signup',
  templateUrl: './user-login-signup.component.html',
  styleUrls: ['./user-login-signup.component.scss'],
})
export class UserLoginSignupComponent implements OnInit {
  constructor(
    private signUp: SignUpUser,
    private login: LoginUser,
    private router: Router
  ) {}

  hide: boolean = true;
  isSignup: boolean = false;
  isLogin: boolean = true;
  loginForm: any;
  signupForm: any;
  nonWhitespaceRegExp: RegExp = new RegExp('\\S');
  errorOccured = null;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.nonWhitespaceRegExp),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(this.nonWhitespaceRegExp),
      ]),
      rememberme: new FormControl(''),
    });

    this.signupForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(this.nonWhitespaceRegExp),
      ]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern(this.nonWhitespaceRegExp),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(this.nonWhitespaceRegExp),
      ]),
      gender: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
    });
  }
  onSubmitLogin() {
    console.log(this.loginForm);
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const rememberme = this.loginForm.value.rememberme;
    this.login.loginUser(email, password, rememberme).subscribe(
      (responseData: any) => {
        if (responseData.role === 'Student')
          this.router.navigate(['/studentPortal']);
        else this.router.navigate(['/instructorPortal']);
      },
      (error) => {
        this.errorOccured = error.error.message;
      }
    );
  }
  onSubmitSignup() {
    // console.log(this.signupForm);
    const name = this.signupForm.value.name;
    const phone = this.signupForm.value.mobile;
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    const gender = this.signupForm.value.gender;
    const role = this.signupForm.value.role;

    this.signUp
      .createUserSignup(name, phone, email, password, gender, role)
      .subscribe(
        (responseData) => {
          console.log(responseData);
          this.signupForm.reset();
        },
        (error) => {
          this.errorOccured = error.message;
        }
      );
  }
  onSignup() {
    this.isSignup = true;
    this.isLogin = false;
    this.errorOccured = null;
  }
  onLogin() {
    console.log(localStorage.getItem('userData'));
    this.errorOccured = null;
    this.isSignup = false;
    this.isLogin = true;
  }
}
