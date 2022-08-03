import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../http.service";
import {DataService} from "../data.service";
import {LocalStorageService} from 'ngx-webstorage';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showPassword = false;
  email: string = "";
  password: string = "";

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private httpService: HttpService,
    private dataService: DataService
  ) {

  }

  ngOnInit() {
  }

  async login() {
    if (!this.email || !this.password) return;

    // this.localStorage.store('adminId', 999999);
    // this.router.navigateByUrl('/dashboard');

    this.httpService.login(this.email, this.password).subscribe((res: any) => {
      this.localStorage.store('adminId', res.id);
      // this.localStorage.store('api_token', res['api_token']);
      this.router.navigateByUrl('/dashboard');
    }, (err) => {
      this.dataService.errorMsg('Invalid login. Please try again.');
    });
  }

}
