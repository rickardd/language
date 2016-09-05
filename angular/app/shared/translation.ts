interface iTranslation{
  id : number
  english : string
  spanish : string
  attempt? : string
  category? : string
}

export class Translation{

  id : number
  english : string
  spanish : string
  attempt : string
  category? : string

  constructor( obj : iTranslation = {id: -1, english: "", spanish: "", category: ""}){
    this.id = obj.id
    this.english = obj.english
    this.spanish = obj.spanish
    this.category = obj.category
    if( obj.attempt ){
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