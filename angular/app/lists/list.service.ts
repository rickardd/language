import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http'
import "rxjs/add/operator/map"

@Injectable()

export class ListService{

  private _urlRoot = "http://localhost:3001"

  constructor( private _http : Http){

  }
  // put this in an object like _listService.private.getAll()
  getPrivateList(){
    return this._http.get( this._urlRoot + "/lists/private")
                 .map( response => response.json())
  }
  getGlobalList(){
    return this._http.get( this._urlRoot + "/lists/global")
                 .map( response => response.json())
  }
  addTranslationToList( id : number ){
    return this._http.post( this._urlRoot + "/lists/private/translation/" + id, JSON.stringify("{id: id}") )
                .map( response => response.json() )
  }
  removeTranslationFromList( id : number ){

    return this._http.delete( this._urlRoot + "/lists/private/translation/" + id )
                .map( response => {

                })
  }

}