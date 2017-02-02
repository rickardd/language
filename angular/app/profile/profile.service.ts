import { Injectable } from 'angular2/core';
import { Http, Headers } from 'angular2/http';
import 'rxjs/add/operator/map'
// import localStorage from 'localStorage';

@Injectable()

export class ProfileService {

  rootUrl = "http://localhost:3001/"

  constructor(private _http: Http) {

  }

  getUser(){
    return this._http.get('http://localhost:3001/scores/total')
      .map( resulut => resulut.json() )
  }

}