import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as _ from "lodash";
import {MatTableDataSource} from "@angular/material/table";
import {HttpService} from "../../http.service";
import {DataService} from "../../data.service";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  text;
  textHeader;


  constructor(
              public dialogRef: MatDialogRef<PopUpComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.text = data.text;
    this.textHeader = data.textHeader;
  }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }
}
