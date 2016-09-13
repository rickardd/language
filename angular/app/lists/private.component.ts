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

  constructor( private _listService : ListService ){

  }

  ngOnInit(){
    this._listService.getPrivateList()
            .subscribe( response => {
              this.list = new List( response )
              this.quantity = this.list.quantity()
              console.log(this.quantity);
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