import {BrowserModule} from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatOptionModule, MatRippleModule} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {HttpService} from "./http.service";
import {DataService} from "./data.service";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import { ConfirmChangesComponent } from './dialogs/confirm-changes/confirm-changes.component';
import { FilterPipe } from './filter.pipe';
import {MatSelectModule} from "@angular/material/select";
import {AlertModule} from "./_alert";
import {MatSortModule} from "@angular/material/sort";
import {MatTableFilterModule} from "mat-table-filter";
import { RemoveComponent } from './dialogs/remove/remove.component';
import { UpdatePrimaryProfileComponent } from './dialogs/update-primary-profile/update-primary-profile.component';
import { PopUpComponent } from './dialogs/pop-up/pop-up.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfirmChangesComponent,
    FilterPipe,
    RemoveComponent,
    UpdatePrimaryProfileComponent,
    PopUpComponent

  ],
  imports: [
    AlertModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatSnackBarModule,
    MatRippleModule,
    MatFormFieldModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatToolbarModule,
    MatListModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    NgxWebstorageModule.forRoot(),
    MatTableModule,
    MatDialogModule,
    MatSortModule,
    MatTableFilterModule
  ],
  exports: [],

  providers: [
    HttpService,
    DataService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {
}
