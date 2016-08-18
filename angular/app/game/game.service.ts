import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http'
import 'rxjs/add/operator/map'

@Injectable()

export class GameService{

  private rootUrl = "http://localhost:3001/"

  constructor( private _http : Http ){

  }

  getWord( wordId ){
    return this._http.get( this.url("translations/" + wordId) )
                .map( response => response.json())
  }
  getScore( wordId ){
    // return this._jsonp.request(this.url("score/translations/" + wordId), { method: 'Get' })
    return this._http.put( this.url("score/translations/" + wordId), JSON.stringify([{}]) )
    // return this._http.get( this.url("score/translations/" + wordId) )
                .map( response => response.json())
  }
  updateScore( word ){
    return this._http.put(this.url("score/translations/" + word.id ), JSON.stringify(word))
                .map( response => response.json())


  }

  private
    url( urlExtention ){
      return this.rootUrl + urlExtention + ".json";
    }
}

