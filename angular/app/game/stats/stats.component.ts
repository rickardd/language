import {Component, Input} from 'angular2/core'

import {StatsService} from './stats.service'
import {ScoreChange} from '../shared/score'

@Component({
  selector: "stats",
  templateUrl: "app/game/stats/stats.component.html",
  providers: [
    StatsService
  ]
})

export class StatsComponent{

  buckets : Object

  constructor( private _statsService : StatsService ){

  }

  ngOnInit(){

    this._statsService.getTotal()
            .subscribe( resulut => {
              this.buckets = resulut
            })

  }

}

