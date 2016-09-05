import {Component} from 'angular2/core'
import {RouterLink} from 'angular2/router'

import {BarsComponent} from '../wigets/bars/bars.component'
import {IBars, Bars} from '../shared/bars'
import {ProfileService} from './profile.service'

@Component({
  templateUrl: 'app/profile/profile.component.html',
  styleUrls: ['app/profile/profile.component.css'],
  directives:[
    BarsComponent,
    RouterLink
  ],
  providers: [
    ProfileService
  ]
})

export class ProfileComponent{

  buckets = '[{"translations":0,"percentage":0},{"translations":0,"percentage":0},{"translations":0,"percentage":0},{"translations":0,"percentage":0},{"translations":0,"percentage":0}]'

  // hej : new Bars()
  // aranña

  userStats : Object = { knowing: -1, playing: -1, waiting: -1 }

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
            console.log(response);
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