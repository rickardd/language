import {Component} from 'angular2/core'
import {RouterLink} from 'angular2/router'

import {BarsComponent} from '../wigets/bars/bars.component'
import {IBars, Bars} from '../shared/bars'
import {ProfileService} from './profile.service'
import {StreakComponent} from './streak.component'
import {UrgentWordsComponent} from './urgent_words.component'

@Component({
  templateUrl: 'app/profile/profile.component.html',
  styleUrls: ['app/profile/profile.component.css'],
  directives:[
    BarsComponent,
    RouterLink,
    StreakComponent,
    UrgentWordsComponent
  ],
  providers: [
    ProfileService
  ]
})

export class ProfileComponent{

  buckets = '[{"translations":0,"percentage":0},{"translations":0,"percentage":0},{"translations":0,"percentage":0},{"translations":0,"percentage":0},{"translations":0,"percentage":0}]'

  userStats : Object = { knowing: -1, playing: -1, waiting: -1, today: { played: "" } }

  constructor( private _profileSerivice : ProfileService ){
    this.buckets = JSON.parse(this.buckets)
  }

  ngOnInit(){
    this.getBuckets()
    this.getStats()
  }

  getBuckets(){
    this._profileSerivice.getBuckets()
          .subscribe( response => {
            this.buckets = response
          })
  }

  getStats(){
    this._profileSerivice.getUserStats()
          .subscribe( response => {
            this.userStats = response
            console.log(response);
          })
  }

}