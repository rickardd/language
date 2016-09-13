import {Component} from 'angular2/core'
import {ListService} from './list.service'

import {Translation, List} from '../shared/translation'

@Component({
  selector: "private-list",
  templateUrl: "app/lists/private.component.html",
  styleUrls: [ "app/lists/bar.css"],
  providers: [
    ListService
  ]
})

export class PrivateListComponent{

  list : List = new List()
  quantity : number
  hasTranslations : boolean = false

  constructor( private _listService : ListService ){

  }

  ngOnInit(){
    this._listService.getPrivateList()
            .subscribe( response => {
              console.log( !!response && response.length !== 0);
              if( !!response && response.length !== 0 ) this.hasTranslations = true
              this.list = new List( response )
              this.quantity = this.list.quantity()
            })
  }

  onRemoveTranslation( $event ){
    let elm : any = $event.target
    let id : number = parseInt( elm.id, 10 )

    // ToDo: ugly. Remove translation from the list variable insted.
    elm.parentNode.parentElement.remove()

    this._listService.removeTranslationFromList( id )
            .subscribe( response => {
              console.log( response , "Removed")
            })
  }
}