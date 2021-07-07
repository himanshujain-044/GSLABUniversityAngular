import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpUser } from '../services/signup.service';
import { LoginUser } from '../services/login.service';
@Component({
  selector: 'app-user-login-signup',
  templateUrl: './user-login-signup.component.html',
  styleUrls: ['./user-login-signup.component.scss'],
})
export class UserLoginSignupComponent implements OnInit {
  constructor(private signUp: SignUpUser, private login: LoginUser) {}

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
      profession: new FormControl('', [Validators.required]),
    });
  }
  onSubmitLogin() {
    console.log(this.loginForm);
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const rememberme = this.loginForm.value.rememberme;
    this.login.loginUser(email, password, rememberme).subscribe(
      (responseData) => {
        console.log(responseData);
      },
      (error) => {
        this.errorOccured = error.message;
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
    const profession = this.signupForm.value.profession;

    this.signUp
      .createUserSignup(name, phone, email, password, gender, profession)
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
  }
  onLogin() {
    this.isSignup = false;
    this.isLogin = true;
  }
}
