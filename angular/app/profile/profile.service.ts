import { Injectable } from 'angular2/core';
import { Http, Headers } from 'angular2/http';
import 'rxjs/add/operator/map'
// import localStorage from 'localStorage';

@Injectable()

export class ProfileService {

  rootUrl = "http://localhost:3001/"

  constructor(private _http: Http) {

  }

  getProfile() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this._http
      .get('/profile', { headers })
      .map(res => res.json());
  }

  getBuckets(){
    return this._http.get('http://localhost:3001/scores/total')
      .map( resulut => resulut.json() )
  }

  getUserStats( userId? : number = -1 ){
    let url = this.rootUrl + "scores/stats/" + userId
    return this._http.get( url )
                .map( result => result.json() )
  }
}