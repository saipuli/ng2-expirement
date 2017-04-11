import { Component, OnInit } from '@angular/core';
import {AdalService} from 'ng2-adal/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'home',
  template: `<div protected>
  <h1>
    Welcome - {{this.adalService.userInfo.userName}}
  </h1>
  <h3 [hidden]="!valuesError"> error with values- {{valuesError}} </h3>
  <table class="table table-striped table-bordered table-condensed table-hover" [hidden]="error">
    <thead>
        <tr>
            <th>Values</th>
        </tr>
    </thead>
    <tbody>
      <tr *ngFor="let hero of values" (click)="getDetails()"><td>{{hero}}</td></tr>
    </tbody>
  </table>
  <h3 [hidden]="!detailsError"> error with details - {{detailsError}} </h3>
  <div>
    <span>{{details}}</span>
  </div>
  <button (click)="logOut()">Logout</button></div>`
})
export class HomeComponent implements OnInit {
  values: string[];
  valuesError = '';
  details: string;
  detailsError = '';

  constructor(
    private adalService: AdalService,
    private http: Http
  ) {
    console.log('Entering home');
  }

  ngOnInit() {
    this.getValues().subscribe((data: string[]) => this.values = data, (err: any) => this.valuesError = err);
  }

  public logOut() {
    this.adalService.clearCache();
    this.adalService.logOut();
  }

  getValues(): Observable<string[]> {
    let h = this.getHeaders('http://localhost:5000/api/values');
    return this.http.get('http://localhost:5000/api/values', {headers: h})
                    .map(function(res: Response){
                      let body = res.json();
                      return body || [];
                    })
                    .catch(function(err: any){
                      return Observable.throw(err.statusText);
                    });
  }

  getDetails() {
    console.log('getting details');
    let h = this.getHeaders('http://localhost:5000/api/values/5');
    (this.http.get('http://localhost:5000/api/values/5', {headers: h})
                    .map(function(res: Response){
                      let body = res.text();
                      console.log(body);
                      return body || '';
                    })
                    .catch(function(err: any){
                      return Observable.throw(err.statusText);
                    })).subscribe((data: string) => this.details = data, (err: any) => this.detailsError = err);
  }

  private getHeaders(url: string): any {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };

    let resource = this.adalService.GetResourceForEndpoint(url);
    // console.log(resource);
    let cachedToken = this.adalService.getCachedToken(resource);
    // console.log('Cached: ' + cachedToken);
    if (cachedToken) {
      headers['Authorization'] = 'Bearer ' + cachedToken;
    } else {
      this.adalService
      .acquireToken(resource)
      .subscribe((token: string) => {
        console.log('Acquired: ' + token);
        headers['Authorization'] = 'Bearer ' + token;
      });
    }
    return headers;
  }
}
