import {Component, ElementRef, Inject, NgZone, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {HttpService} from "../../http.service";
import {DataService} from "../../data.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {first} from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ConfirmChangesComponent} from "../../dialogs/confirm-changes/confirm-changes.component";
import {AlertService} from "../../_alert";
import {MatTableFilter} from 'mat-table-filter';
import {RemoveComponent} from "../../dialogs/remove/remove.component";
import Swal from 'sweetalert2';
import {UpdatePrimaryProfileComponent} from "../../dialogs/update-primary-profile/update-primary-profile.component";

export class AccountMatch {
  AccountName: string;
  City: string;
  AddressLine1: string;
  MatchGroupID: string;
  PrimaryProfile: string;
  SourceSystemID: string;
}

export interface DialogData {
  header: string;
  text: string;
}

@Component({
  selector: 'app-account-match',
  templateUrl: './account-match.component.html',
  styleUrls: ['./account-match.component.css']
})
export class AccountMatchComponent implements OnInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: true
  };

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;

  filterEntity: AccountMatch;
  filterType: MatTableFilter;
  accountMatchColumns = ['primaryProfile', 'matchGroupID', 'sourceSystemID', 'sourceSystem', 'primary', 'select', 'name', 'state', 'city', 'address1', 'address2', 'created'];
  accountMatchSource = new MatTableDataSource();
  accountMatchFilter = '';
  accountMatch;
  loading = false;
  primaryBox = false;
  selectedItems: string[] = [];
  selectedPrimaryItem: string[] = [];
  // countSelectedPrimary: number;
  // countSelectedItem: number;
  currentPrimary;
  maxPrimaryId = 0;
  currentPrimaryId = 0;
  selectedPrimaryId_P_String = '';
  selectedPrimaryId_S_String = '';
  selectedMatchGroupId_S_String = '';
  currentMatchGroupId_P = 0;
  currentMatchGroupId_S = 0;
  selectedMatchGroupId = 0;
  sourceSystemId_S = 0;
  sourceSystemId_P = 0;
  submitflag = false;
  removeflag = false;
  updateflag = false;
  header: string;
  text: string;
  selectedAction = '';
  selectedflag = false;
  primaryflag = false;
  alertflag = false;
  buttonHeader = '';
  buttonText = '';
  unselectedflag_S = true;
  uppflag = false;
  invalidflag = true;
  mrflag = false;
  groupCount = 0;
  loadingPP = false;
  height;

  constructor(
    private zone: NgZone,
    private httpService: HttpService,
    private dataService: DataService,
    private dialog: MatDialog,
    public alertService: AlertService
  ) {
    //console.log('Called Constructor');
    this.getAccountMatch();
  }

  ngOnInit() {
    //console.log('Called ngOnInit method');
    this.getPrimaryDesc();
    this.getAccountMatch();
    this.loading = true;

    this.filterEntity = new AccountMatch();
    this.filterType = MatTableFilter.ANYWHERE;
    this.accountMatchSource = new MatTableDataSource(this.accountMatch);
    //console.log(this.accountMatchSource);

  }

  applyFilter(filterValue: string) {
    if (filterValue) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
    }

    this.accountMatchSource.paginator = this.paginator;
    // this.countSelectedPrimary = this.selectedPrimaryItem.length;
    console.log('this.selectedPrimaryItem.length');
    console.log(this.selectedPrimaryItem.length);
    // this.countSelectedItem = this.selectedItems.length;
    console.log('this.selectedItems.length');
    console.log(this.selectedItems.length);
    this.loading = false;
    this.filterEntity.MatchGroupID = '';
    this.filterEntity.AccountName = '';
    this.filterEntity.City = '';
    this.filterEntity.AddressLine1 = '';
    this.filterEntity.PrimaryProfile = '';
    this.accountMatchSource.filter = filterValue;
  }

  clearFilter() {
    this.accountMatchFilter = '';
    this.applyFilter(this.accountMatchFilter);
  }

  clearPPFilter() {
    this.filterEntity.PrimaryProfile = '';

  }

  clearMGFilter() {
    this.filterEntity.MatchGroupID = '';

  }

  clearSSFilter() {
    this.filterEntity.SourceSystemID = '';

  }

  clearANFilter() {
    this.filterEntity.AccountName = '';

  }

  clearCFilter() {
    this.filterEntity.City = '';

  }

  clearA1Filter() {
    this.filterEntity.AddressLine1 = '';

  }

  submit(action) {
    console.log('this.selectedAction');
    console.log(this.selectedAction);
    console.log(this.selectedItems);
    console.log('this.selectedItems.length');
    console.log(this.selectedItems.length);
    console.log(this.selectedPrimaryItem);
    if (this.selectedItems.length == 0 && this.selectedPrimaryItem.length == 0) {
      console.log('Invalid');

      Swal.fire({
        title: 'Invalid Selection(s)',
        text: 'Please follow the selection prompts at the top of the screen corresponding to the selected button.',
        icon: 'error',
        confirmButtonColor: '#3f51b5',
        confirmButtonText: 'Ok',
      }).then((result) => {
        console.log('clear data')
        this.clearData();
      });
    }if(this.selectedAction == "MG"){
      console.log('this.selectedItems');
      console.log(this.selectedItems);
      console.log('this.selectedItems.length');
      console.log(this.selectedItems.length);
      console.log('this.selectedPrimaryItem');
      console.log(this.selectedPrimaryItem);
      this.dialog.open(ConfirmChangesComponent, {
        data: {
          selectedItems: this.selectedPrimaryItem,
          primaryItem: this.selectedItems,
          primaryId: this.selectedItems[0]['MatchGroupID'],
          selectedPrimaryId: this.selectedPrimaryId_P_String,
          action: action,
        },
        hasBackdrop: false,
        disableClose: true,
        autoFocus: false,
        height: "100%"
      }).afterClosed().subscribe(changes => {
        if (changes) {
          console.log('CHANGES ');
          console.log(changes);
          this.updateAccountMatch(changes);
          this.dataService.successMsg('Account Matched data. Success.');
          console.log('clear data')
          this.clearData();
        }
      });

    }
    else {
      // console.log('this.countSelectedItem');
      // console.log(this.countSelectedItem);
      // if (this.countSelectedItem > 15) {
      //   this.height = "100%"
      // } else {
      //   this.height = "auto"
      // }
      console.log('this.selectedItems');
      console.log(this.selectedItems);
      console.log('this.selectedItems.length');
      console.log(this.selectedItems.length);
      console.log('this.selectedPrimaryItem');
      console.log(this.selectedPrimaryItem);
      this.dialog.open(ConfirmChangesComponent, {
        data: {
          selectedItems: this.selectedItems,
          primaryItem: this.selectedPrimaryItem,
          primaryId: this.maxPrimaryId,
          selectedPrimaryId: this.selectedPrimaryId_P_String,
          action: action,
        },
        hasBackdrop: false,
        disableClose: true,
        autoFocus: false,
        height: "100%"
      }).afterClosed().subscribe(changes => {
        if (changes) {
          console.log('CHANGES ');
          console.log(changes);
          this.updateAccountMatch(changes);
          this.dataService.successMsg('Account Matched data. Success.');
          console.log('clear data')
          this.clearData();
        }
      });

    }
  }

  updatePrimaryProfile() {
    console.log(this.selectedItems);
    console.log('this.selectedItems.length');
    console.log(this.selectedItems.length);
    console.log(this.selectedPrimaryItem);
    if (this.selectedItems.length == 0 && this.selectedPrimaryItem.length == 0) {
      console.log('Invalid');
      Swal.fire({
        title: 'Invalid Selection(s)',
        text: 'Please follow the selection prompts at the top of the screen corresponding to the selected button.',
        icon: 'error',
        confirmButtonColor: '#3f51b5',
        confirmButtonText: 'Ok',

      }).then((result) => {

      });
    } else {
      console.log('this.selectedPrimaryId_P_String');
      console.log(this.selectedPrimaryId_P_String);
      this.dialog.open(UpdatePrimaryProfileComponent, {
        data: {
          selectedItems: this.selectedPrimaryItem,
          primaryItem: this.selectedItems,
          primaryId: this.selectedPrimaryId_P_String,
        },
        hasBackdrop: false,
        disableClose: true,
        autoFocus: false
      }).afterClosed().subscribe(changes => {
        //console.log(changes);
        if (changes) {
          console.log('CHANGES ');
          console.log(changes);
          //this.loadingPP = true;
          this.changePrimaryProfile(changes);

          console.log('clear data')
          this.clearData();
          this.dataService.successPPMsg('Account Matched Primary Profile is updating! Please wait.');

        }
      });
    }
    this.loadingPP = false;
  }

  clearData() {

    this.selectedAction = '';
    // this.dialog.closeAll();
    this.uppflag = false;
    this.sourceSystemId_S = 0;
    this.sourceSystemId_P = 0;
    this.selectedPrimaryId_P_String = '';
    this.selectedPrimaryId_S_String = '';
    this.selectedMatchGroupId_S_String = '';
    this.maxPrimaryId = 0;
    this.currentMatchGroupId_S = 0;
    this.currentMatchGroupId_P = 0;
    this.selectedAction = '';
    this.loading = false;
    //this.loadingPP = false;
    this.clearCheckboxes();
    this.selectedPrimaryItem = [];
    console.log('this.selectedItems.length');
    console.log(this.selectedItems.length);
    this.selectedItems = [];
    this.buttonText = '';
    this.buttonHeader = '';
    this.alertflag = false;
    this.selectedflag = false;
    this.primaryflag = false;
    this.updateflag = false;
    this.removeflag = false;
    this.submitflag = false;
    this.selectedAction = '';
    this.alertflag = false;
  }

  clearCheckboxes() {

    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.submitflag = false;
    console.log('this.submitflag');
    console.log(this.submitflag);
  }

  getSelectedBox(e: any, accountMatch) {

    if (e.target.checked) {
      console.log(this.selectedPrimaryItem);
      if (this.selectedPrimaryItem.length == 1) {
        if (this.selectedPrimaryItem[0]['SourceSystemID'] == accountMatch.SourceSystemID) {
          console.log('DO NOT PUSH DUP');
        } else {
          this.selectedItems.push(accountMatch);
        }
      }

      console.log('this.selectedItems');
      console.log(this.selectedItems);
      console.log('this.selectedItems.length');
      console.log(this.selectedItems.length);
      if (accountMatch.MatchGroupID != null) {
        this.currentMatchGroupId_S = accountMatch.MatchGroupID;
        console.log('this.currentMatchGroupId_S');
        console.log(this.currentMatchGroupId_S);
        this.selectedMatchGroupId = accountMatch.MatchGroupID;
      }
      this.sourceSystemId_S = accountMatch.SourceSystemID;
      console.log('this.sourceSystemId_S');
      console.log(this.sourceSystemId_S);
      this.unselectedflag_S = false;
      console.log('this.unselectedflag_S');
      console.log(this.unselectedflag_S);
      this.invalidflag = false;
      console.log('this.invalidflag');
      console.log(this.invalidflag);
    } else {
      this.selectedItems = this.selectedItems.filter(m => m != accountMatch);
      console.log('this.selectedItems');
      console.log(this.selectedItems);
      console.log('this.selectedItems.length');
      console.log(this.selectedItems.length);

      if (this.selectedItems.length == 0) {
        this.submitflag = false;
        console.log('this.submitflag');
        console.log(this.submitflag);
      }
      e.target.checked = false;
      this.unselectedflag_S = true;
      console.log('this.unselectedflag_S');
      console.log(this.unselectedflag_S);
    }

    this.submitOn();
  }

  getPrimaryBox(e: any, accountMatch) {
    if (e.target.checked) {
      this.selectedPrimaryItem.push(accountMatch);
      console.log('this.selectedPrimaryItem');
      console.log(this.selectedPrimaryItem);

      if (accountMatch.MatchGroupID != null) {
        this.currentMatchGroupId_P = accountMatch.MatchGroupID;
        console.log('this.currentMatchGroupId_P');
        console.log(this.currentMatchGroupId_P);
      }
      if (accountMatch.PrimaryProfile != null) {
        this.currentPrimaryId = accountMatch.PrimaryProfile;
        console.log('this.currentPrimaryId');
        console.log(this.currentPrimaryId);
      }

      this.invalidflag = false;
      console.log('this.invalidflag');
      console.log(this.invalidflag);
    } else {
      this.selectedPrimaryItem = this.selectedPrimaryItem.filter(m => m != accountMatch);
      console.log('this.selectedPrimaryItem');
      console.log(this.selectedPrimaryItem);
      e.target.checked = false;

      if (this.selectedPrimaryItem.length > 1) {
        this.submitflag = false;
        console.log('this.submitflag');
        console.log(this.submitflag);
      }
    }

    this.submitOn();
  }

  submitOn() {
    console.log('SubmitOn');
    console.log('this.selectedItems.length');
    console.log(this.selectedItems.length);
    // this.countSelectedItem = this.selectedItems.length;
    console.log('this.selectedItems.length');
    console.log(this.selectedItems.length);

    if (this.selectedItems.length >= 1) {
      this.selectedPrimaryId_S_String = JSON.stringify(this.selectedItems[0]['PrimaryProfile']);
      this.selectedMatchGroupId_S_String = JSON.stringify(this.selectedItems[0]['MatchGroupID']);

    } else {
      this.selectedPrimaryId_S_String = '';
      this.selectedMatchGroupId_S_String = ''
    }
    console.log('this.selectedPrimaryId_S_String');
    console.log(this.selectedPrimaryId_S_String);

    console.log(this.selectedItems);
    console.log(this.selectedPrimaryItem);

    if (this.selectedAction == "UPP") {

      if (this.selectedItems.length == 1 && this.selectedPrimaryItem.length == 1) {
        console.log('this.uppflag 1');
        //  if (this.currentMatchGroupId_S == this.currentMatchGroupId_P) {
        //    console.log('this.uppflag 2');
        if (this.sourceSystemId_P != this.sourceSystemId_S) {
          console.log('this.uppflag 3');
          if (this.selectedPrimaryId_S_String == this.selectedMatchGroupId_S_String) {
            console.log('this.uppflag 4');
            if (this.selectedItems.length > 0 && this.selectedPrimaryItem.length > 0) {
              console.log('this.uppflag 5');
              if (this.selectedItems[0]['MatchGroupID'] == this.selectedPrimaryItem[0]['MatchGroupID']) {
                this.uppflag = true;
                console.log('this.uppflag');
                console.log(this.uppflag);
              }
              //    }
            }
          }
        }
      } else {
        this.uppflag = false;
        console.log('this.uppflag');
        console.log(this.uppflag);
      }
    }

    // this.countSelectedPrimary = this.selectedPrimaryItem.length;
    console.log('this.selectedPrimaryItem.length');
    console.log(this.selectedPrimaryItem.length);
    if (this.selectedPrimaryItem.length == 1) {
      this.selectedPrimaryId_P_String = JSON.stringify(this.selectedPrimaryItem[0]['PrimaryProfile']);
      console.log('this.selectedPrimaryId_P_String');
      console.log(this.selectedPrimaryId_P_String);
    } else {
      this.selectedPrimaryId_P_String = "";
      console.log('this.selectedPrimaryId_P_String');
      console.log(this.selectedPrimaryId_P_String);
    }


    if (this.selectedAction == "MR") {
      if (this.selectedPrimaryItem.length != 1) {
        this.mrflag = false;
        console.log('this.mrflag');
        console.log(this.mrflag);
      } else if (this.selectedItems.length <= 0) {
        this.mrflag = false;
        console.log('this.mrflag');
        console.log(this.mrflag);
      } else if (this.selectedPrimaryId_P_String == this.selectedMatchGroupId_S_String) {
        this.mrflag = false;
        console.log('this.mrflag');
        console.log(this.mrflag);
      }
    }
    console.log('this.selectedItems.length');
    console.log(this.selectedItems.length);

    if (this.selectedItems.length > 0) {
      this.sourceSystemId_S = this.selectedItems[0]['SourceSystemID'];
      console.log('this.sourceSystemId_S');
      console.log(this.sourceSystemId_S);
    } else {
      this.sourceSystemId_S = 0
    }
    if (this.selectedPrimaryItem.length > 0) {
      this.sourceSystemId_P = this.selectedPrimaryItem[0]['SourceSystemID'];
      console.log('this.sourceSystemId_P');
      console.log(this.sourceSystemId_P);
    } else {
      this.sourceSystemId_P = 0
    }
    switch (this.selectedAction) {
      case "N": {
        if (this.selectedPrimaryItem.length > 1) {
          this.submitflag = false;
          console.log('this.submitflag');
          console.log(this.submitflag);
          console.log('Invalid');
          Swal.fire({
            title: 'Invalid Selection(s)',
            text: 'Please follow the selection prompts at the top of the screen corresponding to the selected button.',
            icon: 'error',
            confirmButtonColor: '#3f51b5',
            confirmButtonText: 'OK',
          }).then((result) => {
          });
        } else if (this.selectedItems.length == 0) {
          this.submitflag = false;
          console.log('this.submitflag');
          console.log(this.submitflag);
        } else if (this.sourceSystemId_S == 0 && this.sourceSystemId_P == 0) {
          this.submitflag = false;
          console.log('this.submitflag');
          console.log(this.submitflag);
        } else if (this.sourceSystemId_S == this.sourceSystemId_P) {
          this.submitflag = false;
          console.log('this.submitflag');
          console.log(this.submitflag);
          console.log('Invalid');
          Swal.fire({
            title: 'Invalid Selection(s)',
            text: 'Please follow the selection prompts at the top of the screen corresponding to the selected button.',
            icon: 'error',
            confirmButtonColor: '#3f51b5',
            confirmButtonText: 'OK',
          }).then((result) => {
          });
        } else if (this.selectedPrimaryItem.length != 1) {
          this.submitflag = false;
          console.log('this.submitflag');
          console.log(this.submitflag);
        } else if (this.selectedPrimaryItem.length == 1 && this.selectedItems.length >= 1) {
          this.submitflag = true;
          console.log('this.submitflag');
          console.log(this.submitflag);
        }
        break;
      }
      case "MR": {
        console.log('this.selectedPrimaryId_P_String');
        console.log(this.selectedPrimaryId_P_String);
        console.log('this.selectedPrimaryId_S_String');
        console.log(this.selectedPrimaryId_S_String);

        //this.selectedPrimaryId_S_String
        if (this.selectedItems.length >= 1) {
          this.getMatchGroup(this.selectedItems);
        } else {
          this.groupCount = 0;
        }
        if (this.selectedPrimaryItem.length > 1) {
          this.submitflag = false;
          console.log('this.submitflag');
          console.log(this.submitflag);
          console.log('Invalid');
          Swal.fire({
            title: 'Invalid Selection(s)',
            text: 'Please follow the selection prompts at the top of the screen corresponding to the selected button.',
            icon: 'error',
            confirmButtonColor: '#3f51b5',
            confirmButtonText: 'OK',
          }).then((result) => {
            //this.clearData();
          });
        } else if (this.selectedPrimaryId_S_String == null) {
          this.submitflag = false;
          console.log('this.submitflag');
          console.log(this.submitflag);
          console.log('Invalid');
          Swal.fire({
            title: 'Invalid Selection(s)',
            text: 'Please follow the selection prompts at the top of the screen corresponding to the selected button.',
            icon: 'error',
            confirmButtonColor: '#3f51b5',
            confirmButtonText: 'OK',
          }).then((result) => {
            //this.clearData();
          });
        } else if (this.selectedPrimaryId_P_String == '') {
          this.submitflag = false;
          console.log('this.submitflag');
          console.log(this.submitflag);
        } else if (this.sourceSystemId_S == 0 && this.sourceSystemId_P == 0) {
          this.submitflag = false;
          console.log('this.submitflag');
          console.log(this.submitflag);
        } else if (this.sourceSystemId_S == this.sourceSystemId_P) {
          this.submitflag = false;
          console.log('this.submitflag');
          console.log(this.submitflag);

        } else if (this.selectedMatchGroupId_S_String == this.selectedPrimaryId_P_String) {
          this.submitflag = false;
          console.log('this.submitflag');
          console.log(this.submitflag);
          console.log('Invalid');
          Swal.fire({
            title: 'Invalid Selection(s)',
            text: 'Please follow the selection prompts at the top of the screen corresponding to the selected button.',
            icon: 'error',
            confirmButtonColor: '#3f51b5',
            confirmButtonText: 'OK',
          }).then((result) => {
          });
        } else if (this.selectedPrimaryItem.length == 1 && this.selectedItems.length >= 1) {
          this.submitflag = true;
          console.log('this.submitflag');
          console.log(this.submitflag);
        } else if (this.mrflag) {
          this.submitflag = true;
          console.log('this.submitflag');
          console.log(this.submitflag);
        }
        break;
      }
      case "MG": {
        if (this.selectedPrimaryItem.length > 1 || this.selectedItems.length > 1) {
          this.submitflag = false;
          console.log('this.submitflag');
          console.log(this.submitflag);
          console.log('Invalid');
          Swal.fire({
            title: 'Invalid Selection(s)',
            text: 'Please follow the selection prompts at the top of the screen corresponding to the selected button.',
            icon: 'error',
            confirmButtonColor: '#3f51b5',
            confirmButtonText: 'OK',
          }).then((result) => {
          });
        } else if (this.sourceSystemId_S == this.sourceSystemId_P) {
          this.submitflag = false;
          console.log('this.submitflag');
          console.log(this.submitflag);
          console.log('Invalid');
          Swal.fire({
            title: 'Invalid Selection(s)',
            text: 'Please follow the selection prompts at the top of the screen corresponding to the selected button.',
            icon: 'error',
            confirmButtonColor: '#3f51b5',
            confirmButtonText: 'OK',
          }).then((result) => {
          });
        } else if (this.selectedPrimaryItem.length == 1 && this.selectedItems.length == 1) {
          this.submitflag = true;
        } else {
          this.submitflag = false;
        }
        console.log('this.submitflag');
        console.log(this.submitflag);


        break;
      }
      case "UPP": {
        //statements;
        if (this.selectedPrimaryItem.length > 1 || this.selectedItems.length > 1) {
          this.submitflag = false;
          console.log('this.submitflag');
          console.log(this.submitflag);
          console.log('Invalid');
          Swal.fire({
            title: 'Invalid Selection(s)',
            text: 'Please follow the selection prompts at the top of the screen corresponding to the selected button.',
            icon: 'error',
            confirmButtonColor: '#3f51b5',
            confirmButtonText: 'OK',
          }).then((result) => {
          });
        } else if (this.uppflag) {
          this.submitflag = true;
          console.log('this.submitflag');
          console.log(this.submitflag);
        }
        break;
      }
      case "UR": {
        //statements;
        console.log('this.selectedItems');
        console.log(this.selectedItems);
        console.log('this.selectedItems.length');
        console.log(this.selectedItems.length);
        if (this.selectedItems.length >= 1) {
          this.getMatchGroup(this.selectedItems);
        } else {
          this.groupCount = 0;
        }
        if (this.selectedMatchGroupId == 0) {
          if (this.unselectedflag_S) {
            this.submitflag = false;
            console.log('this.submitflag');
            console.log(this.submitflag);
            console.log('Invalid');
            Swal.fire({
              title: 'Invalid Selection(s)',
              text: 'Please follow the selection prompts at the top of the screen corresponding to the selected button.',
              icon: 'error',
              confirmButtonColor: '#3f51b5',
              confirmButtonText: 'OK',
            }).then((result) => {
              //this.clearData();
            });
          }
        } else if (this.selectedItems.length > 0) {
          if (this.selectedItems[0]['MatchGroupID'] == this.selectedItems[0]['PrimaryProfile']) {
            this.submitflag = false;
            console.log('this.submitflag');
            console.log(this.submitflag);
            console.log('Invalid');
            Swal.fire({
              title: 'Invalid Selection(s)',
              text: 'Please follow the selection prompts at the top of the screen corresponding to the selected button.',
              icon: 'error',
              confirmButtonColor: '#3f51b5',
              confirmButtonText: 'OK',
            }).then((result) => {
              //this.clearData();
            });
          }
        } else if (this.selectedItems.length >= 1) {
          this.submitflag = true;
          console.log('this.submitflag');
          console.log(this.submitflag);
        }
        break;
      }
      case "DG": {
        //statements;
        if (this.selectedPrimaryItem.length > 1) {
          this.submitflag = false;
          console.log('this.submitflag');
          console.log(this.submitflag);
          console.log('Invalid');
          Swal.fire({
            title: 'Invalid Selection(s)',
            text: 'Please follow the selection prompts at the top of the screen corresponding to the selected button.',
            icon: 'error',
            confirmButtonColor: '#3f51b5',
            confirmButtonText: 'OK',
          }).then((result) => {
            //this.clearData();
          });
        } else if (this.selectedPrimaryId_P_String == 'null' || this.selectedPrimaryId_P_String == '') {
          this.submitflag = false;
          console.log('this.submitflag');
          console.log(this.submitflag);
        } else if (this.selectedPrimaryId_P_String == '') {
          this.submitflag = false;
          console.log('this.submitflag');
          console.log(this.submitflag);
        } else {
          this.submitflag = true;
          console.log('this.submitflag');
          console.log(this.submitflag);
        }
        break;
      }
      default: {
        //statements;
        break;
      }
    }

  }

  getAction() {
    console.log('this.selectedAction');
    console.log(this.selectedAction);
    this.submitflag = false;
    console.log('this.submitflag');
    console.log(this.submitflag);
    if (this.selectedAction == "N") {
      this.loading = true;
      this.getNoMatch();
      this.alertflag = true;
      this.selectedflag = true;
      this.primaryflag = true;
      console.log('this.primaryflag');
      console.log(this.primaryflag);
      this.buttonHeader = ' To create a brand new match group:';
      this.buttonText = ' Designate a primary record for the new group by selecting the “Primary” checkbox of an ' +
        'unmatched record.  Also select at least one additional unmatched record to add to the new match group ' +
        'by selecting its “Match Group” checkbox.  Then click the Submit button.';

    } else if (this.selectedAction == "MR") {
      this.loading = true;
      this.selectedItems = [];
      this.selectedPrimaryItem = [];
      this.getAccountMatch();
      this.alertflag = true;
      this.selectedflag = true;
      this.primaryflag = true;
      console.log('this.primaryflag');
      console.log(this.primaryflag);
      this.buttonHeader = ' To merge a record (add a matched or unmatched non-primary record to an existing match group): ',
        this.buttonText = ' Select the “Match Group” checkbox of the record to be added to the existing match group. ' +
          'Also select the “Primary” checkbox of the designated “Primary Profile” of the existing match group you wish to add the record to.';

    } else if (this.selectedAction == "MG") {
      this.loading = true;
      this.selectedItems = [];
      this.selectedPrimaryItem = [];
      this.getNonMatch();
      this.alertflag = true;
      this.selectedflag = true;
      this.primaryflag = true;
      console.log('this.primaryflag');
      console.log(this.primaryflag);
      this.buttonHeader = ' To merge a group: ',
        this.buttonText = ' Select the “Match Group” checkbox of the group to be added to the existing match group. ' +
          'Also select the “Primary” checkbox of the designated “Primary Profile” of the existing match group you wish to add the group to.';

    } else if (this.selectedAction == "UR") {
      this.loading = true;
      this.selectedItems = [];
      this.selectedPrimaryItem = [];
      this.getMatched();
      this.alertflag = true;
      this.selectedflag = false;
      this.primaryflag = true;
      console.log('this.primaryflag');
      console.log(this.primaryflag);
      this.buttonHeader = ' To ungroup one or more records that are part of an existing match group (remove the record(s) from the match group): ',
        this.buttonText = ' “Select the “Match Group" checkbox of the record(s) you want to remove from the existing match group. ' +
          'Then click the Submit button. Note that you may not remove a “Primary Profile”  ' +
          'designated record from its match group without first updating the Primary Profile.';

    } else if (this.selectedAction == "UPP") {
      this.loading = true;
      this.selectedItems = [];
      this.selectedPrimaryItem = [];
      this.getMatched();
      this.alertflag = true;
      this.selectedflag = true;
      this.primaryflag = true;
      console.log('this.primaryflag');
      console.log(this.primaryflag);
      this.buttonHeader = ' To update the designated "Primary Profile” record of an existing match group: ',
        this.buttonText = ' Select the “Primary” checkbox for the record you want to designate as the new “Primary Profile.”  ' +
          'Also select the “Match Group” checkbox of the record you wish to replace as the “Primary Profile.” Then click the Submit button.';

    } else if (this.selectedAction == "DG") {
      this.loading = true;
      this.selectedItems = [];
      this.selectedPrimaryItem = [];
      this.primaryflag = false;
      console.log('this.primaryflag');
      console.log(this.primaryflag);
      this.getMatched();
      this.alertflag = true;
      this.selectedflag = true;
      this.buttonHeader = ' To dissolve entire group (ungroup existing match group): ',
        this.buttonText = ' Select the "Primary” checkbox of the designated “Primary Profile” record of the existing match group you want to completely dissolve. Then click the Submit button';
    }
  }

  submitBox() {

    switch (this.selectedAction) {
      case "N": {
        //statements;
        Swal.fire({
          title: 'New match group will be created',
          text: 'You will be creating a new match group. Do you want to create a brand new match group?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3f51b5',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.value) {
            this.submit(this.selectedAction);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', '', 'error');
            //   console.log('clear data')
            //   this.clearData();
          }
        });
        break;
      }
      case "MR": {
        //statements;
        Swal.fire({
          title: 'The selected record(s) will be added to the existing match group',
          text: 'You have selected the “Primary” checkbox of the primary profile record for existing match group  ' + this.selectedPrimaryId_S_String + ' and have also selected the “Match Group” checkbox for one or more record(s). Do you want to add these selected records to existing match group ID  ' + this.selectedPrimaryId_P_String + '?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3f51b5',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.value) {
            this.submit(this.selectedAction);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', '', 'error');
            //   console.log('clear data')
            //   this.clearData();
          }
        });
        break;
      }
      case "MG": {
        Swal.fire({
          title: 'The selected records will be added to the existing match group',
          text: 'You have selected the “Primary” checkbox of the primary profile record for existing match group  ' + this.selectedPrimaryId_S_String + ' and have also selected the “Match Group” checkbox for match group ID ' + this.selectedPrimaryId_P_String + '. Do you want to add these selected match group to existing match group ID  ' + this.selectedPrimaryId_P_String + '?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3f51b5',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.value) {
            console.log('result.value');
            console.log(result.value);
            this.submit(this.selectedAction);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', '', 'error');

          }
        });

        break;
      }
      case"DG": {
        //statements;
        Swal.fire({
          title: 'Entire match group will be dissolved',
          text: 'You have selected the “Primary” checkbox of the “Primary Profile” of existing match group  ' + this.selectedPrimaryId_P_String + '? ' +
            'This will result in match group ' + this.selectedPrimaryId_P_String + ' being entirely dissolved (ungrouped).  Are you sure you wish to ungroup all of match group ' + this.selectedPrimaryId_P_String + '? ',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3f51b5',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.value) {
            this.removeMatch();
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', '', 'error');
            //this.clearData();
          }
        });
        break;
      }
      case "UR": {
        //statements;
        if (this.selectedMatchGroupId_S_String == this.selectedPrimaryId_P_String) {
          //dissolve group}
          Swal.fire({
            title: 'Entire match group will be dissolved',
            text: 'You have selected the “Primary” checkbox of the “Primary Profile” of existing match group  ' + this.selectedPrimaryId_P_String + '? ' +
              'This will result in match group ' + this.selectedPrimaryId_P_String + ' being entirely dissolved (ungrouped).  Are you sure you wish to ungroup all of match group ' + this.selectedPrimaryId_P_String + '? ',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3f51b5',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.value) {
              this.removeMatch();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire('Cancelled', '', 'error');
              //this.clearData();

            }
          });
        } else {
          Swal.fire({
            title: 'Selected record(s) will be removed from existing matching group',
            text: 'Are you sure you want to remove the selected record(s) from Match Group  ' + this.currentMatchGroupId_S + '?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3f51b5',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.value) {
              this.removeMatch();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire('Cancelled', '', 'error');
              console.log('clear data')
              this.clearData();

            }
          });
        }
        break;

      }
      case  "UPP": {
        //statements;
        Swal.fire({
          title: 'The primary profile of existing match group ' + this.currentMatchGroupId_P + ' will be updated',
          text: 'Do you want to update the primary profile of existing match group  ' + this.currentMatchGroupId_P + '?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3f51b5',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.value) {
            this.updatePrimaryProfile();
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', '', 'error');
            //   console.log('clear data')
            //   this.clearData();

          }
        });
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }

  onClose() {
    this.alertflag = false;
    this.buttonHeader = '';
    this.buttonText = '';
  }

  async getAccountMatch(refresh = false) {
    try {
      this.accountMatch = await this.httpService.getAccountMatch().pipe(first()).toPromise()
      this.accountMatchSource.data = this.accountMatch;
      this.accountMatchSource.paginator = this.paginator;
      this.applyFilter(this.accountMatchFilter);
      //this.loading = false;

      this.zone.run(() => {
      });

      if (refresh) this.dataService.successMsg('Account Matched data. Success.');
    } catch (e) {
      this.dataService.errorMsg('Unable to get Account Matches. Please try again.');
      //console.log('ACCOUNT MATCH ERROR: ', e);
    }
  }

  async searchAll() {
    try {
      this.accountMatch = await this.httpService.getAccountMatch().pipe(first()).toPromise()
      this.accountMatchSource.data = this.accountMatch;
      this.accountMatchSource.paginator = this.paginator;
      this.applyFilter(this.accountMatchFilter);
      //this.loading = false;
      this.zone.run(() => {
      });

    } catch (e) {
      this.dataService.errorMsg('Unable to get Account Matches. Please try again.');
      //console.log('ACCOUNT MATCH ERROR: ', e);
    }
  }

  async changePrimaryProfile(changes) {
    //console.log(changes);
    this.accountMatch = await this.httpService.updateAccountMatch(changes).pipe(first()).toPromise();
    this.accountMatchSource = new MatTableDataSource(this.accountMatch);
    //this.loading = false;
  }

  async getPrimaryDesc() {
    try {
      this.currentPrimary = await this.httpService.getPrimaryDesc().pipe(first()).toPromise()
      this.maxPrimaryId = this.currentPrimary[0]['PrimaryProfile']
      console.log('this.maxPrimaryId');
      console.log(this.maxPrimaryId);
      //this.loading = false;
      this.zone.run(() => {
      });
    } catch (e) {
      this.dataService.errorMsg('Unable to get Account Primary Profile. Please try again.');
      //console.log('ACCOUNT MATCH ERROR: ', e);
    }
  }

  async updateAccountMatch(changes) {
    //console.log(changes);
    try {
      this.accountMatch = await this.httpService.updateAccountMatch(changes).pipe(first()).toPromise();
      this.accountMatchSource.data = this.accountMatch;
      this.accountMatchSource.paginator = this.paginator;
      this.applyFilter(this.accountMatchFilter);
      this.getPrimaryDesc();
      // this.loading = false;
      console.log('clear data')
      this.clearData();
      this.dataService.successMsg('Account Matched data. Success.');
    } catch (e) {
      console.error(e);
      this.dataService.errorMsg('Unable to update account match. Try Again.');
    }
  }

  async removeAccountMatch(changes) {
    console.log(changes);
    try {
      this.accountMatch = await this.httpService.removeMatch(changes).pipe(first()).toPromise();

      this.accountMatchSource.data = this.accountMatch;
      this.accountMatchSource.paginator = this.paginator;
      this.applyFilter(this.accountMatchFilter);
      this.getPrimaryDesc();
      // this.loading = false;
      console.log('clear data')
      this.clearData();
      this.dataService.successMsg('Account Matched data. Success.');
    } catch (e) {
      console.error(e);
      this.dataService.errorMsg('Unable to update account match. Try Again.');
    }
  }

  async getMatchGroup(id) {
    console.log('getGroupCount');
    console.log(id);
    this.groupCount = 0;
    try {
      this.accountMatch = await this.httpService.getMatchGroup(id).pipe(first()).toPromise();

      this.groupCount = this.accountMatch.length;
      this.groupCount = this.groupCount - 1;
      console.log(this.groupCount);
      if (this.groupCount == 1) {
        this.submitflag = false;
        console.log('this.submitflag');
        console.log(this.submitflag);
        console.log('Invalid');
        Swal.fire({
          title: 'Invalid Selection(s)',
          text: 'Please follow the selection prompts at the top of the screen corresponding to the selected button.',
          icon: 'error',
          confirmButtonColor: '#3f51b5',
          confirmButtonText: 'OK',
        }).then((result) => {
          //this.clearData();
        });
      } else if (this.groupCount == 2 && this.selectedItems.length == 2) {
        this.submitflag = false;
        console.log('this.submitflag');
        console.log(this.submitflag);
        console.log('Invalid');
        Swal.fire({
          title: 'Invalid Selection(s)',
          text: 'Please follow the selection prompts at the top of the screen corresponding to the selected button.',
          icon: 'error',
          confirmButtonColor: '#3f51b5',
          confirmButtonText: 'OK',
        }).then((result) => {
          //this.clearData();
        });
      }
      //this.loading = false;
      //  this.dataService.successMsg('Account Match updated.');
    } catch (e) {
      console.error(e);
      this.dataService.errorMsg('Unable to update account match. Try Again.');
    }
  }

  async getNonMatch() {
    try {

      this.accountMatch = await this.httpService.getNonMatch().pipe(first()).toPromise()
      this.accountMatchSource.data = this.accountMatch;
      this.accountMatchSource.paginator = this.paginator;
      this.applyFilter(this.accountMatchFilter);
      //this.loading = false;

      this.zone.run(() => {
      });
      this.dataService.successMsg('Account Matched data. Success');
    } catch (e) {
      this.dataService.errorMsg('Unable to get Account Non Matches. Please try again.');
      //console.log('ACCOUNT MATCH ERROR: ', e);
    }
  }

  async getNoMatch() {
    console.log('getNoMatch');
    try {

      this.accountMatch = await this.httpService.getNoMatch().pipe(first()).toPromise()
      this.accountMatchSource.data = this.accountMatch;
      this.accountMatchSource.paginator = this.paginator;
      this.applyFilter(this.accountMatchFilter);
      //this.loading = false;
      this.zone.run(() => {
      });
      this.dataService.successMsg('Account Match data. Success.');
    } catch (e) {
      this.dataService.errorMsg('Unable to get Account No Matches. Please try again.');
      //console.log('ACCOUNT MATCH ERROR: ', e);
    }
  }

  async getMatched() {
    console.log('getMatched');
    try {

      this.accountMatch = await this.httpService.getMatched().pipe(first()).toPromise()
      this.accountMatchSource.data = this.accountMatch;
      this.accountMatchSource.paginator = this.paginator;
      this.applyFilter(this.accountMatchFilter);
      //this.loading = false;
      this.zone.run(() => {
      });
      this.dataService.successMsg('Account Matched data. Success');
    } catch (e) {
      this.dataService.errorMsg('Unable to get Account Matched. Please try again.');
      //console.log('ACCOUNT MATCH ERROR: ', e);
    }
  }

  async getPrimaryOnly() {
    try {

      this.accountMatch = await this.httpService.getPrimary().pipe(first()).toPromise()
      this.accountMatchSource.data = this.accountMatch;
      this.accountMatchSource.paginator = this.paginator;
      this.applyFilter(this.accountMatchFilter);
      //this.loading = false;
      this.zone.run(() => {
      });
      this.dataService.successMsg('Account Matched data. Success.');
    } catch (e) {
      this.dataService.errorMsg('Unable to get Account Match Data. Please try again.');
      //console.log('ACCOUNT MATCH ERROR: ', e);
    }
  }

  async removeMatch() {
    if (this.selectedItems.length == 0 && this.selectedPrimaryItem.length == 0) {
      console.log('Invalid');
      Swal.fire({
        title: 'Invalid Selection(s)',
        text: 'Please follow the selection prompts at the top of the screen corresponding to the selected button.',
        icon: 'error',
        confirmButtonColor: '#3f51b5',
        confirmButtonText: 'Ok',

      }).then((result) => {
        console.log('clear data')
        this.clearData();
      });
    } else {
      // console.log('this.selectedItems.length');
      // console.log(this.selectedItems.length);
      // if (this.selectedItems.length > 15) {
      //   this.height = "100%"
      // } else {
      //   this.height = "auto"
      // }
      this.dialog.open(RemoveComponent, {
        data: {
          selectedItems: this.selectedItems,
          primaryItem: this.selectedPrimaryItem,
          primaryId: this.selectedPrimaryId_P_String,
        },
        hasBackdrop: true,
        disableClose: true,
        autoFocus: false,
        height: "100%"
      }).afterClosed().subscribe(changes => {
        //console.log(changes);
        if (changes) {
          console.log('CHANGES ');
          console.log(changes);
          this.removeAccountMatch(changes);
          // this.loading = false;
          this.dataService.successMsg('Account Matched data. Success.');
          console.log('clear data')
          this.clearData();

        }

      });

    }
  }


}

