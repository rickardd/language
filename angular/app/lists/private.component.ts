import {Component} from 'angular2/core'
import {ListService} from './list.service'

import {Translation, List} from '../shared/translation'

@Component({
  selector: "private-list",
  templateUrl: "app/lists/private.component.html",
  providers: [
    ListService
  ]
})

export class PrivateListComponent{

  list : List = new List()

  constructor( private _listService : ListService ){

  }

  ngOnInit(){
    this._listService.getPrivateList()
            .subscribe( response => {
              this.list = new List( response )
            })
  }

}