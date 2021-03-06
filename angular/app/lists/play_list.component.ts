import {Component} from 'angular2/core'
import {RouterLink} from 'angular2/router'
import {ListService} from './list.service'

import {Translation, List} from '../shared/translation'
import {StrengthComponent} from '../wigets/strength/strength.component'

@Component({
  selector: "play-list",
  templateUrl: "app/lists/play_list.component.html",
  styleUrls: [ "app/lists/bar.css", "app/lists/general_list.css"],
  providers: [
    ListService
  ],
  directives: [
    RouterLink,
    StrengthComponent
  ]
})

export class PlayListComponent{

  list : List = new List()
  quantity : number
  hasTranslations : boolean = false
  isFetchingData : boolean = true

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
    let translation = this.list.getTranslation( id )
    let newList : List = this.list.removeTranslation( id )

    console.log(translation);

    this.updateList( newList )

    this._listService.removeTranslationFromList( id, translation.type )
            .subscribe(
              response => {
                console.log( response );
              },
              error =>{
                alert( "Translation could NOT be removed" );
                console.error( "Error during removal of translation from my_list",  error );
              }
            )
  }

  updateList( list ){
    this.isFetchingData = false
    this.list = new List( list )
    this.quantity = this.list.quantity()
    this.hasTranslations = ( !!list && list.length !== 0 ) ? true : false ;
  }

}