import {Component} from 'angular2/core'
import {ListService} from './list.service'

import {Translation, List} from '../shared/translation'

@Component({
  selector: "gloabal-list",
  templateUrl: "app/lists/global.component.html",
  providers: [
    ListService
  ]
})

export class GlobalListComponent{

  list : List = new List()

  constructor( private _listService : ListService ){

  }

  ngOnInit(){
    this._listService.getGlobalList()
            .subscribe( response => {
              this.list = new List( response )
            })
  }

  onAddTranslation( $event ){
    let elm : any = $event.target
    let id : number = parseInt( elm.id, 10 )

    elm.className = elm.className += " button-disabled"
    elm.innerHTML = "Added"

    this._listService.addTranslationToList( id )
            .subscribe( response => {
            })
  }
}