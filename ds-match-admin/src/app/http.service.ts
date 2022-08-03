import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = environment.apiBaseUrl;
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
    "Content-Type": "application/json"
  })

  // ipAddress = ""

  constructor(
    private http: HttpClient
  ) {
    // this.getIPAddress();
  }

  login(email: string, password: string) {
    return this.http.post('/api/login', {email, password});
  }

  getAccountMatch() {
    return this.http.get('/api/accountMatch');
  }

  getPrimaryDesc() {
    return this.http.get('/api/primaryDesc');
  }

  updateAccountMatch(p) {
    return this.http.post('/api/updateAccountMatch', p);
  }

  removeMatch(p) {
    return this.http.post('/api/removeMatch', p);
  }

  getMatchGroup(id) {
    //console.log(id);
    return this.http.post('/api/matchgroup', id);
  }

  getNonMatch() {
    return this.http.get('/api/nonMatch');
  }

  getNoMatch() {
    return this.http.get('/api/noMatch');
  }

  getMatched() {
    return this.http.get('/api/matched');
  }

  getPrimary() {
    return this.http.get('/api/primary');
  }

  // getIPAddress() {
  //   return this.http.get("https://api.ipify.org/?format=json").subscribe((res:any)=>{
  //     this.ipAddress = res.ip;
  //     console.log("IP ADDRESS: ", this.ipAddress)
  //   });
  // }
  getSelectedItemsMerge(p) {
    return this.http.post('/api/selectedItemsMerge', p);
  }
}
