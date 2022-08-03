import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class ObservableService {

  private saveMerge = new Subject<any>();

  announceSaveMerge(merge) {
    this.saveMerge.next(merge);
  }
}
