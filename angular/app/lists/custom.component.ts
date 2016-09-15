import {Component, ViewChild} from 'angular2/core'
import {ListService} from './list.service'
import {ControlGroup, FormBuilder} from 'angular2/common'

import {Translation, List} from '../shared/translation'

@Component({
  selector: "custom-list",
  templateUrl: "app/lists/custom.component.html",
  styleUrls: [ "app/lists/bar.css"],
  providers: [
    ListService
  ]
})

export class CustomListComponent{

  @ViewChild('inputSpanish') inputSpanish;
  @ViewChild('editFormElement') editFormElement;
  @ViewChild('tableBody') tableBody;


  list : List = new List()
  form : ControlGroup
  editForm : ControlGroup
  quantity : number
  closeEditTranslation : boolean = true


  constructor( private _listService : ListService, private _fb : FormBuilder ){

  }

  ngOnInit(){
    this.form = this._fb.group({
                                spanish: [""],
                                english: [""],
                                context: [""],
                                category: [""]
                              })

    this.editForm = this._fb.group({
                                spanish: ["hello"],
                                english: [""],
                                context: [""],
                                category: ["asdf"]
                              })


    this.getList()
  }
  getList( affectedElement? ){
    this._listService.getCustomList()
              .subscribe( response => {
                this.list = new List( response )
                this.quantity = this.list.quantity()

                if( !!affectedElement ){
                  console.log(affectedElement);
                }
              })
  }

  onAddTranslation( $event ) : void{
    this.inputSpanish.nativeElement.focus()
    // translation = new Translation( { spanish: "test", english: "eng-test"} )
    this._listService
            .addTranslation({
              spanish: this.form.value.spanish,
              english: this.form.value.english,
              context: this.form.value.context,
              category: this.form.value.category
            })
            .subscribe( response => {
              // ToDo: Unnessesary request. Try to push the new translation to list instead
              // See onDeleteTranslation()
              this.getList()
              this.form.controls["spanish"].updateValue("")
              this.form.controls["english"].updateValue("")
              this.form.controls["context"].updateValue("")
              this.form.controls["category"].updateValue("")
            })
  }

  onAddToPrivate( $event ){
    let elm : any = $event.target
    let id : number = parseInt( elm.id, 10 )

    elm.className = elm.className += " button-disabled"
    elm.innerHTML = "Added"

    this._listService.addTranslationToList( id )
            .subscribe( response => {
            })
  }

  onDeleteTranslation( $event ){
    this._listService.removeTranslation( $event.target.id )
            .subscribe( response => {
              this.list = new List( response )
            })
  }

  onEditTranslation( $event ){
    let id = $event.target.dataset.id
    let translation = this.list.getTranslation( id )
    let formElement = this.editFormElement.nativeElement

    formElement.setAttribute("data-id", id )
    this.closeEditTranslation = false
    this.editForm.controls["spanish"].updateValue( translation.spanish )
    this.editForm.controls["english"].updateValue( translation.english )
    this.editForm.controls["context"].updateValue( translation.context )
    this.editForm.controls["category"].updateValue( translation.category )

  }

  onUpdateTranslation( $event ){
    this.closeEditTranslation = true
    let id = this.editFormElement.nativeElement.dataset.id
    this._listService
            .updateTranslation({
              id: id,
              spanish: this.editForm.value.spanish,
              english: this.editForm.value.english,
              context: this.editForm.value.context,
              category: this.editForm.value.category
            })
            .subscribe( response => {
              // this.tableBody.querySelector('#translation-' + id )
              let row = this.tableBody.nativeElement.querySelector('#translation-' + id )
              this.getList( row )
            })
  }

  onCancelEditTranslation( $event ){
    console.log("cancel edit");
    this.closeEditTranslation = true
  }
}


//     atempts  failure  success


// 2-x:  2        1        1     | ?
// 1:    1        1        0     | 1
// 4-x:  4        2        2     | ?
// 2:    2        2        0     | 2
// 6-x:  6        3        3     | ?
// 3:    3        3        0     | 3
// 8-x:  8        4        4     | ?
// 4:    4        4        0     | 4
// 10-x: 10       5        5     | ?
// 5:    5        5        0     | 5
// 12-x: 12       6        6     | ?
// 6:    6        6        0     | 6
// 7:    7        7        0     | 7
// 8:    8        8        0     | 8
// 9:    9        9        0     | 9
// 10:   10       10       0     | 10




// 4:  10       10       0     | 10
// 5:  20       10       10    | 5
// 6:  10       0        10    |


// (f-s)
// 5: (10/10) * 20


// (f/a) * a =
// 1: (1/1) * 1 = 1
// 2: (2/2) * 2 = 2
// 3: (1/2) * 2 = 1
// 4: (10/10) * 10 = 10
// 5: (10/20) * 20 = 5   // should be 5
// 6: (0/10) * 10 = 0

// (f/a + s/a) * a =

// 1: ( (1/1) + (0/1) ) * 1 = 1
// 2: ( (2/2) + (0/2) ) * 2 = 2
// 3: ( (1/2) + (1/2) ) * 2 = 2
// 4: ( () + () ) * =
// 5: ( (10/20) + (10/20) ) * 20 = 20 // set it to 10
// 6: ( () + () ) * =





