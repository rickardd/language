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

  onAddToPrivate( $event, verbType : string ){
    let id = $event.target.dataset.id
    console.log("adding " + verbType + " to my_list with id " + id);
    this._listService.addVerbToPlayList( id, verbType )
            .subscribe( response => {
              console.log( response );
            })
  }
}