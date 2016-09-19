import {Component} from 'angular2/core'
import {ListService} from './list.service'

import {Translation, List} from '../shared/translation'

@Component({
  selector: "play-list",
  templateUrl: "app/lists/play_list.component.html",
  styleUrls: [ "app/lists/bar.css"],
  providers: [
    ListService
  ]
})

export class PlayListComponent{

  list : List = new List()
  quantity : number
  hasTranslations : boolean = false

  constructor( private _listService : ListService ){

  }

  ngOnInit(){
    this._listService.getPrivateList()
            .subscribe( response => {
              this.updateList( response )
            })
  }

  onRemoveTranslation( $event ){
    let elm : any = $event.target
    let id : number = parseInt( elm.id, 10 )
    let newList : List = this.list.removeTranslation( id )

    this.updateList( newList )

    this._listService.removeTranslationFromList( id )
            .subscribe( response => {

            })
  }

  updateList( list ){
    this.list = new List( list )
    this.quantity = this.list.quantity()
    this.hasTranslations = ( !!list && list.length !== 0 ) ? true : false ;
    console.log( "update", list);
  }

}