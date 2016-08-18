import {Component} from 'angular2/core'
import {WordsComponent} from './words/word.component'
import {StatsComponent} from './stats/stats.component'
import {FeedbackComponent} from './feedback/feedback.component'
import {Translation} from './shared/translation'
import {ScoreChange} from './shared/bucket'
import {GameService} from './game.service'


@Component({
  template: `
    <h1>Game</h1>
    <words [translation]="translation" (wordSubmit)="onWordSubmit($event)"></words>
    <stats></stats>
    <feedback [translation]="translation" [scoreChangeTerm]="scoreChangeTerm"></feedback>
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
  scoreChangeTerm : string

  constructor( private _gameService: GameService ){

  }

  ngOnInit(){
    this._gameService.getWord(1)
          .subscribe( response => {
                      this.translation = response
                    })
  }

  onWordSubmit( $event ){
    console.log( $event )
    this.translation = $event.translation
    this.scoreChangeTerm = $event.scoreChangeTerm
  }


}