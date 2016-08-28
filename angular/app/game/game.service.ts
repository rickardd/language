import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http'
import 'rxjs/add/operator/map'

import {Translation} from '../shared/translation'


@Injectable()

export class GameService{

  private rootUrl = "http://localhost:3001/"

  constructor( private _http : Http ){

  }

  // toDo: rename to getTranslation
  getWord( wordId? : number ){
    let url : string
    if(wordId) {url = this.url("translations/" + wordId) }
    else { url = this.url("translations") }
    return this._http.get( url ).map( response => response.json())
  }
  getScore( wordId : number ){
    return this._http.put( this.url("score/translations/" + wordId), JSON.stringify([{}]) )
                .map( response => response.json())
  }
  updateScore( word : Translation ){
    return this._http.put(this.url("score/translations/" + word.id ), JSON.stringify(word))
                .map( response => response.json())
  }

  private
    url( urlExtention ){
      return this.rootUrl + urlExtention + ".json";
    }
}

