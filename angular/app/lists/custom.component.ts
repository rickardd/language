import {Component} from 'angular2/core'
import {ListService} from './list.service'
import {ControlGroup, FormBuilder} from 'angular2/common'

import {Translation, List} from '../shared/translation'

@Component({
  selector: "custom-list",
  templateUrl: "app/lists/custom.component.html",
  providers: [
    ListService
  ]
})

export class CustomListComponent{

  list : List = new List()
  form : ControlGroup

  constructor( private _listService : ListService, private _fb : FormBuilder ){

  }

  ngOnInit(){
    this.form = this._fb.group( { spanish: [""], english: [""] } )
    this.getList()
  }
  getList(){
    this._listService.getCustomList()
              .subscribe( response => {
                this.list = new List( response )
              })
  }

  onAddTranslation( $event ) : void{
    console.log("submit", this.form.value.english);
    // translation = new Translation( { spanish: "test", english: "eng-test"} )
    this._listService.addTranslation( { spanish: this.form.value.spanish, english: this.form.value.english } )
            .subscribe( response => {
              console.log( response , "Translatoin added")
              // ToDo: Unnessesary request. Try to push the new translation to list instead
              this.getList()
            })
  }
}