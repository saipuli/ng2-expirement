import {Component} from '@angular/core';
import {AdalService} from 'ng2-adal/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'home',
  template: `<div protected>
  <h1>
    This is the dashboard page. - {{this.adalService.userInfo.userName}}
  </h1>
  <table class="table table-striped table-bordered table-condensed table-hover">
    <thead>
        <tr>
            <th>Claim</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        <tr data-ng-repeat="claim in this.adalService.claims">
            <td>{{claim.key}}</td>
            <td>{{claim.value}}</td>
        </tr>
    </tbody>
  </table>
  <button (click)="logOut()">Logout</button></div>`
})
export class HomeComponent {

  constructor(
    private adalService: AdalService,
    private http: Http
  ) {
    console.log('Entering home');
  }

  public logOut() {
    this.adalService.logOut();
  }

  getHeroes(): Observable<string[]> {
    return this.http.get('http://localhost:5000/api/values')
                    .map(function(res: Response){
                      let body = res;
                      return body || [];
                    });
  }
}
