import { Component, OnInit } from '@angular/core';
import { LoginUser } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: LoginUser) {}
  ngOnInit() {
    this.authService.autoLogin();
  }
  title = 'GSLabUniversityUI';
}
