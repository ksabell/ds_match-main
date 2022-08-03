import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as _ from "lodash";
import {MatTableDataSource} from "@angular/material/table";
import {HttpService} from "../../http.service";
import {DataService} from "../../data.service";
import {first} from "rxjs";

@Component({
  selector: 'app-confirm-changes',
  templateUrl: './confirm-changes.component.html',
  styleUrls: ['./confirm-changes.component.css']
})
export class ConfirmChangesComponent implements OnInit {
  dataSource = new MatTableDataSource();
  dataSourceColumns = ['matchGroupID','sourceSystemID', 'sourceSystem', 'name', 'state', 'city', 'addr1']

  saveSelectedItems: any = [];
  saveSelectedPrimaryItems: any = [];
  mergeSelectedItems: any = [];
  holdSelectedItems: any = [];
  paramSelectedItems: any = [];
  countSelected;
  currentPrimaryId: number; // has value <== used in html
  currentPrimaryIdText;
  maxPrimaryId: number;
  selectedPrimaryId: number;
  action;

  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  constructor(public dialogRef: MatDialogRef<ConfirmChangesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private httpService: HttpService,
              private dataService: DataService,
  ) {
    this.currentPrimaryId = data.primaryId;
    console.log('this.currentPrimaryId');
    console.log(this.currentPrimaryId);
    this.selectedPrimaryId = data.selectedPrimaryId;
    console.log('this.selectedPrimaryId');
    console.log(this.selectedPrimaryId);
    this.saveSelectedPrimaryItems = data.primaryItem;
    console.log('this.saveSelectedPrimaryItems');
    console.log(this.saveSelectedPrimaryItems);
    this.paramSelectedItems = data.selectedItems;
    console.log('this.paramSelectedItems');
    console.log(this.paramSelectedItems);

    this.action = data.action;

    // new primary item
    if (this.action == "N") {
      this.maxPrimaryId = this.currentPrimaryId + 1;
      console.log("ADD NEW PRIMARY ITEM");
      const p: any = {
        AccountName: this.saveSelectedPrimaryItems[0].AccountName,
        AddressLine1: this.saveSelectedPrimaryItems[0].AddressLine1,
        AddressLine2: this.saveSelectedPrimaryItems[0].AddressLine2,
        AddressLine3: this.saveSelectedPrimaryItems[0].AddressLine3,
        City: this.saveSelectedPrimaryItems[0].City,
        Country: this.saveSelectedPrimaryItems[0].Country,
        CreatedBy: this.saveSelectedPrimaryItems[0].CreatedBy,
        DatabaseCreatedDate: this.saveSelectedPrimaryItems[0].DatabaseCreatedDate,
        DatabaseUdpatedDate: this.saveSelectedPrimaryItems[0].DatabaseUdpatedDate,
        ID: this.saveSelectedPrimaryItems[0].ID,
        MatchGroupID: this.maxPrimaryId,
        PostalCode: this.saveSelectedPrimaryItems[0].PostalCode,
        PrimaryProfile: this.maxPrimaryId,
        SourceSystem: this.saveSelectedPrimaryItems[0].SourceSystem,
        SourceSystemCreationDate: this.saveSelectedPrimaryItems[0].SourceSystemCreationDate,
        SourceSystemID: this.saveSelectedPrimaryItems[0].SourceSystemID,
        SourceSystemIDField: this.saveSelectedPrimaryItems[0].SourceSystemIDField,
        SourceSystemLastUpdateDate: this.saveSelectedPrimaryItems[0].SourceSystemLastUpdateDate,
        State: this.saveSelectedPrimaryItems[0].State
      };
      this.saveSelectedItems.push(p);
      this.action = "NI";
      console.log(this.currentPrimaryId);
    }

    for (let i = 0; i < this.paramSelectedItems.length; i++) {
      if (this.action == 'NI') {
        console.log("ADD NEW SELECTED ITEMS");
        this.holdSelectedItems.push(this.paramSelectedItems[i]);
        if (this.holdSelectedItems.length > 0) {
          const p: any = {
            AccountName: this.paramSelectedItems[i].AccountName,
            AddressLine1: this.paramSelectedItems[i].AddressLine1,
            AddressLine2: this.paramSelectedItems[i].AddressLine2,
            AddressLine3: this.paramSelectedItems[i].AddressLine3,
            City: this.paramSelectedItems[i].City,
            Country: this.paramSelectedItems[i].Country,
            CreatedBy: this.paramSelectedItems[i].CreatedBy,
            DatabaseCreatedDate: this.paramSelectedItems[i].DatabaseCreatedDate,
            DatabaseUdpatedDate: this.paramSelectedItems[i].DatabaseUdpatedDate,
            ID: this.paramSelectedItems[i].ID,
            MatchGroupID: this.maxPrimaryId,
            PostalCode: this.paramSelectedItems[i].PostalCode,
            PrimaryProfile: this.paramSelectedItems[i].PrimaryProfile,
            SourceSystem: this.paramSelectedItems[i].SourceSystem,
            SourceSystemCreationDate: this.paramSelectedItems[i].SourceSystemCreationDate,
            SourceSystemID: this.paramSelectedItems[i].SourceSystemID,
            SourceSystemIDField: this.paramSelectedItems[i].SourceSystemIDField,
            SourceSystemLastUpdateDate: this.paramSelectedItems[i].SourceSystemLastUpdateDate,
            State: this.paramSelectedItems[i].State
          };
          this.saveSelectedItems.push(p);
        }
        console.log(this.saveSelectedItems);
        this.countSelected = this.saveSelectedItems.length;
        this.currentPrimaryIdText = '';
        this.currentPrimaryIdText = "Are you sure you want to assign these " + this.countSelected + " records to new match group ID " + this.maxPrimaryId + "?";
      }

      if (this.action == 'MG') {
        console.log('MERGE GROUP');
        //this.currentPrimaryId = this.saveSelectedPrimaryItems[i].PrimaryProfile;
        //console.log(this.currentPrimaryId);
        this.mergeGroup();
      }

      if (this.action == 'MR') {
        console.log('MERGE RECORD');
        //this.pId = this.saveSelectedPrimaryItems[i].PrimaryProfile;
        ////console.log(this.pId);
        this.holdSelectedItems.push(this.paramSelectedItems[i]);
        //console.log(this.holdSelectedItems);
        if (this.holdSelectedItems.length > 0) {
          const p: any = {
            AccountName: this.paramSelectedItems[i].AccountName,
            AddressLine1: this.paramSelectedItems[i].AddressLine1,
            AddressLine2: this.paramSelectedItems[i].AddressLine2,
            AddressLine3: this.paramSelectedItems[i].AddressLine3,
            City: this.paramSelectedItems[i].City,
            Country: this.paramSelectedItems[i].Country,
            CreatedBy: this.paramSelectedItems[i].CreatedBy,
            DatabaseCreatedDate: this.paramSelectedItems[i].DatabaseCreatedDate,
            DatabaseUdpatedDate: this.paramSelectedItems[i].DatabaseUdpatedDate,
            ID: this.paramSelectedItems[i].ID,
            MatchGroupID: this.selectedPrimaryId,
            PostalCode: this.paramSelectedItems[i].PostalCode,
            PrimaryProfile: this.paramSelectedItems[i].PrimaryProfile,
            SourceSystem: this.paramSelectedItems[i].SourceSystem,
            SourceSystemCreationDate: this.paramSelectedItems[i].SourceSystemCreationDate,
            SourceSystemID: this.paramSelectedItems[i].SourceSystemID,
            SourceSystemIDField: this.paramSelectedItems[i].SourceSystemIDField,
            SourceSystemLastUpdateDate: this.paramSelectedItems[i].SourceSystemLastUpdateDate,
            State: this.paramSelectedItems[i].State
          };
          this.saveSelectedItems.push(p);
        }
        //console.log(this.saveSelectedItems);
        this.countSelected = this.saveSelectedItems.length;
        this.currentPrimaryIdText = '';
        this.currentPrimaryIdText = "Are you sure you want to assign the following record(s) to match group ID " + this.selectedPrimaryId + "?";
      }
    }
    this.dataSource = this.saveSelectedItems;
    return;
  }

  ngOnInit() {
  }

  async mergeGroup() {
    console.log(this.currentPrimaryId);
    try {

      const p = {
        PrimaryProfile: this.currentPrimaryId,
      };

      this.mergeSelectedItems = await this.httpService.getSelectedItemsMerge(p).toPromise();

      if (this.mergeSelectedItems.length > 0) {
        _.each(this.mergeSelectedItems, selectedItems => {
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
            MatchGroupID: this.selectedPrimaryId,
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
        });
        console.log(this.saveSelectedItems);
        this.dataSource = new MatTableDataSource(this.saveSelectedItems);
        //this.dataSource = this.saveSelectedItems;
        this.countSelected = this.saveSelectedItems.length;
        this.currentPrimaryIdText = "Do you want to merge all of these records with Match Group ID " + this.selectedPrimaryId + "?";
      }
    } catch (e) {
      this.dataService.errorMsg('Unable to get Account Primary Profile. Please try again.');
      //console.log('ACCOUNT MATCH ERROR: ', e);
    }
  }

  save() {
    console.log(this.saveSelectedItems);
    this.dialogRef.close(this.saveSelectedItems);
  }

  onCancel() {
    this.dialogRef.close();
  }

}
