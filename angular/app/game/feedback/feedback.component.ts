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
    // prevets error of undefined attempt
    if( !!this.translation.attempt ){
      // let attempt = this.translation.attempt
      let attempt = this.translation.attempt
      let spanish = this.translation.spanish

      if( _.contains([".", "!", "?"], _.last( attempt ) ) ){
        attempt = attempt.slice(0, -1)
      }

      if( _.contains([".", "!", "?"], _.last( spanish ) ) ){
        spanish = spanish.slice(0, -1)
      }

      this.correctAnswer = attempt.toLowerCase() === spanish.toLowerCase()
    }
    this.attemptValidatedArray = this.getWordValidatedArray()

    // let button = document.querySelector("feedback").querySelector("button")
    // let button = document.getElementById("feedback-close-button")
    // button.focus()
    // console.log( button);
  }

  exitSlide( $event ){
    this.slide = new Slide( false, true )
    this.close.emit( $event );
  }

  onClose(  ){
    // this.exitSlide( $event )
    console.log(event, event.target);
    if( event.type == "click" || event.key == "Enter"){
      this.exitSlide( event )
    }
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
        var wordAttempt = key[index].toLowerCase()
        var wordSpanish = to[index].toLowerCase()
        userWordArray.push( {'index': index, 'word': wordAttempt, 'valid': wordAttempt == wordSpanish } );
    })
    return userWordArray;
  }
}



