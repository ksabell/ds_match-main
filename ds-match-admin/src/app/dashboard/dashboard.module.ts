import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgxWebstorageModule} from "ngx-webstorage";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AccountMatchComponent} from './account-match/account-match.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSortModule} from "@angular/material/sort";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableFilterModule} from "mat-table-filter";
import {AlertModule} from "../_alert";
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    DashboardComponent,
    AccountMatchComponent
  ],
  imports: [
    AlertModule,
    MatButtonToggleModule,
    CommonModule,
    MatProgressBarModule,
    NgxWebstorageModule.forRoot(),
    DashboardRoutingModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSidenavModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatSortModule,
    MatTableFilterModule
  ],
  bootstrap: [DashboardComponent],
  entryComponents: [

  ],
  exports: [

  ],

  providers: [

  ]
})
export class DashboardModule { }
