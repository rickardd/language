import {Component} from 'angular2/core'
import {ListService} from './list.service'

import {Translation, List} from '../shared/translation'

@Component({
  selector: "common-list",
  templateUrl: "app/lists/common_list.component.html",
  styleUrls: [ "app/lists/bar.css"],
  providers: [
    ListService
  ]
})

export class CommonListComponent{

  list : List = new List()
  quantity : number

  constructor( private _listService : ListService ){

  }

  ngOnInit(){
    this._listService.getGlobalList()
            .subscribe( response => {
              this.list = new List( response )
              this.quantity = this.list.quantity()
            })
  }

  onAddToPrivate( $event ){
    let elm : any = $event.target
    let id : number = parseInt( elm.id, 10 )

    elm.className = elm.className += " button-disabled"
    elm.innerHTML = "Added"

    this._listService.addTranslationToPlayList( id )
            .subscribe( response => {
            })
  }
}