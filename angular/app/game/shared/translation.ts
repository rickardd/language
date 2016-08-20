export class Translation{

  id : number
  english : string
  spanish : string
  attempt : string

  constructor( obj ){
    this.id = obj.id
    this.english = obj.english
    this.spanish = obj.spanish
    this.attempt = obj.attempt
  }

}