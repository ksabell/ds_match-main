import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as _ from "lodash";
import {MatTableDataSource} from "@angular/material/table";
import {HttpService} from "../../http.service";
import {DataService} from "../../data.service";
import {first} from "rxjs";

@Component({
  selector: 'app-update-primary-profile',
  templateUrl: './update-primary-profile.component.html',
  styleUrls: ['./update-primary-profile.component.css']
})
export class UpdatePrimaryProfileComponent implements OnInit {
  dataSourceItem = new MatTableDataSource();
  dataSourcePrimary = new MatTableDataSource();
  dataSourceItemColumns = ['sourceSystemID', 'sourceSystem', 'name', 'state', 'city', 'addr1', 'primaryProfile']
  dataSourcePrimaryColumns = ['sourceSystemID', 'sourceSystem', 'name', 'state', 'city', 'addr1', 'primaryProfile']

  saveSelectedItems: any = [];
  saveSelectedPrimaryItems: any = [];
  mergeSelectedItems: any = [];
  holdSelectedItems: any = [];
  paramSelectedItems: any = [];
  countSelected;
  currentPrimaryId: number; // has value <== used in html
  currentPrimaryIdText;

  //primary Id
  pId;
  //match group Id
  mgId;
  //primary of a match group Id
  pmgId;

  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  constructor(public dialogRef: MatDialogRef<UpdatePrimaryProfileComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private httpService: HttpService,
              private dataService: DataService,
  ) {
    this.currentPrimaryId = data.primaryId;


    this.saveSelectedPrimaryItems = data.primaryItem;
    console.log(this.saveSelectedPrimaryItems);
    this.paramSelectedItems = data.selectedItems;
    console.log(this.paramSelectedItems);

    this.mgId = this.paramSelectedItems[0].MatchGroupID;
    this.pmgId = this.paramSelectedItems[0].PrimaryProfile;
    this.pId = this.saveSelectedPrimaryItems[0].PrimaryProfile;
    console.log("this.pId");
    console.log(this.pId);
    console.log('this.currentPrimaryId');
    console.log(this.currentPrimaryId);
    console.log("this.pmgId");
    console.log(this.pmgId);
    console.log("this.mgId");
    console.log(this.mgId);
    // change the primary profile in the same match group

    //console.log("CHANGE PRIMARY PROFILE");
    //console.log(this.pId);
    const selectedPrimaryItems: any = {
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
      MatchGroupID: this.pId,
      PostalCode: this.saveSelectedPrimaryItems[0].PostalCode,
      PrimaryProfile: null,
      SourceSystem: this.saveSelectedPrimaryItems[0].SourceSystem,
      SourceSystemCreationDate: this.saveSelectedPrimaryItems[0].SourceSystemCreationDate,
      SourceSystemID: this.saveSelectedPrimaryItems[0].SourceSystemID,
      SourceSystemIDField: this.saveSelectedPrimaryItems[0].SourceSystemIDField,
      SourceSystemLastUpdateDate: this.saveSelectedPrimaryItems[0].SourceSystemLastUpdateDate,
      State: this.saveSelectedPrimaryItems[0].State
    };
    this.saveSelectedItems.push(selectedPrimaryItems);
    console.log(this.paramSelectedItems);
    const selectedItem: any = {
      AccountName: this.paramSelectedItems[0].AccountName,
      AddressLine1: this.paramSelectedItems[0].AddressLine1,
      AddressLine2: this.paramSelectedItems[0].AddressLine2,
      AddressLine3: this.paramSelectedItems[0].AddressLine3,
      City: this.paramSelectedItems[0].City,
      Country: this.paramSelectedItems[0].Country,
      CreatedBy: this.paramSelectedItems[0].CreatedBy,
      DatabaseCreatedDate: this.paramSelectedItems[0].DatabaseCreatedDate,
      DatabaseUdpatedDate: this.paramSelectedItems[0].DatabaseUdpatedDate,
      ID: this.paramSelectedItems[0].ID,
      MatchGroupID: this.pId,
      PostalCode: this.paramSelectedItems[0].PostalCode,
      PrimaryProfile: this.pId,
      SourceSystem: this.paramSelectedItems[0].SourceSystem,
      SourceSystemCreationDate: this.paramSelectedItems[0].SourceSystemCreationDate,
      SourceSystemID: this.paramSelectedItems[0].SourceSystemID,
      SourceSystemIDField: this.paramSelectedItems[0].SourceSystemIDField,
      SourceSystemLastUpdateDate: this.paramSelectedItems[0].SourceSystemLastUpdateDate,
      State: this.paramSelectedItems[0].State
    };
    this.holdSelectedItems.push(selectedItem);
    this.currentPrimaryIdText = "Are you sure you want to change the primary profile of existing match group ID " + this.pId + ' from record Source System ID ' + this.saveSelectedPrimaryItems[0].SourceSystemID + " to record Source System ID " + this.paramSelectedItems[0].SourceSystemID + '?';
    this.dataSourceItem = new MatTableDataSource(this.holdSelectedItems);
    console.log(this.holdSelectedItems);
    this.dataSourcePrimary = new MatTableDataSource(this.saveSelectedItems);
    console.log(this.saveSelectedItems);

  }

  ngOnInit() {
  }

  async changePrimaryProfile(changes) {
    //console.log(changes);
    await this.httpService.updateAccountMatch(changes).pipe(first()).toPromise();
    this.dataSourceItem = new MatTableDataSource(changes);
    this.dataSourcePrimary = new MatTableDataSource(changes);
  }


  save() {
    this.saveSelectedItems.push(this.holdSelectedItems[0]);
    this.dialogRef.close(this.saveSelectedItems);
  }

  onCancel() {
    this.dialogRef.close();
  }


}
