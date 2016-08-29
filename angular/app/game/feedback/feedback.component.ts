import {Component, Input, Output, EventEmitter} from 'angular2/core'

import {FeedbackService} from './feedback.service'
import {Slide} from '../shared/slide'
import {Translation} from '../../shared/translation'

@Component({
  selector: "feedback",
  templateUrl: "app/game/feedback/feedback.component.html",
  styleUrls: ["app/game/feedback/feedback.component.css"],
  providers: [
    FeedbackService
  ]
})

export class FeedbackComponent{

  @Input() translation : Translation;
  @Input() slide : Slide;
  @Output() close = new EventEmitter();

  correctAnswer : boolean = false
  attemptValidatedArray : any[]

  constructor( private _feedbackService : FeedbackService ){

  }

  ngOnInit(){

  }

  ngOnChanges(){
    this.correctAnswer = this.translation.attempt === this.translation.spanish
    this.attemptValidatedArray = this.getWordValidatedArray()
  }

  exitSlide( $event ){
    this.slide = new Slide( false, true )
    this.close.emit( $event );
  }

  onClose( $event ){
    this.exitSlide( $event )
  }

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



