import {Component, Input} from 'angular2/core'

@Component({
  selector: 'strength-wiget',
  templateUrl: 'app/wigets/strength/strength.component.html',
  styleUrls: ['app/wigets/strength/strength.component.css'],
  providers: [

  ]
})

export class StrengthComponent{

  @Input() bucket : Object;

}