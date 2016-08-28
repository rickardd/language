import {Component, EventEmitter, Output, Input} from 'angular2/core'
import {ControlGroup, FormBuilder} from 'angular2/common'

import {Bucket} from '../shared/score'
import {Translation} from '../../shared/translation'
import {GameService} from '../game.service'


@Component({
  selector: "words",
  templateUrl: "app/game/words/word.component.html",
  styleUrls: ["app/game/words/style.css"],
  providers: [
    GameService
  ]

})

// ToDo: remove plurar from class name
export class WordsComponent{

  @Input() translation = new Translation()
  @Output() wordSubmit = new EventEmitter();

  form : ControlGroup
  stepStatus : string

  constructor( private _fb : FormBuilder, private _gameService : GameService ){

  }

  ngOnInit(){
    this.form = this._fb.group({attempt: [''] })
  }

  onSubmit(){
    this.translation.attempt = this.form.value.attempt
    this.wordSubmit.emit( { translation: this.translation } )
    this.updateScore()
    this.getWord();
  }

  updateScore() : void {
    let trans = this.translation
    this._gameService.updateScore( this.translation )
                  .subscribe( response => {})
  }

  getWord() : void {
    this._gameService.getWord()
                  .subscribe( response => {
                      this.translation = new Translation( response )
                  })
  }
}