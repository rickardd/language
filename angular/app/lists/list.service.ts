import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http'
import "rxjs/add/operator/map"

import {Translation} from '../shared/translation'

@Injectable()

export class ListService{

  private _urlRoot = "http://localhost:3001"

  constructor( private _http : Http){

  }
  // put this in an object like _listService.private.getAll()

  getCustomList(){
    return this._http.get( this._urlRoot + "/lists/custom")
                 .map( response => response.json())
  }
  getPrivateList(){
    return this._http.get( this._urlRoot + "/lists/private")
                 .map( response => response.json())
  }
  getGlobalList(){
    return this._http.get( this._urlRoot + "/lists/global")
                 .map( response => response.json())
  }
  getVerbList(){
    return this._http.get( this._urlRoot + "/verbs")
                 .map( response => response.json())
  }
  addTranslationToPlayList( id : number ){
    console.log("add to play-list", id);
    return this._http.post( this._urlRoot + "/lists/private/translation/" + id, JSON.stringify("{id: id}") )
                .map( response => response.json() )
  }
  addVerbToPlayList( id : number ){
    console.log("SERVICE: Adding verb " + id + " to play-list");
    return this._http.post( this._urlRoot + "/lists/private/verb/" + id, JSON.stringify("{id: id}") )
                // .map( response => response.json() )
  }
  removeTranslationFromList( id : number, translation_type : string ){
    return this._http.delete( this._urlRoot + "/lists/private/" + translation_type + "/" + id )
                .map( response => {

                })
  }
  // todo: Add the translation type
  addTranslation( translation /*translation : Translation*/ ){
    return this._http.post( this._urlRoot + "/translations/", JSON.stringify( translation ) )
                .map( response => response.json() )
  }
  removeTranslation( translation_id : number ){
    return this._http.delete( this._urlRoot + "/translations/" + translation_id )
                .map( response => response.json() )
  }

  updateTranslation( translation ){
    console.log( translation );
    return this._http.put( this._urlRoot + "/translations/" + translation.id, JSON.stringify( translation ) )
                .map( response => response.json() )
  }

}