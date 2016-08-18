import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http'
import 'rxjs/add/operator/map'

@Injectable()

export class StatsService{

  constructor( private _http: Http ){

  }

  getTotal(){
    return this._http.get('http://localhost:3001/scores/total')
      .map( resulut => resulut = resulut.json() )
  }


}