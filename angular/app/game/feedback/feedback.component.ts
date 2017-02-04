import {Component, Input, Output, EventEmitter, ViewChild, AfterViewInit} from 'angular2/core'

import {CapitalizeFirstPipe} from '../../pipes/capititalize-first.pipe'
import {SpaceSentencePipe} from '../../pipes/space-sentence.pipe'

import {FeedbackService} from './feedback.service'
import {Slide} from '../shared/slide'
import {Translation} from '../../shared/translation'

@Component({
  selector: "feedback",
  templateUrl: "app/game/feedback/feedback.component.html",
  styleUrls: ["app/game/feedback/feedback.component.css"],
  providers: [
    FeedbackService
  ],
  pipes: [
    CapitalizeFirstPipe,
    SpaceSentencePipe
  ]
})

export class FeedbackComponent{

  @ViewChild('closeButton') closeButton;
  @Input() translation : Translation;
  @Input() slide : Slide;
  @Output() close = new EventEmitter();

  correctAnswer : boolean = false
  attemptValidatedArray : any[]

  constructor( private _feedbackService : FeedbackService ){

  }

  ngOnInit(){

  }

  ngAfterViewInit() {

  }

  ngOnChanges(){
    // prevets error of undefined attempt
    if( !!this.translation.attempt && !!this.translation.spanish ){
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
     // setTimeout(function() { document.getElementById('feedback-close-button').focus(); },1000);
     // button.focus()
     // console.log( button);
     if( this.closeButton && this.closeButton.nativeElement ){
       // alert("button works");
       // this.closeButton.nativeElement.setAttribute("tabindex", 1);
       // this.closeButton.nativeElement[0].focus();
       focus( this.closeButton )
     }
     // console.log( this.closeButton );
  }

  exitSlide( $event ){
    this.slide = new Slide( false, true )
    this.close.emit( $event );
  }

  onClose(  ){
    // this.exitSlide( $event )
    if( event.type == "click" || event.key == "Enter"){
      this.exitSlide( event )
    }
  }

  getWordValidatedArray() : Object[] {
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
      if( !!wordAttempt ){
        wordAttempt.toLowerCase()
      }
      var wordSpanish = to[index]
      if( !!wordSpanish ){
        wordSpanish.toLowerCase()
      }
      userWordArray.push( {'index': index, 'word': wordAttempt, 'valid': wordAttempt == wordSpanish } );
    })
    return userWordArray;
  }
}



