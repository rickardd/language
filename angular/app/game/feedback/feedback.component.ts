import {Component, Input} from 'angular2/core'

import {FeedbackService} from './feedback.service'
import {ScoreChange} from '../shared/bucket'

@Component({
  selector: "feedback",
  templateUrl: "app/game/feedback/feedback.component.html",
  providers: [
    FeedbackService
  ]
})

export class FeedbackComponent{

  @Input() translation = Object;
  @Input() scoreChangeTerm = String();

  scoreChange = new ScoreChange()

  constructor( private _feedbackService : FeedbackService ){

    console.log(this.scoreChangeTerm)
  }


  // ngAfterContentChecked() {
  //   console.log(this.scoreChangeTerm)
  // }

  ngOnInit(){

    console.log(this.scoreChangeTerm)

     switch (this.scoreChangeTerm) {
       case "bucket_up":
         this.scoreChange.bucket = "up"
         break;
      case "bucket_down":
         this.scoreChange.bucket = "down"
         break;
      case "bucket_no_change":
         this.scoreChange.bucket = "-"
         break;
      case "step_up":
         this.scoreChange.bucket = "up"
         break;
      case "step_down":
         this.scoreChange.bucket = "down"
         break;

       default:
         // code...
         break;
     }
     console.log(this.scoreChange)

  }

}