import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as _ from "lodash";
import {MatTableDataSource} from "@angular/material/table";
import {HttpService} from "../../http.service";
import {DataService} from "../../data.service";

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent implements OnInit {
  dataSource = new MatTableDataSource();
  dataSourceColumns = ['sourceSystemID', 'sourceSystem', 'name', 'state', 'city', 'addr1']

  saveSelectedItems: any = [];
  saveSelectedPrimaryItems: any = [];
  savedPrimaryProfileID;
  holdSelectedItems: any = [];
  infoText;

  constructor(public dialogRef: MatDialogRef<RemoveComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private httpService: HttpService,
              private dataService: DataService,
  ) {

    this.saveSelectedPrimaryItems = data.primaryItem;
    this.saveSelectedItems = data.selectedItems;

    // if (this.saveSelectedPrimaryItems.length === 0) {
    //   var str1 = new String("Please select a Primary Profile. ");
    //   this.infoText = str1;
    // } else

    if (this.saveSelectedPrimaryItems.length > 0) {
      this.savedPrimaryProfileID = this.saveSelectedPrimaryItems[0].PrimaryProfile;
      //this.saveSelectedItems.push(this.saveSelectedPrimaryItems[0]);
      this.getGroup();
      var str1 = new String(" Are you sure you want to completely ungroup match group  ");
      var str2 = new String(this.savedPrimaryProfileID);
      var str3 = new String(" (dissolve the entire group)? ");
      this.infoText = str1.concat(str2.toString(),str3.toString());
    }
    if (this.saveSelectedItems.length > 0) {
      //
      this.savedPrimaryProfileID = this.saveSelectedItems[0].MatchGroupID;
      var str1 = new String(" Are you sure you want to remove these records from match group ");
      var str2 = new String(this.savedPrimaryProfileID);
      var str3 = new String("? ");
      this.infoText = str1.concat(str2.toString(),str3.toString());
      this.dataSource = this.saveSelectedItems;
    }

  }

  async getGroup() {

    try {
      const p = {
        PrimaryProfile: this.savedPrimaryProfileID,
      };
      //console.log(p);
      this.holdSelectedItems = await this.httpService.getSelectedItemsMerge(p).toPromise();

      console.log(this.holdSelectedItems[0].AccountName);
      if (this.holdSelectedItems.length > 0) {
        _.each(this.holdSelectedItems, selectedItems => {
          const p: any = {
            AccountName: selectedItems.AccountName,
            AddressLine1: selectedItems.AddressLine1,
            AddressLine2: selectedItems.AddressLine2,
            AddressLine3: selectedItems.AddressLine3,
            City: selectedItems.City,
            Country: selectedItems.Country,
            CreatedBy: selectedItems.CreatedBy,
            DatabaseCreatedDate: selectedItems.DatabaseCreatedDate,
            DatabaseUdpatedDate: selectedItems.DatabaseUdpatedDate,
            ID: selectedItems.ID,
            MatchGroupID: null,
            PostalCode: selectedItems.PostalCode,
            PrimaryProfile: null,
            SourceSystem: selectedItems.SourceSystem,
            SourceSystemCreationDate: selectedItems.SourceSystemCreationDate,
            SourceSystemID: selectedItems.SourceSystemID,
            SourceSystemIDField: selectedItems.SourceSystemIDField,
            SourceSystemLastUpdateDate: selectedItems.SourceSystemLastUpdateDate,
            State: selectedItems.State
          };
          this.saveSelectedItems.push(p);
          //console.log(this.saveSelectedItems);
        });
        this.dataSource = this.saveSelectedItems;

      }
    } catch (e) {
      this.dataService.errorMsg('Unable to get Account Primary Profile. Please try again.');
      //console.log('ACCOUNT MATCH ERROR: ', e);
    }
  }

  ngOnInit() {
  }


  save() {
    this.dialogRef.close(this.saveSelectedItems);
  }

  onCancel() {
    this.dialogRef.close();
  }

}
