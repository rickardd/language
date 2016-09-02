import {Component} from 'angular2/core'
import {RouterLink} from 'angular2/router'
import {BarsComponent} from '../wigets/bars/bars.component'

@Component({
  templateUrl: 'app/profile/profile.component.html',
  styleUrls: ['app/profile/profile.component.css'],
  directives:[
    BarsComponent,
    RouterLink
  ],
  providers: [
  ]
})

export class ProfileComponent{

  buckets = '[{"translations":11,"percentage":20.7},{"translations":0,"percentage":1.0},{"translations":1,"percentage":8.3},{"translations":0,"percentage":1.0},{"translations":0,"percentage":1.0}]'


  constructor(){
    this.buckets = JSON.parse(this.buckets)
  }

  ngOnInit(){
  }

}