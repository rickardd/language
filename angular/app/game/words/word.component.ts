import {Component, EventEmitter, Output, Input} from 'angular2/core'
import {ControlGroup, FormBuilder} from 'angular2/common'

import {CapitalizeFirstPipe} from '../../pipes/capititalize-first.pipe'
import {SpaceSentencePipe} from '../../pipes/space-sentence.pipe'

import {Bucket} from '../shared/score'
import {Translation} from '../../shared/translation'
import {GameService} from '../game.service'


@Component({
  selector: "words",
  templateUrl: "app/game/words/word.component.html",
  styleUrls: ["app/game/words/word.component.scss"],
  providers: [
    GameService
  ],
  pipes: [
    CapitalizeFirstPipe,
    SpaceSentencePipe
  ]
})

// ToDo: remove plurar from class name
export class WordsComponent{

  @Input() translation = new Translation()
  @Output() wordSubmit = new EventEmitter();
  @Output() scoreUpdate = new EventEmitter();

  form : ControlGroup
  stepStatus : string

  constructor( private _fb : FormBuilder, private _gameService : GameService ){

  }

  ngOnInit() : void{
    this.form = this._fb.group({attempt: [''] })
  }

  onSubmit() : void{
    this.translation.attempt = this.form.value.attempt
    this.wordSubmit.emit( { translation: this.translation } )
    this.updateScore()
    this.getWord();
    this.form.controls["attempt"].updateValue("")
  }

  updateScore() : void {
    let trans = this.translation
    this._gameService.updateScore( this.translation )
                  .subscribe( response => {
                    this.scoreUpdate.emit( response )
                  })
  }

  getWord() : void {
    this._gameService.getWord()
                  .subscribe( response => {
                      this.translation = new Translation( response )
                  })
  }
}