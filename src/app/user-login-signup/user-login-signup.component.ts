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
  isLoading: boolean = false;
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
      rememberme: new FormControl('false'),
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
    this.isLoading = true;
    console.log(this.loginForm);
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const rememberme = this.loginForm.value.rememberme;
    this.login.loginUser(email, password, rememberme).subscribe(
      (responseData: any) => {
        this.isLoading = false;
        if (responseData.role === 'Student')
          this.router.navigate(['/studentPortal']);
        else this.router.navigate(['/instructorPortal']);
      },
      (error) => {
        this.isLoading = false;
        this.errorOccured = error.error.message;
      }
    );
  }
  onSubmitSignup() {
    // console.log(this.signupForm);
    this.isLoading = true;
    const name = this.signupForm.value.name;
    const phone = this.signupForm.value.mobile;
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    const gender = this.signupForm.value.gender;
    const role = this.signupForm.value.role;

    this.signUp
      .createUserSignup(name, phone, email, password, gender, role)
      .subscribe(
        (responseData: any) => {
          this.isLoading = false;
          this.errorOccured = responseData.message;
          this.signupForm.reset();
        },
        (error) => {
          this.isLoading = false;
        console.log(error)
          this.errorOccured = error.error.message;
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
  onCloseError() {
    this.errorOccured = null;
    this.loginForm.reset();
  }
}
