
interface iTranslation{
  id : number
  type : string
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
  days_ago? : number
}


export class Translation{

  id : number
  type : string
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
  days_ago = 666

  constructor( obj : iTranslation = {id: -1, type: "string", english: "", spanish: "", attempt: "", category: "", context: "", no_of_attempts: 0, no_of_failed: 0, no_of_succeeded: 0, bucket: -1, step: -1, private_match: false, days_ago: 0 }){
    this.id = obj.id
    this.type = obj.type
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
    this.days_ago = obj.days_ago
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
  removeTranslation( id : number ){
     return _.filter( this.collection, function( item ){ return item.id != id} )
  }


  sortBy( sortTerm : string ){
    // By default underscore will sort upperCase before lowerCase
    // _.sortBy( this.collection, 'spanish'); => A.B.C.a.b.c
    // passing in the function to force lowerCase => A.a.B.b.C.c
    sortTerm = !!sortTerm ? sortTerm.toLowerCase() : sortTerm
    return _.sortBy( this.collection, function (i) {
      if( typeof i[sortTerm] === "number" ){
        return i[sortTerm]
      }
      else{
        return !!i[sortTerm] ? i[sortTerm].toLowerCase() : "";
      }
    });
  }
  filterCategory( category : string ){
    return _.filter( this.collection,
              function( item ){
                let cat = !!item.category ? item.category.toLowerCase() : item.category;
                category = category.toLowerCase()
                if( category === "other" ){
                  let notInList = ["verb", "adjective", "noun", "phrase", "conjunction", "idiom"].indexOf( cat ) === -1
                  return notInList || !cat // will return true if no category or if no match in list.
                }
                else{
                  return !!cat && cat.toLowerCase() === category.toLowerCase()
                }
              })
  }
  filterBucket( bucket : number ){
    return _.filter( this.collection,
              function( item ){
                return item.bucket === bucket
              })
  }

  countCategory(){
    return _.countBy( this.collection,
              function( item ) {
                let category = (!!item.category) ? item.category.toLowerCase() : item.category;
                switch ( category ) {
                  case "verb":
                    return "verbs"
                  case "idiom":
                    return "idioms"
                  case "phrase":
                    return "phrases"
                  case "noun":
                    return "nouns"
                  case "adjective":
                    return "adjectives"
                  case "conjunction":
                    return "conjunctions"
                  default:
                    return "other"
                 }
              });
  }

  countBuckets(){
    return _.countBy( this.collection,
              function(item) {
                switch (item.bucket) {
                  case -1:
                    return 0;
                  case 0:
                    return 1;
                   case 1:
                    return 2;
                   case 2:
                    return 3;
                   case 3:
                    return 4;
                   case 4:
                    return 5;
                   case 5:
                    return 6;
                }
              });
  }
}