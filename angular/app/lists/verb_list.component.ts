import {Component} from 'angular2/core'
import {ListService} from './list.service'

import {VerbConjugation, VerbListTemp} from '../shared/verb_translation'

@Component({
  selector: "verb-list",
  templateUrl: "app/lists/verb_list.component.html",
  styleUrls: [ "app/lists/verb_list.component.css"],
  providers: [
    ListService
  ]
})

export class VerbListComponent{

  // list : List = new List()
  quantity : number
  coreList : any[]
  list : VerbListTemp
  isFetchingData : boolean = true
  tenseVisability : any[] = []
  itemVisability : any[] = []
  visibilitySettings : Object = {
      indicative: {
         present : false,
         future : true,
         conditional : false,
         preterit : false
      }
    }


  constructor( private _listService : ListService ){

  }

  ngOnInit(){
    this._listService.getVerbList()
            .subscribe( response => {
              // this.coreList = new List( response )
              // this.quantity = this.coreList.quantity()
              // console.log(response);
              this.isFetchingData = false
              this.coreList = response
              this.list = new VerbListTemp( response )
              // response.forEach( function( item ){
              //   console.log( item )
              // })
              console.log( this.list);
              this.setTenseVisability()
            })
  }

  onAddToPrivate( $event, verbType : string ){
    let id = $event.target.dataset.id
    console.log("adding " + verbType + " to my_list with id " + id);
    this._listService.addVerbToPlayList( id, verbType )
            .subscribe( response => {
              console.log( response );
            })
  }

  onDisplayInfinitive(){
    // Creates a deep level clone
    let list = JSON.parse(JSON.stringify( this.coreList ));
    let stripedList = this.list.filterInfinitive( list )
    this.list = new VerbListTemp( stripedList )
  }

  onFilterConjugation( person : string ){
    // Creates a deep level clone
    let list = JSON.parse(JSON.stringify( this.coreList ));
    let stripedList = this.list.filterConjucation( list, person )
    this.list = new VerbListTemp( stripedList )
  }


  onDisplayAll(){
    this.list = new VerbListTemp( this.coreList )
  }

  toggleTense( $event, tense : string ){
    console.log($event.target);
  }

  onGlobalToggleVisability( groupName, tenseName ){
    this.visibilitySettings[groupName][tenseName] = !this.visibilitySettings[groupName][tenseName]
  }

  setTenseVisability(){



    // console.log("visibilitySettings", this.visibilitySettings);

    // for( let item of this.list.collection){
    //   console.log(item);
    //   this.tenseVisability.push({
    //                               id: item.id,
    //                               visibility: {
    //                                 indicative: this.visibilitySettings.indicative
    //                               }
    //                             });


    //   console.info(this.tenseVisability)

    }

  }
}









