interface iTranslation{
  id : number
  english : string
  spanish : string
  attempt? : string
  category? : string
  context? : string
  no_of_attempts? : number
  no_of_failed? : number
  no_of_succeeded? : number
  bucket : number
  step : number
  private_match? : boolean
}


export class Translation{

  id : number
  english : string
  spanish : string
  attempt : string
  category : string
  context : string
  no_of_attempts : number
  no_of_failed : number
  no_of_succeeded : number
  bucket : number
  step : number
  private_match : boolean
  difficulty : number // percentage value 0-100
  strength : number

  constructor( obj : iTranslation = {id: -1, english: "", spanish: "", attempt: "", category: "", context: "", no_of_attempts: 0, no_of_failed: 0, no_of_succeeded: 0, bucket: 0, step: 0, private_match: false }){
    this.id = obj.id
    this.english = obj.english
    this.spanish = obj.spanish
    this.category = obj.category
    this.context = obj.context
    this.no_of_attempts = obj.no_of_attempts
    this.no_of_failed = obj.no_of_failed
    this.no_of_succeeded = obj.no_of_succeeded
    this.private_match = obj.private_match
    this.bucket = obj.bucket
    this.step = obj.step
    // if( obj.attempt ){
      this.attempt = obj.attempt
    // }
    this.difficulty = 0
    if( this.no_of_attempts > 0 ){
      this.difficulty = Math.round( ( this.no_of_failed / this.no_of_attempts ) * 100 )
    }
    this.strength = 0
    if( this.no_of_attempts > 0 ){
      this.strength = Math.round( ( this.no_of_succeeded / this.no_of_attempts ) * 100 )
    }



  }

}

export class List{

  collection : any[] = []

  constructor( arr : any[] = [] ){
    arr.forEach( (keyObject, index, array) => {
      this.collection.push( new Translation( keyObject ))
    })
  }

  quantity(){
    return this.collection.length
  }

  getTranslation( id : number ){
     return _.find( this.collection, function( item ){ return item.id == id} )
  }

}