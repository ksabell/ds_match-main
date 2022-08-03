import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "ngx-webstorage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.localStorage.clear();
    this.router.navigateByUrl('');
  }

}
