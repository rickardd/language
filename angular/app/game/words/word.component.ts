import {Component, EventEmitter, Output, Input} from 'angular2/core'
import {ControlGroup, FormBuilder} from 'angular2/common'

// import {Word} from './word'
import {Bucket, ScoreChange} from '../shared/bucket'
import {Translation} from '../shared/translation'
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
  // word = new Word()
  // score = new Bucket()
  scoreChange = new ScoreChange()
  stepStatus : string
  // translation = new Translation()

  constructor( private _fb : FormBuilder, private _gameService : GameService ){

  }

  ngOnInit(){

    this.form = this._fb.group({attempt: [''] })


  }

  onSubmit(){

    // remove word and use translation
    // this.word.attempt = this.form.value.attempt
    this.translation.attempt = this.form.value.attempt

    this._gameService.updateScore( this.translation )
                        .subscribe( response => {
                            // console.log(response)

                            // ToDo: this.score is an empty object. When should it get from database?
                            // ToDo: handle no change. e.g bucket:0 step:0 and attempt = wrong. No score change
                            // if( this.score.bucket < response.bucket   ){
                            //   this.scoreChange.bucket = "up";
                            // }
                            // else{
                            //   this.scoreChange.bucket = "down";
                            // }
                            // if( this.score.step < response.step ){
                            //   debugger
                            //   this.scoreChange.step = "up";
                            // }
                            // else{
                            //   this.scoreChange.step = "down";
                            // }
                            // console.log(this.scoreChange, this.score)
                            this.wordSubmit.emit( { translation: this.translation, scoreChangeTerm: response } )
                          }
                        )
  }
}