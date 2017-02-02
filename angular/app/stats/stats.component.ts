import {Component} from 'angular2/core'
import {RouterLink} from 'angular2/router'

import {BarsComponent} from '../wigets/bars/bars.component'
import {IBars, Bars} from '../shared/bars'
import {StatsService} from './stats.service'
import {StreakComponent} from './streak.component'
import {UrgentWordsComponent} from './urgent_words.component'

@Component({
  templateUrl: 'app/stats/stats.component.html',
  styleUrls: ['app/stats/stats.component.css'],
  directives:[
    BarsComponent,
    RouterLink,
    StreakComponent,
    UrgentWordsComponent
  ],
  providers: [
    StatsService
  ]
})

export class StatsComponent{

  buckets = '[{"translations":0,"percentage":0},{"translations":0,"percentage":0},{"translations":0,"percentage":0},{"translations":0,"percentage":0},{"translations":0,"percentage":0}]'

  userStats : Object = { knowing: -1, playing: -1, waiting: -1, today: { played: "" } }

  constructor( private _statsSerivice : StatsService ){
    this.buckets = JSON.parse(this.buckets)
  }

  ngOnInit(){
    this.getBuckets()
    this.getStats()
  }

  getBuckets(){
    this._statsSerivice.getBuckets()
          .subscribe( response => {
            this.buckets = response
          })
  }

  getStats(){
    this._statsSerivice.getUserStats()
          .subscribe( response => {
            this.userStats = response
            console.log(response);
          })
  }

}