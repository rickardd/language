import {Component, Input} from 'angular2/core'

@Component({
  selector: 'bars-wiget',
  templateUrl: 'app/wigets/bars/bars.component.html',
  styleUrls: ['app/wigets/bars/bars.component.css'],
  providers: [

  ]
})

export class BarsComponent{

  @Input() buckets : Object;
  @Input() size : String;



}