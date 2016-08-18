import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http'
import 'rxjs/add/operator/map'

@Injectable()

export class FeedbackService{

  constructor( private _http: Http ){

  }

}