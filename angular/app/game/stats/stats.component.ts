import {Component, Input} from 'angular2/core'

import {BarsComponent} from '../../wigets/bars/bars.component'
import {StatsService} from './stats.service'

@Component({
  selector: "stats",
  templateUrl: "app/game/stats/stats.component.html",
  styleUrls: ["app/game/stats/stats.component.css"],
  directives:[
    BarsComponent
  ],
  providers: [
    StatsService,
  ]
})

export class StatsComponent{

  @Input() scoreUpdate : any; // just to trigger ngOnChanges()

  buckets : Object

  constructor( private _statsService : StatsService ){

  }

  ngOnInit(){
    this.getNumverOfWordsInBucket();
  }

  ngOnChanges(){
    this.getNumverOfWordsInBucket();
  }

  getNumverOfWordsInBucket(){
    this._statsService.getTotal()
            .subscribe( resulut => {
              this.buckets = resulut
            })
  }

}

