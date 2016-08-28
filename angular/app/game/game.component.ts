import {Component} from 'angular2/core'

import {WordsComponent} from './words/word.component'
import {StatsComponent} from './stats/stats.component'
import {FeedbackComponent} from './feedback/feedback.component'
import {Translation} from '../shared/translation'
import {Slide} from './shared/slide'
import {GameService} from './game.service'

@Component({
  template: `
    <words [translation]="translation" (wordSubmit)="onWordSubmit($event)"></words>
    <stats [wordSubmited]="wordSubmited"></stats>
    <feedback
          [translation]="translation"
          [slide]="slide"
          (close)="onFeedbackClose()">
    </feedback>
  `,
  directives: [
    WordsComponent,
    StatsComponent,
    FeedbackComponent
  ],
  providers: [
    GameService
  ]
})

export class GameComponent{

  translation = new Translation();
  slide = new Slide( false, false)
  wordSubmited : number = 0

  constructor( private _gameService: GameService ){

  }

  ngOnInit(){
    this._gameService.getWord()
          .subscribe( response => {
                      this.translation = response
                    })
  }

  onWordSubmit( $event ){
    this.wordSubmited += 1
    this.translation = new Translation( $event.translation )
    this.slide = new Slide(true, false)
  }

  onFeedbackClose( $event ){
    console.log("game close");
  }

}