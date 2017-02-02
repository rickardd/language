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

  user : any[]

  constructor( private _profileSerivice : ProfileService ){

  }

  ngOnInit(){
    this.getUser()
  }

  getUser(){
    // this._profileSerivice.getUser()
    //       .subscribe( response => {
    //         this.user = response
    //       })
  }

}