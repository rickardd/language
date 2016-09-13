import {Component} from 'angular2/core'

import {WordsComponent} from './words/word.component'
import {StatsComponent} from './stats/stats.component'
import {FeedbackComponent} from './feedback/feedback.component'
import {Translation} from '../shared/translation'
import {Slide} from './shared/slide'
import {GameService} from './game.service'

@Component({
  template: `
    <div *ngIf="hasTranslations">
      <words
        [translation]="translation"
        (wordSubmit)="onWordSubmit($event)"
        (scoreUpdate)="onScoreUpdate($event)">
      </words>
      <stats
        [scoreUpdate]="scoreUpdate">
      </stats>
      <feedback
            [translation]="translation"
            [slide]="slide"
            (close)="onFeedbackClose()">
      </feedback>
    </div>
    <div *ngIf="!hasTranslations">
      <div class="view-placeholder">No Words To Play</div>
    </div>
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

  translation = new Translation()
  slide = new Slide( false, false)
  wordSubmited : number = 0
  scoreUpdate : Translation
  hasTranslations : boolean = false

  constructor( private _gameService: GameService ){

  }

  ngOnInit(){
    this._gameService.getWord()
          .subscribe( response => {
                      this.translation = response
                      if(!!response) this.hasTranslations = true
                    })
  }

  onWordSubmit( $event ){
    this.wordSubmited += 1
    this.translation = new Translation( $event.translation )
    this.slide = new Slide(true, false)
  }
  onScoreUpdate( $event ){
    this.scoreUpdate = new Translation( $event )
  }

  onFeedbackClose( $event ){
    console.log("game close");
  }

}