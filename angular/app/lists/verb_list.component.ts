import {Component} from 'angular2/core'
import {ListService} from './list.service'

import {VerbConjugation} from '../shared/verb_translation'

@Component({
  selector: "verb-list",
  templateUrl: "app/lists/verb_list.component.html",
  styleUrls: [ "app/lists/verb_list.component.css"],
  providers: [
    ListService
  ]
})

export class VerbListComponent{

  // list : List = new List()
  quantity : number
  list : any[]

  constructor( private _listService : ListService ){

  }

  ngOnInit(){
    this._listService.getVerbList()
            .subscribe( response => {
              // this.list = new List( response )
              // this.quantity = this.list.quantity()
              console.log(response);
              this.list = response
              // response.forEach( function( item ){
              //   console.log( item )
              // })


            })
  }

  onAddVerbToPrivate( $event, type ){
    let id = $event.target.dataset.id
    console.log("adding " + type + " to my_list with id " + id);
    this._listService.addVerbToPlayList( id )
            .subscribe( response => {
              console.log( response );
            })
  }

  onAddTensToPrivate(){
    console.log("adding tens to my_list");
  }

  // onAddToPrivate( $event ){
  //   let elm : any = $event.target
  //   let id : number = parseInt( elm.id, 10 )

  //   elm.className = elm.className += " button-disabled"
  //   elm.innerHTML = "Added"

  //   this._listService.addTranslationToPlayList( id )
  //           .subscribe( response => {
  //           })
  // }
}