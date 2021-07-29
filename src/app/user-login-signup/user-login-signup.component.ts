import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpUser } from '../services/signup.service';
import { LoginUser } from '../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-signup',
  templateUrl: './user-login-signup.component.html',
  styleUrls: ['./user-login-signup.component.scss'],
})
export class UserLoginSignupComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
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

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.nonWhitespaceRegExp),
        Validators.email,
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
      // mobile: new FormControl('', [
      //   Validators.required,
      //   Validators.pattern(this.nonWhitespaceRegExp),
      //   Validators.minLength(10),
      //   Validators.maxLength(10),
      //   Validators.pattern('^[0-9]*$'),
      // ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(this.nonWhitespaceRegExp),
        Validators.minLength(8),
      ]),
      // gender: new FormControl('', [Validators.required]),
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
        this.loginForm.controls.rememberme.reset();
      },
      (error) => {
        this.isLoading = false;

        this.openSnackBar(error.error.message);
      }
    );
  }
  onSubmitSignup() {
    this.isLoading = true;
    const name = this.signupForm.value.name;
    // const phone = this.signupForm.value.mobile;
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    // const gender = this.signupForm.value.gender;
    const role = this.signupForm.value.role;

    this.signUp
      .createUserSignup(name, email, password, role)
      .subscribe(
        (responseData: any) => {
          this.isLoading = false;

          this.openSnackBar(responseData.message);
          this.signupForm.reset();

          this.onLogin();
        },
        (error) => {
          this.isLoading = false;

          this.openSnackBar(error.error.message);
        }
      );
  }
  onSignup() {
    this.isSignup = true;
    this.isLogin = false;

    this.loginForm.reset();
  }
  onLogin() {
    this.signupForm.reset();

    this.isSignup = false;
    this.isLogin = true;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Ok', { duration: 3000 });
  }
  private noWhitespaceValidator(control: FormControl): { whitespace: boolean } {
    const isSpace = (control.value || '').startsWith(' ');
    return isSpace ? { whitespace: true } : { whitespace: false };
  }
}
