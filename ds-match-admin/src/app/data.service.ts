import {Injectable, NgZone} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private zone: NgZone,
    private snackbar: MatSnackBar
  ) { }

  successMsg(msg: string) {
    this.zone.run(() => {
      this.snackbar.open(msg, undefined, {
        panelClass: 'snackbar-success'

      });
    });
  }

  successPPMsg(msg: string) {
    this.zone.run(() => {
      this.snackbar.open(msg, undefined, {

        verticalPosition: 'top',
        panelClass: ['yellow-snackbar']
      });
    });
  }

  errorMsg(msg: string) {
    this.zone.run(() => {
      this.snackbar.open(msg, undefined, {
        panelClass: 'snackbar-error'
      });
    });
  }
}
