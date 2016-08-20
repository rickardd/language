import {Component, Input, Output, EventEmitter} from 'angular2/core'

import {FeedbackService} from './feedback.service'
import {ScoreChange, ScoreChangeTerm} from '../shared/score'
import {Slide} from '../shared/slide'
import {Translation} from '../shared/translation'

@Component({
  selector: "feedback",
  templateUrl: "app/game/feedback/feedback.component.html",
  styleUrls: ["app/game/feedback/test.css"],
  providers: [
    FeedbackService
  ]
})

export class FeedbackComponent{

  @Input() translation : Translation;
  @Input() scoreChangeTerm : ScoreChangeTerm = new ScoreChangeTerm("");
  @Input() slide : Slide;
  @Output() close = new EventEmitter();

  correctAnswer : boolean = false
  attemptValidatedArray : any[]

  scoreChange : ScoreChange

  constructor( private _feedbackService : FeedbackService ){

  }

  ngOnInit(){
    console.log("----init----");
    console.log(this.slide);
  }



  ngOnChanges(){
    console.log("--------ON CHANGE--------")
    console.log("in",this.slide.enter,"out",this.slide.exit);
    this.correctAnswer = this.translation.attempt === this.translation.spanish
    // this.scoreChange = this.getScoreChange()
    // console.log( "rickiiiii", this.scoreChangeTerm.term = "" );
    this.scoreChange = new ScoreChange( "bucket_up" )
    // this.scoreChange = new ScoreChange( this.scoreChangeTerm.term )
    this.attemptValidatedArray = this.getWordValidatedArray()
  }

  exitSlide( $event ){
    this.slide = new Slide( false, true )
    this.close.emit( $event );
  }

  onClose( $event ){
    this.exitSlide( $event )
  }

  // getScoreChange(){

  //   var change = new ScoreChange()

  //    switch (this.scoreChangeTerm) {
  //      case "bucket_up":
  //        change.bucket = "up"
  //        break;
  //     case "bucket_down":
  //        change.bucket = "down"
  //        break;
  //     case "bucket_bottom_limit":
  //        change.topLimit = true
  //        break;
  //     case "bucket_top_limit":
  //        change.topLimit = true
  //        break;
  //     case "step_up":
  //        change.step = "up"
  //        break;
  //     case "step_down":
  //        change.step = "down"
  //        break;
  //    }
  //    return change
  // }

  // getScoreChange(){
  //   console.log("------New Score class--------");
  //   return new ScoreChange( this.scoreChangeTerm )
  // }


  getWordValidatedArray(){
    // ToDo: Do a nested loop.
    // atm "this is a word" will give all words wrong if "x this is a word"
    this.translation.attempt = this.translation.attempt || ""
    this.translation.spanish = this.translation.spanish || ""

    var userWordArray = [],
        userWord = this.translation.attempt.trim().split(' '),
        to = this.translation.spanish.trim().split(' '),
        self = this;

    userWord.forEach(function( properyName, index, key ) {
        var wordAttempt = key[index]
        var wordSpanish = to[index]
        userWordArray.push( {'index': index, 'word': wordAttempt, 'valid': wordAttempt == wordSpanish } );
    })
    return userWordArray;
  }
}



