interface iTranslation{
  id : number
  english : string
  spanish : string
  attempt? : string
}

export class Translation{

  id : number
  english : string
  spanish : string
  attempt : string

  constructor( obj : iTranslation = {id: -1, english: "", spanish: ""}){
    this.id = obj.id
    this.english = obj.english
    this.spanish = obj.spanish
    if( obj.attempt){
      this.attempt = obj.attempt
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

}