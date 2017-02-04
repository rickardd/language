import {Component} from 'angular2/core'
import {RouterLink} from 'angular2/router'

import {WordsComponent} from './words/word.component'
import {StatsComponent} from './stats/stats.component'
import {FeedbackComponent} from './feedback/feedback.component'
import {Translation} from '../shared/translation'
import {Slide} from './shared/slide'
import {GameService} from './game.service'

@Component({
  templateUrl: 'app/game/game.component.html',
  styleUrls: ['app/game/game.component.css'],
  directives: [
    WordsComponent,
    StatsComponent,
    FeedbackComponent,
    RouterLink
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
  isFetchingData : boolean = true

  constructor( private _gameService: GameService ){

  }

  ngOnInit(){
    this._gameService.getWord()
          .subscribe( response => {
                      this.translation = response
                      this.isFetchingData = false
                      if(!!response && response !== "no_data") this.hasTranslations = true
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