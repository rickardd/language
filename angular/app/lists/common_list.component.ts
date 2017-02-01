import {Component} from 'angular2/core'
import {ListService} from './list.service'

import {Translation, List} from '../shared/translation'
import {StrengthComponent} from '../wigets/strength/strength.component'

@Component({
  selector: "common-list",
  templateUrl: "app/lists/common_list.component.html",
  styleUrls: [ "app/lists/bar.css", "app/lists/general_list.css"],
  providers: [
    ListService
  ],
  directives: [
    StrengthComponent
  ]
})

export class CommonListComponent{

  list : List = new List()
  quantity : number
  isFetchingList : boolean = true

  constructor( private _listService : ListService ){

  }

  ngOnInit(){
    this._listService.getGlobalList()
            .subscribe( response => {
              this.isFetchingList = false
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